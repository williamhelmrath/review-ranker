import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "./firebase";

const db = firebase.firestore();

function App() {
  useEffect(() => {
    db.collection("users")
      .get()
      .then((res) => console.log(res));
  });

  return (
    <div style={{ textAlign: "center" }}>
      <TextField label="Search" />
    </div>
  );
}

export default App;
