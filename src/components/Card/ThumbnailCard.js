import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Link,
} from "@heroui/react";
import IconPremium from "../../utils/icons/IconPremium";
import { useNavigate } from "react-router-dom";
import IconUnverified from "../../utils/icons/IconUnverified";

const ThumbnailCard = ({ className, data }) => {
    const navigate = useNavigate();
    const {
        refNumber,
        type,
        color,
        qualityGrade,
        dimensions,
        additionalDetails,
        dateTime,
        parentPage,
        details,
    } = data || {};

    const formatDimensions = () => {
        if (!dimensions) return "";
        const { blockLength, blockWidth, blockHeight } = dimensions;
        return `${blockLength} x ${blockWidth} x ${blockHeight}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    };

    // Get the first image from attachments or use default
    const getImageUrl = () => {
        const attachmentUrl = additionalDetails?.attachments?.[0];
        if (!attachmentUrl) return "/images/img-placeholder.svg";

        // Check if URL starts with file://
        if (
            attachmentUrl.startsWith("file://") ||
            attachmentUrl.startsWith("https://example")
        ) {
            return "/images/img-placeholder.svg";
        }

        return attachmentUrl;
    };

    // Get color style based on the color value
    const getColorStyle = () => {
        if (!color) return { backgroundColor: "#3A534F" }; // Default color

        // If color is a hex code
        if (color.startsWith("#")) {
            return { backgroundColor: color };
        }

        // If color is a name, map it to a hex code
        const colorMap = {
            red: "#FF0000",
            green: "#00FF00",
            blue: "#0000FF",
            yellow: "#FFFF00",
            black: "#000000",
            white: "#FFFFFF",
            gray: "#808080",
            brown: "#A52A2A",
            // more color mappings as needed
        };

        return { backgroundColor: colorMap[color.toLowerCase()] || "#3A534F" };
    };

    return (
        <>
            <Card
                className={`thumbnail-card text-sm text-gray-1 p-4 border border-neutral-200 shadow-sm ${
                    className ? className : ""
                }`}
            >
                <CardHeader className="flex gap-4 p-0 mb-4">
                    <Image
                        alt="block thumbnail"
                        src={getImageUrl()}
                        width={750}
                        height={562}
                        className="w-full max-w-full !h-auto aspect-video object-cover rounded-lg"
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = "/images/img-placeholder.svg"; // Fallback to default image
                        }}
                    />
                </CardHeader>
                <CardBody className="px-4 pt-0 pb-3 -mx-4 border-b-1 border-brown-light-1 w-auto">
                    <div className="flex gap-4">
                        <div className="grow">
                            <h6 className="font-semibold mb-1.5">
                                {type === "g" ? "Granite" : "Marble"}
                            </h6>
                            <div className="">
                                <span className="font-semibold block">
                                    BRN:- {refNumber || "N/A"}
                                </span>
                                <span className="block">
                                    {formatDimensions() || "Dimensions N/A"}
                                </span>
                                {/* <span className="block text-xs text-gray-500 mt-1">
                                    Date: {formatDate(dateTime)}
                                </span> */}
                            </div>
                        </div>
                        {(parentPage === "security-check" ||
                            parentPage === "block-inspection") && (
                            <div>
                                <IconUnverified />
                            </div>
                        )}
                    </div>
                    {color && qualityGrade && (
                        <>
                            <div className="flex flex-wrap justify-between gap-1 pt-3 px-4 mt-3 -mx-4 border-t-1 border-brown-light-1">
                                <div>
                                    <span
                                        className={`tile-color inline-block mr-2 w-2.5 min-w-2.5 aspect-square rounded-full ${
                                            color === "white" ||
                                            color === "White"
                                                ? "border border-neutral-400"
                                                : ""
                                        }`}
                                        style={getColorStyle()}
                                    ></span>
                                    Color - {color}
                                </div>
                                <div className="flex items-start gap-2">
                                    <IconPremium /> Quality Grade -{" "}
                                    {qualityGrade}
                                </div>
                            </div>
                        </>
                    )}
                </CardBody>
                <CardFooter className="text-center flex flex-wrap items-stretch p-0 pt-3 -mx-4 w-auto rounded-none">
                    {parentPage === "security-check" ||
                    parentPage === "block-inspection" ? (
                        <div className="content-center px-4 w-full">
                            <Link
                                href=""
                                size="sm"
                                className="text-gray-2 font-medium"
                                onPress={() => {
                                    if (parentPage === "security-check") {
                                        navigate(
                                            `/security-check/audit-details`,
                                            {
                                                state: {
                                                    auditDetails: details,
                                                },
                                            }
                                        );
                                    } else {
                                        console.log("Details::::", details);
                                        navigate(`/block-inspection/details`, {
                                            state: { details },
                                        });
                                    }
                                }}
                            >
                                {parentPage === "security-check"
                                    ? "Audit Block Details"
                                    : "View Block Inspection"}
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="content-center px-2 w-1/2">
                                <Link
                                    href=""
                                    size="sm"
                                    className="text-gray-2 font-medium"
                                    onPress={() => {
                                        navigate(`/quarry/add-update-blocks`, {
                                            state: {
                                                blockDetails: details,
                                                blockMarkerRefNumber: refNumber,
                                                quarryRefId:
                                                    details?.quarryRefId,
                                                isEdit: true,
                                            },
                                        });
                                    }}
                                >
                                    Edit Details
                                </Link>
                            </div>
                            <div className="bg-neutral-400 -ml-[1px] w-[1px]"></div>
                            <div className="content-center px-2 w-1/2">
                                <Link
                                    href=""
                                    size="sm"
                                    className="text-gray-2 font-medium"
                                    onPress={() => {
                                        navigate(`/quarry/block-details`, {
                                            state: { blockDetails: details },
                                        });
                                    }}
                                >
                                    View Block Details
                                </Link>
                            </div>
                        </>
                    )}
                </CardFooter>
            </Card>
        </>
    );
};

export default ThumbnailCard;
