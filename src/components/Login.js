import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import firebase from "../firebase";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "30vw",
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ setUser }) {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const fetchUser = async (userID) => {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .get();
    return doc;
  };

  const handleFormSubmit = async ({ username }) => {
    setLoading(true);
    fetchUser(username).then((doc) => {
      if (doc.exists) {
        setUser(doc.data());
        history.push("/");
      } else {
        setLoading(false);
        alert("That user doesn't exist");
      }
    });
  };

  return (
    <Box className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      >
        <TextField
          variant="outlined"
          margin="normal"
          label="Username"
          name="username"
          {...register("username", { required: true })}
          error={!!errors.username}
          helperText={!!errors.username && "Please enter a username"}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{ minHeight: 50 }}
        >
          {loading ? <CircularProgress color="secondary" /> : "Go"}
        </Button>
      </form>
    </Box>
  );
}
