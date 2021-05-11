import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "../firebase";
import useStyles from "../styles";
export default function FullWidthTabs() {
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
        docs.forEach((doc) => {
          docData.push(doc.data());
        });
        setProducts(docData);
      })
      .catch(() => {
        console.error("products fetch error");
      });
  }, []);
  return (
    <div className={classes.root}>
      <Grid container>
        {products === null
          ? null
          : products.map((doc) => {
              return (
                <Grid item xs={6} key={doc.asin} align="center">
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Product {doc.asin}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        onClick={() => {
                          history.push(`/products/${doc.asin}`);
                        }}
                        size="small"
                        color="primary"
                      >
                        View {doc.asin}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}
