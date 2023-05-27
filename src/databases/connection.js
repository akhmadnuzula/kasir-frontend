import sqlite3 from "sqlite3";

export const DB = new sqlite3.Database(
  "kasir.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Terhubung ke database sql");
    }
  }
);
