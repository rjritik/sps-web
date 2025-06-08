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
import { useLocation, useNavigate } from "react-router-dom";
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
    if (imgUrl.startsWith("file://") || imgUrl.startsWith("https://example")) {
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
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-bold text-gradient-brown">
          Audit Block Details
        </p>
        <Button size="lg" onPress={handleSubmit(onSubmit)}>
          Save Details
        </Button>
      </div>

      <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
        <p className="font-semibold text-sm text-gray-700">
          Block Marker Reference Number:
        </p>
        <span className="text-gradient-brown font-bold text-sm">
          {refNumber || "N/A"}
        </span>
      </div>

      <Card className="w-full mb-6">
        <CardBody className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Date</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value}
                  onChange={(val) => field.onChange(val)} // No .toDate()
                  className="w-full max-w-xs"
                />
              )}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Security Personnel</label>
            <Input
              className="w-full max-w-xs"
              placeholder="Enter Security Personnel Name"
              {...register("securityPersonnelName")}
            />
            {errors.securityPersonnelName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.securityPersonnelName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Wrapping</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.wrappingRequired ? "Yes" : "No"}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Invoice Number</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.invoiceNumber || "N/A"}
            />
          </div>
        </CardBody>
      </Card>

      <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
        <p className="font-semibold text-sm text-gray-700">Truck Details</p>
      </div>

      <Card className="w-full mb-6">
        <CardBody className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Truck Number</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.truckNumber || "N/A"}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Truck Weight</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.truckWeight || "100"}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="w-full mb-6">
        <CardBody className="space-y-6">
          <p className="font-medium mb-2">Block Pictures</p>
          <div className="space-y-4">
            {auditDetails?.attachments?.length > 0 ? (
              auditDetails.attachments.map((picture, index) => (
                <Image
                  key={index}
                  alt="block pictures"
                  src={getImageUrl(picture)}
                  width={750}
                  height={562}
                  className="w-full h-auto aspect-video object-cover rounded-lg"
                />
              ))
            ) : (
              <p className="text-gray-500">No pictures available</p>
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
