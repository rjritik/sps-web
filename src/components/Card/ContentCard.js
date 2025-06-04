import { Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { Link } from "react-router-dom";

const ContentCard = ({ className }) => {
    return (
        <Card className={`content-card ${className ? className : ""}`}>
            <CardHeader className="flex gap-3">
                <Image
                    alt="heroui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">HeroUI</p>
                    <p className="text-small text-default-500">heroui.com</p>
                </div>
            </CardHeader>
            <CardBody>
                <p>
                    Make beautiful websites regardless of your design
                    experience.
                </p>
            </CardBody>
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/heroui-inc/heroui"
                >
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ContentCard;
