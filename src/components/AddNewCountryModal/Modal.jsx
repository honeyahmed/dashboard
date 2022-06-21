import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TableHeader from "../TableHeader/TableHeader";
import axios from "axios";
import joi from 'joi';

import "./Modal.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ getCountries,countries }) {
  const title = "Country";
  const desc = "Add New Country";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("");
  const [language, setLang] = useState("");
  let authToken=localStorage.getItem("userToken");
  const [newCountry, setNewCountry] = useState({
    name: "",
    image: "",
    code: "",
    language: "",
  });
  const handleFormChange = (event) => {
    event.preventDefault();
    const enteredName = event.target.getAttribute("name");
    const enteredValue = event.target.value;
    const newFormData = { ...newCountry };
    newFormData[enteredName] = enteredValue;
    setNewCountry(newFormData);
  };

  const handleFormSubmit =async (event) => {
    event.preventDefault();
    const addedCountry = {
      name: newCountry.name,
      code: newCountry.code,
      image: newCountry.image,
      language: newCountry.language,
    };
console.log(addedCountry)
        let  {data}  = await axios.post(
            `https://dashboard.kunozworld.com/api/dashboard/country`,
            addedCountry,  {
                headers: {
                  'Authorization':`Bearer ${authToken}`,
                  'Content-Type':'multipart/form-data',
                },
                responseType : 'json'
              }
          );
    
          if (data.message === "Successful") {
            setOpen(false);
            getCountries();
            setName('');
            setCode('');
            setImage('');
            setLang('');
    
          }
          else{
            console.log('error')
          }
    


  };

  return (
    <div>
      <TableHeader title={title} desc={desc} handleOpen={handleOpen} />
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="position-relative">
       
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center fw-bold mb-2"
          >
            Add New Country
          </Typography>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                handleFormChange(e);
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              className="form-control"
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => {
                handleFormChange(e);
                setCode(e.target.value);
              }}
            />
          </div>

          <label htmlFor="name" className="form-label">
            Languages
          </label>
          <div className="input-group mb-3">
            <select
              className="form-select"
              id="inputGroupSelect02"
              name="language"
              value={language}
              onChange={(e) => {
                handleFormChange(e);
                setLang(e.target.value);
                console.log(e.target.value)
              }}
            >
              <option defaultValue>Choose...</option>
              <option value="ar">ar</option>
              <option value="en">en</option>
            </select>
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Options
            </label>
          </div>

          <div className="mb-2">
            <label htmlFor="formFile" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              value={image}
              onChange={(e) => {
                handleFormChange(e);
                setImage(e.target.value);
              }}
            />
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              type="button"
              className="btn btn-light addBtn"
              onClick={handleFormSubmit}
            >
              Add
            </button>
          </div>
          <div className="closeBtn">
            <CloseIcon className="closeIcon" onClick={handleClose}/>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
