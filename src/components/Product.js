import React from "react";
import { useParams } from "react-router";
import useStyles from "../styles";
export default function ProductPage({ user }) {
  const { asin } = useParams();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>{asin}</p>
      <p>{JSON.stringify(user, undefined, 4)}</p>
    </div>
  );
}
