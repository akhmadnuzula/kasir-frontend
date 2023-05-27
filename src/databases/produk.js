import { DB } from "./connection";

export const createProduk = (data, callback) => {
  DB.run(
    "INSERT INTO produk (kodeBarang, namaBarang, harga, quantity) VALUES (?, ?, ?, ?)",
    [data.kodeBarang, data.namaBarang, data.harga, data.quantity],
    (err) => {
      if (err) {
        console.error(err.message);
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

export const readProdukById = (kodeBarang, callback) => {
  DB.get("SELECT * FROM produk WHERE id = ?", [kodeBarang], (err, row) => {
    if (err) {
      console.error(err.message);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

export const readProdukAll = (callback) => {
  DB.all("SELECT * FROM produk", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

export const updateProduk = (kodeBarang, data, callback) => {
  DB.run(
    "UPDATE produk SET namaBarang=?, harga=?, quantity=? WHERE kodeBarang=?",
    [data.namaBarang, data.harga, data.quantity, kodeBarang],
    (err) => {
      if (err) {
        console.error(err.message);
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

export const deleteProduk = (kodeBarang, callback) => {
  DB.run("DELETE FROM produk WHERE kodeBarang=?", [kodeBarang], (err) => {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      callback(null);
    }
  });
};
