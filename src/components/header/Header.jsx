import React, { useState } from "react";
import "./_header.scss";
import { FaBars, FaFacebookSquare } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";
import logo from "./log.png";
const Header = ({ handleToggleSidebar }) => {
  const [buttonPopup, setBoutonPopup] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handlePopup = () => setBoutonPopup((value) => !value);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${input}`);
  };

  const user = useSelector((state) => state.auth?.user);
  console.log(user);
  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <img src={logo} alt="" className="header__logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} title="Voir les notifications" />
        <img
          src={user?.photoURL}
          alt="avatar"
          title="mon profil"
          onClick={handlePopup}
        />
      </div>
      <Popup trigger={buttonPopup}>
        <div className="popup_avatar_name">
          <img
            src={user?.photoURL}
            alt="avatar"
            title="mon profil"
            onClick={handlePopup}
          />
          <div>
            <p>{user?.name}</p>
            <p> Gérer votre compte</p>
            <div className="reseaux_sociaux">
              <FaFacebookSquare size={35} />
              <span>Facebook</span>
            </div>
            <div className="reseaux_sociaux">
              <AiFillInstagram size={35} />
              <span>Instagram</span>
            </div>
            <div className="reseaux_sociaux">
              <AiFillTwitterSquare size={35} />
              <span>Twitter</span>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Header;
