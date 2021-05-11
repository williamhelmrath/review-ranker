import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import useStyles from "../styles";

export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box
      bgcolor="#381466"
      color="white"
      padding="10px"
      height="4em"
      display="flex"
      alignItems="center"
    >
      <Typography
        variant="h6"
        onClick={() => history.push("/")}
        style={{ cursor: "pointer" }}
      >
        Review Ranker
      </Typography>

      <Link to="/login" className={classes.headerLink}>
        Login
      </Link>
    </Box>
  );
}
