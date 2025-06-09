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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(handleNewBlock)}>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <div className="w-full">
                <label className="block font-medium mb-2 text-gray-700">
                  Block Marker Reference Number
                </label>
                <Input
                  className="w-full"
                  placeholder="Enter 8-character Ref Number"
                  {...register("blockMarkerRefNumber")}
                />
                {errors.blockMarkerRefNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.blockMarkerRefNumber.message}
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  className="w-full sm:w-1/2"
                  color="primary"
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
