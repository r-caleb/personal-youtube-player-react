import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "./_popup.scss";

const Popup = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="right"
    >
      <Modal.Body className="show-grid">
        <Container>{props.children}</Container>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
