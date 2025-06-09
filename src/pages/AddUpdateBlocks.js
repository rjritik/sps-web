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

const breadcrumbItems = [
  { title: "On Going Quarries", link: "/quarry" },
  { title: "Add New Block", link: "" },
];

const AddUpdateBlocks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blockMarkerRefNumber = location.state?.blockMarkerRefNumber || "";
  const quarryRefId = location.state?.quarryRefId || "";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      blockType: "",
      blockQualityGrade: "",
      blockColor: "",
      date: null,
      blockLength: "",
      blockWidth: "",
      blockWeight: "",
      blockHeight: "",
      blockVolume: "",
      purchasingUnit: "",
      truckNumber: "",
      invoiceNumber: "",
      wrappingRequired: "",
      remarks: "",
    },
  });

  const [selectedKey, setSelectedKey] = useState("step1");

  const {
    uploadFile,
    attachments,
    isUploading,
    uploadError,
    removeAttachment,
  } = useFileUpload(5);

  useEffect(() => {
    if (!blockMarkerRefNumber) {
      navigate("/quarry");
    }
  }, []);

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

  const goToNext = async () => {
    let fieldsToValidate = [];

    if (selectedKey === "step1") {
      fieldsToValidate = [
        "blockType",
        "blockQualityGrade",
        "blockColor",
        "date",
      ];
    } else if (selectedKey === "step2") {
      fieldsToValidate = [
        "blockLength",
        "blockWidth",
        "blockWeight",
        "blockHeight",
        "blockVolume",
        "purchasingUnit",
        "truckNumber",
        "invoiceNumber",
        "wrappingRequired",
      ];
    }

    const isValid = await trigger(fieldsToValidate); // ✅ Validate specific fields

    if (isValid) {
      if (selectedKey === "step1") setSelectedKey("step2");
      else if (selectedKey === "step2") setSelectedKey("step3");
    } else {
      console.log("Validation failed for:", fieldsToValidate);
    }
  };

  const goToPrev = () => {
    if (selectedKey === "step2") setSelectedKey("step1");
    else if (selectedKey === "step3") setSelectedKey("step2");
  };

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);

    const payload = {
      refNumber: blockMarkerRefNumber,
      type: data.blockType,
      dateTime: data.date ? new Date(data.date).toISOString() : null,
      blockColor: data.blockColor,
      blockQualityGrade:
        data.blockQualityGrade === "Premium"
          ? "A"
          : data.blockQualityGrade === "Commercial"
          ? "B"
          : "",
      quarryRefId: quarryRefId,
      blockDimension: {
        blockLength: parseFloat(data.blockLength) || 0,
        blockWidth: parseFloat(data.blockWidth) || 0,
        blockHeight: parseFloat(data.blockHeight) || 0,
        blockVolume: parseFloat(data.blockVolume) || 0,
        blockWeight: parseFloat(data.blockWeight) || 0,
      },
      additionalDetails: {
        purchasingUnit: data.purchasingUnit,
        wrappingRequired: data.wrappingRequired === "yes",
        truckNumber: data.truckNumber,
        invoiceNumber: data.invoiceNumber,
        attachments: attachments,
        remarks: data.remarks,
      },
    };
    navigate(`/quarry/block-details`, {
      state: { blockDetails: payload, isPreview: true },
    });
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

              <Controller
                name="blockType"
                control={control}
                rules={{ required: "Block Type is required" }}
                render={({ field }) => (
                  <RadioGroup
                    label="Block Type *"
                    labelPlacement="outside"
                    orientation="horizontal"
                    className="mb-3"
                    classNames={{
                      label: "form-label",
                    }}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Radio value="m">Marble</Radio>
                    <Radio value="g">Granite</Radio>
                  </RadioGroup>
                )}
              />
              {errors.blockType && (
                <small className="text-red-500 mt-1">
                  {errors.blockType.message}
                </small>
              )}

              <Controller
                name="blockQualityGrade"
                control={control}
                rules={{
                  required: "Block Quality Grade is required",
                }}
                render={({ field }) => (
                  <RadioGroup
                    label="Block Quality Grade *"
                    labelPlacement="outside"
                    orientation="horizontal"
                    className="mb-3"
                    classNames={{
                      label: "form-label",
                    }}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Radio value="Premium">Premium</Radio>
                    <Radio value="Commercial">Commercial</Radio>
                  </RadioGroup>
                )}
              />
              {errors.blockQualityGrade && (
                <small className="text-red-500 mt-1">
                  {errors.blockQualityGrade.message}
                </small>
              )}

              <div className="mb-3">
                <label className="form-label">Block Color*</label>
                <Controller
                  name="blockColor"
                  control={control}
                  rules={{
                    required: "Block Color is required",
                  }}
                  render={({ field }) => (
                    <Dropdown showArrow>
                      <DropdownTrigger className="justify-start w-full">
                        <Button variant="bordered">
                          {field.value || "Select Block Color"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Block Colors"
                        variant="flat"
                        selectedKeys={
                          field.value ? new Set([field.value]) : new Set()
                        }
                        onSelectionChange={(keys) => {
                          const selectedValue = Array.from(keys)[0];
                          field.onChange(selectedValue);
                        }}
                        selectionMode="single"
                      >
                        <DropdownItem key="White">White</DropdownItem>
                        <DropdownItem key="Red">Red</DropdownItem>
                        <DropdownItem key="Black">Black</DropdownItem>
                        <DropdownItem key="Blue">Blue</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                />
                {errors.blockColor && (
                  <small className="text-red-500 mt-1">
                    {errors.blockColor.message}
                  </small>
                )}
              </div>

              <div className="mb-6">
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Date *"
                      labelPlacement="outside"
                      variant="bordered"
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.date && (
                  <small className="text-red-500 mt-1">
                    {errors.date.message}
                  </small>
                )}
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

              <BlockInput
                label=" Block Length *"
                placeholder="Enter Block Length"
                name="blockLength"
                register={register}
                errors={errors}
                type="number"
                rules={{
                  required: "Block Length is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "Invalid number",
                  },
                }}
              />
              <BlockInput
                label="Block Width *"
                placeholder="Enter Block Width"
                name="blockWidth"
                register={register}
                errors={errors}
                type="number"
                rules={{
                  required: "Block Width is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "Invalid number",
                  },
                }}
              />
              <BlockInput
                label="Block Weight *"
                placeholder="Enter Block Weight"
                name="blockWeight"
                register={register}
                errors={errors}
                type="number"
                rules={{
                  required: "Block Weight is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "Invalid number",
                  },
                }}
              />
              <BlockInput
                label="Block Height *"
                placeholder="Enter Block Height"
                name="blockHeight"
                register={register}
                errors={errors}
                type="number"
                rules={{
                  required: "Block Height is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "Invalid number",
                  },
                }}
              />
              <BlockInput
                label="Block Volume *"
                placeholder="Enter Block Volume"
                name="blockVolume"
                register={register}
                errors={errors}
                type="number"
                rules={{
                  required: "Block Volume is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "Invalid number",
                  },
                }}
              />
              <BlockInput
                label="Purchasing Unit *"
                placeholder="Enter Purchasing Unit"
                name="purchasingUnit"
                type="number"
                register={register}
                errors={errors}
                rules={{
                  required: "Purchasing Unit is required",
                }}
              />
              <BlockInput
                label="Truck Number *"
                placeholder="Enter Truck Number"
                name="truckNumber"
                register={register}
                errors={errors}
                rules={{ required: "Truck Number is required" }}
              />
              <BlockInput
                label="Invoice Number *"
                placeholder="Enter Invoice Number"
                name="invoiceNumber"
                register={register}
                errors={errors}
                rules={{
                  required: "Invoice Number is required",
                }}
              />

              <Controller
                name="wrappingRequired"
                control={control}
                rules={{
                  required: "Wrapping required selection is needed",
                }}
                render={({ field }) => (
                  <RadioGroup
                    label="Wrapping *"
                    labelPlacement="outside"
                    orientation="horizontal"
                    className="mb-0"
                    classNames={{
                      label: "form-label",
                    }}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </RadioGroup>
                )}
              />
              {errors.wrappingRequired && (
                <small className="text-red-500 mt-1">
                  {errors.wrappingRequired.message}
                </small>
              )}

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

            {/* STEP 3 - Attachments */}
            <Tab
              key="step3"
              title="Attachments"
              className="flex flex-col gap-2"
            >
              <BlockInfoHeader value={blockMarkerRefNumber} />

              <div className="mb-4">
                <label className="form-label">Block Pictures *</label>

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
                    {attachments.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`uploaded-${index}`}
                          className="w-full h-auto aspect-video object-cover rounded-md"
                        />
                        <Button
                          onPress={() => removeAttachment(url)}
                          className="p-0 w-6 min-w-6 h-auto aspect-square absolute top-2 right-2 bg-red-500 text-white rounded-full"
                        >
                          <IconClose className="w-4 h-auto" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <Textarea
                  label="Remark *"
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full"
                  placeholder="Write your remark here"
                  {...register("remarks", {
                    required: "Remarks are required",
                  })}
                />
                {errors.remarks && (
                  <small className="text-red-500 mt-1">
                    {errors.remarks.message}
                  </small>
                )}
              </div>

              <div className="flex flex-wrap justify-end gap-4">
                <Button
                  isIconOnly
                  aria-label="Like"
                  color="default"
                  className="w-[3.125rem] h-auto aspect-square rounded-full"
                >
                  <IconMic />
                </Button>
                <Button
                  isIconOnly
                  aria-label="Like"
                  color="default"
                  className="w-[3.125rem] h-auto aspect-square rounded-full"
                >
                  <IconCamera />
                </Button>
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
                  type="submit"
                  color="primary"
                  className="grow w-full max-w-1/2 min-w-0"
                >
                  Preview Details
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
    <div className="h6 text-gray-1 font-medium">{value || "N/A"}</div>
  </div>
);

export default AddUpdateBlocks;
