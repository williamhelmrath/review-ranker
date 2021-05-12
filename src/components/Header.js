import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { useUserContext } from "../UserProvider";
import useStyles from "../styles";

export default function Header() {
  const { user } = useUserContext();
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
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
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

      {user && (
        <Typography variant="subtitle1">
          Logged in as {user.reviewerID}
        </Typography>
      )}
    </Box>
  );
}
