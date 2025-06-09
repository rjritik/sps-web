import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import useFileUpload from "../hooks/useFileUpload";
import { addBlock } from "../store/slices/quarries/thunks";

const AddUpdateBlocks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(addBlock(payload));
    navigate(`/quarry-details/${quarryRefId}`);
  };

  return (
    <DashboardLayout>
      <div className="mb-3 text-lg font-semibold">Add Quarry Blocks</div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Tabs
          selectedKey={selectedKey}
          variant="underlined"
          onSelectionChange={setSelectedKey}
        >
          {/* STEP 1 - Overview */}
          <Tab key="step1" title="Overview">
            <BlockInfoHeader value={blockMarkerRefNumber} />

            <Controller
              name="blockType"
              control={control}
              rules={{ required: "Block Type is required" }}
              render={({ field }) => (
                <RadioGroup
                  label="Block Type*"
                  orientation="horizontal"
                  className="mb-3"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Radio value="m">Marble</Radio>
                  <Radio value="g">Granite</Radio>
                </RadioGroup>
              )}
            />
            {errors.blockType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.blockType.message}
              </p>
            )}

            <Controller
              name="blockQualityGrade"
              control={control}
              rules={{ required: "Block Quality Grade is required" }}
              render={({ field }) => (
                <RadioGroup
                  label="Block Quality Grade*"
                  orientation="horizontal"
                  className="mb-3"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Radio value="Premium">Premium</Radio>
                  <Radio value="Commercial">Commercial</Radio>
                </RadioGroup>
              )}
            />
            {errors.blockQualityGrade && (
              <p className="text-red-500 text-sm mt-1">
                {errors.blockQualityGrade.message}
              </p>
            )}

            <div className="mb-3">
              <label className="block font-medium mb-2">Block Color*</label>
              <Controller
                name="blockColor"
                control={control}
                rules={{ required: "Block Color is required" }}
                render={({ field }) => (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button>{field.value || "Select Block Color"}</Button>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.blockColor.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Date*</label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    className="w-full max-w-xs"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <Button color="primary" onPress={goToNext}>
              Next
            </Button>
          </Tab>

          {/* STEP 2 - Block Dimensions */}
          <Tab key="step2" title="Block Dimensions">
            <BlockInfoHeader value={blockMarkerRefNumber} />

            <BlockInput
              label="Block Length"
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
              label="Block Width"
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
              label="Block Weight"
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
              label="Block Height"
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
              label="Block Volume"
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
              label="Purchasing Unit"
              placeholder="Enter Purchasing Unit"
              name="purchasingUnit"
              type="number"
              register={register}
              errors={errors}
              rules={{ required: "Purchasing Unit is required" }}
            />
            <BlockInput
              label="Truck Number"
              placeholder="Enter Truck Number"
              name="truckNumber"
              register={register}
              errors={errors}
              rules={{ required: "Truck Number is required" }}
            />
            <BlockInput
              label="Invoice Number"
              placeholder="Enter Invoice Number"
              name="invoiceNumber"
              register={register}
              errors={errors}
              rules={{ required: "Invoice Number is required" }}
            />

            <Controller
              name="wrappingRequired"
              control={control}
              rules={{ required: "Wrapping required selection is needed" }}
              render={({ field }) => (
                <RadioGroup
                  label="Wrapping Required*"
                  orientation="horizontal"
                  className="mb-3"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </RadioGroup>
              )}
            />
            {errors.wrappingRequired && (
              <p className="text-red-500 text-sm mt-1">
                {errors.wrappingRequired.message}
              </p>
            )}

            <div className="flex gap-4 mt-6">
              <Button variant="bordered" onPress={goToPrev}>
                Previous
              </Button>
              <Button color="primary" onPress={goToNext}>
                Next
              </Button>
            </div>
          </Tab>

          {/* STEP 3 - Attachments */}
          <Tab key="step3" title="Attachments">
            <BlockInfoHeader value={blockMarkerRefNumber} />

            <div className="mb-6">
              <label className="block font-medium mb-2">Block Pictures</label>
              <p className="text-sm text-gray-500 mb-2">
                You can add up to 5 block pictures
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={attachments.length >= 5 || isUploading}
                className="w-full max-w-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-600 file:text-white file:rounded-md hover:file:bg-orange-700"
              />

              {uploadError && (
                <p className="text-sm text-red-500 mt-2">{uploadError}</p>
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
                      <button
                        type="button"
                        onClick={() => removeAttachment(url)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Remarks*</label>
              <Textarea
                className="max-w-xs"
                placeholder="Enter your Remarks"
                {...register("remarks", { required: "Remarks are required" })}
              />
              {errors.remarks && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.remarks.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="bordered" onPress={goToPrev}>
                Previous
              </Button>
              <Button type="submit" color="primary">
                Preview Details
              </Button>
            </div>
          </Tab>
        </Tabs>
      </form>
    </DashboardLayout>
  );
};

const BlockInput = ({ label, placeholder, name, register, errors, rules }) => (
  <div className="mb-3">
    <label className="block font-medium mb-2">{label}</label>
    <Input
      className="w-full max-w-xs"
      placeholder={placeholder}
      {...register(name, rules)}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

const BlockInfoHeader = ({ value }) => (
  <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
    <p className="font-semibold text-sm text-gray-700">
      Block Marker Reference Number:
    </p>
    <span className="text-gradient-brown font-bold text-sm">
      {value || "N/A"}
    </span>
  </div>
);

export default AddUpdateBlocks;
