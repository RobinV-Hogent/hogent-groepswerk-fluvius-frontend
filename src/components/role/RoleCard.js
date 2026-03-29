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
import React, { useCallback, useEffect, useState } from "react";
import { useRole } from "../../context/roles-context";

const RoleCard = ({ ds, action }) => {
  const { allRoles } = useRole();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <div className="under-card" data-aos="fade-up">
        <div className="datasource-card card" onClick={() => action()}>
          <div
            style={{ paddingTop: 50 + "px", textTransform: "capitalize" }}
            className="category-title"
          >
            {ds?.dutch_name}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleCard;
