import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/id"; // Mengimpor paket bahasa Indonesia

function DateTime() {
  const [date, setDate] = useState("");

  useEffect(() => {
    moment.locale("id"); // Menetapkan bahasa menjadi bahasa Indonesia
    const interval = setInterval(() => {
      const now = moment();
      const formattedDate = now.format("dddd, D MMMM YYYY HH:mm:ss");
      setDate(formattedDate);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span style={{ marginRight: 10 }}>{date}</span>;
}

export default DateTime;
