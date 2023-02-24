import { React, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Paper,
} from "@mui/material";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

const UserSkippedTable = () => {
  const [userData, setUserData] = useState([]);
  const currentPage = 1;
  const postPerPage = 5;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    tableQuerySkip();
  }, []);

  // QueueLinetable Query
  const tableQuerySkip = async () => {
    const acadQueueCollection = collection(db, "regSkip");
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
            {currentPost.map((queue, index) => (
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
