import React, { useEffect, useState } from "react";
import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";
import { createConnection, Printer as EscposPrinter } from "escpos";
import { USB } from "escpos-usb";

const PrinterData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const generateReceipt = async () => {
      const receipt = (
        <Printer type="epson" width={42} characterSet="korea">
          <Text size={{ width: 2, height: 2 }}>9,500원</Text>
          <Text bold={true}>결제 완료</Text>
          <Br />
          <Line />
          <Row left="결제방법" right="체크카드" />
          <Row left="카드번호" right="123456**********" />
          {/* Add more rows and content here */}
          <Line />
          <Cut />
        </Printer>
      );

      const receiptData = await render(receipt);
      setData(receiptData);
    };

    generateReceipt();
  }, []);

  const handlePrint = async () => {
    if (data) {
      try {
        // Connect to the thermal printer
        const device = new USB();
        const printer = new EscposPrinter(device);

        // Print the receipt
        await printer.open(() => {
          printer.write(data);
          printer.cut();
          printer.close();
          console.log("Receipt printed successfully!");
        });
      } catch (error) {
        console.error("Error printing receipt:", error);
      }
    }
  };

  return (
    <div>
      <h1>Shopping Receipt</h1>
      {data !== null ? (
        <>
          <button onClick={handlePrint}>Print Receipt</button>
          <p>Click the button to print the receipt.</p>
        </>
      ) : (
        <p>Generating receipt...</p>
      )}
    </div>
  );
};

export default PrinterData;
