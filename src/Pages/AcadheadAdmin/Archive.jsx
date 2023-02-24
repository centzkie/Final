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
import Sidebar from "../../Components/Acadhead/Sidebar";
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
        },
      },
    },
  },
});

const Archive = () => {
  const [userdata, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [tableMap, setTableMap] = useState(true);
  const userCollectionSummaryreport = collection(db, "acadSummaryreport");
  const [searchData, setSearchData] = useState([]);
  const [isDisable, setIsDisable] = useState(true);

  const checkPoint = async () => {
    let acadQueueCollection = collection(db, "acadArchieve");
    let q = query(acadQueueCollection, where("name", "==", search));
    let unsub = onSnapshot(q, (snapshot) =>
      setSearchData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };
  const tableQuerySearch = async () => {
    checkPoint();
    let j = 0;
    let q = query(collection(db, "acadArchieve"), where("name", "==", search));
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
    const docRef = doc(db, "acadArchieve", id);
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
    });
    const userDoc = doc(db, "acadArchieve", id);
    await deleteDoc(userDoc);
  };

  const deletePermanentSingleData = async (id) => {
    if (
      window.confirm("Are you sure want to permanent delete this transaction?")
    ) {
      const userDoc = doc(db, "acadArchieve", id);
      await deleteDoc(userDoc);
    }
  };

  const deleteAllPermanentData = async () => {
    if (window.confirm("Are you sure you want to permanent delete all")) {
      userdata.map(
        async (queue) => await deleteDoc(doc(db, "acadArchieve", queue.id))
      );
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("Password") !== "admin" &&
      localStorage.getItem("Username") !== "adminacad"
    ) {
      navigate("/admin");
    }
  });

  useEffect(() => {
    tableQueryArchive();
  }, []);

  const tableQueryArchive = async () => {
    const acadArchiveCollection = collection(db, "acadArchieve");
    const q = query(acadArchiveCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
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
                Archives
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
            label="Name"
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            color="pupMaroon"
            placeholder="Juan dela Cruz"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={tableQuerySearch}>
                    <SearchOutlined />
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
        </Box>
        <Box px={5} py={2} mb={5}>
          <TableContainer
            component={Paper}
            sx={{
              height: "425px",
              margin: "auto",
              "&::-webkit-scrollbar": {
                width: "2px",
              },
            }}
          >
            <Table sx={{ tableLayout: "auto", height: "maxContent" }}>
              <ThemeProvider theme={styleTableHead}>
                <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <TableRow>
                    <TableCell>Restore</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Ticket</TableCell>
                    <TableCell>Transaction</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Student Number</TableCell>
                    <TableCell>Email</TableCell>
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
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                deleteSingleData(queue.id);
                              }}
                              sx={{ color: "#00FF00" }}
                            >
                              <Restore />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                deletePermanentSingleData(queue.id);
                              }}
                              sx={{ color: "#FF0000" }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                          <TableCell>{queue.status}</TableCell>
                          <TableCell>{queue.date}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {queue.ticket}
                          </TableCell>
                          <Tooltip title={queue.transaction} arrow>
                            <TableCell>{queue.transaction}</TableCell>
                          </Tooltip>
                          <TableCell>{queue.name}</TableCell>
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
                          <TableCell>
                            <IconButton
                              onClick={tableQuerySearch}
                              sx={{ color: "#00FF00" }}
                            >
                              <Restore />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                deletePermanentSingleData(queue.id);
                              }}
                              sx={{ color: "#FF0000" }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                          <TableCell>{queue.status}</TableCell>
                          <TableCell>{queue.date}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {queue.ticket}
                          </TableCell>
                          <Tooltip title={queue.transaction} arrow>
                            <TableCell>{queue.transaction}</TableCell>
                          </Tooltip>
                          <TableCell>{queue.name}</TableCell>
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
