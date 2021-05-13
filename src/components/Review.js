import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useUserContext } from "../UserProvider";

export default function Review({ review, tokenize }) {
  const { user } = useUserContext();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (user) {
      setClicked(true);
      tokenize(review);
    } else {
      alert("You must be logged in to mark a review as 'helpful'");
    }
  };

  return (
    <div style={{ width: "100%", padding: "5vh" }}>
      <div style={{ display: "flex" }}>
        <AccountCircleIcon />{" "}
        <Typography style={{ marginLeft: "10px" }}>
          <b>Reviewed by {review.reviewerID}</b>
        </Typography>
      </div>
      <Typography style={{ margin: "10px 0px" }}>
        {review.reviewText}
      </Typography>
      <Button variant="outlined" disabled={clicked} onClick={handleClick}>
        Helpful
      </Button>
    </div>
  );
}
