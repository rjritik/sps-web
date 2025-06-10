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
        Add Quarry Blocks
      </h4>

      <div className="bg-white p-4 mx-auto border border-neutral-200 w-full max-w-3xl shadow-sm rounded-2xl">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Tabs
            selectedKey={selectedKey}
            variant="underlined"
            onSelectionChange={setSelectedKey}
            className="disable-tabs-button"
            classNames={{
              tab: "pointer-events-none",
            }}
          >
            {/* STEP 1 - Overview */}
            <Tab key="step1" title="Overview" className="flex flex-col gap-2">
              <BlockInfoHeader value={blockMarkerRefNumber} />

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
                {errors.dateTime && (
                  <small className="text-red-500 mt-1">
                    {errors.dateTime.message}
                  </small>
                )}
              </div>

              <div>
                <Input
                  label="Block Type *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={(type == "g" ? "Granite" : "Marble") || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Grade *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={blockQualityGrade}
                />
              </div>

              <div>
                <Input
                  label="Block Inspector *"
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
                  label="Truck Number *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={additionalDetails?.truckNumber || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Invoice Number *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={additionalDetails?.invoiceNumber || "N/A"}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <Button color="primary" onPress={goToNext} className="grow">
                  Next
                </Button>
              </div>
            </Tab>

            {/* STEP 2 - Block Dimensions */}
            <Tab
              key="step2"
              title="Block Dimensions"
              className="flex flex-col gap-2"
            >
              <BlockInfoHeader value={blockMarkerRefNumber} />

              <div>
                <Input
                  label=" Block Length *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={blockDimension?.blockLength || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Block Width *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={blockDimension?.blockWidth || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Block Weight *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={blockDimension?.blockWeight || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Block Height *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={blockDimension?.blockHeight || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Block Volume *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={blockDimension?.blockVolume || "N/A"}
                />
              </div>

              <div>
                <Input
                  label="Purchasing Unit *"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={additionalDetails?.purchasingUnit || "N/A"}
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
              className="flex flex-col gap-2"
            >
              <BlockInfoHeader value={blockMarkerRefNumber} />
              <BlockInput
                label="Surface Quality *"
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
                label="Structural Integrity *"
                placeholder="Enter Structural Integrity Details"
                name="structuralIntegrity"
                register={register}
                errors={errors}
                type="text"
                rules={{
                  required: "Structural Integrity is required",
                }}
              />

              <BlockInput
                label="Surface Finish *"
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
                label="Edge Quality *"
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
                label="Thickness Check *"
                placeholder="Enter Thickness Check No"
                name="thicknessCheck"
                register={register}
                errors={errors}
                type="text"
                rules={{
                  required: "Thickness Check is required",
                }}
              />

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
              className="flex flex-col gap-2"
            >
              <BlockInfoHeader value={blockMarkerRefNumber} />
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
              className="flex flex-col gap-2"
            >
              <BlockInfoHeader value={blockMarkerRefNumber} />

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
  <div className="mb-3">
    <Input
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
  <div className="bg-brown-light-1 flex flex-wrap justify-between items-center gap-2 p-4 mb-4 border border-brown-light-2 rounded-lg">
    <div className="h6 text-gray-2 font-medium">
      Block Marker Reference Number
    </div>
    <div className="h6 text-gray-1 font-medium">
      {value?.refNumber || "N/A"}
    </div>
  </div>
);

export default BlockInspectionDetails;
