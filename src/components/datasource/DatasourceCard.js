// const datasources = [
//   {
//     id: 1,
//     soort: "CsvSource",
//     name: "Datasource",
//     source: -12.3,
//   },
// ];
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

const DatasourceCard = ({ ds }) => {
  // const ds_res = datasources.find((e) => e.id === ds);

  // console.log(ds_res);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <div className="under-card" data-aos="fade-up">
        <div className="datasource-card card">
          <div className="datasource-title">{ds?.name}</div>
          <div className="datasource-source">{ds?.soort}</div>
        </div>
      </div>
    </>
  );
};

export default DatasourceCard;
