import React from "react";
import { Grid, Box, Typography, Link, IconButton } from "@mui/material";
import {
  FacebookRounded,
  Twitter,
  YouTube,
  Language,
} from "@mui/icons-material";
const Footer = () => {
  return (
    <div style={{ position: "relative", bottom: 0 }}>
      <Box mt={4} p={4} bgcolor="white">
        <Grid container spacing={3}>
          <Grid item lg={3} md={8} xs={12}>
            <Typography color="#880000" sx={{ fontWeight: "bold" }}>
              ONLINE SERVICES
            </Typography>
            <ul>
              <Link
                href="https://www.pup.edu.ph/iapply//"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Typography color="#939393" p={0.5} pl={3}>
                  <li>PUP iApply </li>
                </Typography>
              </Link>

              <Link
                href="https://sis2.pup.edu.ph/student/"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Typography color="#939393" p={0.5} pl={3}>
                  <li>SIS for Students</li>
                </Typography>
              </Link>

              <Link
                href="https://sis2.pup.edu.ph/faculty/"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Typography color="#939393" p={0.5} pl={3}>
                  <li>SIS for Faculty</li>
                </Typography>
              </Link>
            </ul>
          </Grid>
          <Grid item lg={3} md={8} xs={12}>
            <Typography color="#880000" sx={{ fontWeight: "bold" }}>
              QUICK LINKS
            </Typography>
            <ul>
              <Link
                href="https://www.facebook.com/PUPSMBAcadHead"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Typography color="#939393" p={0.5} pl={3}>
                  <li>PUPSMB Office of Academic head </li>
                </Typography>
              </Link>

              <Link
                href="https://www.facebook.com/PUPSMBAdmissionandRegistration"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Typography color="#939393" p={0.5} pl={3}>
                  <li>PUPSMB Registrar Office</li>
                </Typography>
              </Link>
            </ul>
          </Grid>
          <Grid item lg={6} md={8} xs={12}>
            <Typography color="#880000" sx={{ fontWeight: "bold" }}>
              KEEP IN TOUCH
            </Typography>
            <Link
              href="https://www.facebook.com/pages/Polytechnic%20University%20of%20the%20Philippines%20Santa%20Maria%20Bulacan%20Campus/1885111238474730"
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <IconButton>
                <FacebookRounded />
              </IconButton>
            </Link>
            <Link
              href="https://twitter.com/ThePUPOfficial"
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <IconButton>
                <Twitter />
              </IconButton>
            </Link>
            <Link
              href="https://www.youtube.com/@PUPCreaTV"
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <IconButton>
                <YouTube />
              </IconButton>
            </Link>
            <Link
              href="https://www.pup.edu.ph/"
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <IconButton>
                <Language />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Footer;
