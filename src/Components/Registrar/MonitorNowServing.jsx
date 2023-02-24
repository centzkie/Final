import { React, useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

const MonitorNowServing = () => {
  const [userData, setUserData] = useState([]);
  const currentPage = 1;
  const postPerPage = 1;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = userData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    tableQueryNowserving();
  }, []);

  // QueueLinetable Query
  const tableQueryNowserving = async () => {
    const acadQueueCollection = collection(db, "regNowserving");
    const q = query(acadQueueCollection, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  };
  return (
    <div>
      <Box
        component={Paper}
        sx={{
          padding: "15px 40px",
          backgroundColor: "#880000",
          color: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <Typography fontSize="2.5rem" fontWeight="bolder">
          Now Serving:
        </Typography>
        {currentPost.map((queue, index) => (
          <Typography
            fontSize="2.5rem"
            fontWeight="bold"
            textAlign="center"
            key={index}
          >
            {queue.ticket}
          </Typography>
        ))}
      </Box>
    </div>
  );
};

export default MonitorNowServing;
