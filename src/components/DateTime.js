import React, { useEffect, useState } from "react";

function DateTime() {
  const [date, setDate] = useState("");

  useEffect(() => {
    let arrDay = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    let arrMonth = [
      "januari",
      "Februari",
      "Maret",
      "april",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    setInterval(() => {
      let a = new Date();
      let day = a.getDay();
      let month = a.getMonth();
      let year = a.getFullYear();
      let time = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
      setDate(`${arrDay[day]}, ${day} ${arrMonth[month]} ${year} ${time}`);
    }, 1000);
  });

  return <span style={{ marginRight: 10 }}>{date}</span>;
}

export default DateTime;
