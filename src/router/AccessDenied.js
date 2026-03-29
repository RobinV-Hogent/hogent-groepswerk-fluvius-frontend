import React, { useContext } from "react";
import { useSDG } from "../context/sdg-context";
import Nav from "../components/MAIN/Navigation";
import Error from "../components/MAIN/Error";

const MainPage = () => {
  {
    /* WERKT DIT TEST */
  }
  {
    /* Momenteel niet */
  }
  const { allSDG } = useSDG();

  return (
    <>
      <Error error={{title:"Geen toegang", description:"kan momenteel de pagina niet weergeven."}}/>
    </>
  );
};

export default MainPage;
