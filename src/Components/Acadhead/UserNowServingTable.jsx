import { React, useState, useEffect } from "react";
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

const UserNowServingTable = () => {
  const [userData, setUserData] = useState([]);
  const currentPage = 1;
  const postPerPage = 2;
  let pages = [];

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  for (let i = 1; i <= Math.ceil(userData.length / postPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    tableQueryNowserving();
  }, []);

  // QueueLinetable Query
  const tableQueryNowserving = async () => {
    const acadQueueCollection = collection(db, "acadNowserving");
    const q = query(acadQueueCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ minHeight: "160px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#880000" }}>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold", color: "wheat" }}>
                  Now Serving
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

export default UserNowServingTable;
