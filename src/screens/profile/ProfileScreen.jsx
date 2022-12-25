import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profileScreen.scss";
import { AiOutlineCamera } from "react-icons/ai";
import { MdCameraAlt } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram, AiFillTwitterSquare } from "react-icons/ai";
import photo from "../../components/header/user-solid.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const ProfileScreen = () => {
  const [displayUser, setDisplayUser] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const ref = useRef();
  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDisplayUser(data);
        setInput(data);
        setImage(data.photo);
      });
  }, []);
  function updateUser(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/login/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...input, photo: image }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleClick = (e) => {
    ref.current.click();
  };
  return (
    <Container className="profile">
      <Row className="profile__title">Mon profil</Row>
      <Form onSubmit={updateUser}>
        <Row className="profile__infos">
          <Col xs={0} md={1}></Col>
          <Col className="picture">
            <img src={image} alt="avatar" title="mon profil" />
            <input
              type="file"
              onChange={onImageChange}
              className="filetype"
              ref={ref}
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
            />
            <MdCameraAlt
              size={35}
              color={"#D0383C"}
              className="my-2"
              onClick={handleClick}
            />
            <p onClick={handleClick}>Modifier la photo</p>
          </Col>
          <Col className="infos" xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter votre nom"
                value={input?.username}
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
              />
            </Form.Group>
            <hr />
            <h5 className="my-4">Mes réseaux sociaux</h5>
            <Form.Group className="mb-3">
              <Row>
                <Col md={2} xs={2}>
                  <FaFacebookSquare size={43} color={"#D0383C"} />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="lien du profil"
                    value={input?.facebook}
                    onChange={(e) =>
                      setInput({ ...input, facebook: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col md={2} xs={2}>
                  <AiFillInstagram size={44} color={"#D0383C"} />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="lien du profil"
                    value={input?.instagram}
                    onChange={(e) =>
                      setInput({ ...input, instagram: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col md={2} xs={2}>
                  <AiFillTwitterSquare size={44} color={"#D0383C"} />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="lien du profil"
                    value={input?.twitter}
                    onChange={(e) =>
                      setInput({ ...input, twitter: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
            {/*  <Button
              variant="secondary"
              className="m-2"
              onClick={(e) => {
                setInput({ ...displayUser });
              }}
            >
              Annuler
            </Button> */}
            <Button variant="primary" type="submit" className="m-2 bouton">
              Modifier
            </Button>
          </Col>
          <Col xs={0} md={1}></Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProfileScreen;
