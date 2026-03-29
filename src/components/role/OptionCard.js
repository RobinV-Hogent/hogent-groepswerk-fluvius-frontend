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
import { ACTION } from "../../backend/api-calls";
import { useAccessTemplate } from "../../context/access-template-context";
import { useRole } from "../../context/roles-context";

const OptionCard = ({ title, value, visibleOption, type }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { enabled, setEnabled } = useAccessTemplate();

  const [isPersonaliseerbaar, setPersonaliseerbaar] = useState(false);

  return (
    <>
      <div className="under-card" data-aos="fade-up">
        <div className="datasource-card card" style={{ position: "relative" }}>
          <div style={{ paddingTop: 10 + "px" }} className="category-title">
            {title}
          </div>
          <div className="datasource-source">{value}</div>
          <div
            className="toggle"
            style={{ position: "absolute", display: visibleOption }}
          >
            <label className="switch">
              <input
                type="checkbox"
                checked={
                  type === "personaliseerbaar" ? isPersonaliseerbaar : enabled
                }
                onChange={() => {
                  type === "personaliseerbaar"
                    ? setPersonaliseerbaar((e) => !e)
                    : setEnabled(!enabled);
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionCard;
