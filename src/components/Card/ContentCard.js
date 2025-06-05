import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    useDisclosure,
} from "@heroui/react";
import IconGranite from "../../utils/icons/IconGranite";
import IconArrow from "../../utils/icons/IconArrow";
import IconTruck from "../../utils/icons/IconTruck";
import CardAddressModal from "./CardAddressModal";

const ContentCard = ({
    className,
    name,
    quantity,
    address,
    location,
    image,
    truckNumber,
}) => {
    // console.log("location = ", location);
    // console.log("truckNumber = ", truckNumber);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card
                className={`content-card border border-neutral-200 shadow-sm ${
                    className ? className : ""
                }`}
            >
                <CardHeader className="flex gap-4 p-4">
                    <div className="bg-brown-light-1 flex justify-center items-center gap-4 border border-brown-light-2 w-12 min-w-12 aspect-square rounded-full">
                        {truckNumber ? <IconTruck /> : <IconGranite />}
                    </div>
                    <div className="flex flex-col">
                        {name && (
                            <h5 className="text-gray-2 font-semibold">
                                {name}
                            </h5>
                        )}
                        {truckNumber && (
                            <h5 className="text-gray-2 font-semibold">
                                Truck No
                                <span className="text-gray-1 font-normal block">
                                    {truckNumber}
                                </span>
                            </h5>
                        )}
                    </div>
                </CardHeader>

                {quantity && (
                    <CardBody className="pl-20 pr-4 pt-0 pb-4 overflow-visible">
                        <div className="text-3xl xl:text-4xl text-gray-4 font-medium">
                            {quantity}
                        </div>
                    </CardBody>
                )}

                <CardFooter className="justify-between gap-3 p-4">
                    <Button color="secondary" className="rounded-full">
                        View {truckNumber ? "Block" : "Quarry"}
                    </Button>
                    {address && (
                        <Button
                            isIconOnly
                            aria-label="Link"
                            variant="bordered"
                            className="-mr-3 border-none"
                            onPress={onOpen}
                        >
                            <IconArrow />
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <CardAddressModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                address={address}
                location={location}
            />
        </>
    );
};

export default ContentCard;
