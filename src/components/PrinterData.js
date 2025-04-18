import { Button, Stack } from "@mui/material";
import React, { useRef } from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import moment from "moment";

const styles = {
  title: {
    textAlign: "center",
  },
};
const PrintData = ({ kasir, keranjang }) => {
  const printContentRef = useRef(null);
  const handlePrint = () => {
    const content = printContentRef.current.innerHTML;

    const printWindow = window.open("", "_blank", "width=600,height=800");
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Print to Cashier</title>
        <style>
          @media print {
            body {
              visibility: hidden;
            }
            .print-content {
              width: 58mm;
              padding: 5mm;
              visibility: visible;
              height: auto;
            }
          }
          @page {
            size: 58mm;
            margin: 0;
          }
          body {
            margin: 0;
          }
          h1: {
            text-align: center;
          }
          
          p {
            font-size: 12px;
            text-align: center;
            margin: 5px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
          }
          
          th, td {
            text-align: left;
            border-bottom: 1px solid #ddd;
            font-size: 12px;
          }
          
          .total {
            text-align: right;
            font-weight: bold;
          }
          .bold {
            font-weight: bold
          }
        </style>
      </head>
      <body>
        <div class="print-content">${content}</div>
      </body>
    </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <Stack>
      <Button
        variant="contained"
        size="large"
        sx={{ marginBottom: 2 }}
        onClick={handlePrint}
      >
        <LocalPrintshopIcon sx={{ marginRight: 1 }} />
        Cetak
      </Button>
      <div style={{ display: "none" }} ref={printContentRef}>
        <h3 style={styles.title}>TOKO REZA</h3>
        <p>Pasar Panas, Kasiau</p>
        <p>Tanggal: {moment().format("YYYY-MM-DD HH:mm:ss")}</p>

        <table>
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Qty</th>
              <th style={{ textAlign: "right" }}>Harga</th>
            </tr>
          </thead>
          <tbody>
            {keranjang.length > 0 &&
              keranjang.map((item) => {
                return (
                  <tr>
                    <td>{item.namaBarang}</td>
                    <td>{item.quantity}</td>
                    <td style={{ textAlign: "right" }}>Rp{item.harga}</td>
                  </tr>
                );
              })}

            <tr>
              <td colSpan="2" className="bold">
                Total:
              </td>
              <td className="total">Rp{kasir.totalPembelian}</td>
            </tr>
            <tr>
              <td colSpan="2" className="bold">
                Pembayaran:
              </td>
              <td className="total">Rp{kasir.totalPembayaran}</td>
            </tr>
            <tr>
              <td colSpan="2" className="bold">
                Kembalian:
              </td>
              <td className="total">Rp{kasir.totalKembalian}</td>
            </tr>
          </tbody>
        </table>

        <p>Terima kasih atas kunjungan Anda!</p>
      </div>
    </Stack>
  );
};

export default PrintData;
