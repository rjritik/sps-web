import Section from "../utils/Section";
import { Image } from "@heroui/react";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
    return (
        <Section className="section-login">
            <div className="flex flex-col md:flex-row min-h-screen">
                <div className="bg-brown-1 text-white p-12 xl:p-16 w-full md:w-1/2 lg:w-3/5 relative z-[1]">
                    <Image
                        src="/images/logo-white.svg"
                        alt="logo"
                        width={117}
                        height={35}
                        className="rounded-none shadow-none"
                    />

                    <div className="xl:px-14 mt-32">
                        <h1 className="font-bold">Sign in to your Account</h1>
                        <h4 className="font-medium mt-3">
                            Enter your email and password to sign in
                        </h4>
                    </div>
                </div>
                <div className="content-center p-8 w-full md:w-1/2 lg:w-2/5">
                    <div className="text-center p-8 mx-auto border border-neutral-300 max-w-lg rounded-2xl shadow-md">
                        <Image
                            src="/images/logo-icon.svg"
                            alt="logo-icon"
                            width={59}
                            height={59}
                            classNames={{
                                wrapper: "mx-auto",
                                img: "rounded-none shadow-none",
                            }}
                        />
                        <h3 className="text-gradient-brown font-bold mt-6">
                            Welcome back
                        </h3>
                        <p className="text-neutral-500 font-medium mt-3 mb-6">
                            Enter your email and password to log in{" "}
                        </p>

                        <LoginForm />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Login;
