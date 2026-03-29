import { useCallback, useEffect, useRef, useState } from "react";
import { useCategory } from "../../context/categorie-context";
import { useTemplateGenerator } from "../../context/template-context";

const CreateTemplate = () => {
  const categoryButtons = useRef();
  const [dashboard, setDashboard] = useState([]);

  const { generateGrid } = useTemplateGenerator();
  const { allCategories, selected_category, setSelected_category } =
    useCategory();

  let selectedCat;
  let rows = 0;

  useEffect(() => {
    setSelected_category("NONE");
  }, []);

  useEffect(() => {
    addToPane();
  }, []);

  const changeCat = useCallback((e, cat) => {
    Array.from(categoryButtons.current.children).forEach((button) => {
      button.style.backgroundColor = "#efefef";
      button.style.background = "";
      button.style.color = "#004c69";
    });

    if (cat === "NONE") {
      e.target.style.background = "gray";
    } else {
      e.target.style.backgroundColor = cat.icon;
    }

    e.target.style.color = "white";
    setSelected_category(cat);
  }, []);

  const addToPane = useCallback(() => {
    setDashboard((dashboard) => {
      let items = [];

      for (let i = 0; i < 8; i++) {
        items.push({ category: undefined });
      }

      return [...dashboard, ...items];
    });
  }, []);

  const generate = useCallback(() => {
    generateGrid({
      areas: dashboard,
      categories: new Set(dashboard.map((e) => e.category)),
    });
  }, [dashboard]);

  const resetTile = useCallback((tile, item) => {
    tile.setAttribute("class", "grid-add-category-default");
    tile.setAttribute("cat_id", "");
    tile.style.backgroundColor = "white";
    tile.style.color = "#EFEFEF";
    tile.textContent = "+";
  });

  const changeTileCategory = useCallback(
    (tile, item) => {
      if (selected_category === "NONE") {
        resetTile(tile, item);
        return;
      }

      item.category = selected_category.name;

      tile.setAttribute("class", "grid-add-category-assigned");
      tile.setAttribute("cat_id", selected_category.name);
      tile.style.backgroundColor = selected_category.icon;
      tile.style.color = "white";
      tile.textContent = selected_category.name;
    },
    [selected_category]
  );

  return (
    <>
      <div className="create-dashboard-category-list" ref={categoryButtons}>
        {allCategories.map((cat) => {
          return (
            <button
              key={cat.name}
              className="category-button-create-template"
              onClick={(e) => changeCat(e, cat)}
            >
              {cat.name}
            </button>
          );
        })}
        <button
          className="category-button-create-template"
          onClick={(e) => changeCat(e, "NONE")}
        >
          Reset
        </button>
      </div>

      <div
        className="createGridPane"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(dashboard.length / 4)}, 250px)`,
        }}
      >
        {dashboard.map((item) => {
          return (
            <>
              <button
                cat_id=""
                className="grid-add-category-default"
                onClick={(e) => {
                  if (
                    e.target.getAttribute("cat_id") === selected_category.name
                  )
                    resetTile(e.target, item);
                  else changeTileCategory(e.target, item);
                }}
              >
                +
              </button>
            </>
          );
        })}
      </div>
      <button onClick={() => addToPane()}>Add New Layer</button>
      <button onClick={() => generate()}>PRINT</button>
    </>
  );
};

export default CreateTemplate;
