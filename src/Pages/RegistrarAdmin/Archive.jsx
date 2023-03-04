import { React, useEffect, useState } from "react";
import {
  AppBar,
  ThemeProvider,
  Typography,
  Toolbar,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  createTheme,
  Tooltip,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Delete, Restore, Sync, SearchOutlined } from "@mui/icons-material";
import img from "../../Img/seal.png";
import Sidebar from "../../Components/Registrar/Sidebar";
import Theme from "../../CustomTheme";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Stack } from "@mui/system";

// table header syle
const styleTableHead = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#880000",
          color: "#ffffff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          textAlign: "center",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        },
      },
    },
  },
});

// table body style
const styleTableBody = createTheme({
  palette: {
    red: {
      main: "#ba000d",
      contrastText: "#ffffff",
    },
    yellow: {
      main: "#ffab00",
      contrastText: "#000000",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
          textAlign: "center",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
});

const Archive = () => {
  const [userdata, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [tableMap, setTableMap] = useState(true);
  const userCollectionSummaryreport = collection(db, "regSummaryreport");
  const [searchData, setSearchData] = useState([]);
  const [isDisable, setIsDisable] = useState(true);

  const checkPoint = async () => {
    let acadQueueCollection = collection(db, "regArchieve");
    let q = query(acadQueueCollection, where("name", "==", search));
    let unsub = onSnapshot(q, (snapshot) =>
      setSearchData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };
  const tableQuerySearch = async () => {
    checkPoint();
    let j = 0;
    let q = query(collection(db, "regArchieve"), where("name", "==", search));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      j++;
    });
    if (search.length === 0) {
      alert("Please fill required field");
    } else {
      if (j === 0) {
        setTableMap(true);
        alert("No data found");
      } else {
        setTableMap(false);
      }
    }
  };

  const viewAll = () => {
    setTableMap(true);
  };

  const deleteSingleData = async (id) => {
    if(window.confirm("Are you sure want to restore?")){
      const docRef = doc(db, "regArchieve", id);
    const snapshot = await getDoc(docRef);
    await addDoc(userCollectionSummaryreport, {
      status: snapshot.data().status,
      name: snapshot.data().name,
      transaction: snapshot.data().transaction,
      email: snapshot.data().email,
      studentNumber: snapshot.data().studentNumber,
      address: snapshot.data().address,
      contact: snapshot.data().contact,
      userType: snapshot.data().userType,
      yearSection: snapshot.data().yearSection,
      ticket: snapshot.data().ticket,
      timestamp: snapshot.data().timestamp,
      date: snapshot.data().date,
      day: snapshot.data().day,
      month: snapshot.data().month,
      year: snapshot.data().year
    });
    const userDoc = doc(db, "regArchieve", id);
    await deleteDoc(userDoc);
    }
  };

  const deletePermanentSingleData = async (id) => {
    if (
      window.confirm("Are you sure want to permanent delete this transaction?")
    ) {
      const userDoc = doc(db, "regArchieve", id);
      await deleteDoc(userDoc);
    }
  };

  const deleteAllPermanentData = async () => {
    if (window.confirm("Are you sure you want to permanent delete all")) {
      if (searchData.length === 0) {
        userdata.map(
          async (queue) => await deleteDoc(doc(db, "regArchieve", queue.id))
        );
      } else {
        searchData.map(
          async (queue) => await deleteDoc(doc(db, "regArchieve", queue.id))
        );
      }
    }
  };

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
    
    const intervalId = setInterval(checkTime, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    tableQueryArchive();
  }, []);

  const tableQueryArchive = async () => {
    const acadArchiveCollection = collection(db, "regArchieve");
    const q = query(acadArchiveCollection, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };
  const restoreAll = async () => {
    if(window.confirm("Are you sure you want to restore all?")){
      let docRef = doc(db, "regArchieve", "ddwd");
    let snapshot = await getDoc(docRef);

    if (searchData.length === 0) {
      userdata.map(
        async (queue) => (
          (docRef = doc(db, "regArchieve", queue.id)),
          (snapshot = await getDoc(docRef)),
          await addDoc(userCollectionSummaryreport, {
            status: snapshot.data().status,
            name: snapshot.data().name,
            transaction: snapshot.data().transaction,
            email: snapshot.data().email,
            studentNumber: snapshot.data().studentNumber,
            address: snapshot.data().address,
            contact: snapshot.data().contact,
            userType: snapshot.data().userType,
            yearSection: snapshot.data().yearSection,
            ticket: snapshot.data().ticket,
            timestamp: snapshot.data().timestamp,
            date: snapshot.data().date,
            day: snapshot.data().day,
            month: snapshot.data().month,
            year: snapshot.data().year
          }),
          await deleteDoc(doc(db, "regArchieve", queue.id))
        )
      );
    } else {
      searchData.map(
        async (queue) => (
          (docRef = doc(db, "regArchieve", queue.id)),
          (snapshot = await getDoc(docRef)),
          await addDoc(userCollectionSummaryreport, {
            status: snapshot.data().status,
            name: snapshot.data().name,
            transaction: snapshot.data().transaction,
            email: snapshot.data().email,
            studentNumber: snapshot.data().studentNumber,
            address: snapshot.data().address,
            contact: snapshot.data().contact,
            userType: snapshot.data().userType,
            yearSection: snapshot.data().yearSection,
            ticket: snapshot.data().ticket,
            timestamp: snapshot.data().timestamp,
            date: snapshot.data().date,
            day: snapshot.data().day,
            month: snapshot.data().month,
            year: snapshot.data().year
          }),
          await deleteDoc(doc(db, "regArchieve", queue.id))
        )
      );
    }
    }
  };

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
                Archive
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          py={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>

        <Box
          py={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            type="email"
            id="Username"
            label="Search"
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            color="pupMaroon"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      "&:hover": { backgroundColor: "#ffd700" },
                    }}
                  >
                    <SearchOutlined onClick={tableQuerySearch} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: {
                xs: "100%",
                md: "100%",
                lg: "95%",
              },
              bgcolor: "white",
            }}
          />
        </Box>
        <Box mx={5} sx={{ display: "flex", justifyContent: "end" }}>
          <Stack spacing={1.5} direction="row">
            <Button onClick={restoreAll} variant="outlined" color="pupMaroon">
              Restore All
            </Button>
            <Button
              onClick={deleteAllPermanentData}
              variant="outlined"
              color="pupMaroon"
            >
              Delete All
            </Button>
            <Button onClick={viewAll} variant="outlined" color="pupMaroon">
              View All
            </Button>
          </Stack>
        </Box>
        <Box px={5} py={2} mb={5}>
          <TableContainer
            component={Paper}
            sx={{
              height: "425px",
              margin: "auto",
            }}
          >
            <Table sx={{ tableLayout: "auto", height: "maxContent" }}>
              <ThemeProvider theme={styleTableHead}>
                <TableHead sx={{ position: "sticky", top: 0, zIndex: 10 }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        position: "sticky",
                        left: 0,
                        zIndex: 5,
                        backgroundColor: "#880000",
                      }}
                    >
                      Action
                    </TableCell>

                    <TableCell>Status</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Ticket</TableCell>
                    <TableCell>Transaction</TableCell>
                    <TableCell>Student Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Counter</TableCell>
                    <TableCell>Type of User</TableCell>
                    <TableCell>Year&Section</TableCell>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
              </ThemeProvider>
              {tableMap === true && (
                <>
                  <ThemeProvider theme={styleTableBody}>
                    {/* Table Body */}
                    <TableBody>
                      {userdata.map((queue, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              position: "sticky",
                              left: 0,
                              zIndex: 3,
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <Stack spacing={1.5} direction="row">
                              <Typography>
                                <Tooltip title="Restore">
                                  <IconButton
                                    onClick={() => {
                                      deleteSingleData(queue.id);
                                    }}
                                    sx={{ color: "#00FF00" }}
                                  >
                                    <Restore />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                              <Typography>
                                <Tooltip title="delete">
                                  <IconButton
                                    onClick={() => {
                                      deletePermanentSingleData(queue.id);
                                    }}
                                  >
                                    <Delete color="red" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{queue.status}</TableCell>
                          <TableCell>{queue.name}</TableCell>
                          <TableCell>{queue.date}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {queue.ticket}
                          </TableCell>
                          <Tooltip title={queue.transaction} arrow>
                            <TableCell>{queue.transaction}</TableCell>
                          </Tooltip>
                          <TableCell>{queue.studentNumber}</TableCell>
                          <TableCell>{queue.email}</TableCell>
                          <TableCell>{queue.userType}</TableCell>
                          <TableCell>{queue.yearSection}</TableCell>
                          <TableCell>{queue.contact}</TableCell>
                          <TableCell>{queue.address}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </ThemeProvider>
                </>
              )}
              {tableMap === false && (
                <>
                  <ThemeProvider theme={styleTableBody}>
                    {/* Table Body */}

                    <TableBody>
                      {searchData.map((queue, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              position: "sticky",
                              left: 0,
                              zIndex: 3,
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <Stack spacing={1.5} direction="row">
                              <Typography>
                                <Tooltip title="Restore">
                                  <IconButton
                                    onClick={() => {
                                      deleteSingleData(queue.id);
                                    }}
                                    sx={{ color: "#00FF00" }}
                                  >
                                    <Restore />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                              <Typography>
                                <Tooltip title="delete">
                                  <IconButton
                                    onClick={() => {
                                      deletePermanentSingleData(queue.id);
                                    }}
                                  >
                                    <Delete color="red" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{queue.status}</TableCell>
                          <TableCell>{queue.name}</TableCell>
                          <TableCell>{queue.date}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {queue.ticket}
                          </TableCell>
                          <Tooltip title={queue.transaction} arrow>
                            <TableCell>{queue.transaction}</TableCell>
                          </Tooltip>
                          <TableCell>{queue.studentNumber}</TableCell>
                          <TableCell>{queue.email}</TableCell>
                          <TableCell>{queue.userType}</TableCell>
                          <TableCell>{queue.yearSection}</TableCell>
                          <TableCell>{queue.contact}</TableCell>
                          <TableCell>{queue.address}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </ThemeProvider>
                </>
              )}
            </Table>
          </TableContainer>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Archive;