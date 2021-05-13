import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "../firebase";
import useStyles from "../styles";

const db = firebase.firestore();

export default function Main() {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState(null);
  const [lastKey, setLastKey] = useState("");

  useEffect(() => {
    db.collection("products")
      .orderBy("asin")
      .limit(10)
      .get()
      .then((docs) => {
        const docData = [];
        docs.forEach((doc) => {
          docData.push(doc.data());
        });
        setLastKey(docData[docData.length - 1].asin);
        setProducts(docData);
      })
      .catch(() => {
        console.error("products fetch error");
      });
  }, []);

  const getMoreProducts = () => {
    db.collection("products")
      .orderBy("asin")
      .startAfter(lastKey)
      .limit(10)
      .get()
      .then((docs) => {
        const docData = [];
        docs.forEach((doc) => {
          docData.push(doc.data());
        });
        setLastKey(docData[docData.length - 1].asin);
        setProducts((prevState) => [...prevState, ...docData]);
      })
      .catch(() => {
        console.error("products fetch error");
      });
  };

  if (!products) {
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
    <div className={classes.root}>
      <Grid container>
        {products?.map((doc) => (
          <Grid item xs={6} key={doc.asin} align="center">
            <Card className={classes.card}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ padding: "10px 0px" }}
              >
                Product {doc.asin}: {doc.title ? doc.title : null}
              </Typography>
              <CardActions>
                <Button
                  onClick={() => history.push(`/products/${doc.asin}`)}
                  size="small"
                  color="primary"
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        onClick={getMoreProducts}
        style={{ marginBottom: "3vh", height: "6vh" }}
      >
        Get more products
      </Button>
    </div>
  );
}
