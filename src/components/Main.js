import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import firebase from "../firebase";
import useStyles from "../styles";
import ProductCard from "./ProductCard";

const db = firebase.firestore();

export default function Main() {
  const classes = useStyles();
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
          <ProductCard product={doc} key={doc.asin} />
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
