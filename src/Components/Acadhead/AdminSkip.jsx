import { React, useState, useEffect } from "react";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Stack,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  addDoc,
  getCountFromServer,
  where
} from "firebase/firestore";
import { db } from "../../firebase-config";

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
const AdminSkip = () => {
  const [userData, setUserData] = useState([]);
  const [qlCurrentPage, setQlCurrentPost] = useState(1);
  const userCollectionHistory = collection(db, "acadSummaryreport");
  const userCollectionNowserving = collection(db, "acadNowserving");
  const userCollectionSkip = collection(db, "acadSkip");

  const current = new Date();
  const [isDisable, setIsDisable] = useState(false);

  const QlPostPerPage = 5;
  let pages = [];

  const lastPostIndex = qlCurrentPage * QlPostPerPage;
  const firstPostIndex = lastPostIndex - QlPostPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  const [date, setDate] = useState(
    `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
  );

  useEffect(() => {
    tableQuerySkip();
  }, []);

  useEffect(() => {
    const checkTime = async () => {
      let check = 0;
      const coll = collection(db, "acadNowserving");
      const snapshot = await getCountFromServer(coll);
      check = snapshot.data().count;

      if (check >= 1) {
        setIsDisable(true);
      } else if (check < 1) {
        setIsDisable(false);
      }
    };
    const intervalId = setInterval(checkTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // QueueLinetable Query
  const tableQuerySkip = async () => {
    const q = query(userCollectionSkip, 
      where("admin", "==", localStorage.getItem("Username")), 
      orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  };

  const directDeleteUser = async (email) => {
    const userDoc = doc(db, "acadSkip", email);
    await deleteDoc(userDoc);
  };

  const moveUser = async (id) => {
    const docRef = doc(db, "acadSkip", id);
    const snapshot = await getDoc(docRef);
    await addDoc(userCollectionNowserving, {
      name: snapshot.data().name,
      transaction: snapshot.data().transaction,
      email: snapshot.data().email,
      studentNumber: snapshot.data().studentNumber,
      address: snapshot.data().address,
      contact: snapshot.data().contact,
      userType: snapshot.data().userType,
      yearSection: snapshot.data().yearSection,
      ticket: snapshot.data().ticket,
      timestamp: serverTimestamp(),
      admin: localStorage.getItem("Username")
    });
    directDeleteUser(id);
  };
  const moveUserToHistory = async (id) => {
    let admin = "";
    if(localStorage.getItem("Username")==="adminacad1"){
      admin = "Ms. Katherine Khay Castro";
    }
    else{
      admin = "Ambeth Casimiro";
    }
    const docRef = doc(db, "acadSkip", id);
    const snapshot = await getDoc(docRef);
    await addDoc(userCollectionHistory, {
      status: "Incomplete",
      name: snapshot.data().name,
      transaction: snapshot.data().transaction,
      email: snapshot.data().email,
      studentNumber: snapshot.data().studentNumber,
      address: snapshot.data().address,
      contact: snapshot.data().contact,
      userType: snapshot.data().userType,
      yearSection: snapshot.data().yearSection,
      ticket: snapshot.data().ticket,
      timestamp: serverTimestamp(),
      date: date,
      counter: admin
    });
    directDeleteUser(id);
  };

  const addUser = async (id) => {
    moveUser(id);
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          padding: "15px",
          fontSize: "1.2rem",
        }}
      >
        Skip
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          height: "343px",
          margin: "auto",
        }}
      >
        <Table sx={{ tableLayout: "auto", height: "maxContent" }}>
          <ThemeProvider theme={styleTableHead}>
            <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
              <TableRow>
                <TableCell
                  sx={{
                    position: "sticky",
                    left: "0",
                    zIndex: "5",
                    backgroundColor: "#880000",
                  }}
                >
                  Actions
                </TableCell>
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
          <ThemeProvider theme={styleTableBody}>
            {/* Table Body */}
            <TableBody>
              {currentPost.map((queue, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      minWidth: "300px",
                      position: "sticky",
                      left: "0",
                      zIndex: "5",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Stack spacing={1.5} direction="row">
                      <Stack>
                        <Button
                          disabled={isDisable}
                          variant="contained"
                          onClick={() => {
                            addUser(queue.id);
                          }}
                        >
                          Serve Now
                        </Button>
                      </Stack>
                      <Stack>
                        <Button
                          variant="contained"
                          color="red"
                          onClick={() => {
                            moveUserToHistory(queue.id);
                          }}
                        >
                          Incomplete
                        </Button>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {queue.ticket}
                  </TableCell>

                  <Tooltip title={queue.transaction} arrow>
                    <TableCell>{queue.transaction}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.name} arrow>
                    <TableCell>{queue.name}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.studentNumber} arrow>
                    <TableCell>{queue.studentNumber}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.email} arrow>
                    <TableCell>{queue.email}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.userType} arrow>
                    <TableCell>{queue.userType}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.yearSection} arrow>
                    <TableCell>{queue.yearSection}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.contact} arrow>
                    <TableCell>{queue.contact}</TableCell>
                  </Tooltip>
                  <Tooltip title={queue.address} arrow>
                    <TableCell>{queue.address}</TableCell>
                  </Tooltip>
                </TableRow>
              ))}
            </TableBody>
          </ThemeProvider>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminSkip;
