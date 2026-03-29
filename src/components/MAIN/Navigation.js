import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import fluviusIcon from "../../assets/images/fluvius_icon.svg";
import { useLogout, useSession } from "../../context/user-context";
import { useNavigate } from "react-router";

const Navigation = () => {
  const { user } = useSession();
  const logout = useLogout();
  const navigate = useNavigate();

  const [logoutShown, setLogoutShown] = useState(false);
  const logoutref = useRef();

  const nav_links = {
    mvo_coordinator: [
      {
        /* url: "/template/create", */
        url: "/roles",
        name: "Templates beheren",
        selected: false,
      },
      {
        url: "NONE",
        user: true,
        name: user?.username,
        selected: false,
      },
    ],

    management: [
      {
        url: "l1",
        name: "Personaliseren",
        selected: false,
      },
      {
        url: "NONE",
        user: true,
        name: user?.username,
        selected: false,
      },
    ],

    director: [
      {
        url: "l1",
        name: "Personaliseren",
        selected: false,
      },
      {
        url: "NONE",
        user: true,
        name: user?.username,
        selected: false,
      },
    ],

    stakeholder: [
      {
        url: "NONE",
        user: true,
        name: user?.username,
        selected: false,
      },
    ],
  };

  const [links, setLinks] = useState([]);

  const changeSelected = useCallback(
    (link) => {
      if (user === null) return;

      setLinks(nav_links[user.role]);

      const n_links = [];

      links.forEach((e) => {
        e.selected = e !== link ? false : true;
        n_links.push(e);
      });

      setLinks(n_links);
    },
    [user, links]
  );

  useEffect(() => {
    setLogoutShown(false);

    if (user === null) return;
    setLinks(nav_links[user.role]);
  }, [user]);

  // const showLogoutBox = useCallback(() => {
  //   setTimeout(() => {
  //     setLogoutShown((e) => !e);
  //   }, 2000);
  //   setLogoutShown((e) => !e);
  // }, []);

  const logoutAccount = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, []);

  return (
    <>
      <header>
        <nav id="fixed_nav">
          <div className="elements">
            <Link className="" to={"/categories"}>
              <div id="fluvius_icon">
                <img
                  className="nav-icon"
                  src={fluviusIcon}
                  alt="Fluvius icon"
                />
              </div>
            </Link>
            <div className="fluvius-name">Fluvius</div>
            {links.map((element) => {
              return element.hasOwnProperty("user") ? (
                <div key={element.url} className="nav-user-main">
                  <button
                    onClick={() => {
                      logoutAccount();
                    }}
                    // onMouseOver={() => {
                    //   // TODO: Get rid of this.
                    //   logoutref.current.style.display = "block";
                    // }}
                    // onMouseLeave={() => {
                    //   // TODO: Get rid of this.
                    //   setTimeout(() => {
                    //     logoutref.current.style.display = "none";
                    //   }, 2000);
                    // }}
                    className="nav-text-link"
                  >
                    {element.name}
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              ) : (
                <Link
                  key={element.url}
                  /*href={element[0]}*/
                  to={element.url}
                  onClick={() => changeSelected(element)}
                  className={`${
                    element.selected ? "selected" : ""
                  } nav-text-link`}
                >
                  {element.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
