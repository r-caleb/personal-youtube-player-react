import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profileScreen.scss";
import { AiOutlineCamera } from "react-icons/ai";
import { MdCameraAlt } from "react-icons/md";
import photo from "../../components/header/user-solid.svg";

const ProfileScreen = () => {
  return (
    <Container className="profile">
      <Row className="profile__title">Mon profil</Row>
      <Row className="profile__infos">
        <Col xs={0} md={1}></Col>
        <Col className="picture">
          <img src={photo} alt="avatar" title="mon profil" />
          <MdCameraAlt size={35} />
          <p>Modifier la photo</p>
        </Col>
        <Col className="infos" xs={12} md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Enter votre nom" />
            </Form.Group>
            <hr />
            <h4 className="mt-4">Mes réseaux sociaux</h4>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
