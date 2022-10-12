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
import { Link } from "react-router-dom";

const SideBar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(log_out());
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/">
        <li>
          <MdHome size={23} />
          <span>Accueil</span>
        </li>
      </Link>
      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Abonnements</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Vidéos "J'aime"</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>Historique</span>
      </li>

      <li>
        <MdLibraryBooks size={23} />
        <span>Bibliothèque</span>
      </li>

      <hr />

      <li onClick={logOutHandler}>
        <MdExitToApp size={23} />
        <span>Se déconnecter</span>
      </li>

      <hr />
    </nav>
  );
};

export default SideBar;
