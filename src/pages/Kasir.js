import React, { useState, useEffect } from "react";
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
  Autocomplete,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import SaveIcon from "@mui/icons-material/Save";
import CurrencyFormat from "react-currency-format";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function Kasir() {
  const [rows, setRows] = useState([]);
  const [produk, setProduk] = useState([]);

  const handleNewAmount = (e) => {
    console.log(e);
  };

  useEffect(() => {
    console.log(produk);
  }, [produk]);
  useEffect(() => {
    getProduk();
  }, []);

  const getProduk = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/produk`)
      .then((result) => {
        // console.log(result.data);
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={produk}
                placeholder="0123456789"
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Kode Barang" />
                )}
              />
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
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
            onChange={handleNewAmount}
            sx={{ marginBottom: 2, marginTop: 1 }}
          />
          <Typography variant="h5">Total Pembelian</Typography>
          <Typography
            variant="h3"
            sx={{ color: "error.main", marginBottom: 2 }}
          >
            Rp. 52.000
          </Typography>

          <Typography variant="h5">Total Kembalian</Typography>
          <Typography
            variant="h3"
            sx={{ color: "success.main", marginBottom: 2 }}
          >
            Rp. 17.000
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
    </Grid>
  );
}

export default Kasir;
