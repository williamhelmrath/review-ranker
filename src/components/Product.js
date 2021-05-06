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
} from "@material-ui/core";
export default function ProductPage({ user }) {
  const { asin } = useParams();
  const classes = useStyles();
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
          const solrURL = new URL("http://localhost:8000/solr");
          solrURL.searchParams.append("fq", `asin:${doc.data().asin}`);

          const words = [];
          for (let word in user.word_rank) {
            words.push(word);
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
