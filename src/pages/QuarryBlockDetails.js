import React from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { Card, CardBody, Image } from "@heroui/react";
import { useLocation } from "react-router-dom";

const QuarryBlockDetails = () => {
  const { blockDetails } = useLocation().state || {};

  console.log({blockDetails});
  

  const {
    additionalDetails,
    blockColor,
    blockDimension,
    dateTime,
    refNumber,
    type,
    blockQualityGrade
  } = blockDetails;

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return "/images/img-thumbnail.jpg";
    if (imgUrl.startsWith("file://") || imgUrl.startsWith("https://example")) {
      return "/images/img-thumbnail.jpg";
    }
    return imgUrl;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <DashboardLayout>
      <p className="font-semibold text-lg text-gray-800 mb-4">
        View Block Details
      </p>

      <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-6 flex flex-wrap justify-between items-center">
        <p className="font-semibold text-sm text-gray-700">
          Block Marker Reference Number:
        </p>
        <span className="text-gradient-brown font-bold text-sm">
          {refNumber || "N/A"}
        </span>
      </div>

      {/* Block Information Card */}
      <Card className="w-full mb-6">
        <CardBody className="space-y-4">
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Type</p>
            <p className="text-gray-800">
              {type === "g" ? "Granite" : "Marble"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Quality Grade</p>
            <p className="text-gray-800">
         {blockQualityGrade}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">LIWH</p>
            <p className="text-gray-800">
              {blockDimension?.blockLength} * {blockDimension?.blockWidth} *{" "}
              {blockDimension?.blockHeight}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Weight</p>
            <p className="text-gray-800">{blockDimension?.blockWeight}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Volume</p>
            <p className="text-gray-800">{blockDimension?.blockVolume}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Block Color</p>
            <p className="text-gray-800">{blockColor}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Date</p>
            <p className="text-gray-800">{formatDate(dateTime)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Purchase Unit</p>
            <p className="text-gray-800">
              {additionalDetails?.purchasingUnit || "N/A"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">Wrapping</p>
            <p className="text-gray-800">
              {additionalDetails?.wrappingRequired ? "Yes" : "No"}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Remarks Section */}
      <Card className="w-full mb-6">
        <CardBody>
          <label className="block font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <p className="text-gray-600">
            {additionalDetails?.remarks || "No remarks available"}
          </p>
        </CardBody>
      </Card>

      {/* Attachments Title */}
      <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-4 flex justify-between items-center">
        <p className="font-semibold text-sm text-gray-700">Attachments</p>
      </div>

      {/* Images */}
      <Card className="w-full mb-6">
        <CardBody className="space-y-6">
          <p className="font-medium mb-2 text-gray-500">Block Pictures</p>
          <div className="space-y-4">
            {additionalDetails?.attachments?.length > 0 ? (
              additionalDetails.attachments.map((picture, index) => (
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
    </DashboardLayout>
  );
};

export default QuarryBlockDetails;
