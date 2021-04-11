import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "./firebase";

const db = firebase.firestore();

function App() {
  const [word, setWord] = useState("");
  useEffect(() => {
    db.collection("users")
      .get()
      .then((res) => console.log(res));
  });

  const handleChange = (event) => setWord(event.target.value);

  return (
    <div
      style={{ textAlign: "center", display: "flex", flexDirection: "column" }}
    >
      <TextField label="Search" onChange={handleChange} value={word} />
      {word}
    </div>
  );
}

export default App;
