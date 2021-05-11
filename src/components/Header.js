import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import useStyles from "../styles";

export default function Header() {
  const classes = useStyles();
  return (
    <Box
      bgcolor="#381466"
      color="white"
      padding="10px"
      display="flex"
      alignItems="center"
    >
      <Typography variant="h6" style={{ marginBottom: "3px" }}>
        Review Ranker
      </Typography>
      <Link to="/" className={classes.headerLink}>
        Home
      </Link>
      <Link to="/login" className={classes.headerLink}>
        Login
      </Link>
    </Box>
  );
}
