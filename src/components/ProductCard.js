import React from "react";
import he from "he";
import { useHistory } from "react-router";
import { Card, CardActions, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "../styles";

export default function ProductCard({ product }) {
  const history = useHistory();
  const classes = useStyles();

  const productTitle = product.title
    ? he.decode(product.title)
    : `Product ${product.asin}`;

  return (
    <Grid item xs={6} align="center">
      <Card className={classes.card}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          style={{ padding: "10px 0px" }}
        >
          {productTitle}
        </Typography>
        <CardActions>
          <Button
            onClick={() => history.push(`/products/${product.asin}`)}
            size="small"
            color="primary"
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
