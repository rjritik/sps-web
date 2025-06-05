import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Link,
} from "@heroui/react";
import IconPremium from "../../utils/icons/IconPremium";

const ThumbnailCard = ({ className }) => {
    return (
        <>
            <Card
                className={`thumbnail-card text-sm text-gray-1 p-4 border border-neutral-200 shadow-sm ${
                    className ? className : ""
                }`}
            >
                <CardHeader className="flex gap-4 p-0">
                    <Image
                        alt="thumbnail"
                        src="/images/img-thumbnail.jpg"
                        width={750}
                        height={562}
                        className="mb-4 w-full max-w-full !h-auto aspect-video object-cover rounded-lg"
                    />
                </CardHeader>
                <CardBody className="px-4 pt-0 pb-3 -mx-4 border-b-1 border-brown-light-1 w-auto">
                    <h6 className="font-semibold mb-1.5">Granite</h6>
                    <div className="">
                        <span className="font-semibold block">BRN:- SRGM4</span>
                        <span className="block">196 x 160 x 140</span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-1 pt-3 px-4 mt-3 -mx-4 border-t-1 border-brown-light-1">
                        <div>
                            <span className="tile-color bg-[#3A534F] inline-block mr-2 w-2.5 min-w-2.5 aspect-square rounded-full"></span>
                            Color - Green
                        </div>
                        <div className="flex items-start gap-2">
                            <IconPremium /> Quality Grade - Premium
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="text-center flex flex-wrap items-stretch p-0 pt-3 -mx-4 w-auto rounded-none">
                    <div className="content-center px-4 w-1/2">
                        <Link href="#" size="sm" className="text-gray-1">
                            Edit Details
                        </Link>
                    </div>
                    <div className="bg-neutral-400 -ml-[1px] w-[1px]"></div>
                    <div className="content-center px-4 w-1/2">
                        <Link href="#" size="sm" className="text-gray-1">
                            View Block Details
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default ThumbnailCard;
