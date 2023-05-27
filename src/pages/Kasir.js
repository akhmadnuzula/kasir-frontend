import React, { useState } from "react";
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
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ArrowDropDown } from "@mui/icons-material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import SaveIcon from "@mui/icons-material/Save";
import CurrencyFormat from "react-currency-format";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Kasir() {
  const [ampunt, setAmount] = useState(0);

  const handleNewAmount = (e) => {
    console.log(e);
  };
  const handleFocus = (event) => event.target.select();
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={8} lg={8}>
        <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Kasir
            </Typography>
            <Grid
              sx={{
                flexDirection: "row",
                display: "flex",
                height: "auto",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Kode Barang"
                variant="outlined"
                placeholder="0123456789"
                sx={{ marginRight: 2, width: "50%" }}
                onFocus={handleFocus}
              />
              <CurrencyFormat
                customInput={TextField}
                thousandSeparator
                prefix="Rp."
                decimalScale={0}
                placeholder="Rp.10.000.000"
                label="Pembayaran"
                style={{ width: "50%" }}
                onChange={handleNewAmount}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Pembelian
            </Typography>
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
          <Typography variant="h4">Total</Typography>
          <Typography
            variant="h2"
            sx={{ color: "error.main", marginBottom: 2 }}
          >
            Rp. 52.000
          </Typography>
          <Typography variant="h4">Kembalian</Typography>
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
          <Button variant="outlined" size="large">
            <SaveIcon />
            Simpan
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Kasir;
