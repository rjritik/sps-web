import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
  
  const ConfirmationModal = ({ isOpen, onOpenChange, title, body, action }) => {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) action(); // Navigate when modal closes
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>{body}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default ConfirmationModal;
  