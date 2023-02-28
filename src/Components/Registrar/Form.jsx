import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  TextField,
  Typography,
  Box,
  Card,
  Stack,
  Button,
  Link,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormControlLabel,
  Radio,
  FormLabel,
  Checkbox,
  RadioGroup,
} from "@mui/material";
import {
  School,
  Badge,
  AlternateEmail,
  ChevronRight,
  HighlightOff,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Theme from "../../CustomTheme";
import moment from "moment-timezone";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  timestamp,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { sm, yrSections, yrSN, transactionsReg } from "../Selectfunctions";

// Function for generate random number
function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Form = () => {
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [snYear, setSnYear] = useState("");
  const [branch, setBranch] = useState("");
  const [yearSection, setYearSection] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();
  const userCollection1 = collection(db, "regQueuing");
  const userCollection2 = collection(db, "regPriority");
  let fullStudentNumber = snYear + "-" + studentNumber + "-" + branch;

  const timezone = "Asia/Manila";

  // to disable time in specific time only
  useEffect(() => {
    const checkTime = () => {
      let currentTime = moment().tz(timezone);
      let startTime = moment.tz("08:00", "HH:mm a", timezone);
      let endTime = moment.tz("20:00", "HH:mm a", timezone);

      if (currentTime.isBetween(startTime, endTime)) {
        sessionStorage.setItem("Auth", "true");
      } else {
        sessionStorage.setItem("Auth", "false");
      }
    };
    const intervalId = setInterval(checkTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("Auth") === "false") {
      //navigate("/");
    }
  });

  const landing = () => {
    navigate("/");
  };
  const generateSuccess = () => {
    navigate("/generate-reg");
  };

  // Dropdown textbox handle
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTransaction(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Function only numbers can accept
  const numOnlySN = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setStudentNumber(e.target.value);
    }
  };

  const numOnlyContact = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setContact(e.target.value);
    }
  };

  // Function only letters can accept
  const letterOnly = (e) => {
    //const onlyLetters = e.target.value.replace(/[^a-zA-Z-]/g, "");
    const onlyLetters = e.target.value;
    setName(onlyLetters.toUpperCase()); //To convert Upper Case);
  };

  // Function for clear selected fields
  const clearForm = () => {
    setStudentNumber("");
    setSnYear("");
    setBranch("");
    setAddress("");
    setContact("");
    setYearSection("");
    setEmail("");
  };

  const insert = async () => {
    let subemail = email;
    let subyearSection = yearSection;
    let subcontact = contact;
    let subaddress = address;
    if (email.length === 0) {
      subemail = "N/A";
    }
    if (studentNumber.length === 0) {
      fullStudentNumber = "N/A";
    }
    if (yearSection.length === 0) {
      subyearSection = "N/A";
    }
    if (contact.length === 0) {
      subcontact = "N/A";
    }
    if (address.length === 0) {
      subaddress = "N/A";
    }
    if (selectedForm === "Normal") {
      if (window.confirm("Are you sure you wish to add this transaction ?")) {
        await addDoc(userCollection1, {
          name: name,
          transaction: transaction,
          email: subemail,
          studentNumber: fullStudentNumber,
          address: subaddress,
          contact: subcontact,
          userType: selectedForm,
          yearSection: subyearSection,
          ticket: window.ticket,
          timestamp: serverTimestamp(),
        });
        generateSuccess();
      }
    } else {
      if (window.confirm("Are you sure you wish to add this transaction ?")) {
        await addDoc(userCollection2, {
          name: name,
          transaction: transaction,
          email: subemail,
          studentNumber: fullStudentNumber,
          address: subaddress,
          contact: subcontact,
          userType: selectedForm,
          yearSection: subyearSection,
          ticket: window.ticket,
          timestamp: serverTimestamp(),
        });
        generateSuccess();
      }
    }
  };

  // Function for inserting user between (priorty or regular)

  const checkExisting = async () => {
    let x = 0;
    let y = 0;

    //Check student number if exist
    if (selectedUser === "Student") {
      let checkStudentNumber = query(
        collection(db, "regQueuing"),
        where("studentNumber", "==", fullStudentNumber)
      );
      let querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "regNowserving"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "regSkip"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "regPriority"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "acadQueuing"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "acadNowserving"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "acadSkip"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });

      checkStudentNumber = query(
        collection(db, "acadPriority"),
        where("studentNumber", "==", fullStudentNumber)
      );
      querySnapshotNumber = await getDocs(checkStudentNumber);
      querySnapshotNumber.forEach(() => {
        x++;
      });
    } else {
      // Check contact if exist
      let checkContact = query(
        collection(db, "regQueuing"),
        where("contact", "==", contact)
      );
      let querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "regNowserving"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "regSkip"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "regPriority"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "acadQueuing"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "acadNowserving"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "acadSkip"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });

      checkContact = query(
        collection(db, "acadPriority"),
        where("contact", "==", contact)
      );
      querySnapshotContact = await getDocs(checkContact);
      querySnapshotContact.forEach(() => {
        y++;
      });
    }

    if (x > 0 && y === 0) {
      alert("Student Number is existing on Que Line");
    } else if (x === 0 && y > 0) {
      alert("Contact is existing on Que Line");
    } else if (x > 0 && y > 0) {
      alert("Contact and Stundent Number is existing on Que Line");
    } else {
      insert();
    }
  };

  // Validating for creating user
  const creatingUser = async () => {
    if (selectedForm === "Priority") {
      window.ticket = "P" + randomNumberInRange(99, 499);
    } else if (selectedForm === "Normal") {
      window.ticket = "N" + randomNumberInRange(99, 499);
    }

    let z = 0;
    // Check if Ticket exist on Acad Que Table
    let checkTicket = query(
      collection(db, "regQueuing"),
      where("ticket", "==", window.ticket)
    );
    let querySnapshotTicket = await getDocs(checkTicket);
    querySnapshotTicket.forEach(() => {
      z++;
    });

    // Check if Ticket exist on Acad Now Serving Table
    checkTicket = query(
      collection(db, "regNowserving"),
      where("ticket", "==", window.ticket)
    );
    querySnapshotTicket = await getDocs(checkTicket);
    querySnapshotTicket.forEach(() => {
      z++;
    });

    // Check if Ticket exist on Acad Skip Table
    checkTicket = query(
      collection(db, "regSkip"),
      where("ticket", "==", window.ticket)
    );
    querySnapshotTicket = await getDocs(checkTicket);
    querySnapshotTicket.forEach(() => {
      z++;
    });

    // Check if Ticket exist on Priority Table
    checkTicket = query(
      collection(db, "regPriority"),
      where("ticket", "==", window.ticket)
    );
    querySnapshotTicket = await getDocs(checkTicket);
    querySnapshotTicket.forEach(() => {
      z++;
    });

    // IF exist then random again until generate unique ticket id
    if (z > 0) {
      let ctr = 0;
      do {
        ctr = 0;
        if (selectedForm === "Priority") {
          window.ticket = "P" + randomNumberInRange(99, 499);
        } else if (selectedForm === "Normal") {
          window.ticket = "N" + randomNumberInRange(99, 499);
        }

        let getNum = query(
          collection(db, "regQueuing"),
          where("ticket", "==", window.ticket)
        );
        let querySnapshotNum = await getDocs(getNum);
        querySnapshotNum.forEach(() => {
          ctr++;
        });

        getNum = query(
          collection(db, "regNowserving"),
          where("ticket", "==", window.ticket)
        );
        querySnapshotNum = await getDocs(getNum);
        querySnapshotNum.forEach(() => {
          ctr++;
        });

        getNum = query(
          collection(db, "regSkip"),
          where("ticket", "==", window.ticket)
        );
        querySnapshotNum = await getDocs(getNum);
        querySnapshotNum.forEach(() => {
          ctr++;
        });

        getNum = query(
          collection(db, "regPriority"),
          where("ticket", "==", window.ticket)
        );
        querySnapshotNum = await getDocs(getNum);
        querySnapshotNum.forEach(() => {
          ctr++;
        });
      } while (ctr > 0);
    }
    // Chkeck if student number or email are exist/s in queline

    // form requied fields validation
    if (selectedUser === "Student") {
      if (
        name.length > 0 &&
        selectedForm.length > 0 &&
        transaction.length > 0 &&
        email.length > 0 &&
        studentNumber.length > 0 &&
        branch.length > 0
      ) {
        checkExisting();
      } else {
        alert("Please fill all the reqiured fields!");
      }
    } else if (selectedUser === "Guest/Parent/Alumni") {
      if (
        name.length > 0 &&
        selectedForm.length > 0 &&
        transaction.length > 0 &&
        contact.length > 0 &&
        branch.length > 0
      ) {
        checkExisting();
      } else {
        alert("Please fill all the reqiured fields!");
      }
    } else {
      alert("Please fill all the reqiured fields!");
    }
  };

  return (
    <>
      <Box
        sx={{
          px: { lg: 50, md: 20, sx: 0 },
          pt: { lg: 5, md: 20, sx: 0 },
        }}
      >
        <form className="acadForm">
          <ThemeProvider theme={Theme}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card>
                <Box>
                  <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    p={4}
                    mt={3}
                  >
                    <School />
                    Registrar QMS Form
                  </Typography>
                </Box>
                <Stack spacing={2} direction="column" p={3}>
                  <TextField
                    type="text"
                    id="outlined-textarea"
                    required
                    label="Name"
                    autoFocus
                    placeholder="Ex. Juan Dela Cruz"
                    value={name}
                    onChange={letterOnly} //set name
                    color="pupMaroon"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Badge />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ textTransform: "capitalized" }}
                  />

                  <FormControl fullWidth required>
                    <InputLabel
                      id="demo-multiple-name-label"
                      color="pupMaroon"
                      required
                    >
                      Transactions
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      color="pupMaroon"
                      multiple
                      value={transaction}
                      onChange={handleChange}
                      input={<OutlinedInput label="Transactions" />}
                      sx={{
                        whiteSpace: "no-wrap",
                        overFlow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: {
                          lg: "650px",
                          md: "640px",
                          sm: "560px",
                          xs: "355px",
                        },
                      }}
                    >
                      {transactionsReg.map((transaction) => (
                        <MenuItem
                          key={transaction}
                          value={transaction}
                          sx={{
                            maxWidth: { lg: "800px" },
                            whiteSpace: "pre-wrap",
                            paddingRight: "10px",
                          }}
                        >
                          {transaction}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {transaction[0] === "Others..." && (
                    <>
                      <TextField
                        id="outlined-textarea"
                        color="pupMaroon"
                        required
                        type="text"
                        placeholder="Please Specify..."
                        label="Others"
                      />
                    </>
                  )}
                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      color="pupMaroon"
                      required
                    >
                      Type of Transaction
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      color="pupMaroon"
                      value={selectedForm}
                      onChange={(event) => setSelectedForm(event.target.value)}
                    >
                      <FormControlLabel
                        value="Normal"
                        control={<Radio color="pupMaroon" />}
                        label="Normal"
                      />
                      <FormControlLabel
                        value="Priority"
                        control={<Radio color="pupMaroon" />}
                        label="PWD/Pregnant/Senior"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      color="pupMaroon"
                      required
                    >
                      Type of User
                    </FormLabel>
                    <RadioGroup
                      sx={{ lg: "row", xs: "column" }}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      color="pupMaroon"
                      value={selectedUser}
                      onChange={(event) => {
                        setSelectedUser(event.target.value);
                        clearForm();
                      }}
                    >
                      <FormControlLabel
                        value="Student"
                        control={<Radio color="pupMaroon" />}
                        label="Student"
                        color="pupMaroon"
                      />

                      <FormControlLabel
                        value="Guest/Parent/Alumni"
                        control={<Radio color="pupMaroon" />}
                        label="Guest/Parent/Alumni"
                      />
                    </RadioGroup>
                    {selectedUser === "Student" && (
                      <>
                        <Stack spacing={2} direction="column">
                          <Stack spacing={1.5} direction="row">
                            <FormControl
                              sx={{
                                minWidth: {
                                  lg: "200px",
                                  sx: "180px",
                                  xs: "100px",
                                },
                              }}
                            >
                              <InputLabel
                                id="demo-simple-select-label"
                                color="pupMaroon"
                              >
                                SN-Year
                              </InputLabel>
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={snYear}
                                label="SN-Year"
                                onChange={(e) => {
                                  setSnYear(e.target.value);
                                }}
                                color="pupMaroon"
                              >
                                {yrSN.map((yrSn) => (
                                  <MenuItem key={yrSn} value={yrSn}>
                                    {yrSn}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            <TextField
                              required
                              type="text"
                              id="outlined-textarea"
                              label="Student Number"
                              value={studentNumber}
                              onChange={numOnlySN}
                              placeholder="00215"
                              color="pupMaroon"
                              inputProps={{ maxLength: 5 }}
                            />
                            {/* <TextField
                              disabled
                              type="text"
                              id="outlined-textarea"
                              value="SM-0"
                            /> */}
                            <FormControl
                              sx={{
                                minWidth: {
                                  lg: "200px",
                                  sx: "180px",
                                  xs: "100px",
                                },
                              }}
                            >
                              <InputLabel
                                id="demo-simple-select-label"
                                color="pupMaroon"
                              >
                                Branch
                              </InputLabel>
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={branch}
                                label="Branch"
                                onChange={(e) => {
                                  setBranch(e.target.value);
                                }}
                                color="pupMaroon"
                              >
                                {sm.map((sm) => (
                                  <MenuItem key={sm} value={sm}>
                                    {sm}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Stack>

                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              color="pupMaroon"
                            >
                              Year & Section
                            </InputLabel>
                            <Select
                              required
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={yearSection}
                              label="Year & Section"
                              onChange={(e) => {
                                setYearSection(e.target.value);
                              }}
                              color="pupMaroon"
                            >
                              {yrSections.map((yrSec) => (
                                <MenuItem key={yrSec} value={yrSec}>
                                  {yrSec}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            type="email"
                            id="outlined-textarea"
                            required
                            label="Email"
                            value={email}
                            placeholder="Ex. JuanDelacruz@yahoo.com"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            color="pupMaroon"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <AlternateEmail />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Stack>
                      </>
                    )}

                    {selectedUser === "Guest/Parent/Alumni" && (
                      <>
                        <Stack spacing={2} direction="column">
                          <TextField
                            type="tel"
                            id="outlined-textarea"
                            required
                            label="Contact Number"
                            placeholder="Ex. 09997845244"
                            inputProps={{ maxLength: 11 }}
                            value={contact}
                            onChange={numOnlyContact}
                            color="pupMaroon"
                            maxlength="10"
                          />
                          <TextField
                            type="email"
                            id="outlined-textarea"
                            label="Email"
                            value={email}
                            placeholder="Ex. JuanDelacruz@yahoo.com"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            color="pupMaroon"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <AlternateEmail />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <TextField
                            type="text"
                            id="outlined-textarea"
                            label="Address"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            placeholder="Ex. Pulong Buhangin Sta. Maria Bulacan"
                            color="pupMaroon"
                          />
                        </Stack>
                      </>
                    )}
                  </FormControl>

                  <Box>
                    By using this service, you understood and agree to the PUP
                    Online Services{" "}
                    <Link
                      href="https://www.pup.edu.ph/terms/"
                      target="_blank"
                      rel="noreferrer"
                      variant="body2"
                    >
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="https://www.pup.edu.ph/privacy/"
                      target="_blank"
                      rel="noreferrer"
                      variant="body2"
                    >
                      Privacy Statement
                    </Link>
                  </Box>
                  <Box>
                    <Stack spacing={2} direction="row">
                      <Button
                        type="submit"
                        variant="contained"
                        color="pupMaroon"
                        onClick={creatingUser}
                        endIcon={<ChevronRight />}
                        component={motion.div}
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Submit
                      </Button>

                      <Button
                        type="button"
                        variant="outlined"
                        color="pupMaroon"
                        onClick={landing}
                        endIcon={<HighlightOff />}
                        component={motion.div}
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </ThemeProvider>
        </form>
      </Box>
    </>
  );
};
export default Form;
