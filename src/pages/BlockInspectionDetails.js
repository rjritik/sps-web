import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { Tabs, Tab } from "@heroui/tabs";
import {
    Button,
    Input,
    RadioGroup,
    Radio,
    DatePicker,
    Textarea,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    NumberInput,
    Image,
    CheckboxGroup,
    Checkbox,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import useFileUpload from "../hooks/useFileUpload";
import { addBlock } from "../store/slices/quarries/thunks";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import IconUpload from "../utils/icons/IconUpload";
import IconMic from "../utils/icons/IconMic";
import IconCamera from "../utils/icons/IconCamera";
import IconClose from "../utils/icons/IconClose";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

const breadcrumbItems = [
    { title: "Total Block List", link: "/block-inspection" },
    { title: "Block Inspection", link: "" },
];

const BlockInspectionDetails = () => {
    const [quantity, setQuantity] = useState(1);

    const handleQtyIncrease = () => setQuantity((prev) => prev + 1);
    const handleQtyDecrease = () =>
        setQuantity((prev) => Math.max(0, prev - 1));

    const location = useLocation();
    const navigate = useNavigate();
    const { details } = location.state || {};

    console.log({ details });

    const {
        blockMarkerRefNumber,
        truckDetails,
        wrapping,
        securityPersonnelName,
        invoiceNumber,
    } = details || {};

    const {
        additionalDetails,
        blockColor,
        blockDimension,
        dateTime,
        quarryRefId,
        refNumber,
        type,
        blockQualityGrade,
    } = blockMarkerRefNumber || {};

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger,
        reset,
    } = useForm({
        defaultValues: {
            //   blockType: "",
            //   blockQualityGrade: "",
            //   blockColor: "",
            //   date: null,
            //   blockLength: "",
            //   blockWidth: "",
            //   blockWeight: "",
            //   blockHeight: "",
            //   blockVolume: "",
            //   purchasingUnit: "",
            //   truckNumber: "",
            //   invoiceNumber: "",
            //   wrappingRequired: "",
            //   remarks: "",
        },
    });

    const [selectedKey, setSelectedKey] = useState("step1");

    //   const {
    //     uploadFile,
    //     attachments,
    //     isUploading,
    //     uploadError,
    //     removeAttachment,
    //     setAttachments,
    //   } = useFileUpload(5);

    //   useEffect(() => {
    //     if (!blockMarkerRefNumber) {
    //       navigate("/quarry");
    //     }
    //   }, []);

    //   useEffect(() => {
    //     if (blockDetails) {
    //       const qualityGrade =
    //         blockDetails.blockQualityGrade === "Premium" ? "Premium" : "Commercial";

    //       // Parse the date string to a Date object
    //       let parsedDate = null;
    //       const isoDate = new Date(blockDetails.dateTime)
    //         .toISOString()
    //         .split("T")[0]; // "YYYY-MM-DD"
    //       parsedDate = parseDate(isoDate); // Convert to expected format

    //       reset({
    //         blockType: blockDetails.type,
    //         blockQualityGrade: qualityGrade,
    //         blockColor: blockDetails.blockColor,
    //         date: parsedDate,
    //         blockLength: blockDetails.blockDimension?.blockLength?.toString() || "",
    //         blockWidth: blockDetails.blockDimension?.blockWidth?.toString() || "",
    //         blockWeight: blockDetails.blockDimension?.blockWeight?.toString() || "",
    //         blockHeight: blockDetails.blockDimension?.blockHeight?.toString() || "",
    //         blockVolume: blockDetails.blockDimension?.blockVolume?.toString() || "",
    //         purchasingUnit: blockDetails.additionalDetails?.purchasingUnit || "",
    //         truckNumber: blockDetails.additionalDetails?.truckNumber || "",
    //         invoiceNumber: blockDetails.additionalDetails?.invoiceNumber || "",
    //         wrappingRequired: blockDetails.additionalDetails?.wrappingRequired
    //           ? "yes"
    //           : "no",
    //         remarks: blockDetails.additionalDetails?.remarks || "",
    //       });

    //       // Set attachments if they exist in edit mode
    //       if (isEdit && blockDetails.additionalDetails?.attachments?.length > 0) {
    //         setAttachments(blockDetails.additionalDetails.attachments);
    //       }
    //     }
    //   }, [blockDetails, reset, isEdit, setAttachments]);

    //   const handleFileChange = async (e) => {
    //     const files = Array.from(e.target.files);

    //     for (let file of files) {
    //       const result = await uploadFile(file);
    //       if (!result.success) {
    //         alert(result.error);
    //         break;
    //       }
    //     }
    //   };

    const goToNext = async () => {
        // let fieldsToValidate = [];

        // if (selectedKey === "step1") {
        //   fieldsToValidate = ["blockInspector", "dateTime"];
        // } else if (selectedKey === "step2") {
        //   fieldsToValidate = [];
        // }

        // const isValid = await trigger(fieldsToValidate); // ✅ Validate specific fields

        // if (isValid) {
        //   if (selectedKey === "step1") setSelectedKey("step2");
        //   else if (selectedKey === "step2") setSelectedKey("step3");
        // } else {
        //   console.log("Validation failed for:", fieldsToValidate);
        // }

        if (selectedKey === "step1") setSelectedKey("step2");
        else if (selectedKey === "step2") setSelectedKey("step3");
        else if (selectedKey === "step3") setSelectedKey("step4");
        else if (selectedKey === "step4") setSelectedKey("step5");
    };

    const goToPrev = () => {
        if (selectedKey === "step2") setSelectedKey("step1");
        else if (selectedKey === "step3") setSelectedKey("step2");
        else if (selectedKey === "step4") setSelectedKey("step3");
        else if (selectedKey === "step5") setSelectedKey("step4");
    };

    const handleFormSubmit = (data) => {
        console.log("Form Data:", data);

        //   const payload = {
        //     refNumber: blockMarkerRefNumber,
        //     type: data.blockType,
        //     dateTime: data.date ? new Date(data.date).toISOString() : null,
        //     blockColor: data.blockColor,
        //     blockQualityGrade:
        //       data.blockQualityGrade === "Premium"
        //         ? "A"
        //         : data.blockQualityGrade === "Commercial"
        //         ? "B"
        //         : "",
        //     quarryRefId: quarryRefId,
        //     blockDimension: {
        //       blockLength: parseFloat(data.blockLength) || 0,
        //       blockWidth: parseFloat(data.blockWidth) || 0,
        //       blockHeight: parseFloat(data.blockHeight) || 0,
        //       blockVolume: parseFloat(data.blockVolume) || 0,
        //       blockWeight: parseFloat(data.blockWeight) || 0,
        //     },
        //     additionalDetails: {
        //       purchasingUnit: data.purchasingUnit,
        //       wrappingRequired: data.wrappingRequired === "yes",
        //       truckNumber: data.truckNumber,
        //       invoiceNumber: data.invoiceNumber,
        //       attachments: attachments,
        //       remarks: data.remarks,
        //     },
        //   };
        //   navigate(`/quarry/block-details`, {
        //     state: { blockDetails: payload, isPreview: true, isEdit },
        //   });
    };

    return (
        <DashboardLayout>
            <div className="bg-white px-6 py-4 -mx-6 -mt-6 mb-6">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <h4 className="text-gradient-brown font-bold pl-5 mb-6 relative before:content-[''] before:bg-gradient-brown before:w-2 before:h-full before:absolute before:left-0 before:top-0">
                Block Inspection
            </h4>

            <div className="bg-white p-4 mx-auto border border-neutral-200 w-full max-w-3xl shadow-sm rounded-2xl">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Tabs
                        selectedKey={selectedKey}
                        variant="underlined"
                        onSelectionChange={setSelectedKey}
                        className="disable-tabs-button"
                        classNames={{
                            base: "w-full overflow-x-auto",
                            tab: "pointer-events-none",
                        }}
                    >
                        {/* STEP 1 - Overview */}
                        <Tab
                            key="step1"
                            title="Overview"
                            className="flex flex-col gap-4"
                        >
                            <BlockInfoHeader value={blockMarkerRefNumber} />

                            <BlockInfoHeaderGray
                                text="Block Number"
                                value="3588"
                            />

                            <div>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            isRequired
                                            label="Date"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            {...field}
                                            value={field.value}
                                            onChange={(val) =>
                                                field.onChange(val)
                                            } // No .toDate()
                                            className="w-full"
                                        />
                                    )}
                                />
                                {errors.dateTime && (
                                    <small className="text-red-500 mt-1">
                                        {errors.dateTime.message}
                                    </small>
                                )}
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Block Type"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        (type == "g" ? "Granite" : "Marble") ||
                                        "N/A"
                                    }
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Grade"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    placeholder="Grade"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={blockQualityGrade}
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Block Inspector"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    placeholder="First & Last Name"
                                    {...register("blockInspector")}
                                    className="w-full"
                                />
                                {errors.blockInspector && (
                                    <>
                                        <small className="text-red-500 mt-1">
                                            {errors.blockInspector.message}
                                        </small>
                                    </>
                                )}
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Truck Number"
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
                                    isRequired
                                    label="Invoice Number"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        additionalDetails?.invoiceNumber ||
                                        "N/A"
                                    }
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    color="primary"
                                    onPress={goToNext}
                                    className="grow"
                                >
                                    Next
                                </Button>
                            </div>
                        </Tab>

                        {/* STEP 2 - Block Dimensions */}
                        <Tab
                            key="step2"
                            title="Block Dimensions"
                            className="flex flex-col gap-4"
                        >
                            <BlockInfoHeader value={blockMarkerRefNumber} />

                            <BlockInfoHeaderGray text="Dimensions" value="" />

                            <div>
                                <Input
                                    isRequired
                                    label=" Block Length"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        blockDimension?.blockLength || "N/A"
                                    }
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Block Width"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        blockDimension?.blockWidth || "N/A"
                                    }
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Block Weight"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        blockDimension?.blockWeight || "N/A"
                                    }
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Block Height"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        blockDimension?.blockHeight || "N/A"
                                    }
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Block Volume"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        blockDimension?.blockVolume || "N/A"
                                    }
                                />
                            </div>

                            <div>
                                <Input
                                    isRequired
                                    label="Purchasing Unit"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isDisabled
                                    className="w-full"
                                    defaultValue={
                                        additionalDetails?.purchasingUnit ||
                                        "N/A"
                                    }
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    color="secondary"
                                    onPress={goToPrev}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Previous
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={goToNext}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Next
                                </Button>
                            </div>
                        </Tab>

                        {/* STEP 3 - Observations */}
                        <Tab
                            key="step3"
                            title="Observations"
                            className="flex flex-col gap-4"
                        >
                            <BlockInfoHeader value={blockMarkerRefNumber} />

                            <BlockInfoHeaderGray text="Observations" value="" />

                            <BlockInput
                                label="Surface Quality"
                                placeholder="Enter Surface Quality Details"
                                name="surfaceQuality"
                                register={register}
                                errors={errors}
                                type="text"
                                rules={{
                                    required: "Surface Quality is required",
                                }}
                            />

                            <BlockInput
                                label="Structural Integrity"
                                placeholder="Enter Structural Integrity Details"
                                name="structuralIntegrity"
                                register={register}
                                errors={errors}
                                type="text"
                                rules={{
                                    required:
                                        "Structural Integrity is required",
                                }}
                            />

                            <BlockInput
                                label="Surface Finish"
                                placeholder="Enter Surface Finish Details"
                                name="surfaceFinish"
                                register={register}
                                errors={errors}
                                type="text"
                                rules={{
                                    required: "Surface Finish is required",
                                }}
                            />

                            <BlockInput
                                label="Edge Quality"
                                placeholder="Enter Edge Quality Details"
                                name="edgeQuality"
                                register={register}
                                errors={errors}
                                type="text"
                                rules={{
                                    required: "Edge Quality is required",
                                }}
                            />

                            <BlockInput
                                label="Thickness Check"
                                placeholder="Enter Thickness Check No"
                                name="thicknessCheck"
                                register={register}
                                errors={errors}
                                type="text"
                                rules={{
                                    required: "Thickness Check is required",
                                }}
                            />

                            {/* Observation group */}
                            <div className="flex flex-col gap-4">
                                <RadioGroup
                                    isRequired
                                    name="cracks"
                                    label="Crack & Fracture Detection"
                                    orientation="horizontal"
                                    classNames={{
                                        label: "form-label",
                                    }}
                                >
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </RadioGroup>

                                <div>
                                    <label className="form-label">
                                        Crack Count{" "}
                                        <span className="required">*</span>
                                    </label>

                                    <div className="flex items-center gap-3 pl-10 relative">
                                        <Button
                                            onPress={handleQtyDecrease}
                                            variant="bordered"
                                            className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                                        >
                                            –
                                        </Button>

                                        <NumberInput
                                            label="Qty"
                                            labelPlacement="outside-left"
                                            placeholder="1"
                                            variant="bordered"
                                            hideStepper
                                            minValue={0}
                                            value={quantity}
                                            onValueChange={(val) =>
                                                setQuantity(Number(val))
                                            }
                                            classNames={{
                                                label: "p-0 opacity-60 absolute left-0 top-1/2 -translate-y-1/2",
                                                base: "w-10",
                                                inputWrapper: "px-0",
                                                input: "text-center",
                                            }}
                                        />

                                        <Button
                                            onPress={handleQtyIncrease}
                                            variant="bordered"
                                            className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">
                                        Drawing Board{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Image
                                        src="/images/img-drawing-board.png"
                                        alt="drawing board"
                                        width={516}
                                        height={486}
                                        className=""
                                        classNames={{
                                            wrapper: "mx-auto mt-2 w-44",
                                            img: "!h-auto",
                                        }}
                                    />
                                </div>

                                <CheckboxGroup
                                    isRequired
                                    label="Select Side"
                                    orientation="horizontal"
                                    name="sides"
                                    defaultValue={["side-a"]}
                                    className=""
                                    classNames={{
                                        label: "form-label",
                                        base: "checkbox-sides",
                                        wrapper: "wrapper",
                                    }}
                                >
                                    <Checkbox value="side-a">Side a</Checkbox>
                                    <Checkbox value="side-b">Side b</Checkbox>
                                    <Checkbox value="side-c">Side c</Checkbox>
                                    <Checkbox value="side-d">Side d</Checkbox>
                                    <Checkbox value="side-e">Side e</Checkbox>
                                    <Checkbox value="side-f">Side f</Checkbox>
                                </CheckboxGroup>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    color="secondary"
                                    onPress={goToPrev}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Previous
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={goToNext}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Next
                                </Button>
                            </div>
                        </Tab>

                        {/* STEP 4 - Cracks and Fracture Detection */}
                        <Tab
                            key="step4"
                            title="Cracks and Fracture Detection"
                            className="flex flex-col gap-4"
                        >
                            <BlockInfoHeader value={blockMarkerRefNumber} />

                            <BlockInfoHeaderGray
                                text="Crack & Fracture Detection"
                                value=""
                            />

                            <div>
                                <label className="form-label">
                                    Count <span className="required">*</span>
                                </label>

                                <div className="flex items-center gap-3 pl-10 relative">
                                    <Button
                                        onPress={handleQtyDecrease}
                                        variant="bordered"
                                        className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                                    >
                                        –
                                    </Button>

                                    <NumberInput
                                        label="Qty"
                                        labelPlacement="outside-left"
                                        placeholder="1"
                                        variant="bordered"
                                        hideStepper
                                        minValue={0}
                                        value={quantity}
                                        onValueChange={(val) =>
                                            setQuantity(Number(val))
                                        }
                                        classNames={{
                                            label: "p-0 opacity-60 absolute left-0 top-1/2 -translate-y-1/2",
                                            base: "w-10",
                                            inputWrapper: "px-0",
                                            input: "text-center",
                                        }}
                                    />

                                    <Button
                                        onPress={handleQtyIncrease}
                                        variant="bordered"
                                        className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                                    >
                                        +
                                    </Button>
                                </div>

                                <Textarea
                                    variant="bordered"
                                    value="Side C"
                                    classNames={{
                                        base: "mt-2",
                                        innerWrapper: "h-72",
                                    }}
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    color="secondary"
                                    onPress={goToPrev}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Previous
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={goToNext}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Next
                                </Button>
                            </div>
                        </Tab>

                        {/* STEP 5 - Attachments */}
                        <Tab
                            key="step5"
                            title="Attachments"
                            className="flex flex-col gap-4"
                        >
                            <BlockInfoHeader value={blockMarkerRefNumber} />

                            <BlockInfoHeaderGray text="Attachments" value="" />

                            <div>
                                <label className="form-label">
                                    Block Pictures
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
                                    <Image
                                        alt="block pictures"
                                        src="/images/img-thumbnail.jpg"
                                        width={750}
                                        height={562}
                                        removeWrapper
                                        className="w-full !h-auto aspect-square object-cover rounded-lg"
                                    />
                                    <Image
                                        alt="block pictures"
                                        src="/images/img-thumbnail.jpg"
                                        width={750}
                                        height={562}
                                        removeWrapper
                                        className="w-full !h-auto aspect-square object-cover rounded-lg"
                                    />
                                    <Image
                                        alt="block pictures"
                                        src="/images/img-thumbnail.jpg"
                                        width={750}
                                        height={562}
                                        removeWrapper
                                        className="w-full !h-auto aspect-square object-cover rounded-lg"
                                    />
                                    <Image
                                        alt="block pictures"
                                        src="/images/img-thumbnail.jpg"
                                        width={750}
                                        height={562}
                                        removeWrapper
                                        className="w-full !h-auto aspect-square object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-wrap justify-end gap-4 mt-4">
                                    <Button
                                        isIconOnly
                                        aria-label="Like"
                                        color="default"
                                        className="w-8 h-auto aspect-square rounded-full"
                                    >
                                        <IconMic className="w-auto h-4" />
                                    </Button>
                                    <Button
                                        isIconOnly
                                        aria-label="Like"
                                        color="default"
                                        className="w-8 h-auto aspect-square rounded-full"
                                    >
                                        <IconCamera className="w-auto h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Remarks</label>
                                <Textarea
                                    variant="bordered"
                                    value="Poor-quality sandstone. Irregular texture with visible impurities. Inconsistent color with streaks of discoloration. Numerous deep cracks and fissures throughout the block. Significant structural weaknesses observed. Excessive drill holes and wedge marks, making the block unsuitable for most applications. Extensive inclusions and mineral veins that affect the stone's strength and appearance."
                                    classNames={{
                                        base: "mt-3",
                                        innerWrapper: "h-40",
                                    }}
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    color="secondary"
                                    onPress={goToPrev}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Previous
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={goToNext}
                                    className="grow w-full max-w-1/2 min-w-0"
                                >
                                    Next
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                </form>
            </div>
        </DashboardLayout>
    );
};

