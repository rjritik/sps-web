import Section from "../utils/Section";
import { Image } from "@heroui/react";
import LoginForm from "../components/Login/LoginForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
  const sliderData = [
    {
      image: "/images/slider-img-1.jpg",
      title: "Sign in to your Account",
      subtitle: "Enter your email and password to sign in",
    },
    {
      image: "/images/slider-img-2.jpg",
      title: "Sign in to your Account",
      subtitle: "Enter your email and password to sign in",
    },
    {
      image: "/images/slider-img-3.jpg",
      title: "Sign in to your Account",
      subtitle: "Enter your email and password to sign in",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Section className="section-login">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="bg-brown-1 text-white w-full md:w-1/2 lg:w-3/5 relative z-[1] min-h-screen flex flex-col">
          <Image
            src="/images/logo-white.svg"
            alt="logo"
            width={117}
            height={35}
            className="rounded-none shadow-none absolute top-12 left-12 z-20"
          />

          <Slider {...sliderSettings} className="flex-grow">
            {sliderData.map((slide, idx) => (
              <div key={idx} className="relative w-full h-screen">
                <img
                  src={slide.image}
                  alt={`slide-${idx}`}
                  className="w-full h-full object-cover absolute inset-0"
                  style={{ opacity: 0.4 }}
                />
                <div className="relative z-10 px-12 py-32 h-full flex flex-col justify-center items-start max-w-xl">
                  <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                  <h4 className="text-lg font-medium">{slide.subtitle}</h4>
                </div>
              </div>
            ))}
          </Slider>
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
            <h3 className="text-gradient-brown font-bold mt-6">Welcome back</h3>
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
