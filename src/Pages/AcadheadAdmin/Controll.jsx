import { React, useEffect, useState } from "react";
import {
  AppBar,
  ThemeProvider,
  Typography,
  Toolbar,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import Sidebar from "../../Components/Acadhead/Sidebar";
import Theme from "../../CustomTheme";
import img from "../../Img/seal.png";
import QueueLine from "../../Components/Acadhead/AdminQueueline";
import NowServing from "../../Components/Acadhead/AdminNowServing";
import Skip from "../../Components/Acadhead/AdminSkip";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getCountFromServer } from "firebase/firestore";
import { yellow } from "@mui/material/colors";

const Controll = () => {
  const navigate = useNavigate();
  let admin = "";
  if (localStorage.getItem("Username") === "adminacad1") {
    admin = "Ms. Khaye Castro";
  } else {
    admin = "Ms. Ambeth Casimiro";
  }
  let [transaction, setTransaction] = useState(0);
  let j = 0;
  let k = 0;
  let l = 0;
  let m = 0;
  // const count = async () => {
  //   const coll1 = collection(db, "acadNowserving");
  //   const snapshot1 = await getCountFromServer(coll1);
  //   j = snapshot1.data().count;

  //   const coll2 = collection(db, "acadPriority");
  //   const snapshot2 = await getCountFromServer(coll2);
  //   k = snapshot2.data().count;

  //   const coll = collection(db, "acadQueuing");
  //   const snapshot = await getCountFromServer(coll);
  //   l = snapshot.data().count;

  //   const coll3 = collection(db, "acadSkip");
  //   const snapshot3 = await getCountFromServer(coll3);
  //   m = snapshot3.data().count;

  //   setTransaction(j + k + l + m);
  //   return transaction;
  // };
  
  useEffect(() => {
    const checkTime = async() => {
      if (
            (localStorage.getItem("Password") !== "admin" &&
              localStorage.getItem("Username") !== "adminacad1") ||
            (localStorage.getItem("Password") !== "admin" &&
              localStorage.getItem("Username") !== "adminacad2")
          ) {
            navigate("/admin");
      }
    };
    
    const intervalId = setInterval(checkTime,1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="pupMaroon">
            <Toolbar>
              <Sidebar />
              <Box px={2}>
                <img src={img} alt="" height={50} width={50} />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                color="white"
              >
                Dashboard
              </Typography>

              <Typography>{admin}</Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>

      {/* Control Table */}
      <Box p={5} mt={10}>
        <Box>
          <ThemeProvider theme={Theme}>
            <FormGroup>
              <FormControlLabel
                control={<Switch color="pupMaroon" />}
                label="Open Transaction card"
                type= "checkbox"
                value ={true}
              />
            </FormGroup>
          </ThemeProvider>
        </Box>
        <Grid container spacing={5}>
          {/* Now Serving */}

          <Grid item lg={12}>
            <NowServing />
          </Grid>

          {/* Queue Line */}
          <Grid item lg={12}>
            <QueueLine />
          </Grid>

          {/* Skip */}
          <Grid item lg={12}>
            <Skip />
          </Grid>
          <Grid item lg={12}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Controll;