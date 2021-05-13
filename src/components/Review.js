import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useUserContext } from "../UserProvider";

export default function Review({ review, tokenize }) {
  const { user } = useUserContext();
  const [clicked, setClicked] = useState(false);

  const { reviewerName: name, reviewerID: id, reviewText: text } = review;

  const handleClick = () => {
    if (user) {
      setClicked(true);
      tokenize(review);
    } else {
      alert("You must be logged in to mark a review as 'helpful'");
    }
  };

  const Reviewer = () => {
    return (
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="body1" style={{ marginRight: 8 }}>
          <b>{name ? name : id}</b>
        </Typography>
        {name && (
          <Typography variant="caption" style={{ color: "#444" }}>
            <b>{id}</b>
          </Typography>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", padding: "2vh 5vh" }}>
      <div style={{ display: "flex" }}>
        <AccountCircleIcon style={{ marginRight: "10px" }} />
        <Reviewer />
      </div>
      <Typography style={{ margin: "10px 0px" }}>{text}</Typography>
      <Button variant="outlined" disabled={clicked} onClick={handleClick}>
        Helpful
      </Button>
    </div>
  );
}
