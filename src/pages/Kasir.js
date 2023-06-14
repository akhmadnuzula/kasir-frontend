import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import CurrencyFormat from "react-currency-format";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import axios from "axios";
import InfoBarang from "../components/InfoBarang";
import PrinterData from "../components/PrinterData";

function Kasir() {
  const [rows, setRows] = useState([]);
  const [produk, setProduk] = useState([]);
  const [input, setInput] = useState("");
  const [inputKembalian, setInputKembalian] = useState("");
  const [kodePembelian, setKodePembelian] = useState(`${moment().valueOf()}`);
  const [kasir, setKasir] = useState({
    kodePembelian: kodePembelian,
    totalPembayaran: 0,
    totalPembelian: 0,
    totalKembalian: 0,
    tanggalPembelian: moment().format(),
  });

  const inputRef = useRef(null);

  useEffect(() => {
    hitungKembalian(rows);
  }, [rows]);

  useEffect(() => {
    hitungKembalian(rows);
  }, [inputKembalian]);

  const hitungKembalian = (data) => {
    const totalPembelian = data.reduce(
      (totalHarga, item) => totalHarga + item.totalHarga,
      0
    );
    const hitungKembalian =
      Number(kasir.totalPembayaran) - Number(kasir.totalPembelian);
    setKasir({
      ...kasir,
      totalPembelian: totalPembelian,
      totalKembalian: hitungKembalian,
    });
  };

  useEffect(() => {
    getProduk();
  }, []);

  const getProduk = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/produk`)
      .then((result) => {
        const data = result.data;
        const newProduk = [];
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
    const filterData = produk.find((e) => e.kodeBarang === input);
    if (filterData) {
      const data = filterData;
      const newRow = [...rows];
      const existingData = newRow.find(
        (item) => item.kodeBarang === data.kodeBarang
      );
      if (existingData) {
        existingData.quantity = Number(existingData.quantity) + 1;
        existingData.totalHarga += data.harga;
      } else {
        newRow.push({
          kodePembelian: kodePembelian,
          kodeBarang: data.kodeBarang,
          namaBarang: data.namaBarang,
          harga: data.harga,
          quantity: 1,
          totalHarga: data.harga,
        });
      }
      setRows(newRow);
      hitungKembalian(newRow);
      setInput("");
      inputRef.current.focus();
    } else {
      alert("Produk tidak ditemukan");
    }
  };

  const handleClear = () => {
    const data = { keranjang: rows, pembelian: kasir };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/kasir`, data)
      .then((result) => {
        if (result.status === 201) {
          const kodeBaru = moment().valueOf();
          setKodePembelian(kodeBaru);
          setKasir({
            kodePembelian: kodeBaru,
            totalPembayaran: 0,
            totalPembelian: 0,
            totalKembalian: 0,
            tanggalPembelian: moment().format(),
          });
          setRows([]);
          setInput("");
          setInputKembalian("");
          inputRef.current.focus();
        } else {
          alert("Koneksi bermasalah");
        }
      })
      .catch((err) => {
        alert("Koneksi bermasalah");
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call your function here
      console.log("Enter key pressed!");
      cekKode();
    }
  };

  const handleChangeRow = (kodeBarang, e) => {
    const quantity = e.target.value;
    const newRow = [...rows];
    const findRow = newRow.find((e) => e.kodeBarang === kodeBarang);
    findRow.quantity = quantity;
    findRow.totalHarga = Number(findRow.harga) * Number(quantity);
    setRows(newRow);
    hitungKembalian(newRow);
  };

  const handleRemove = (kodeBarang) => {
    const updatedRows = rows.filter((row) => row.kodeBarang !== kodeBarang);
    setRows(updatedRows);
    hitungKembalian(updatedRows);
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
                  inputRef={inputRef}
                  onKeyDown={handleKeyDown}
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
                    <TableCell align="right">Aksi</TableCell>
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
                        <TableCell align="right">
                          <TextField
                            id="outlined-basic"
                            label="Kode Barang"
                            variant="outlined"
                            type="number"
                            size="small"
                            sx={{ width: 80 }}
                            value={row.quantity}
                            onChange={(values) => {
                              handleChangeRow(row.kodeBarang, values);
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.totalHarga}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="error"
                            onClick={() => handleRemove(row.kodeBarang)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
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
            value={inputKembalian}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setKasir({ ...kasir, totalPembayaran: value });
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
            Rp. {kasir.totalPembelian}
          </Typography>

          <Typography variant="h5">Total Kembalian</Typography>
          <Typography
            variant="h3"
            sx={{ color: "success.main", marginBottom: 2, marginRight: 1 }}
          >
            Rp. {kasir.totalKembalian}
          </Typography>
          <PrinterData kasir={kasir} keranjang={rows} />
          <Button
            variant="outlined"
            size="large"
            color="error"
            onClick={handleClear}
          >
            <RestartAltIcon sx={{ marginRight: 1 }} />
            Bersihkan Pembelian
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Kasir;
