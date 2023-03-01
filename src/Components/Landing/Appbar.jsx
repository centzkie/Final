import * as React from "react";
import Theme from "../../CustomTheme";
import Logo from "../../Img/seal.png";
import {
  ThemeProvider,
  Typography,
  Toolbar,
  AppBar,
  useScrollTrigger,
  Slide,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Appbar(props) {
  const navigate = useNavigate();
  const landing = () => {
    navigate("/");
  };
  const admin = () => {
    navigate("/admin");
  };
  return (
    <>
      <ThemeProvider theme={Theme}>
        <HideOnScroll {...props}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar color="pupMaroon">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <motion.img
                      onClick={landing}
                      src={Logo}
                      alt="pup"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 15 }}
                      height="50px"
                      width="50px"
                    />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    PUPSMB E-WAIT
                  </Typography>
                  <Button
                    color="inherit"
                    onClick={admin}
                    sx={{
                      display: {
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      },
                    }}
                  >
                    <AdminPanelSettings />
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>
        </HideOnScroll>
        <Toolbar />
      </ThemeProvider>
    </>
  );
}

export default Appbar;
