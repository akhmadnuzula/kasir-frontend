import {
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState, createRoot, useRef, useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import domtoimage from "dom-to-image";
import moment from "moment";
import Barcode from "react-barcode";

function GenerateBarcode() {
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  const handleDownload = () => {
    domtoimage
      .toPng(containerRef.current)
      .then((dataUrl) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = `barcode-${moment().valueOf()}.png`;
        downloadLink.click();
      })
      .catch((error) => {
        console.error("Error generating barcode image:", error);
      });
  };

  return (
    <Grid container spacing={2}>
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
              Generate Barcode
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Masukkan nomor"
              variant="outlined"
              size="small"
              sx={{ width: 300, mr: 2 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
            >
              <DownloadIcon /> Download
            </Button>
          </Grid>
          <div ref={containerRef}>
            <Barcode value={input} /* props */ />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GenerateBarcode;
