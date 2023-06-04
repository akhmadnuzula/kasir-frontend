import React from "react";

// ambil halaman
const Login = React.lazy(() => import("./pages/Login"));
const Kasir = React.lazy(() => import("./pages/Kasir"));
const Produk = React.lazy(() => import("./pages/Produk"));
const GenerateBarcode = React.lazy(() => import("./pages/GenerateBarcode"));

// buat routing halman
const routes = [
  //   { path: "", Component: Login },
  { path: "", Component: Kasir, name: "Kasir" },
  { path: "produk", Component: Produk, name: "Produk" },
  { path: "Barcode", Component: GenerateBarcode, name: "Barcode" },
];

export default routes;
