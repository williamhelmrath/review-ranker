import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import firebase from "../firebase";
import { CircularProgress, Typography } from "@material-ui/core";
import Review from "./Review";
import { useUserContext } from "../UserProvider";
import WordRankTable from "./WordRankTable";

const solrBaseURL = process.env.REACT_APP_solrURL;

export default function Product() {
  const { user, setUser } = useUserContext();
  const { asin } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [reviews, setReviews] = useState([]);

  const tokenize = async (review) => {
    if (user !== null) {
      for (let oldReview of user.reviews) {
        if (
          oldReview.asin === review.asin &&
          oldReview.reviewerID === review.reviewerID
        ) {
          return;
        }
      }

      const resp = await fetch(`${solrBaseURL}/tokenize`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          asin: review.asin,
          reviewerID: review.reviewerID,
          reviewText: review.reviewText[0],
        }), // body data type must match "Content-Type" header
      });
      const tokenizedReview = await resp.json();
      const oldFreq = { ...user.word_rank };
      for (let word in tokenizedReview.frequencyMap) {
        if (oldFreq[word]) {
          oldFreq[word] += tokenizedReview.frequencyMap[word];
        } else {
          oldFreq[word] = tokenizedReview.frequencyMap[word];
        }
      }
      // update on firestore
      await firebase
        .firestore()
        .collection("users")
        .doc(user.reviewerID)
        .update({
          word_rank: oldFreq,
          reviews: firebase.firestore.FieldValue.arrayUnion(review),
        });
      // update user profile
      setUser({
        ...user,
        word_rank: oldFreq,
        reviews: [...user.reviews, review],
      });
    } else {
      alert("You must be logged in to mark a review as 'helpful'");
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .doc(asin)
      .get()
      .then((doc) => {
        setProductInfo(doc.data());
        if (!user) {
          setReviews(doc.data().reviews);
        } else {
          // this isn't solr itself, but the FastAPI proxy

          const solrQueryURL = new URL(`${solrBaseURL}solr/reviews/select`);
          solrQueryURL.searchParams.append("fq", `asin:${doc.data().asin}`);

          const words = [];
          for (let word in user.word_rank) {
            words.push(`reviewText:${word}^${user.word_rank[word]}`);
          }
          let term = words.join(" ");
          solrQueryURL.searchParams.append("q", `${term}`);

          fetch(solrQueryURL)
            .then((resp) => resp.json())
            .then((revObj) => {
              if (revObj.error) {
                setReviews(doc.data().reviews);
              } else {
                setReviews(revObj.response.docs);
              }
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => {
        console.error(error);
        setReviews([]);
      });
  }, [asin, user]);

  if (!productInfo) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "20px auto",
        padding: "0 20px",
      }}
    >
      {user && <WordRankTable />}
      <Typography variant="h3" style={{ alignSelf: "flex-start" }}>
        Top ranked reviews for {productInfo.asin}:{" "}
        {productInfo.title ? productInfo.title : null}
      </Typography>
      {productInfo.description ? (
        typeof productInfo.description === "string" ? (
          <Typography>{productInfo.description}</Typography>
        ) : (
          productInfo.description.map((desc) => (
            <Typography key={desc}>{desc}</Typography>
          ))
        )
      ) : null}
      {reviews.map((review) => (
        <Review review={review} tokenize={tokenize} key={review.reviewerID} />
      ))}
    </div>
  );
}
