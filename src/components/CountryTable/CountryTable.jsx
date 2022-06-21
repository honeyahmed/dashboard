import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import axios from "axios";
import TableHeader from "../TableHeader/TableHeader";
import Modal from '../AddNewCountryModal/Modal';
import './CountryTable.css'

export default function CountryTable() {
  const [countries, setCountries] = useState([]);
  let authToken=localStorage.getItem("userToken");
  const getCountries = async () => {
    let { data } = await axios.get(
     'https://dashboard.kunozworld.com/api/dashboard/country',
      {
        headers: {
          'Authorization':`Bearer ${authToken}`,
          'Content-Type':'multipart/form-data',
        },
        responseType : 'json'
      }
    );
    setCountries(data.data);
  };

  useEffect(() => {
    getCountries();
  }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  return (
    <div className="">
      <Modal getCountries={getCountries} countries={countries}/>
      <Paper
        sx={{
          width: 1,
          overflow: "hidden",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <TableContainer
          sx={{ maxHeight: 700, minWidth: 800 }}
          className="tableDesign"
        >
          <Table
            stickyHeader
            aria-label="sticky table "
            sx={{ width: 1, margin: "auto" }}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "600" }}>#</TableCell>

                <TableCell
                  style={{ fontWeight: "700", color: "rgba(255, 73, 73, 1)" }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{ fontWeight: "700", color: "rgba(255, 73, 73, 1)" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "700", color: "rgba(255, 73, 73, 1)" }}
                  align="center"
                >
                  Image
                </TableCell>
                <TableCell
                  style={{ fontWeight: "700", color: "rgba(255, 73, 73, 1)" }}
                  align="center"
                >
                  Code
                </TableCell>
                <TableCell
                  style={{ fontWeight: "700", color: "rgba(255, 73, 73, 1)" }}
                  align="center"
                >
                  Language
                </TableCell>
                <TableCell
                  style={{ fontWeight: "700", color: "rgba(255, 73, 73, 1)" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "red",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="smallBg">{index + 1}</div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">

                        <img src={row.image} className='flag'/>
                      </TableCell>

                      <TableCell align="center">{row.code}</TableCell>
                      <TableCell align="center">{row.language}</TableCell>

                      
                      <TableCell align="center">
                        <DeleteIcon className="delIcon me-1" />
                        <VisibilityIcon className="viewIcon me-1" />
                        <EditIcon className="editIcon "/>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ textAlign: "center" }}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={countries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
