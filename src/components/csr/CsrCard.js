import AOS from "aos";
import "aos/dist/aos.css";
import React, { useCallback, useEffect } from "react";

import { isAchieved } from "../../functions/helper";

const CsrCard = ({ csr }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const isComplete = useCallback(() => isAchieved(csr), [csr]);

  return (
    <>
      <div className="under-card" data-aos="fade-up">
        <div className="card csr-card" data-cy="dashboard_item">
          <div className="csr-title">{csr?.name}</div>
          <div
            className={`csr-value ${
              isComplete() ? "csrcomplete" : "csruncomplete"
            }`}
          >
            <p>
              Bereikt: {csr?.value} {csr?.unit}
            </p>
            <p>
              Doel: {csr?.threshold.behaviour === "lowerThanValue" && "<"}{" "}
              {csr?.threshold.behaviour === "higherThanValue" && ">"}{" "}
              {csr?.threshold.value}
            </p>
          </div>
          <div className="sdg-number-csr-card">{csr?.sdgNumber}</div>
          <div
            className="icon-bottom category-icon"
            style={{ backgroundColor: csr.icon }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CsrCard;
