import { Button, Stack } from "@mui/material";
import React, { useRef } from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
    height: "400px",
    backgroundColor: "#fff",
    border: "1px solid #000",
    padding: "16px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
};
const PrintData = () => {
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
                visibility: visible;
              }
            }
            @page {
              size: 80mm; /* Ukuran lebar halaman disesuaikan dengan printer termal */
              margin: 0;
            }
            body {
              margin: 0;
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
        <LocalPrintshopIcon />
        Cetak
      </Button>
      <div style={{ display: "none" }} ref={printContentRef}>
        {/* Konten yang akan dicetak */}
        <span>Item 1 - 5 pcs</span>
        <br />
        <span>Item 2 - 3 pcs</span>
        <br />
        <span>Item 3 - 2 pcs</span>
      </div>
    </Stack>
  );
};

export default PrintData;
