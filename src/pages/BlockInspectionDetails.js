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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useFileUpload from "../hooks/useFileUpload";
import { useDispatch } from "react-redux";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import IconUpload from "../utils/icons/IconUpload";
import IconMic from "../utils/icons/IconMic";
import IconCamera from "../utils/icons/IconCamera";
import IconClose from "../utils/icons/IconClose";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { createBlockInspection } from "../store/slices/inspector/thunks";
import ConfirmationModal from "../components/Modal/ConfirmationModal";

const breadcrumbItems = [
  { title: "Total Block List", link: "/block-inspection" },
  { title: "Block Inspection", link: "" },
];

const validationSchema = yup.object().shape({
  blockInspector: yup.string().required("Block Inspector is required"),
  date: yup.object().required("Date is required").nullable(),
  surfaceQuality: yup.string().required("Surface Quality is required"),
  structuralIntegrity: yup
    .string()
    .required("Structural Integrity is required"),
  surfaceFinish: yup.string().required("Surface Finish is required"),
  edgeQuality: yup.string().required("Edge Quality is required"),
  thicknessCheck: yup.string().required("Thickness Check is required"),
  cracks: yup.string().required("Crack & Fracture Detection is required"),
  crackCount: yup
    .number()
    .min(0, "Crack count cannot be negative")
    .required("Crack count is required")
    .typeError("Crack count must be a number"),
  sides: yup
    .array()
    .of(yup.string())
    .min(1, "At least one side must be selected")
    .required("Select Side is required"),
  remarks: yup.string(),
  blockLength: yup
    .number()
    .min(0, "Block Length cannot be negative")
    .required("Block Length is required")
    .typeError("Block Length must be a number"),

  blockWeight: yup
    .number()
    .min(0, "Block Weigth cannot be negative")
    .required("Block Weigth is required")
    .typeError("Block Weigth must be a number"),

  blockWidth: yup
    .number()
    .min(0, "Block Width cannot be negative")
    .required("Block Width is required")
    .typeError("Block Width must be a number"),

  blockHeight: yup
    .number()
    .min(0, "Block Height cannot be negative")
    .required("Block Height is required")
    .typeError("Block Height must be a number"),

  blockVolume: yup
    .number()
    .min(0, "Block Volume cannot be negative")
    .required("Block Volume is required")
    .typeError("Block Volume must be a number"),
});

const BlockInspectionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      date: null,
      blockInspector: "",
      surfaceQuality: "",
      structuralIntegrity: "",
      surfaceFinish: "",
      edgeQuality: "",
      thicknessCheck: "",
      cracks: "no",
      crackCount: 0,
      sides: [],
      remarks: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const [selectedKey, setSelectedKey] = useState("step1");
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(open);

  const {
    uploadFile,
    attachments,
    isUploading,
    uploadError,
    removeAttachment,
    setAttachments,
  } = useFileUpload(5);

  useEffect(() => {
    if (!blockMarkerRefNumber) {
      navigate("/quarry");
    }
  }, [blockMarkerRefNumber, navigate]);

  useEffect(() => {
    if (details) {
      // Use blockMarkerRefNumber from details if available, otherwise use default structure
      const blockDetails = details.blockMarkerRefNumber || {};

      let parsedDate = null;
      if (blockDetails.dateTime) {
        const isoDate = new Date(blockDetails.dateTime)
          .toISOString()
          .split("T")[0];
        parsedDate = parseDate(isoDate);
      }

      reset({
        date: parsedDate,
        blockInspector: "",
        surfaceQuality: details.observations?.surfaceQuality || "",
        structuralIntegrity: details.observations?.structuralIntegrity || "",
        surfaceFinish: details.observations?.surfaceFinish || "",
        edgeQuality: details.observations?.edgeQuality || "",
        thicknessCheck: details.observations?.thicknessCheck || "",
        cracks: details.crackFractureDetection?.crackFractureDetection
          ? "yes"
          : "no",
        crackCount: details.crackFractureDetection?.count || 0,
        sides: details.crackFractureDetection?.drawingBoard || [],
        remarks: details.attachments?.remarks || "",
      });
      if (details.attachments?.pictures?.length > 0) {
        setAttachments(details.attachments.pictures);
      }
    }
  }, [details, reset, setAttachments]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    for (let file of files) {
      const result = await uploadFile(file);
      if (!result.success) {
        alert(result.error);
        break;
      }
    }
  };

  const handleQtyIncrease = () => {
    const currentCrackCount = getValues("crackCount");
    setValue("crackCount", (currentCrackCount || 0) + 1);
    trigger("crackCount");
  };

  const handleQtyDecrease = () => {
    const currentCrackCount = getValues("crackCount");
    setValue("crackCount", Math.max(0, (currentCrackCount || 0) - 1));
    trigger("crackCount");
  };

  const goToNext = async () => {
    let fieldsToValidate = [];

    if (selectedKey === "step1") {
      fieldsToValidate = ["date", "blockInspector"];
    } else if (selectedKey === "step2") {
      fieldsToValidate = [
        "blockLength",
        "blockWeight",
        "blockHeight",
        "blockVolume",
        "blockWidth",
      ];
    } else if (selectedKey === "step3") {
      fieldsToValidate = [
        "surfaceQuality",
        "structuralIntegrity",
        "surfaceFinish",
        "edgeQuality",
        "thicknessCheck",
        "cracks",
        "crackCount",
        "sides",
      ];
    } else if (selectedKey === "step4") {
      fieldsToValidate = ["crackCount"]; // Crack count validation is part of step3, but it's okay to re-trigger here if needed
    } else if (selectedKey === "step5") {
      fieldsToValidate = ["remarks"]; // Only remarks for now in attachments
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (selectedKey === "step1") setSelectedKey("step2");
      else if (selectedKey === "step2") setSelectedKey("step3");
      else if (selectedKey === "step3") setSelectedKey("step4");
      else if (selectedKey === "step4") setSelectedKey("step5");
    } else {
      console.log("Validation failed for:", fieldsToValidate);
    }
  };

  const goToPrev = () => {
    if (selectedKey === "step2") setSelectedKey("step1");
    else if (selectedKey === "step3") setSelectedKey("step2");
    else if (selectedKey === "step4") setSelectedKey("step3");
    else if (selectedKey === "step5") setSelectedKey("step4");
  };

  const handleFormSubmit = async (data) => {
    console.log("Form Data:", data);

    const payload = {
      blockMarkerRefNumber: blockMarkerRefNumber?.refNumber || "",
      blockSecurity: {
        blockNumber: blockMarkerRefNumber?.refNumber || "",
        dateTime: data.date ? new Date(data.date).toISOString() : null,
        type: type || "",
        grade: blockQualityGrade || "",
        blockInspector: data.blockInspector,
        color: blockColor || "",
        imageUrls: attachments.map((att) => att), // Assuming attachments has a 'url' property
      },
      dimension: {
        blockLength: parseFloat(blockDimension?.blockLength) || 0,
        blockWidth: parseFloat(blockDimension?.blockWidth) || 0,
        blockVolume: parseFloat(blockDimension?.blockVolume) || 0,
        blockWeight: parseFloat(blockDimension?.blockWeight) || 0,
        blockHeight: parseFloat(blockDimension?.blockHeight) || 0,
      },
      observations: {
        surfaceQuality: data.surfaceQuality,
        structuralIntegrity: data.structuralIntegrity,
        thicknessCheck: data.thicknessCheck,
        // surfaceFinish: data.surfaceFinish,
        // edgeQuality: data.edgeQuality,
      },
      crackFractureDetection: {
        crackFractureDetection: data.cracks === "yes",
        count: data.crackCount,
        drawingBoard: data.sides,
      },
      attachments: {
        pictures: attachments.map((att) => att),
        remarks: data.remarks,
        referenceFiles: [], // Assuming no reference files for now
      },
    };
    console.log({ payload });

    try {
      await dispatch(createBlockInspection(payload)).unwrap();
      onOpen();
    } catch (error) {
      console.error("Failed to create block inspection:", error);
      alert("Failed to create block inspection. Please try again.");
    }
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
            <Tab key="step1" title="Overview" className="flex flex-col gap-4">
              <BlockInfoHeader value={blockMarkerRefNumber} />

              <BlockInfoHeaderGray text="Block Number" value="3588" />

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
                      onChange={(val) => field.onChange(val)}
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
                  isRequired
                  label="Block Type"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled
                  className="w-full"
                  defaultValue={(type == "g" ? "Granite" : "Marble") || "N/A"}
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
                  <small className="text-red-500 mt-1">
                    {errors.blockInspector.message}
                  </small>
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
                  defaultValue={additionalDetails?.truckNumber || "N/A"}
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
                  className="w-full"
                  placeholder="0.00"
                  {...register("blockLength")}
                />

                {errors.blockLength && (
                  <small className="text-red-500 mt-1">
                    {errors.blockLength.message}
                  </small>
                )}
              </div>

              <div>
                <Input
                  isRequired
                  label=" Block Width"
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full"
                  placeholder="0.00"
                  {...register("blockWidth")}
                />

                {errors.blockWidth && (
                  <small className="text-red-500 mt-1">
                    {errors.blockWidth.message}
                  </small>
                )}
              </div>

              <div>
                <Input
                  isRequired
                  label=" Block Weight"
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full"
                  placeholder="0.00"
                  {...register("blockWeight")}
                />

                {errors.blockWeight && (
                  <small className="text-red-500 mt-1">
                    {errors.blockWeight.message}
                  </small>
                )}
              </div>

              <div>
                <Input
                  isRequired
                  label=" Block Height"
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full"
                  placeholder="0.00"
                  {...register("blockHeight")}
                />

                {errors.blockHeight && (
                  <small className="text-red-500 mt-1">
                    {errors.blockHeight.message}
                  </small>
                )}
              </div>

              <div>
                <Input
                  isRequired
                  label=" Block Volume"
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full"
                  placeholder="0.00"
                  {...register("blockVolume")}
                />

                {errors.blockVolume && (
                  <small className="text-red-500 mt-1">
                    {errors.blockVolume.message}
                  </small>
                )}
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
                  required: "Structural Integrity is required",
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
                <Controller
                  name="cracks"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      label="Crack & Fracture Detection"
                      orientation="horizontal"
                      classNames={{
                        label: "form-label",
                      }}
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </RadioGroup>
                  )}
                />
                {errors.cracks && (
                  <small className="text-red-500 mt-1">
                    {errors.cracks.message}
                  </small>
                )}

                <div>
                  <label className="form-label">
                    Crack Count <span className="required">*</span>
                  </label>

                  <div className="flex items-center gap-3 pl-10 relative">
                    <Button
                      onPress={handleQtyDecrease}
                      variant="bordered"
                      className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                    >
                      –
                    </Button>
                    <Controller
                      name="crackCount"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Qty"
                          labelPlacement="outside-left"
                          placeholder="1"
                          variant="bordered"
                          hideStepper
                          minValue={0}
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(Number(val));
                          }}
                          classNames={{
                            label:
                              "p-0 opacity-60 absolute left-0 top-1/2 -translate-y-1/2",
                            base: "w-10",
                            inputWrapper: "px-0",
                            input: "text-center",
                          }}
                        />
                      )}
                    />

                    <Button
                      onPress={handleQtyIncrease}
                      variant="bordered"
                      className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                    >
                      +
                    </Button>
                  </div>
                  {errors.crackCount && (
                    <small className="text-red-500 mt-1">
                      {errors.crackCount.message}
                    </small>
                  )}
                </div>

                <div>
                  <label className="form-label">
                    Drawing Board <span className="required">*</span>
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

                <Controller
                  name="sides"
                  control={control}
                  render={({ field }) => (
                    <CheckboxGroup
                      isRequired
                      label="Select Side"
                      orientation="horizontal"
                      name="sides"
                      className=""
                      classNames={{
                        label: "form-label",
                        base: "checkbox-sides",
                        wrapper: "wrapper",
                      }}
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <Checkbox value="side-a">Side a</Checkbox>
                      <Checkbox value="side-b">Side b</Checkbox>
                      <Checkbox value="side-c">Side c</Checkbox>
                      <Checkbox value="side-d">Side d</Checkbox>
                      <Checkbox value="side-e">Side e</Checkbox>
                      <Checkbox value="side-f">Side f</Checkbox>
                    </CheckboxGroup>
                  )}
                />
                {errors.sides && (
                  <small className="text-red-500 mt-1">
                    {errors.sides.message}
                  </small>
                )}
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

              <BlockInfoHeaderGray text="Crack & Fracture Detection" value="" />

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

                  <Controller
                    name="crackCount"
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        label="Qty"
                        labelPlacement="outside-left"
                        placeholder="1"
                        variant="bordered"
                        hideStepper
                        minValue={0}
                        value={field.value}
                        onValueChange={(val) => field.onChange(Number(val))}
                        classNames={{
                          label:
                            "p-0 opacity-60 absolute left-0 top-1/2 -translate-y-1/2",
                          base: "w-10",
                          inputWrapper: "px-0",
                          input: "text-center",
                        }}
                      />
                    )}
                  />

                  <Button
                    onPress={handleQtyIncrease}
                    variant="bordered"
                    className="font-bold border-primary p-0 w-6 min-w-6 h-auto aspect-square rounded-md"
                  >
                    +
                  </Button>
                </div>
                {errors.crackCount && (
                  <small className="text-red-500 mt-1">
                    {errors.crackCount.message}
                  </small>
                )}

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
                <label className="form-label">Block Pictures</label>
                <p className="text-sm text-gray-4 mb-2">
                  Add your image here, and you can upload up to 5 files max
                </p>

                <div className="bg-white p-6 mt-4 border-2 border-dashed border-gray-1 relative rounded-lg">
                  <div className="text-center">
                    <IconUpload className="mx-auto mb-4" />
                    <p className="text-sm mb-0.5">
                      Drag your file(s) or browse
                    </p>
                    <p className="text-sm text-neutral-400">
                      Max 100 MB files are allowed
                    </p>
                  </div>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={attachments.length >= 5 || isUploading}
                    className="opacity-0 w-full h-full absolute inset-0 z-[1] cursor-pointer"
                  />
                </div>

                {uploadError && (
                  <small className="text-red-500 mt-1">{uploadError}</small>
                )}

                {attachments.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="relative">
                        <img
                          src={attachment}
                          alt={`uploaded-${index}`}
                          className="w-full h-auto aspect-video object-cover rounded-md"
                        />
                        <Button
                          onPress={() => removeAttachment(attachment)}
                          className="p-0 w-6 min-w-6 h-auto aspect-square absolute top-2 right-2 bg-red-500 text-white rounded-full"
                        >
                          <IconClose className="w-4 h-auto" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Remarks</label>
                <Textarea
                  variant="bordered"
                  classNames={{
                    base: "mt-3",
                    innerWrapper: "h-40",
                  }}
                  {...register("remarks")}
                />
                {errors.remarks && (
                  <small className="text-red-500 mt-1">
                    {errors.remarks.message}
                  </small>
                )}
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
                  onPress={handleSubmit(handleFormSubmit)}
                  className="grow w-full max-w-1/2 min-w-0"
                >
                  Submit
                </Button>
              </div>
            </Tab>
          </Tabs>
        </form>
      </div>
      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Blocks Inspection Completed!"
          body="Block Checked successfully.Ready to proceed!"
          action={() => navigate("/block-inspection")}
        />
      )}
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
