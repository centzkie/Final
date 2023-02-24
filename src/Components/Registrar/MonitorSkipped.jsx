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

const MonitorSkipped = () => {
  const [userData, setUserData] = useState([]);
  const currentPage = 1;
  const postPerPage = 5;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    tableQueryQueue();
  }, []);

  // QueueLinetable Query
  const tableQueryQueue = async () => {
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
        sx={{ margin: "auto", minHeight: "55vh", maxHeight: "55vh" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#880000" }}>
              <TableCell align="center">
                <Typography
                  sx={{ fontWeight: "bold", color: "wheat", fontSize: "2rem" }}
                >
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
                  sx={{
                    fontWeight: "bold",
                    border: "none",
                    fontSize: "1.5rem",
                  }}
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

export default MonitorSkipped;
