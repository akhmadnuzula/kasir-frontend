import React, { useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Stack,
  Modal,
  Box,
  TableCell,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function InfoBarang({ dataProduk }) {
  const data = dataProduk;
  const [produk, setProduk] = useState(dataProduk);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");
  const handleFocus = (event) => event.target.select();

  const handleChange = (e) => {
    var value = e.target.value;
    setInput(value);
    if (value !== "") {
      let filter = data.filter((e) => e.kodeBarang === value);
      if (filter.length > 0) {
        setProduk(filter);
      } else {
        setProduk([]);
      }
    } else {
      setProduk(data);
    }
  };
  return (
    <Grid sx={{ alignItems: "center", display: "flex" }}>
      <IconButton
        color="inherit"
        sx={{ borderRadius: 2, mr: 2 }}
        color="success"
        onClick={() => {
          handleOpen();
          setProduk(data);
          setInput("");
        }}
      >
        <InfoIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              List Barang
            </Typography>
            <TextField
              id="outlined-basic"
              label="Kode Barang"
              variant="outlined"
              type="number"
              value={input}
              sx={{ minWidth: 200 }}
              onChange={(e) => {
                handleChange(e);
              }}
              onFocus={handleFocus}
            />
          </Grid>
          <TableContainer component={Paper} sx={{ maxHeight: 350, width: 720 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Barcode</TableCell>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produk.length > 0 ? (
                  produk.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.kodeBarang}</TableCell>
                      <TableCell>{item.namaBarang}</TableCell>
                      <TableCell>{item.harga}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography>Data tidak ditemukan</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Grid>
  );
}

export default InfoBarang;