const BlockInput = ({ label, placeholder, name, register, errors, rules }) => (
    <div>
        <Input
            isRequired
            label={label}
            labelPlacement="outside"
            variant="bordered"
            className="w-full"
            placeholder={placeholder}
            {...register(name, rules)}
        />
        {errors[name] && (
            <small className="text-red-500 mt-1">{errors[name].message}</small>
        )}
    </div>
);

const BlockInfoHeader = ({ value }) => (
    <div className="bg-brown-light-1 flex flex-wrap justify-between items-center gap-2 p-4 border border-brown-light-2 rounded-lg">
        <div className="h6 text-gray-2 font-medium">
            Block Marker Reference Number
        </div>
        <div className="h6 text-gray-1 font-medium">
            {value?.refNumber || "N/A"}
        </div>
    </div>
);

const BlockInfoHeaderGray = ({ text, value }) => (
    <div
        className={`bg-neutral-100 flex flex-wrap items-center gap-2 p-4 border border-neutral-200 rounded-lg ${
            value ? "justify-between" : "justify-center"
        }`}
    >
        {text && <div className="h6 text-gray-2 font-medium">{text}</div>}
        {value && <div className="h6 text-gray-1 font-medium">{value}</div>}
    </div>
);

export default BlockInspectionDetails;
