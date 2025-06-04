import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "@heroui/react";
import IconEyeOn from "../../utils/icons/IconEyeOn";
import IconEyeOff from "../../utils/icons/IconEyeOff";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [action, setAction] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);

        navigate("/quarry");
    };

    console.log("action = ", action);

    return (
        <Form
            className="text-left flex flex-col gap-5 w-full"
            onReset={() => setAction("reset")}
            onSubmit={onSubmit}
        >
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter email address"
                type="email"
                variant="bordered"
            />

            <Input
                isRequired
                errorMessage="Wrong password"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="*******"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                endContent={
                    <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <IconEyeOn className="IconEyeOn text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <IconEyeOff className="IconEyeOff text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
            />

            <Checkbox
                isRequired
                name="remember_me"
                type="checkbox"
                color="default"
                classNames={{
                    label: "text-xs text-neutral-500",
                }}
            >
                Remember me
            </Checkbox>

            <div className="w-full">
                <Button type="submit" size="lg" className="btn-primary w-full">
                    Login
                </Button>
            </div>

            <small className="text-neutral-500 text-center">
                By continuing, you agree that you have read and accept our{" "}
                <Link
                    to="#"
                    className="font-medium italic underline hover:no-underline"
                >
                    T&Cs
                </Link>{" "}
                and{" "}
                <Link
                    to="#"
                    className="font-medium italic underline hover:no-underline"
                >
                    Privacy Policy
                </Link>
            </small>

            {action && (
                <>
                    <div className="text-small text-default-500">
                        Action: <code>{action}</code>
                    </div>
                </>
            )}
        </Form>
    );
};

export default LoginForm;
