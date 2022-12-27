import React, { useState, useEffect } from "react";
import "./_header.scss";
import { FaBars, FaFacebookSquare } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";
import logo from "./log.png";
import { Col, Row } from "react-bootstrap";
const Header = ({ handleToggleSidebar }) => {
  const [buttonPopup, setBoutonPopup] = useState(false);
  const [userMongo, setUserMongo] = useState(false);
  const [displayUser, setDisplayUser] = useState([]);
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
      .then((data) => {
        setUserMongo(data);
        sessionStorage.setItem("mongo-user", JSON.stringify(data));
      });
  }, [userMongo]);
  const handleFacebook = () => {
    if (userMongo?.facebook) {
      window.open(userMongo?.facebook);
    } else {
      toast.error(
        "Pas de lien Facebook, veillez l'ajouter en appuyant sur Gérer mon compte",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
  const handleInstagram = () => {
    if (userMongo?.instagram) {
      window.open(userMongo?.instagram);
    } else {
      toast.error(
        "Pas de lien Instagram, veillez l'ajouter en appuyant sur Gérer mon compte",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
  const handleTwitter = () => {
    if (userMongo?.twitter) {
      window.open(userMongo?.twitter);
    } else {
      toast.error(
        "Pas de lien Twitter, veillez l'ajouter en appuyant sur Gérer mon compte",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
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
            <p onClick={handleCompte}> Gérer mon compte</p>
            <hr />
            <div className="reseaux_sociaux" onClick={handleFacebook}>
              <FaFacebookSquare size={35} />
              <span>Facebook</span>
            </div>
            <div className="reseaux_sociaux" onClick={handleInstagram}>
              <AiFillInstagram size={35} />
              <span>Instagram</span>
            </div>
            <div className="reseaux_sociaux" onClick={handleTwitter}>
              <AiFillTwitterSquare size={35} />
              <span>Twitter</span>
            </div>
            <ToastContainer />
          </Col>
        </Row>
      </Popup>
    </div>
  );
};

export default Header;
