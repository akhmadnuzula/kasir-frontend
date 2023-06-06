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
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import CurrencyFormat from "react-currency-format";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import InfoBarang from "../components/InfoBarang";
import PrinterData from "../components/PrinterData";

function Kasir() {
  const [rows, setRows] = useState([]);
  const [produk, setProduk] = useState([]);
  const [input, setInput] = useState("");
  const [inputKembalian, setInputKembalian] = useState("");
  const [kasir, setKasir] = useState({
    pembayaran: 0,
    pembelian: 0,
    kembalian: 0,
  });

  useEffect(() => {
    hitungKembalian(rows);
  }, [rows]);

  useEffect(() => {
    hitungKembalian(rows);
  }, [inputKembalian]);

  const hitungKembalian = (data) => {
    let totalPembelian = data.reduce((total, item) => total + item.total, 0);
    let hitungKembalian = Number(kasir.pembayaran) - Number(kasir.pembelian);
    setKasir({
      ...kasir,
      pembelian: totalPembelian,
      kembalian: hitungKembalian,
    });
  };

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
    let filterData = produk.find((e) => e.kodeBarang === input);
    if (filterData) {
      let data = filterData;
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
      hitungKembalian(newRow);
    } else {
      alert("Produk tidak ditemukan");
    }
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
                <InfoBarang dataProduk={produk} />
                <TextField
                  id="outlined-basic"
                  label="Kode Barang"
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
              <Table>
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
              setInputKembalian(value);
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
          <PrinterData />
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
