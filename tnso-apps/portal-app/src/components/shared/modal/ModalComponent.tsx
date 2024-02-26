import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  showModal: boolean;
  children: JSX.Element;
  padding?: "sm" | "md" | "lg" | "xl";
  size?: "sm" | "lg" | "xl";
  variant?: "default" | "danger" | "success" | "warning" | "info";
  handleClose: (isShowModal: boolean) => void;
  handleSubmit?: () => void;
  title?: string;
  buttonCancel?: string;
  buttonSubmit?: string;
}

const ModalComponent: FC<Props> = ({ showModal, children, size, padding, variant = "default", handleClose, handleSubmit, title, buttonCancel, buttonSubmit }) => {
  return (
    <Modal
      show={showModal}
      // eslint-disable-next-line react/jsx-no-bind
      onHide={(): void => handleClose(false)}
      centered
      size={size}
      backdrop="static"
      contentClassName={`modal-component-${variant} modal-component-p-${padding} modal-component p-3 rounded`}>
      {title && (
        <Modal.Header className="m-auto">
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <div className="close-modal" onClick={(): void => handleClose(false)}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className="m-auto">{children}</Modal.Body>
      <Modal.Footer className="d-flex w-100 justify-content-center pb-3">
        {buttonCancel && (
          <Button
            variant={variant === "default" ? "primary" : "link"}
            className={variant === "default" ? "btn btn-textButton" : "btn-link-dark"}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(): void => handleClose(false)}>
            {buttonCancel}
          </Button>
        )}
        {buttonSubmit && (
          <Button
            variant={variant === "default" ? "outline-primary" : "outline-dark"}
            className={variant === "default" ? "btn btn-search" : ""}
            onClick={handleSubmit}
            data-bs-dismiss="modal">
            {buttonSubmit}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
