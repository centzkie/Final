import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Requirements = () => {
  return (
    <>
      <Box
        sx={{
          px: { lg: 48, md: 20, sx: 0 },
          py: { lg: 5, md: 20, sx: 0 },
        }}
      >
        <Typography
          textAlign="center"
          py={3}
          sx={{
            fontSize: { lg: "1.2rem", md: "1rem", sm: "1rem" },
            fontWeight: "bold",
          }}
        >
          Requirements Per Transaction
        </Typography>
        <Box px={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Processing of Application for Overload of Subjects{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>
                    Request Letter for Overload (Complete justification of the
                    need for overload, subjects to overload)
                  </li>
                  <li>SIS Generated Curriculum Profile</li>
                  <li>
                    Fully-accomplished Request for Overload Form (For
                    College/Branch/Campus)
                  </li>
                  <li>
                    Fully-accomplished ACE form (Adding of Subject){" "}
                    <Link
                      href="https://drive.google.com/file/d/16ZETU6Dnl6Nk0krqCJnVEJJO6Lcta1tV/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      {" "}
                      link
                    </Link>
                  </li>
                  <li>Certificate of Registration for the current semester</li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Application for Change of Enrollment (Adding of
                Subject)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>
                    Accomplished and printed copy of ACE Form downloadable from
                    Santa maria Acad head gdrive
                    <Link
                      href="https://drive.google.com/file/d/16ZETU6Dnl6Nk0krqCJnVEJJO6Lcta1tV/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      {" "}
                      link
                    </Link>
                  </li>
                  <li>Certificate of Registration for the current semester</li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Application for Change of Enrollment (Change of
                Schedule/Subject)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>
                    Accomplished and printed copy of ACE Form downloadable from
                    Santa maria Acad head gdrive
                    <Link
                      href="https://drive.google.com/file/d/1olcNE-3GzvWbwIX5Kjkxhy3kOMs9eZiD/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      {" "}
                      link
                    </Link>
                  </li>
                  <li>Certificate of Registration for the current semester</li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Application for Correction of Grade Entry, Late
                Reporting of Grades and Removal of Incomplete Mark
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>Removal of Incomplete Mark</li>
                  <li>
                    Completion Form (3 original copies){" "}
                    <Link
                      href="https://drive.google.com/file/d/1OaO1TpNH5kiAz3B_7HW5pPRZtpwxCXsr/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      link
                    </Link>
                  </li>
                  <li>Copy of Class Record</li>
                  <li>
                    Notarized affidavit for change of grade of professor (for
                    correction of entry/late reporting of grade)
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Application for Cross-Enrollment
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>Application Letter for Cross-Enrollment</li>
                  <li>Permit to cross-enroll</li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Application for accreditation of subjects
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>Certified Copy of Grades</li>
                  <li>
                    Fully-accomplished Shifting Form downloadable from Santa
                    maria Acad head gdrive
                    <Link
                      href="https://drive.google.com/file/d/12ankQjYelnoYVYvVwAyB4WcxZYZ1meFU/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      {" "}
                      link
                    </Link>
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Processing of Manual Enrollment</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>
                    Accomplished and printed copy of the R0 Form downloadable
                    from
                    <Link
                      href="https://docs.google.com/document/d/1_Pw6kPgz1DytPBd1aW0oO6zo2t3bG-OB/edit?usp=sharing&ouid=104657717816851735043&rtpof=true&sd=true"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      Link
                    </Link>
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Processing of Online Petition of Subject</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>
                    Online petition of subject{" "}
                    <Link
                      href="https://apps.pup.edu.ph/sisstudent/Login"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      Link
                    </Link>
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Online Request for Tutorial of Subject
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>
                    Online petition of subject{" "}
                    <Link
                      href="https://apps.pup.edu.ph/sisstudent/Login"
                      target="_blank"
                      rel="noreferrer"
                      underline="none"
                    >
                      Link
                    </Link>
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Processing of Request for Certification (Grades, Bonafide
                Student, General Weighted Average)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ol style={{ padding: "5px 30px" }}>
                  <li>Accomplished request form</li>
                  <li>Identification Card (ID)</li>
                  <li>
                    When representative: Authorization letter and Identification
                    card (ID) if claimant is not the owner of the document
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default Requirements;
