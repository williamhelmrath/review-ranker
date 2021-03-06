import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: "2vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "94vh",
  },
  card: {
    maxWidth: 500,
    width: "40vw",
    marginBottom: 20,
    padding: 10,
  },
  media: {
    height: 140,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  tileRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  headerLink: { color: "white", marginLeft: "2vw" },
}));
export default useStyles;
