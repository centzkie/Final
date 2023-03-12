import React, { useEffect, useState } from "react";
import Logo from "../../Img/seal.png";
import {
  ThemeProvider,
  Box,
  CardActions,
  Grid,
  Typography,
  CardMedia,
  Button,
  CardContent,
  Card,
} from "@mui/material";
import { AddToQueue, PersonSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import Theme from "../../CustomTheme";
import { db } from "../../firebase-config";
import {doc, deleteDoc, collection, onSnapshot, getCountFromServer } from "firebase/firestore";

const Cards = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  //const timezone = "Asia/Manila";
  const [userData, setUserData] = useState([]);
  const [userData1, setUserData1] = useState([]);


  // to disable time in specific time only
  useEffect(() => {
    const checkTime = async() => {
      let currentTime = moment();
      let startTime = moment("08:00", "HH:mm");
      let endTime = moment("10:17", "HH:mm");
      tableQueryTicket();
      tableQueryTicket1();
      if (currentTime.isBetween(startTime, endTime)) {
        setIsDisabled(false);
        sessionStorage.setItem("Auth", true);
      } else {
        setIsDisabled(true);
        sessionStorage.setItem("Auth", true);
        let docRef = doc(db, "acadTicket", "l");
        userData.map(async (queue) => ((docRef = doc(db, "acadTicket", queue.id)),
            await deleteDoc(doc(db, "acadTicket", queue.id))
        ));
        let docRef1 = doc(db, "regTicket", "l");
        userData1.map(async (queue) => ((docRef1 = doc(db, "regTicket", queue.id)),
            await deleteDoc(doc(db, "regTicket", queue.id))
        ));
      }
      
    };
    
    const intervalId = setInterval(checkTime, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const tableQueryTicket = async () => {
    const acadQueueCollection = collection(db, "acadTicket");
    const unsub = onSnapshot(acadQueueCollection, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };
  const tableQueryTicket1 = async () => {
    const acadQueueCollection = collection(db, "regTicket");
    const unsub = onSnapshot(acadQueueCollection, (snapshot) =>
      setUserData1(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };

  // navigations
  const navigate = useNavigate();
  const generateAcad = () => {
    navigate("/generateform-acad");
  };
  const generateReg = () => {
    navigate("/generateform-reg");
  };
  const transactionReg = () => {
    navigate("/transaction-reg");
  };
  const transactionAcad = () => {
    navigate("/transaction-acad");
  };

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Box p={4}>
          <Grid
            container
            spacing={{ lg: 8, md: 4, sm: 2, xs: 2 }}
            justifyContent="center"
          >
            <Grid item>
              <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={Logo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Academic Head Office
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Academic Head Office is a type of office for academic
                    related transactions, such as Change section, Overload,
                    Adding subjects. Assesed by Dr. khaye Castro. Office Hours
                    8:00 AM - 5:00PM
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="pupMaroon"
                    variant="contained"
                    endIcon={<AddToQueue />}
                    onClick={generateAcad}
                    disabled={isDisabled}
                    component={motion.div}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Get Inline
                  </Button>
                  <Button
                    size="small"
                    color="pupMaroon"
                    variant="outlined"
                    onClick={transactionAcad}
                    disabled={isDisabled}
                    endIcon={<PersonSearch />}
                    component={motion.div}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Transaction
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={Logo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Registrar Office
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registrar Office is a type of office for Non academic
                    related transactions, such as Diploma, Payments, ID Etc..
                    Assesed by Mr Gregorio Reyes. Office Hours 8:00 AM - 5:00PM
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="pupMaroon"
                    variant="contained"
                    onClick={generateReg}
                    disabled={isDisabled}
                    endIcon={<AddToQueue />}
                    component={motion.div}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Get Inline
                  </Button>
                  <Button
                    size="small"
                    color="pupMaroon"
                    variant="outlined"
                    onClick={transactionReg}
                    disabled={isDisabled}
                    endIcon={<PersonSearch />}
                    component={motion.div}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Transaction
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Cards;
