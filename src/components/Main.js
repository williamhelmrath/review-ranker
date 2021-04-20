import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 345,
    marginBottom: 20,
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
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [reviewModalOpen, setreviewModalOpen] = useState(false);
  const dummyReviews = [
    "Hello this was really nice for my teenager!",
    "Hey I am so sorry to say that these clothes were not the best for smaller individuals",
    "WOW WHAT A FIT",
  ];

  const [currArray, setcurrArray] = useState([]);

  const menShirts = [
    "https://cdn.shopify.com/s/files/1/0129/1072/products/TERZOLO_UNTUCKIT_STRIPES_SPREAD-COLLAR_BLUE_2_2_x610@2x.jpg?v=1594758345",
    "https://cdn.shopify.com/s/files/1/1368/3463/products/HONEYCOMB-CURVE-HEM.jpg?v=1590011077",
    "https://img.ltwebstatic.com/images2_pi/2019/04/11/15549720522369514997_thumbnail_900x1199.webp",
  ];

  const menJackets = [
    "https://img.ltwebstatic.com/images3_pi/2021/01/26/1611664995173812b957b0e7d7a52f7aabcbedd0fa_thumbnail_900x.webp",
    "https://media.everlane.com/image/upload/c_fill,dpr_2.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/70b3972c_8aa2.jpg",
    "https://www.russellathletic.com/dw/image/v2/ABAH_PRD/on/demandware.static/-/Sites-masterCatalog_RUSSELL/default/dw024b5a43/images/hi-res/parachute_jacket_front-crop-3000x3000.jpg?sw=720&sh=720&sm=fit&sfrm=jpg",
  ];

  const menShoes = [];

  const menSuits = [];

  const menPants = [];

  const womenShirts = [];

  const womenShoes = [];

  const womenJackets = [];

  const womenPants = [];

  const womenSuits = [];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="Men" {...a11yProps(0)} />
          <Tab label="Women" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2016/01/19/18/04/man-1150058_1280.jpg"
                    title="Jacket"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Jacket
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Cool Jackets for the Spring
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(menJackets);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Jackets
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_1280.jpg"
                    title="shirt"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shirt
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Warm shirts for any occasion
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(menShirts);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Shirts
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2016/11/29/12/51/adult-1869621_1280.jpg"
                    title="pants"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Pants
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Comfort fit like no other
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(menPants);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Pants
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2015/03/26/09/40/business-suit-690048_1280.jpg"
                    title="suits"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Suits
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Stylish and flashy
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(menSuits);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Suits
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg"
                    title="suits"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shoes
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Every man's most prized collection
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(menShoes);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Shoes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg"
                    title="Jacket"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Jacket
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Cool Jackets for the Spring
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(womenJackets);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Jackets
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea
                  onClick={() => {
                    setreviewModalOpen(true);
                  }}
                >
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2017/09/18/19/22/fashion-2762909_1280.jpg"
                    title="shirt"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shirt
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Warm shirts for any occasion
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(womenShirts);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Shirts
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2017/10/18/11/47/hat-2863855_1280.jpg"
                    title="pants"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Pants
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Comfort fit like no other
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(womenPants);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Pants
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2017/12/01/18/49/suit-2991514_1280.jpg"
                    title="suits"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Suits
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Stylish and flashy
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(womenSuits);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Suits
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid align="center" xs={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2017/09/13/19/59/converse-2746800__480.jpg"
                    title="suits"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shoes
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Find your perfect pair
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      setcurrArray(womenShoes);
                      setOpen(true);
                    }}
                    size="small"
                    color="primary"
                  >
                    View Shoes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={reviewModalOpen}
        onClose={setreviewModalOpen}
      >
        <DialogContent>
          <Grid align="center" xs={12}>
            <Typography variant="h3">Reviews</Typography>
            {dummyReviews.map((el) => {
              return <Typography>{el}</Typography>;
            })}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setreviewModalOpen(false);
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <Grid align="center" xs={12}>
            <Typography variant="h3">Reccomendations</Typography>
          </Grid>
          <GridList className={classes.gridList} cols={2.5}>
            {currArray.map((tile) => (
              <GridListTile
                style={{ height: 500, marginRight: 20 }}
                key={tile.img}
              >
                <img
                  onClick={() => {
                    setreviewModalOpen(true);
                  }}
                  src={tile}
                  style={{ height: "100%" }}
                  alt={tile}
                />
                <GridListTileBar title={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
