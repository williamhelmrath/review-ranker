import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStyles from "../styles";
import firebase from "../firebase";
import {
  CircularProgress,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  List,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
export default function ProductPage({ user, setUser }) {
  const { asin } = useParams();
  const classes = useStyles();
  const [productInfo, setProductInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const tokenize = async (review) => {
    if (user !== null) {
      const resp = await fetch(
        "http://1e26a9604c3eff3b3ae642a766d5a6c0.balena-devices.com",
        {
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
        }
      );
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
        .update({ word_rank: oldFreq });
      // update user profile
      setUser({ ...user, word_rank: oldFreq });
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
        if (user === null) {
          setReviews(doc.data().reviews);
        } else {
          // this isn't solr itself, but the FastAPI proxy
          const solrURL = new URL(
            "http://1e26a9604c3eff3b3ae642a766d5a6c0.balena-devices.com/solr/reviews/select"
          );
          solrURL.searchParams.append("fq", `asin:${doc.data().asin}`);

          const words = [];
          for (let word in user.word_rank) {
            words.push(`${word}`);
          }
          let term = words.join("||");
          solrURL.searchParams.append("q", `reviewText:${term}`);
          fetch(solrURL)
            .then((resp) => {
              return resp.json();
            })
            .then((revObj) => {
              setReviews(revObj.response.docs);
            });
        }
      });
  }, [asin, user]);
  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item align="center">
          {productInfo === null ? (
            <CircularProgress />
          ) : (
            <Paper>
              <Typography variant="h1">{productInfo.asin}</Typography>
              {user === null ? null : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>word</TableCell>
                        <TableCell>frequency</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(user.word_rank).map(([key, value]) => {
                        return (
                          <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <List>
                {reviews.map((review) => {
                  return (
                    <ListItem key={review.reviewerID}>
                      <ListItemText>{review.reviewText}</ListItemText>
                      {user ? (
                        <Button
                          onClick={() => {
                            tokenize(review);
                          }}
                        >
                          Helpful
                        </Button>
                      ) : null}
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
