import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@heroui/react";
import { Link } from "react-router-dom";

const CardAddressModal = ({
    isOpen,
    onOpenChange,
    address,
    location,
    name,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            className="card-address-modal"
            classNames={{
                closeButton: "!bg-neutral-400 text-white",
            }}
        >
            <ModalContent className="">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col px-0 pt-16 pb-0">
                            <Image
                                src="/images/img-granite.png"
                                alt="image"
                                width={1384}
                                height={391}
                                className="w-full !h-auto rounded-none"
                            />
                        </ModalHeader>
                        <ModalBody className="text-center px-6 py-12">
                            <div className="mx-auto max-w-md">
                                <h2 className="text-gray-1 font-semibold">
                                    {name}
                                </h2>
                                {address && (
                                    <>
                                        <h4 className="text-gray-2 font-semibold mt-6 mb-1">
                                            Quarry Address
                                        </h4>
                                        <p className="h5">{address}</p>
                                    </>
                                )}
                                {location && (
                                    <>
                                        <h4 className="text-gray-2 font-semibold mt-6 mb-1">
                                            Quarry Location
                                        </h4>
                                        <p className="h5">
                                            <Link
                                                target="_blank"
                                                to={`https://www.google.com/maps/search/?api=1&query=${location?.latitude},${location?.longitude}`}
                                                className="hover:underline"
                                            >{`https://www.google.com/maps/search/?api=1&query=${location?.latitude},${location?.longitude}`}</Link>
                                        </p>
                                    </>
                                )}
                            </div>
                        </ModalBody>

                        {/* background pattern */}
                        <Image
                            src="/images/img-modal-pattern.png"
                            alt="image"
                            width={543}
                            height={423}
                            classNames={{
                                wrapper:
                                    "absolute left-0 bottom-0 -z-[1] pointer-events-none",
                                img: "w-auto !h-auto rounded-none",
                            }}
                        />
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CardAddressModal;
