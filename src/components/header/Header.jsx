import React, { useState, useEffect } from "react";
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
import { Col, Row } from "react-bootstrap";
const Header = ({ handleToggleSidebar }) => {
  const [buttonPopup, setBoutonPopup] = useState(false);
  const [userMongo, setUserMongo] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handlePopup = () => setBoutonPopup(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${input}`);
  };
  const handleNotification = () => {
    navigate("/notifications");
  };
  const handleCompte = () => {
    navigate(`/profile/edit/${userMongo?._id}`);
    setBoutonPopup(false);
  };

  const user = useSelector((state) => state.auth?.user);
  const mongoUser = {
    username: user?.name,
    email: user?.email,
    photo: user?.photoURL,
  };
  useEffect(() => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(mongoUser),
    })
      .then((response) => response.json())
      .then((data) => setUserMongo(data));
  }, [userMongo]);
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
        <MdNotifications
          size={28}
          title="Voir les notifications"
          onClick={handleNotification}
        />
        <img
          src={userMongo?.photo}
          alt="avatar"
          title="mon profil"
          onClick={handlePopup}
        />
      </div>
      <Popup show={buttonPopup} onHide={() => setBoutonPopup(false)}>
        <Row>
          <Col className="avatar" xs={3} md={3}>
            <img src={userMongo?.photo} alt="avatar" title="mon profil" />
          </Col>
          <Col className="account">
            <p className="mb-0">{userMongo?.username}</p>
            <p className="mb-2">{userMongo?.email}</p>
            <p onClick={handleCompte}> Gérer votre compte</p>
            <hr />
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
          </Col>
        </Row>
      </Popup>
      {/* <Popup trigger={buttonPopup}>
        <div >
         
          <div>
            
          </div>
        </div>
      </Popup> */}
    </div>
  );
};

export default Header;
