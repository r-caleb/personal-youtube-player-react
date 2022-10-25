import React from "react";
import "./_sidebar.scss";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
} from "react-icons/md";
import { log_out } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const SideBar = ({ sidebar, handleToggleSidebar, selecteur }) => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(log_out());
  };
  let activeStyle = {
    background: "#D0383C",
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        end
      >
        <li>
          <MdHome size={23} />
          <span>Accueil</span>
        </li>
      </NavLink>
      <NavLink
        to="/feed/subscriptions"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <li>
          <MdSubscriptions size={23} />
          <span>Abonnements</span>
        </li>
      </NavLink>
      <NavLink
        to="/feed/like"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <li>
          <MdThumbUp size={23} />
          <span>Vidéos "J'aime"</span>
        </li>
      </NavLink>
      {/* <li>
        <MdHistory size={23} />
        <span>Historique</span>
      </li>

      <li>
        <MdLibraryBooks size={23} />
        <span>Bibliothèque</span>
      </li> */}

      <hr />

      <NavLink onClick={logOutHandler}>
        <MdExitToApp size={23} />
        <span>Se déconnecter</span>
      </NavLink>

      <hr />
    </nav>
  );
};

export default SideBar;
