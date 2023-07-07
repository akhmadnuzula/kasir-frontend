import { Grid, IconButton, Stack, TableCell, TextField } from "@mui/material";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

function RowProduct({ data, onPressButton, onSaveButton }) {
  const row = data;
  const [input, setInput] = useState(row);
  const [harga, setHarga] = useState("");
  const [success, setSuccess] = useState(false);
  const handleDelete = () => {
    onPressButton();
  };
  const validate = () => {
    if (
      input.kodeBarang === "" ||
      input.namaBarang === "" ||
      input.harga === 0 ||
      input.quantity === 0 ||
      input.harga === "" ||
      input.quantity === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      alert("Form ada yang kosong");
      return false;
    }
    // sampai sini
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/produk/${input.kodeBarang}`,
        input
      )
      .then((result) => {
        console.log(result.data);
        // setRows(result.data);
        setSuccess(true);
        onSaveButton();
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <TableCell component="th" scope="row">
        {row.kodeBarang}
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={input.namaBarang}
          onChange={(e) => handleChange("namaBarang", e.target.value)}
        />
      </TableCell>
      <TableCell align="left">
        <CurrencyFormat
          customInput={TextField}
          thousandSeparator
          prefix="Rp."
          decimalScale={0}
          placeholder="Rp.10.000.000"
          label="Harga"
          size="small"
          type="numeric"
          value={input.harga}
          onValueChange={(values) => {
            const { formattedValue, value } = values;
            handleChange("harga", value);
            setHarga(value);
          }}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          size="small"
          type="number"
          value={input.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
      </TableCell>
      <TableCell align="right">
        <Grid sx={{ width: 70, display: "flex" }}>
          {success && (
            <IconButton color="info">
              <CheckIcon />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            onClick={() => {
              handleSubmit();
            }}
          >
            <SaveIcon color="success" />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => {
              handleDelete(row.kodeBarang);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Grid>
      </TableCell>
    </>
  );
}

export default RowProduct;
