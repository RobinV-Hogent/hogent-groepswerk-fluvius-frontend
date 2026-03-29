import DashBoard from "../../components/MAIN/Dashboard";
import { useCallback, useEffect, useState } from "react";
import { useRole } from "../../context/roles-context";
import { createPortal } from "react-dom";
import { useAccessTemplate } from "../../context/access-template-context";
import { useCategory } from "../../context/categorie-context";
import { useBreadcrumbs } from "../../context/breadcrumb-context";
import { useSession } from "../../context/user-context";

const TemplateBeheren = () => {
  const options = [
    {
      name: "A",
      title: "Personaliseerbaar",
      value: "Kan template aangepast worden?",
      visibleOption: "block",
      //   personaliseerBaar: allRolesPerson.person,
      type: "personaliseerbaar",
    },
    {
      name: "B",
      title: "Template beheren",
      value: "Beheer indeling categorieën.",
      visibleOption: "none",
      url: "/template/create",
    },
    {
      name: "C",
      title: "Template raadplegen",
      value: "Raadpleeg indeling categorieën.",
      visibleOption: "block",
    },
  ];

  const {
    error,
    loading,
    allRoles,
    allRolesPerson,
    setselected_Role,
    selected_role,
  } = useRole();

  const [showTemplate, setShowTemplate] = useState(false);
  const { allCategories } = useCategory();

  const { enabled } = useAccessTemplate();
  const { setBreadcrumbs } = useBreadcrumbs();

  const { template } = useSession();

  useEffect(() => {
    setBreadcrumbs([
      { name: "home", url: "/categories", key: "allCategories" },
      {
        name: `Templates Beheren  ${
          selected_role?.dutch_name === undefined
            ? ""
            : "- " + selected_role?.dutch_name
        }`,
        url: "/roles",
        key: "roles",
      },
    ]);
  }, [selected_role]);

  const initDashboard = useCallback(() => {
    allRoles.map((e) => (e.card_type = "ROLE"));
    allRoles.map(
      (e) =>
        (e.action = () =>
          setselected_Role((last) => {
            if (last.id === e.id) {
              return {};
            } else {
              return e;
            }
          }))
    );

    return allRoles;
  }, [allRoles]);

  const initDashboardTemplate = useCallback(() => {
    // allCategories.map((cat) => (cat.card_type = "CATEGORY"));
    // return allCategories;

    template.tiles.map((cat) => (cat.card_type = "CATEGORY"));
    return template.tiles;
  }, [template]);

  const initDashboardOptions = useCallback(() => {
    options.map((e) => (e.card_type = "OPTION"));
    return options;
  }, [options]);

  return (
    <>
      <div className="roles">
        <ul className="category-bar">
          <li className="category-title">Rollen</li>
        </ul>
        <ul className="category-bar">
          <p className="role-info">
            Kies de rol waarvan u het template overzicht wenst te beheren
          </p>
        </ul>
        <div>
          <DashBoard items={initDashboard()} />
        </div>
      </div>
      <div
        className="options"
        style={{
          display: selected_role.hasOwnProperty("id") ? "grid" : "none",
          gap: "60px",
        }}
      >
        <div>
          <ul className="category-bar">
            <li className="option-title">Opties</li>
          </ul>
          <DashBoard items={initDashboardOptions()} />
        </div>

        <div
          className="template_option"
          style={{ display: enabled ? "block" : "none" }}
        >
          <ul className="category-bar">
            <li className="option-title">Template</li>
          </ul>
          <div style={{ pointerEvents: "none" }}>
            <DashBoard
              items={initDashboardTemplate()}
              areas={{
                narrow: template?.layout?.narrow?.areas,
                wide: template?.layout?.wide?.areas,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateBeheren;
