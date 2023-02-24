import React from "react";
import { Grid, Typography } from "@mui/material";
import NowServing from "../../Components/Registrar/MonitorNowServing";
import QueueLine from "../../Components/Registrar/MonitorQueueLine";
import Skipped from "../../Components/Registrar/MonitorSkipped";
import AnnouncementSlider from "../../Components/Registrar/AnnouncementSlider";

import Time from "../../Components/Time";
import Entertainement from "../../Components/EntertainementVid";
const MonitorReg = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={6}>
          <Grid container lg={12} spacing={2} p={5} pb={1}>
            <Grid item lg={12}>
              <NowServing />
            </Grid>
            <Grid item lg={6}>
              <QueueLine />
            </Grid>
            <Grid item lg={6}>
              <Skipped />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6}>
          <Entertainement />
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bolder",
              color: "#880000",
              textDecoration: "underline",
            }}
          >
            Registrar Office
          </Typography>
          <Time />
        </Grid>
      </Grid>
      <AnnouncementSlider />
    </>
  );
};

export default MonitorReg;
