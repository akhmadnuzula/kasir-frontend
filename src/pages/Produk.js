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
import moment from "moment";
// import { createProduk } from "../databases";
import RowProduct from "../components/RowProduct";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Produk() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    kodeBarang: "",
    namaBarang: "",
    harga: 0,
    quantity: 0,
    tanggal: moment().format(),
  });
  const [rows, setRows] = useState([]);
  const [saveRows, setSaveRows] = useState([]);
  const [modalType, setModalType] = useState("");
  const [harga, setHarga] = useState("");
  const handleModal = () => {
    setOpen(!open);
    if (modalType === "new") {
      setInput({
        kodeBarang: "",
        namaBarang: "",
        harga: 0,
        quantity: 0,
        tanggal: moment().format(),
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
    } else {
      return true;
    }
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
          handleModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (kodeBarang) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/produk/${kodeBarang}`)
      .then((result) => {
        console.log(result.data);
        // setRows(result.data);
        refreshRows();
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
        setSaveRows(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshRows();
  }, []);

  const refreshRows = () => {
    getAll();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onPressButton = ({ kodeBarang, namaBarang }) => {
    handleDelete(kodeBarang);
    refreshRows();
    alert(`Data barang ${namaBarang} berhasil di hapus`);
  };

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    var value = e.target.value;
    setSearch(value);
    if (value !== "") {
      let filter = saveRows.filter((e) =>
        e.namaBarang.toLowerCase().includes(value.toLowerCase())
      );
      if (filter.length > 0) {
        setRows(filter);
      } else {
        setRows([]);
      }
    } else {
      refreshRows();
    }
  };
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
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "auto",
              justifyContent: "space-between",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "auto",
              }}
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
            <TextField
              id="outlined-basic"
              label="Cari Nama Barang"
              variant="outlined"
              size="small"
              value={search}
              sx={{ minWidth: 200 }}
              onChange={(e) => {
                handleChange(e);
              }}
              onFocus={handleFocus}
            />
          </Grid>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 350 }}>
              <Table
                stickyHeader
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
                    <TableCell align="right" colSpan={2}>
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow
                      key={row.kodeBarang}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <RowProduct
                        data={row}
                        onPressButton={() => onPressButton(row)}
                        onSaveButton={() => refreshRows()}
                      />
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
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
                value={input.harga}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setInput({ ...input, harga: value });
                  setHarga(value);
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
                onChange={(e) => {
                  setInput({ ...input, quantity: e.target.value });
                }}
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
