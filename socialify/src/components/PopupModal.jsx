import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

function PopupModal({ children, isOpen, setIsOpen, heading }) {
  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        w={{ base: "100%", md: "450px" }}
        mx={"auto"}
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalBody>
            {/* Include your custom component inside the modal */}
            {children}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal} w={"100%"} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PopupModal;
