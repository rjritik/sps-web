import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
    Button,
    DatePicker,
    Card,
    CardBody,
    Input,
    Image,
} from "@heroui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    today,
    getLocalTimeZone,
    parseDate,
    CalendarDate,
} from "@internationalized/date";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import { useDispatch } from "react-redux";
import { createSecurityCheck } from "../store/slices/trucks/thunks";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const breadcrumbItems = [
    { title: " Truck Details", link: "/security-check" },
    { title: "Total Block List", link: "" },
    { title: "Audit Block Details", link: "" },
];

// Validation Schema
const schema = yup.object().shape({
    date: yup.date().required("Date is required"),
    securityPersonnelName: yup
        .string()
        .trim()
        .required("Security personnel name is required"),
});

const SecurityCheckAuditDetails = () => {
    const { auditDetails } = useLocation().state || {};
    const { additionalDetails, refNumber, _id } = auditDetails || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    console.log("auditDetails", auditDetails);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: today(getLocalTimeZone()), // this is a CalendarDate
            securityPersonnelName: "",
        },
        resolver: yupResolver(schema),
    });

    const onOpen = () => setIsOpen(true);
    const onOpenChange = (open) => setIsOpen(open);

    const getImageUrl = (imgUrl) => {
        if (!imgUrl) return "/images/img-thumbnail.jpg";
        if (
            imgUrl.startsWith("file://") ||
            imgUrl.startsWith("https://example")
        ) {
            return "/images/img-thumbnail.jpg";
        }
        return imgUrl;
    };

    const onSubmit = async (data) => {
        try {
            const securityCheckData = {
                blockMarkerRefNumber: refNumber,
                dateTime: new Date(data.date).toISOString(),
                wrapping: additionalDetails?.wrappingRequired,
                securityPersonnelName: data.securityPersonnelName,
                invoiceNumber: additionalDetails?.invoiceNumber,
                truckDetails: {
                    truckNumber: additionalDetails?.truckNumber,
                    truckWeight: additionalDetails?.truckWeight || 0,
                },
            };

            const result = await dispatch(
                createSecurityCheck(securityCheckData)
            ).unwrap();

            if (result?.securityCheck) {
                onOpen(); // trigger modal after success
            }
        } catch (err) {
            console.error("Security Check Failed:", err);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white px-6 py-4 -mx-6 -mt-6 mb-6">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="flex justify-between items-center gap-4 mb-6">
                <h4 className="text-gradient-brown font-bold pl-5 relative before:content-[''] before:bg-gradient-brown before:w-2 before:h-full before:absolute before:left-0 before:top-0">
                    Audit Block Details
                </h4>

                <Button color="primary" onPress={handleSubmit(onSubmit)}>
                    Save Details
                </Button>
            </div>

            {/* Block Marker */}
            <div className="bg-brown-light-1 flex flex-wrap justify-between items-center gap-2 p-4 mb-4 border border-brown-light-2 rounded-lg">
                <div className="h5 text-gray-2 font-medium">
                    Block Marker Reference Number
                </div>
                <div className="h5 text-gray-1 font-medium">
                    {refNumber || "N/A"}
                </div>
            </div>

            {/* Block Information Card */}
            <Card className="mb-4 border border-neutral-200 w-full shadow-sm">
                <CardBody className="gap-4 p-4">
                    <div>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Date *"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    {...field}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)} // No .toDate()
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.date && (
                            <small className="text-red-500 mt-1">
                                {errors.date.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Security Personnel *"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="First & Last Narne"
                            {...register("securityPersonnelName")}
                            className="w-full"
                        />
                        {errors.securityPersonnelName && (
                            <>
                                <small className="text-red-500 mt-1">
                                    {errors.securityPersonnelName.message}
                                </small>
                            </>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Wrapping *"
                            labelPlacement="outside"
                            variant="bordered"
                            isDisabled
                            className="w-full"
                            defaultValue={
                                additionalDetails?.wrappingRequired
                                    ? "Yes"
                                    : "No"
                            }
                        />
                    </div>

                    <div>
                        <Input
                            label="Invoice Number *"
                            labelPlacement="outside"
                            variant="bordered"
                            isDisabled
                            className="w-full"
                            defaultValue={
                                additionalDetails?.invoiceNumber || "N/A"
                            }
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Truck Details */}
            <div className="bg-brown-light-1 flex flex-wrap justify-center items-center gap-2 p-4 mb-4 border border-brown-light-2 rounded-lg">
                <div className="h5 text-gray-2 font-medium">Truck Details</div>
            </div>

            {/* Truck Details Card */}
            <Card className="mb-4 border border-neutral-200 w-full shadow-sm">
                <CardBody className="gap-4 p-4">
                    <div>
                        <Input
                            label="Truck Number *"
                            labelPlacement="outside"
                            variant="bordered"
                            isDisabled
                            className="w-full"
                            defaultValue={
                                additionalDetails?.truckNumber || "N/A"
                            }
                        />
                    </div>

                    <div>
                        <Input
                            label="Truck Weight *"
                            labelPlacement="outside"
                            variant="bordered"
                            isDisabled
                            className="w-full"
                            defaultValue={
                                additionalDetails?.truckWeight || "100"
                            }
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Truck Weight Documents */}
            <Card className="mb-4 border border-neutral-200 w-full shadow-sm">
                <CardBody className="gap-4 p-4">
                    <div className="h5 text-gray-2 font-medium text-center">
                        Truck Weight Documents
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            isIconOnly
                            aria-label="Like"
                            color="secondary"
                            className="w-[3.125rem] h-auto aspect-square rounded-full"
                        >
                            <Image
                                alt="icon pdf"
                                src="/images/icon-pdf.svg"
                                width={18}
                                height={23}
                                removeWrapper
                                className="w-auto !h-auto max-h-6 rounded-none"
                            />
                        </Button>
                        <Button
                            isIconOnly
                            aria-label="Like"
                            color="secondary"
                            className="w-[3.125rem] h-auto aspect-square rounded-full"
                        >
                            <Image
                                alt="icon word"
                                src="/images/icon-word.png"
                                width={25}
                                height={23}
                                removeWrapper
                                className="w-auto !h-auto max-h-6 rounded-none"
                            />
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Images */}
            <Card className="mb-4 border border-neutral-200 w-full shadow-sm">
                <CardBody className="gap-4 p-4">
                    <h6 className="text-primary font-semibold">
                        Block Pictures
                    </h6>
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {additionalDetails?.attachments?.length > 0 ? (
                            additionalDetails.attachments.map(
                                (picture, index) => (
                                    <Image
                                        key={index}
                                        alt="block pictures"
                                        src={getImageUrl(picture)}
                                        width={750}
                                        height={562}
                                        removeWrapper
                                        className="w-full !h-auto aspect-video object-cover rounded-xl"
                                    />
                                )
                            )
                        ) : (
                            <p>No pictures available</p>
                        )}
                    </div>
                </CardBody>
            </Card>

            {isOpen && (
                <ConfirmationModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onOpenChange={onOpenChange}
                    title="Blocks Approved Successfully"
                    body="The selected granite blocks have been marked as inspected and are now approved for dispatch."
                    action={() => navigate("/security-check")}
                />
            )}
        </DashboardLayout>
    );
};

export default SecurityCheckAuditDetails;
