import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";
import routes from "./routes";

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Menu
    </ListSubheader>
    <ListItemButton to="/" component={Link}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Kasir" />
    </ListItemButton>
    <ListItemButton to="/produk" component={Link}>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Produk" />
    </ListItemButton>
    <ListItemButton to="/barcode" component={Link}>
      <ListItemIcon>
        <QrCode2Icon />
      </ListItemIcon>
      <ListItemText primary="Barcode" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Report Penjualan" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reort Pembelian" />
    </ListItemButton>
  </React.Fragment>
);
