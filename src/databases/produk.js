import { SCHEMA_PRODUK, RealmInstance } from "./schemas";

export const produkGetAll = () => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then((realm) => {
        let obj = realm.objects(SCHEMA_PRODUK);
        if (obj && obj.isValid()) {
          resolve(obj);
        } else {
          reject(new Error("No Data Found"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const produkGetById = (kodeBarang) => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then((realm) => {
        let obj = realm.objectForPrimaryKey(SCHEMA_PRODUK, kodeBarang);
        resolve(obj);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const produkInsert = (data) => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then((realm) => {
        realm.write(() => {
          let obj = realm.create(SCHEMA_PRODUK, data);
          resolve(obj);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const produkUpdate = (data) => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then((realm) => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_PRODUK, data.kodeBarang);
          obj.kodeBarang = data.kodeBarang;
          obj.namaBarang = data.namaBarang;
          obj.harga = data.harga;
          obj.quantity = data.quantity;
          resolve(obj);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const produkDeleteById = (kodeBarang) => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then((realm) => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_PRODUK, kodeBarang);
          if (obj) {
            realm.delete(obj);
            resolve();
          } else {
            reject(new Error("Produk not found"));
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const produkDeleteAll = () => {
  return new Promise((resolve, reject) => {
    RealmInstance.getInstance()
      .then((realm) => {
        realm.write(() => {
          let obj = realm.objects(SCHEMA_PRODUK);
          realm.delete(obj);
          resolve();
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
