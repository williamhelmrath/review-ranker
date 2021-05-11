import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import firebase from "../firebase";
import {
  CircularProgress,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@material-ui/core";

export default function Product({ user }) {
  const history = useHistory();
  const { asin } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .doc(asin)
      .get()
      .then((doc) => {
        setProductInfo(doc.data());
        if (user === null) {
          setReviews(doc.data().reviews);
        } else {
          // this isn't solr itself, but the FastAPI proxy
          const solrURL = new URL(
            "http://1e26a9604c3eff3b3ae642a766d5a6c0.balena-devices.com/solr/reviews/select"
          );

          solrURL.searchParams.append("fq", `asin:${asin}`);

          const words = [];
          for (let word in user.word_rank) {
            words.push(word);
          }
          let term = words.join("||");
          solrURL.searchParams.append("q", `reviewText:${term}`);
          fetch(solrURL)
            .then((resp) => resp.json())
            .then((revObj) => {
              setReviews(revObj.response.docs);
            })
            .catch((error) => console.log(error));
        }
      });
  }, [asin, user]);

  const handleGoBack = () => {
    history.push("/");
  };

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
      <IconButton
        onClick={handleGoBack}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h3">{productInfo.asin}</Typography>
      {user && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>word</TableCell>
                <TableCell>frequency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(user.word_rank).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Typography variant="h3" style={{ alignSelf: "flex-start" }}>
        Top ranked reviews
      </Typography>
      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </div>
  );
}

const Review = ({ review }) => {
  const handleHelpful = () => {
    console.log("increment counts in user word rank");
  };

  return (
    <div style={{ width: "100%", padding: "5vh" }} key={review.reviewerID}>
      <div style={{ display: "flex" }}>
        <AccountCircleIcon />{" "}
        <Typography style={{ marginLeft: "10px" }}>
          <b>Reviewed by {review.reviewerID}</b>
        </Typography>
      </div>
      <Typography>{review.reviewText}</Typography>
      <Button variant="outlined" onClick={handleHelpful}>
        Helpful
      </Button>
    </div>
  );
};
