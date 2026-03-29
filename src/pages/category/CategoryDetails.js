// import { useMatch } from "react-location";

import { categoryAll, csrs } from "../../backend/mock-data/all-mock";
import InfoBar from "../../components/MAIN/InfoBar";
import CsrDashboard from "../../components/csr/CsrDashboard";
import { SdgForCategory } from "../../backend/mock-data/all-mock";
import { useCallback, useEffect, useRef } from "react";
import { useBreadcrumbs } from "../../context/breadcrumb-context";
import { useNavigate, useParams } from "react-router-dom";
import SdgInfoBox from "../../components/sdg/SdgInfoBox";
import { useSDG } from "../../context/sdg-context";
import Dashboard from "../../components/MAIN/Dashboard";
import { useCategory } from "../../context/categorie-context";
import { useCSR } from "../../context/csr-context";
import Loading from "../../components/MAIN/Loading";
import Error from "../../components/MAIN/Error";

const CategoryDetails = () => {
  const { id } = useParams();
  const {
    allCategories,
    selected_category: cat,
    setSelected_category,
  } = useCategory();
  const { error, allCSR, loading } = useCSR();

  const { allSDG } = useSDG();
  const sdginfo = useRef();

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { name: "home", prefix: "", url: "/categories", key: "allCategories" },
      {
        name: cat?.name,
        prefix: "Categorie - ",
        url: `/category/${cat?.id}`,
        key: `Category-${cat?.id}`,
      },
    ]);

    const category = allCategories.find((e) => e.id == id);
    setSelected_category(category);
  }, [id, setBreadcrumbs, allCategories]);

  const showPopup = useCallback(() => {
    sdginfo.current.style.display = "flex";
  }, []);

  const closePopup = useCallback(() => {
    sdginfo.current.style.display = "none";
  }, []);

  const initDashboard = useCallback(() => {
    allCSR.map((e) => (e.card_type = "CSR"));
    return allCSR;
  }, [allCSR]);

  if (error?.hasOwnProperty("title")) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* {console.log(allSDG)} */}
      <InfoBar item={cat} showPopup={showPopup} />

      {!Boolean(allCSR) || allCSR.length === 0 ? (
        <Error
          error={{
            title: "Huh, geen doelstellingen?",
            description:
              "We hebben nog geen doelstellingen toegevoegd aan deze categorie. Kijk later nog eens!",
          }}
        />
      ) : (
        <>
          <Dashboard items={initDashboard()} />
        </>
      )}
      <div ref={sdginfo} className="sdg-info-back">
        <SdgInfoBox closePopup={closePopup} />
      </div>
    </>
  );
};

export default CategoryDetails;
