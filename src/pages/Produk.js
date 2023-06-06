import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  CssBaseline,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ArrowDropDown, RemoveFromQueue } from "@mui/icons-material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
// import { createProduk } from "../databases";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

function Produk() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    kodeBarang: "",
    namaBarang: "",
    harga: 0,
    quantity: 0,
  });
  const [rows, setRows] = useState([]);
  const [modalType, setModalType] = useState("");
  const handleModal = () => {
    setOpen(!open);
    if (modalType === "new") {
      setInput({
        kodeBarang: "",
        namaBarang: "",
        harga: 0,
        quantity: 0,
      });
    }
  };

  const handleFocus = (event) => event.target.select();

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
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) {
      alert("Form ada yang kosong");
      return false;
    }
    if (modalType === "new") {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/produk`, input)
        .then((result) => {
          console.log(result.data);
          // setRows(result.data);
          getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // sampai sini
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/produk/${input.kodeBarang}`,
          input
        )
        .then((result) => {
          console.log(result.data);
          // setRows(result.data);
          getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/produk/${input.kodeBarang}`,
        input
      )
      .then((result) => {
        console.log(result.data);
        // setRows(result.data);
        handleModal();
        getAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAll = () => {
    console.log(process.env.REACT_APP_BASE_URL);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/produk`)
      .then((result) => {
        console.log(result.data);
        setRows(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: "flex", flexDirection: "row", height: "auto" }}
          >
            <Typography variant="h4" sx={{ marginBottom: 2, marginRight: 2 }}>
              Produk
            </Typography>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ marginBottom: 2 }}
                onClick={() => {
                  setModalType("new");
                  handleModal();
                }}
              >
                <AddIcon />{" "}
                <Typography sx={{ marginTop: 0.5 }}>Tambah Produk</Typography>
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Kode Barang</TableCell>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell align="left">Harga</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="right">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.kodeBarang}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.kodeBarang}
                    </TableCell>
                    <TableCell>{row.namaBarang}</TableCell>
                    <TableCell align="left">Rp. {row.harga}</TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setInput(row);
                          setModalType("edit");
                          handleModal();
                        }}
                      >
                        <EditIcon color="success" />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setInput(row);
                          setModalType("delete");
                          handleModal();
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Tambah Produk
          </Typography>
          {modalType === "delete" && (
            <div>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, mb: 2, textAlign: "center" }}
              >
                Anda yakin ingin menghapus "{input.namaBarang}"
              </Typography>
              <Grid
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  height: "auto",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  sx={{ marginBottom: 2 }}
                  onClick={handleDelete}
                >
                  <SaveIcon />
                  Hapus
                </Button>
                <Button onClick={handleModal} variant="outlined" size="large">
                  Tutup
                </Button>
              </Grid>
            </div>
          )}
          {modalType !== "delete" && (
            <Grid
              sx={{
                flexDirection: "column",
                display: "flex",
                height: "auto",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Kode Barang"
                variant="outlined"
                disabled={modalType === "new" ? false : true}
                sx={{ marginBottom: 2 }}
                size="small"
                type="number"
                value={input.kodeBarang}
                onChange={(e) =>
                  setInput({ ...input, kodeBarang: e.target.value })
                }
                onFocus={handleFocus}
              />
              <TextField
                id="outlined-basic"
                label="Nama Barang"
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2 }}
                value={input.namaBarang}
                onChange={(e) =>
                  setInput({ ...input, namaBarang: e.target.value })
                }
              />
              <CurrencyFormat
                customInput={TextField}
                thousandSeparator
                prefix="Rp."
                decimalScale={0}
                placeholder="Rp.10.000.000"
                label="Harga"
                size="small"
                type="numeric"
                sx={{ marginBottom: 2 }}
                // value={input.harga}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setInput({ ...input, harga: value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2 }}
                type="number"
                value={input.quantity}
                onChange={(e) =>
                  setInput({ ...input, quantity: e.target.value })
                }
                onFocus={handleFocus}
              />
              <Grid
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  height: "auto",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color={modalType === "new" ? "primary" : "success"}
                  sx={{ marginBottom: 2 }}
                  onClick={handleSubmit}
                >
                  <SaveIcon />
                  {modalType === "new" ? "Simpan" : "Perbarui"}
                </Button>
                <Button onClick={handleModal} variant="outlined" size="large">
                  Tutup
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </Grid>
  );
}

export default Produk;
