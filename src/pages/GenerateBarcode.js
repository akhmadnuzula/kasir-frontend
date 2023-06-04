import { Grid, Paper, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import Barcode from "react-barcode";

function GenerateBarcode() {
  const [input, setInput] = useState("");
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
          <TextField
            id="outlined-basic"
            label="Masukkan nomor"
            variant="outlined"
            size="small"
            sx={{ marginBottom: 2 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Barcode value={input} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GenerateBarcode;
