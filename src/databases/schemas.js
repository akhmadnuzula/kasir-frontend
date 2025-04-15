import Realm from "realm-web";

export const SCHEMA_PRODUK = "Produk";

export const schemaProduk = {
  name: SCHEMA_PRODUK,
  primaryKey: "kodeBarang",
  properties: {
    kodeBarang: "int",
    namaBarang: "string",
    harga: "int",
    quantity: "int",
  },
};

const databaseOption = {
  path: "LocalDatabase",
  schema: [schemaProduk],
  schemaVersion: 0,
};

export class RealmInstance {
  static instance = null;

  static getInstance() {
    if (!RealmInstance.instance) {
      RealmInstance.instance = Realm.open(databaseOption);
    }
    return RealmInstance.instance;
  }
}
