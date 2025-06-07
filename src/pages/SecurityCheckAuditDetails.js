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
import { useLocation } from "react-router-dom";
import { today, getLocalTimeZone } from "@internationalized/date";
import ConfirmationModal from "../components/Modal/ConfirmationModal";

const SecurityCheckAuditDetails = () => {
  const { auditDetails } = useLocation().state || {};
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(open);

  const handleSave = () => {
    // Add your save logic here
    console.log("Saving...");
    setIsOpen(false);
  };

  const { additionalDetails, refNumber } = auditDetails || {};

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return "/images/img-thumbnail.jpg";
    if (imgUrl.startsWith("file://") || imgUrl.startsWith("https://example")) {
      return "/images/img-thumbnail.jpg";
    }
    return imgUrl;
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-bold text-gradient-brown">
          Audit Block Details
        </p>
        <Button size="lg" onPress={onOpen}>
          Save Details
        </Button>
      </div>

      {/* Reference Number */}
      <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-6 flex justify-between items-center">
        <p className="font-semibold text-sm text-gray-700">
          Block Marker Reference Number:
        </p>
        <span className="text-gradient-brown font-bold text-sm">
          {refNumber || "N/A"}
        </span>
      </div>

      {/* Audit Block Info */}
      <Card className="w-full mb-6">
        <CardBody className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Date</label>
            <DatePicker
              className="w-full max-w-xs"
              defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
              minValue={today(getLocalTimeZone())}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Security Personnel</label>
            <Input
              className="w-full max-w-xs"
              placeholder="Enter Security Personnel Name"
              type="text"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Wrapping</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.wrappingRequired ? "Yes" : "No"}
              type="text"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Invoice Number</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.invoiceNumber || "N/A"}
              type="text"
            />
          </div>
        </CardBody>
      </Card>

      {/* Truck Details */}
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
              type="text"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Truck Weight</label>
            <Input
              isDisabled
              className="w-full max-w-xs"
              defaultValue={additionalDetails?.truckWeight || "100"}
              type="text"
            />
          </div>
        </CardBody>
      </Card>

      {/* Block Pictures */}
      <Card className="w-full mb-6">
        <CardBody className="space-y-6">
          <p className="font-medium mb-2">Block Pictures</p>
          {auditDetails?.attachments?.map((picture, index) => (
            <Image
              key={index}
              alt="block pictures"
              src={getImageUrl(picture)}
              width={750}
              height={562}
              className="mb-4 w-full max-w-full !h-auto aspect-video object-cover rounded-lg"
            />
          ))}
        </CardBody>
      </Card>

      {/* Confirmation Modal */}
      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title="Blocks Approved Successfully "
          body="The Selected Granite blocks have been marked as inspected and are now approved for dispatch."
          action={handleSave}
        />
      )}
    </DashboardLayout>
  );
};

export default SecurityCheckAuditDetails;
