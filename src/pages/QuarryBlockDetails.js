import React from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { Button, Card, CardBody, Image } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import IconEdit from "../utils/icons/IconEdit";
import { useDispatch } from "react-redux";
import { addBlock } from "../store/slices/quarries";

const breadcrumbItems = [
  { title: "On Going Quarries", link: "/quarry" },
  { title: "View Block Details", link: "" },
];

const QuarryBlockDetails = () => {
  const { blockDetails, isPreview, isEdit } = useLocation().state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    additionalDetails,
    blockColor,
    blockDimension,
    dateTime,
    refNumber,
    type,
    blockQualityGrade,
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
      <div className="bg-white px-6 py-4 -mx-6 -mt-6 mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <h4 className="text-gradient-brown font-bold pl-5 relative before:content-[''] before:bg-gradient-brown before:w-2 before:h-full before:absolute before:left-0 before:top-0">
          {isPreview ? "Preview Block" : "View Block Details"}
        </h4>
        {!isPreview && (
          <Button
            color="primary"
            onPress={() => {
              navigate(`/quarry/add-update-blocks`, {
                state: {
                  blockDetails,
                  blockMarkerRefNumber: refNumber,
                  quarryRefId: blockDetails?.quarryRefId,
                  isEdit: true,
                },
              });
            }}
          >
            <IconEdit /> Edit
          </Button>
        )}
      </div>

      <div className="bg-brown-light-1 flex flex-wrap justify-between items-center gap-2 p-4 mb-4 border border-brown-light-2 rounded-lg">
        <div className="h5 text-gray-2 font-medium">
          Block Marker Reference Number
        </div>
        <div className="h5 text-gray-1 font-medium">{refNumber || "N/A"}</div>
      </div>

      {/* Block Information Card */}
      <Card className="mb-4 border border-neutral-200 w-full shadow-sm">
        <CardBody className="gap-2 p-3">
          <table
            cellPadding="3"
            cellSpacing=""
            className="text-gray-1 border-0"
          >
            <tr>
              <td className="font-medium">Type</td>
              <td align="right">{type === "g" ? "Granite" : "Marble"}</td>
            </tr>
            <tr>
              <td className="font-medium">Quality Grade</td>
              <td align="right">{blockQualityGrade}</td>
            </tr>
            <tr>
              <td className="font-medium">LIWH</td>
              <td align="right">
                {blockDimension?.blockLength} * {blockDimension?.blockWidth} *{" "}
                {blockDimension?.blockHeight}
              </td>
            </tr>
            <tr>
              <td className="font-medium">Weight</td>
              <td align="right">{blockDimension?.blockWeight}</td>
            </tr>
            <tr>
              <td className="font-medium">Volume</td>
              <td align="right">{blockDimension?.blockVolume}</td>
            </tr>
            <tr>
              <td className="font-medium">Block Color</td>
              <td align="right">{blockColor}</td>
            </tr>
            <tr>
              <td className="font-medium">Date</td>
              <td align="right">{formatDate(dateTime)}</td>
            </tr>
            <tr>
              <td className="font-medium">Purchase Unit</td>
              <td align="right">
                {additionalDetails?.purchasingUnit || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="font-medium">Truck Number</td>
              <td align="right">{additionalDetails?.truckNumber || "N/A"}</td>
            </tr>

            <tr>
              <td className="font-medium">Invoice NUmber</td>
              <td align="right">{additionalDetails?.invoiceNumber || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-medium">Wrapping</td>
              <td align="right">
                {additionalDetails?.wrappingRequired ? "Yes" : "No"}
              </td>
            </tr>
          </table>
        </CardBody>
      </Card>

      {/* Remarks Section */}
      <Card className="mb-4 border border-neutral-200 w-full shadow-sm">
        <CardBody className="p-4">
          <h6 className="text-primary font-semibold mb-4">Remarks</h6>
          <div className="p-4 border border-neutral-200 rounded-xl">
            {additionalDetails?.remarks || "No remarks available"}
          </div>
        </CardBody>
      </Card>

      {/* Attachments Title */}
      <div className="bg-brown-light-1 flex flex-wrap justify-center items-center gap-2 p-4 mb-4 border border-brown-light-2 rounded-lg">
        <div className="h5 text-gray-2 font-medium">Attachments</div>
      </div>

      {/* Images */}
      <Card className="mb-0 border border-neutral-200 w-full shadow-sm">
        <CardBody className="gap-4 p-4">
          <h6 className="text-primary font-semibold">Block Pictures</h6>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {additionalDetails?.attachments?.length > 0 ? (
              additionalDetails.attachments.map((picture, index) => (
                <Image
                  key={index}
                  src={getImageUrl(picture)}
                  alt="block pictures"
                  width={750}
                  height={562}
                  removeWrapper
                  className="w-full !h-auto aspect-video object-cover rounded-xl"
                />
              ))
            ) : (
              <p>No pictures available</p>
            )}
          </div>
        </CardBody>
      </Card>

      {isPreview && (
        <>
          <Button
            color="primary"
            onPress={() => {
              navigate(`/quarry/add-update-blocks`, {
                state: {
                  blockDetails,
                  blockMarkerRefNumber: refNumber,
                  quarryRefId: blockDetails?.quarryRefId,
                  isEdit: true,
                },
              });
            }}
          >
            <IconEdit /> Edit
          </Button>

          <Button
            color="primary"
            onPress={() => {
              if (!isEdit) {
                dispatch(addBlock(blockDetails));
              }
              navigate(`/quarry-details/${blockDetails?.quarryRefId}`);
            }}
          >
            Save Block
          </Button>
        </>
      )}
    </DashboardLayout>
  );
};

export default QuarryBlockDetails;
