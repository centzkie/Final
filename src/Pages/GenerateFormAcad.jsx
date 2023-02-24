import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Form from "../Components/Acadhead/Form";
import Appbar from "../Components/Landing/Appbar";
import Requirements from "../Components/Acadhead/Requirements";
import Footer from "../Components/Landing/Footer";
const GenerateFormAcad = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Appbar />
          <Form />
          <Requirements />
          <Divider>
            <Typography color="#939393" textAlign="center">
              © Group-7
            </Typography>
          </Divider>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default GenerateFormAcad;
