import DashBoard from "../../components/MAIN/Dashboard";
import { useCallback, useState } from "react";
import { useRole } from "../../context/roles-context";


const TemplateBeherenStart = () => {
    const { error, loading, allRoles } = useRole();

    const initDashboard = useCallback(() => {
        allRoles.map((e) => (e.card_type = "ROLE"));
        return allRoles;
    }, [allRoles]);


    return (
      <>
        <div className="roles">
            <ul className="category-bar">
                <li className="category-title">Rollen</li>
            </ul>
            <ul className="category-bar">
                <p className="role-info">Kies de rol waarvan u het template overzicht wenst te beheren</p>
            </ul>
            <div>
                <DashBoard items={initDashboard()} />
            </div>
        </div>
      </>
    );
  };
  
  export default TemplateBeherenStart;
  