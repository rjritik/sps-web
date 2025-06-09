import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object().shape({
    blockMarkerRefNumber: yup
        .string()
        .trim()
        .length(8, "Block Marker Reference Number must be exactly 8 characters")
        .required("Block Marker Reference Number is required"),
});

const AddBlockRefModal = ({ isOpen, onOpenChange, title, quarryRefId }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            blockMarkerRefNumber: "",
        },
        resolver: yupResolver(schema),
    });

    const handleNewBlock = (data) => {
        localStorage.removeItem("blockMarkerRefNumber");
        localStorage.setItem("blockMarkerRefNumber", data.blockMarkerRefNumber);
        navigate("/quarry/add-update-blocks", {
            state: {
                blockMarkerRefNumber: data.blockMarkerRefNumber,
                quarryRefId: quarryRefId,
            },
        });
        onOpenChange(false); // Close modal after saving
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
                closeButton: "modal-close-btn",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(handleNewBlock)}>
                        <ModalHeader className="text-center flex flex-col gap-1 p-6">
                            {title}
                        </ModalHeader>
                        <ModalBody className="px-6 py-0">
                            <div className="w-full">
                                <Input
                                    label="Block Marker Reference No"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    placeholder="Enter 8-character Ref Number"
                                    className="w-full"
                                    {...register("blockMarkerRefNumber")}
                                />
                                {errors.blockMarkerRefNumber && (
                                    <small className="text-red-500 mt-1">
                                        {errors.blockMarkerRefNumber.message}
                                    </small>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter className="p-6">
                            <div className="w-full flex justify-center">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    color="primary"
                                    size="lg"
                                >
                                    Add New Block
                                </Button>
                            </div>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddBlockRefModal;
