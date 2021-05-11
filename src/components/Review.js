import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function Review({ review, tokenize }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    tokenize(review);
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
