import { React, useState, useEffect, useRef } from "react";
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
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { SearchOutlined, Delete } from "@mui/icons-material";
import img from "../../Img/seal.png";
import Sidebar from "../../Components/Acadhead/Sidebar";
import Theme from "../../CustomTheme";
import { db } from "../../firebase-config";
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
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { useReactToPrint } from "react-to-print";
import { transactionsAcad } from "../../Components/Selectfunctions";

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

const Report = () => {
  let [transaction, setTransaction] = useState(0);
  const [qlUserData, setQluserData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [tableMap, setTableMap] = useState(true);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [checked, setChecked] = useState(true);
  const [sortTransaction, setSortTransaction] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [sort, setSort] = useState("");
  const current = new Date();
  const [date, setDate] = useState(`${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}-${current.toLocaleTimeString("en-US")}`
  );
  let day = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  let month =(current.getMonth() + 1) + "/" + current.getFullYear();
  let year = current.getFullYear();

  const userCollectionArchieve = collection(db, "acadArchieve");
  const navigate = useNavigate();
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Summary Report PDF",
  });

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
    
    const intervalId = setInterval(checkTime, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    tableQueryHistory();
  }, []);

  const tableQueryHistory = async () => {
    const acadQueueCollection = collection(db, "acadSummaryreport");
    const q = query(acadQueueCollection, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setQluserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };
 
  const handleChangeSort = async (e) => {
    let unsub;
    setTableMap(true)
    setSort(e.target.value)
    setSearch("");

    return unsub;
  };
  const tableQuerySearch = async () => {
    let acadQueueCollection = collection(db, "acadSummaryreport");
    let q = query(acadQueueCollection, where(sort, "==", search));
    let unsub = onSnapshot(q, (snapshot) =>
      setSearchData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    
    let j = 0;
    q = query(
      collection(db, "acadSummaryreport"),
      where(sort, "==", search)
    );
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      j++;
    });
    if (search.length === 0) {
      alert("Please input data");
      setTableMap(true);
    } else {
      if (j === 0) {
        alert(sort + " not found");
        setTableMap(true);
      } else {
        setTableMap(false);
      }
    }
    return unsub;
  };

  const viewAll = () => {
    setTableMap(true);
    tableQueryHistory();
    setSort("");
    setSearch("");
    setSearchDate("");
  };
  const deleteSingleData = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const docRef = doc(db, "acadSummaryreport", id);
      const snapshot = await getDoc(docRef);
      await addDoc(userCollectionArchieve, {
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
        counter: snapshot.data().counter,
        day: snapshot.data().day,
        month: snapshot.data().month,
        year: snapshot.data().year
      });

      const userDoc = doc(db, "acadSummaryreport", id);
      await deleteDoc(userDoc);
    }
  };

  const deleteAll = () => {
    if (qlUserData.length > 0) {
      if (window.confirm("Are you sure you want to delete ?")) {
        moveAllData();
      }
    } else {
      alert("Delete failed: No data filtered");
    }
  };

  const moveAllData = async () => {
    let docRef = doc(db, "acadSummaryreport", "ddwd");
    let snapshot = await getDoc(docRef);

    if (searchData.length === 0) {
      qlUserData.map(
        async (queue) => (
          (docRef = doc(db, "acadSummaryreport", queue.id)),
          (snapshot = await getDoc(docRef)),
          await addDoc(userCollectionArchieve, {
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
            counter: snapshot.data().counter,
            day: snapshot.data().day,
            month: snapshot.data().month,
            year: snapshot.data().year
          }),
          await deleteDoc(doc(db, "acadSummaryreport", queue.id))
        )
      );
    } else {
      searchData.map(
        async (queue) => (
          (docRef = doc(db, "acadSummaryreport", queue.id)),
          (snapshot = await getDoc(docRef)),
          await addDoc(userCollectionArchieve, {
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
            counter: snapshot.data().counter,
            day: snapshot.data().day,
            month: snapshot.data().month,
            year: snapshot.data().year
          }),
          await deleteDoc(doc(db, "acadSummaryreport", queue.id))
        )
      );
    }
  };

  const handleChangeTransaction = (e) => {
    setSortTransaction(e.target.value);
  };
  const handleChangeDate = (e) => {
    let filter = e.target.value;
    let document = "";
    setSearchData(qlUserData);
    setSearchDate(e.target.value);
    if(filter === day){
      document="day";
    }
    else if(filter === month){
      document="month";
    }
    else if(filter === year){
      document="year";
    }
    let acadQueueCollection = collection(db, "acadSummaryreport");
    let q = query(acadQueueCollection, where(document, "==", filter));
    let unsub = onSnapshot(q, (snapshot) =>
      setSearchData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    setTableMap(false);

    return unsub;
  };
  const handleChangeStatus = (e) => {
    let filter = e.target.value;
    setSearchData(qlUserData);
    setSearch(e.target.value);
    if(sort==="date"){
      if(filter === "day"){
      setSearch(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);
      }
      else if(sort === "month"){
        setSearch((current.getMonth() + 1) + "/" + current.getFullYear());
      }
      else if(sort === "year"){
        setSearch(current.getFullYear());
      }
    }
    let acadQueueCollection = collection(db, "acadSummaryreport");
    let q = query(acadQueueCollection, where(sort, "==", filter));
    let unsub = onSnapshot(q, (snapshot) =>
      setSearchData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    setTableMap(false);

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
                Summary Report
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        
        <Box
          py={5}
          mt={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {sort === "" && (
            <>
              <TextField
                disabled
                type="text"
                id="name"
                placeholder="-Select filter data first-"
                value={search}
                color="pupMaroon"
                sx={{
                  width: {
                    xs: "100%",
                    md: "100%",
                    lg: "95%",
                  },
                  bgcolor: "white",
                }}
              />
            </>
          )}
          {sort === "name" && (
            <>
              <TextField
                type="text"
                id="name"
                label="Search Name"
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
            </>
          )}
          {sort === "date" && (
            <>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "100%",
                    lg: "95%",
                  },
                  bgcolor: "white",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel color="pupMaroon">Filter by date</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchDate}
                    label="SortByDate"
                    color="pupMaroon"
                    onChange={handleChangeDate}
                  >
                    <MenuItem value={day}>This Day</MenuItem>
                    <MenuItem value={month}>This Month</MenuItem>
                    <MenuItem value={year}>This Year</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          {sort === "email" && (
            <>
              <TextField
                type="email"
                id="email"
                label="Search email"
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
            </>
          )}
          {sort === "contact" && (
            <>
              <TextField
                type="tel"
                id="contact"
                label="Search Contact"
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
            </>
          )}
          {sort === "studentNumber" && (
            <>
              <TextField
                type="text"
                id="studentNumber"
                label="Search Student Number"
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
            </>
          )}
          {sort === "status" && (
            <>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "100%",
                    lg: "95%",
                  },
                  bgcolor: "white",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel color="pupMaroon">Filter by Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search}
                    label="SortByStatus"
                    color="pupMaroon"
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="Complete">Complete</MenuItem>
                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          {sort === "counter" && (
            <>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "100%",
                    lg: "95%",
                  },
                  bgcolor: "white",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel color="pupMaroon">Filter Transacted By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search}
                    label="SortByCounter"
                    color="pupMaroon"
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="Katherine Khay Castro">Counter 1</MenuItem>
                    <MenuItem value="Ambeth Casimiro">Counter 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
           
          </Box>
        <Box mx={5} sx={{ display: "flex", justifyContent: "end" }}>
          <Stack spacing={1.5} direction="row">
            <Box sx={{ minWidth: 180, bgcolor: "white" }}>
              <FormControl fullWidth>
                <InputLabel color="pupMaroon">Filter by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="SortBy"
                  color="pupMaroon"
                  onChange={handleChangeSort}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="contact">Contact</MenuItem>
                  <MenuItem value="studentNumber">Student Number</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                  <MenuItem value="counter">Transacted By</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              disable={isDisable}
              onClick={deleteAll}
              variant="outlined"
              color="pupMaroon"
            >
              Delete All
            </Button>
            <Button onClick={viewAll} variant="outlined" color="pupMaroon">
              View All  
            </Button>
            <Button variant="outlined" color="pupMaroon" onClick={handlePrint}>
              Print
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
            <Table
              sx={{ tableLayout: "auto", height: "maxContent" }}
              ref={printRef}
            >
              <ThemeProvider theme={styleTableHead}>
                <TableHead sx={{ position: "sticky", top: 0, zIndex: "10" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        position: "sticky",
                        left: 0,
                        zIndex: "1",
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
                      {qlUserData.map((queue, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              position: "sticky",
                              left: 0,
                              zIndex: "1",
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <IconButton>
                              <Delete
                                onClick={() => {
                                  deleteSingleData(queue.id);
                                }}
                                color="red"
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell>{queue.status}</TableCell>
                          <TableCell>{queue.name}</TableCell>
                          <TableCell>{queue.date}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {queue.ticket}
                          </TableCell>
                          <Tooltip title={queue.transaction} arrow>
                            <TableCell
                              sx={{
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {queue.transaction}
                            </TableCell>
                          </Tooltip>{" "}
                          <TableCell>{queue.studentNumber}</TableCell>
                          <TableCell>{queue.email}</TableCell>
                          <TableCell>{queue.counter}</TableCell>
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
                            <IconButton>
                              <Delete
                                onClick={() => {
                                  deleteSingleData(queue.id);
                                }}
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell>{queue.status}</TableCell>
                          <TableCell>{queue.name}</TableCell>
                          <TableCell>{queue.date}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {queue.ticket}
                          </TableCell>
                          <Tooltip title={queue.transaction} arrow>
                            <TableCell
                              sx={{
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {queue.transaction}
                            </TableCell>
                          </Tooltip>
                          <TableCell>{queue.studentNumber}</TableCell>
                          <TableCell>{queue.email}</TableCell>
                          <TableCell>{queue.counter}</TableCell>
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

export default Report;