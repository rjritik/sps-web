import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import IconSuccess from "../../utils/icons/IconSuccess";

const ConfirmationModal = ({ isOpen, onOpenChange, title, body, action }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                onOpenChange(open);
                if (!open) action(); // Navigate when modal closes
            }}
            classNames={{
                closeButton: "modal-close-btn",
            }}
        >
            <ModalContent className="text-center">
                {(onClose) => (
                    <>
                        <ModalHeader className="p-6">
                            <IconSuccess className="mx-auto" />
                        </ModalHeader>
                        <ModalBody className="px-6 py-0">
                            <div className="mx-auto max-w-80">
                                {title && (
                                    <h4 className="font-semibold mb-2">
                                        {title}
                                    </h4>
                                )}
                                {body && (
                                    <p className="text-sm text-gray-4 font-normal">
                                        {body}
                                    </p>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter className="p-6">
                            <Button
                                color="primary"
                                className="mx-auto w-full max-w-56"
                                onPress={onClose}
                            >
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
