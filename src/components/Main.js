import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase";
import useStyles from "../styles";

export default function Main() {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .limit(10)
      .get()
      .then((docs) => {
        const docData = [];
        docs.forEach((doc) => docData.push(doc.data()));
        setProducts(docData);
      })
      .catch(() => {
        console.error("products fetch error");
      });
  }, []);

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
                Product {doc.asin}
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
    </div>
  );
}
