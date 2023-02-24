import { React, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

const UserSkippedTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    tableQuerySkip();
  }, []);

  // QueueLinetable Query
  const tableQuerySkip = async () => {
    const acadQueueCollection = collection(db, "acadSkip");
    const q = query(acadQueueCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          height: "320px",
          margin: "auto",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
        }}
      >
        <Table sx={{ tableLayout: "auto", height: "maxContent" }}>
          <TableHead sx={{ position: "sticky", top: 0 }}>
            <TableRow sx={{ bgcolor: "#880000" }}>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold", color: "wheat" }}>
                  Skipped
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((queue, index) => (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  {queue.ticket}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserSkippedTable;
