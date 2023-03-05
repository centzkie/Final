import { React, useEffect, useState } from "react";
import {
  AppBar,
  ThemeProvider,
  Typography,
  Toolbar,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Registrar/Sidebar";
import Theme from "../../CustomTheme";
import img from "../../Img/seal.png";
import NowServing from "../../Components/Registrar/AdminNowServing";
import QueueLine from "../../Components/Registrar/AdminQueueLine";
import Skip from "../../Components/Registrar/AdminSkip";

const Controll = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkTime = async() => {
      if (
            (localStorage.getItem("Password1") !== "admin" &&
              localStorage.getItem("Username1") !== "adminreg")
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
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>

      {/* Control Table */}
      <Box p={5} mt={10}>
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
        </Grid>
      </Box>
    </>
  );
};

export default Controll;