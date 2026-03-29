import { SdgForCategory } from "../../backend/mock-data/all-mock";
import SdgIcon from "../sdg/SdgIcon";
import { Link } from "react-router-dom";
import { useSDG } from "../../context/sdg-context";
import { sortBySdgNumber } from "../../functions/helper";

const InfoBar = ({ item, showPopup, csr="" }) => {
  const { allSDG } = useSDG();

  if (allSDG) {
    allSDG.sort((s1, s2) => {
      return sortBySdgNumber(s1.number, s2.number);
    });
  }

  // if(csr){
  //   return allSDG.filter(sdg=>sdg.nummer ==csr.sdgNummer )
  // }
  //console.log(allSDG.filter(sdg=>sdg.nummer ==csr.sdgNummer ));
  return (
    <>
      <ul className="category-bar">
        <li className="category-title">{item?.name}</li>
        <li
          className="category-icon"
          style={{ backgroundColor: item?.icon }}
        ></li>
        <li></li>
        <li >
          {!csr && (<Link to={"/csr/all"}>
            <button className="filter-button">Filteren</button>
          </Link>)}
          
        </li>
        <li>
          <ul className="sdg-list">
            {allSDG?.filter(sdg=>{
              if(csr)  return csr && sdg?.number === csr.sdgNumber.split(".")[0]
              return sdg
            }).map((sdg) => {
              return <SdgIcon sdg={sdg} key={sdg.id} showPopup={showPopup} />;
            })}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default InfoBar;
