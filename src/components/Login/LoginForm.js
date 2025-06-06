import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "@heroui/react";
import IconEyeOn from "../../utils/icons/IconEyeOn";
import IconEyeOff from "../../utils/icons/IconEyeOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email'),
    password: yup
        .string()
        .required('Password is required'),
    remember_me: yup.boolean()
});

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error: authError } = useSelector((state) => state.auth);

    console.log(authError);

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields }
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            remember_me: false
        },
        resolver: yupResolver(validationSchema)
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (data) => {
        try {
            const result = await dispatch(login({
                email: data.email,
                password: data.password
            })).unwrap();

            if (result?.user) {
                navigate("/quarry");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Form
            className="text-left flex flex-col gap-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Input
                {...register("email")}
                isRequired
                errorMessage={ errors.email?.message}
                isInvalid={ !!errors.email}
                label="Email"
                labelPlacement="outside"
                placeholder="Enter email address"
                type="email"
                variant="bordered"
                className="w-full"
            />

            <Input
                {...register("password")}
                isRequired
                errorMessage={ errors.password?.message}
                isInvalid={ !!errors.password}
                label="Password"
                labelPlacement="outside"
                placeholder="*******"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                className="w-full"
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
                {...register("remember_me")}
                color="default"
                classNames={{
                    label: "text-xs text-neutral-500",
                }}
            >
                Remember me
            </Checkbox>

            {authError && (
                <div className="text-red-500 text-sm text-center">
                    {authError}
                </div>
            )}

            <div className="w-full">
                <Button 
                    type="submit" 
                    size="lg" 
                    className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
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
        </Form>
    );
};

export default LoginForm;
