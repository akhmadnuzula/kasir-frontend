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
    // if (printWindow !== null) {
    //   // Access properties or call methods on the printWindow object
    //   printWindow.print();
    // } else {
    //   // Handle the case when printWindow is null
    //   console.log("Izinkan popup terlebih dahulu.");
    // }
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Print to Cashier</title>
        <style>
        * {
          font-size: 12px;
          font-family: 'Times New Roman';
        }
        
        td,
        th,
        tr,
        table {
            border-top: 1px solid black;
            border-collapse: collapse;
        }
        
        td.description,
        th.description {
            width: 75px;
            max-width: 75px;
        }
        
        td.quantity,
        th.quantity {
            width: 40px;
            max-width: 40px;
            word-break: break-all;
        }
        
        td.price,
        th.price {
            width: 40px;
            max-width: 40px;
            word-break: break-all;
        }
        
        .centered {
            text-align: center;
            align-content: center;
        }
        
        .ticket {
            width: 155px;
            max-width: 155px;
        }
        
        img {
            max-width: inherit;
            width: inherit;
        }
        
        @media print {
            .hidden-print,
            .hidden-print * {
                display: none !important;
            }
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
        <div class="ticket">
          <p class="centered">RECEIPT EXAMPLE</p>
          <p class="centered">Address line 1</p>
          <table>
            <thead>
              <tr>
                <th class="quantity">Q.</th>
                <th class="description">Description</th>
                <th class="price">$$</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="quantity">1.00</td>
                <td class="description">ARDUINO UNO R3</td>
                <td class="price">$25.00</td>
              </tr>
              <tr>
                <td class="quantity">2.00</td>
                <td class="description">JAVASCRIPT BOOK</td>
                <td class="price">$10.00</td>
              </tr>
              <tr>
                <td class="quantity">1.00</td>
                <td class="description">STICKER PACK</td>
                <td class="price">$10.00</td>
              </tr>
              <tr>
                <td class="quantity"></td>
                <td class="description">TOTAL</td>
                <td class="price">$55.00</td>
              </tr>
            </tbody>
          </table>
          <p class="centered">Thanks for your purchase!</p>
        </div>
      </div>
    </Stack>
  );
};

export default PrintData;
