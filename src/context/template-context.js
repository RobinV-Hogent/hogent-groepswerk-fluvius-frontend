import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { useCategory } from "./categorie-context";

export const TemplateGenerator_Context = createContext();
export const useTemplateGenerator = () => useContext(TemplateGenerator_Context);

// TEMPLATE EXAMPLE
const temp = {
  tiles: [
    {
      cat_id: 1,
      mvo_ids: [1],
    },
    {
      cat_id: 2,
      mvo_ids: [1, 2],
    },
  ],
  layout: {
    wide: {
      areas:
        '"Milieu Milieu Sociaal Sociaal"  "Andere Economie Sociaal Sociaal"',
      rowCount: 2,
    },
    narrow: {
      areas:
        '"Milieu Milieu"  "Sociaal Sociaal"  "Sociaal Sociaal"  "Andere Economie"',
      rowCount: 4,
    },
  },
};

export const TemplateGenerator_Provider = ({ children }) => {
  const [generatedTemplate, setGeneratedTemplate] = useState(temp);
  const { allCategories } = useCategory();

  // OBJECT DAT INGEVULD ZAL WORDEN
  const grid_obj = {
    tiles: [],
    layout: {
      wide: {
        areas: "",
        rowCount: 0,
      },
      narrow: {
        areas: "",
        rowCount: 0,
      },
    },
  };

  // PRINT DE GENERATED TEMPLATE AF NA AANMAAK
  useEffect(() => {
    console.log(generatedTemplate);
  }, [generatedTemplate]);

  // ZAL ERVOOR ZORGEN DAT DE TEMPLATE JUIST GEBOUWD WORDT
  const generateGrid = useCallback(({ areas, categories }) => {
    generateWide(areas);
    generateNarrow();
    addCategoriesToGridObject(categories);
    setGeneratedTemplate(Object.assign({}, grid_obj));
  }, []);

  // DIT VOEGT DE WAARDEN TOE AAN HET GRID_OBJ
  const addToObject = useCallback((type, areas) => {
    let str_areas = "";
    areas.forEach((row) => {
      if (type === "wide") row = row.map((e) => e.category);
      str_areas += ` "${row.join(" ")}" `;
    });
    grid_obj.layout[type].areas = str_areas.trim();
    grid_obj.layout[type].rowCount =
      str_areas.replaceAll('"', "").replaceAll("  ", " ").trim().split(" ")
        .length / (type === "narrow" ? 2 : 4);
  }, []);

  // DIT DEELT DE ORIGINELE ARRAY OP IN VERSCHILLDENDE DELEN (n)
  const splitArrayUpInPieces = useCallback((n, array) => {
    let splitup = [];
    for (let i = 0; i < array.length; i += n)
      splitup.push(array.slice(i, i + n));
    return splitup;
  }, []);

  // MAAKT DE LAYOUT VOOR BREDE SCHERMEN
  const generateWide = useCallback((areas) => {
    addToObject("wide", splitArrayUpInPieces(4, areas));
  }, []);

  // MAAKT DE LAYOUT VOOR SMALLE SCHERMEN
  const generateNarrow = useCallback(() => {
    let dash = grid_obj.layout.wide.areas;
    const placesForCard = {};
    const smallDashboard = [];
    dash
      .replaceAll('"', " ")
      .replaceAll("   ", " ")
      .split(" ")
      .forEach((cat) => {
        cat !== "" &&
          !placesForCard.hasOwnProperty(cat) &&
          (placesForCard[cat] = 0);
        placesForCard.hasOwnProperty(cat) && placesForCard[cat]++;
      });
    let places = 0;
    let added = false;
    for (const key in placesForCard) {
      places = placesForCard[key];
      if (places % 2 == 0)
        for (let i = 0; i < places / 2; i++) smallDashboard.push([key, key]);
      else {
        smallDashboard.forEach((rowElement) => {
          if (rowElement.includes("EMPTY"))
            for (let i = 0; i < 2; i++)
              rowElement[i] === "EMPTY" &&
                (rowElement[i] = key) &&
                (added = true);
        });
        !added && smallDashboard.push([key, "EMPTY"]) && (added = false);
      }

      addToObject("narrow", smallDashboard);
    }
  }, []);

  //VOET DE UNIEKE CATEGORIEEN TOE AAN DE TEMPLATE
  const addCategoriesToGridObject = useCallback((categories) => {
    categories.forEach((cat) => {
      const found_cat = allCategories.find((e) => e.name === cat);
      grid_obj.tiles.push({
        category: found_cat?.id,
        mvo_ids: [],
      });
    }, []);
  }, []);

  const value = useMemo(
    () => ({
      generatedTemplate,
      setGeneratedTemplate,
      generateGrid,
      addCategoriesToGridObject,
    }),
    [
      generatedTemplate,
      setGeneratedTemplate,
      generateGrid,
      addCategoriesToGridObject,
    ]
  );

  return (
    <TemplateGenerator_Context.Provider value={value}>
      {children}
    </TemplateGenerator_Context.Provider>
  );
};
