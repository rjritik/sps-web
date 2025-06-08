import { useState } from "react";
import {
    Button,
    DatePicker,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Form,
    Select,
    SelectItem,
} from "@heroui/react";
import IconFilter from "../../utils/icons/IconFilter";

export const blockTypeData = [
    { key: "category_1", label: "category 1" },
    { key: "category_2", label: "category 2" },
    { key: "category_3", label: "category 3" },
    { key: "category_4", label: "category 4" },
    { key: "category_5", label: "category 5" },
];

const Filter = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [blockType, setBlockType] = useState(new Set([]));

    const [submitted, setSubmitted] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);
        setIsFilterOpen(false);
    };

    return (
        <Dropdown
            isOpen={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            placement="bottom-end"
        >
            <DropdownTrigger>
                <Button
                    aria-label="Filter"
                    color="default"
                    variant="faded"
                    className="bg-white text-gray-1"
                >
                    <IconFilter className="w-6 min-w-6 h-auto" /> Filter
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                closeOnSelect={false}
                aria-label="Filter"
                className="w-screen max-w-80"
            >
                <DropdownItem className="!bg-transparent p-3 cursor-default">
                    <h5 className="text-gradient-brown font-semibold mb-4 pl-5 relative before:content-[''] before:bg-brown-light-1 before:w-2 before:h-full before:absolute before:left-0 before:top-0">
                        Filter
                    </h5>

                    <Form className="gap-4 w-full max-w-80" onSubmit={onSubmit}>
                        <DatePicker
                            className=""
                            labelPlacement="outside"
                            label="Date"
                            variant="bordered"
                            classNames={{
                                inputWrapper: "shadow-none",
                            }}
                        />

                        <Select
                            label="Block Type"
                            labelPlacement="outside"
                            placeholder="Select Category"
                            selectedKeys={blockType}
                            variant="bordered"
                            onSelectionChange={setBlockType}
                            className=""
                            classNames={{
                                trigger: "shadow-none",
                            }}
                        >
                            {blockTypeData.map((type) => (
                                <SelectItem key={type.key}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <div className="flex gap-4 mt-1 w-full">
                            <Button
                                type="reset"
                                variant="bordered"
                                className="btn-bordered grow"
                                onReset={() => setSubmitted("reset")}
                            >
                                Clear Filter
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                className="grow"
                            >
                                Apply Filter
                            </Button>
                        </div>
                    </Form>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Filter;
