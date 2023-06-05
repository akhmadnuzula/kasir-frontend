import React, { useState, useEffect } from "react";
import {
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
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CurrencyFormat from "react-currency-format";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

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

function Kasir() {
  const [rows, setRows] = useState([]);
  const [produk, setProduk] = useState([]);
  const [input, setInput] = useState("");
  const [inputPembayaran, setInputPembayaran] = useState(0);
  const [kasir, setKasir] = useState({
    pembayaran: 0,
    pembelian: 0,
    kembalian: 0,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let totalPembelian = rows.reduce((total, item) => total + item.total, 0);
    let hitungKembalian = Number(kasir.pembayaran) - Number(kasir.pembelian);
    setKasir({
      ...kasir,
      pembelian: totalPembelian,
      kembalian: hitungKembalian,
    });
  }, [rows]);

  useEffect(() => {
    let hitungKembalian = Number(kasir.pembayaran) - Number(kasir.pembelian);
    setKasir({ ...kasir, kembalian: hitungKembalian });
  }, [inputPembayaran]);

  useEffect(() => {
    getProduk();
  }, []);

  const getProduk = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/produk`)
      .then((result) => {
        let data = result.data;
        let newProduk = [];
        data.map((item) => {
          newProduk.push({
            harga: item.harga,
            label: item.kodeBarang,
            kodeBarang: item.kodeBarang,
            namaBarang: item.namaBarang,
            quantity: item.quantity,
          });
        });
        setProduk(newProduk);
      })
      .catch((err) => {
        console.log(err);
        alert("Refresh Halaman");
      });
  };

  const cekKode = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/produk/${input}`)
      .then((result) => {
        let data = result.data;
        let newRow = [...rows];
        let existingData = newRow.find(
          (item) => item.kodeBarang === data.kodeBarang
        );
        if (existingData) {
          existingData.quantity += 1;
          existingData.total += data.harga;
        } else {
          newRow.push({
            kodeBarang: data.kodeBarang,
            namaBarang: data.namaBarang,
            harga: data.harga,
            tanggal: data.tanggal,
            quantity: 1,
            total: data.harga,
          });
        }
        setRows(newRow);
      })
      .catch((err) => {
        console.log(err);
        alert("Produk tidak ditemukan");
      });
  };

  const handleFocus = (event) => event.target.select();
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={8} lg={8}>
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
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 2,
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4" sx={{ marginRight: 2, marginTop: 1 }}>
                Pembelian
              </Typography>
              <Stack direction="row">
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={produk}
                  placeholder="0123456789"
                  sx={{ width: 300, mr: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Kode Barang" />
                  )}
                /> */}
                <IconButton
                  color="inherit"
                  sx={{ borderRadius: 2, mr: 2 }}
                  color="success"
                  onClick={handleOpen}
                >
                  <InfoIcon />
                </IconButton>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  type="number"
                  sx={{ mr: 2, width: 300 }}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onFocus={handleFocus}
                />
                <Button type="submit" variant="contained" onClick={cekKode}>
                  Submit
                </Button>
              </Stack>
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
                    <TableCell align="right">Harga</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Sub Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow
                        key={row.kodeBarang}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.kodeBarang}
                        </TableCell>
                        <TableCell>{row.namaBarang}</TableCell>
                        <TableCell align="right">{row.harga}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "auto",
          }}
        >
          <Typography variant="h5">Pembayaran</Typography>
          <CurrencyFormat
            customInput={TextField}
            thousandSeparator
            prefix="Rp."
            decimalScale={0}
            placeholder="Rp.10.000.000"
            label="Total Pembayaran"
            // onChange={handleNewAmount}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setKasir({ ...kasir, pembayaran: value });
              setInputPembayaran(value);
            }}
            // value={kasir.pembayaran}
            sx={{ marginBottom: 2, marginTop: 1 }}
          />
          <Typography variant="h5">Total Pembelian</Typography>
          <Typography
            variant="h3"
            sx={{ color: "error.main", marginBottom: 2 }}
          >
            Rp. {kasir.pembelian}
          </Typography>

          <Typography variant="h5">Total Kembalian</Typography>
          <Typography
            variant="h3"
            sx={{ color: "success.main", marginBottom: 2 }}
          >
            Rp. {kasir.kembalian}
          </Typography>
          <Button variant="contained" size="large" sx={{ marginBottom: 2 }}>
            <LocalPrintshopIcon />
            Cetak
          </Button>
          <Button variant="outlined" size="large" color="error">
            <CloseIcon />
            Bersihkan
          </Button>
        </Paper>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            List Barang
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Barcode</TableCell>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produk.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.kodeBarang}</TableCell>
                    <TableCell>{item.namaBarang}</TableCell>
                    <TableCell>{item.harga}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Grid>
  );
}

export default Kasir;
