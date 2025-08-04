import React, { useState } from "react";
import ImageSlider from "../../Components/ImageSlider";
import { EyeClosed } from "lucide-react";
import { Eye } from "lucide-react";
import { axiosInstance } from "../../lib/axiosInstance";
import { toast } from "sonner";
import { Link, useNavigate, createLazyRoute } from "@tanstack/react-router";

const IMAGE = [
  { url: "/Public/camera.jpg", tag: "Capture the Moment. Stream the Story." },
  { url: "/Public/podcast.jpg", tag: "Your Voice. Your Vibe. Stream It Live." },
  { url: "/Public/tv.jpg", tag: "Endless Shows. One Hive." },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let err = undefined;

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const { data } = await axiosInstance.post("/login", { ...formData });
      toast.success(data.message);
      if (data.success) {
        return navigate({ to: "/" });
      }
    } catch (error) {
      console.log(error);
      
      const { message } = error?.response?.data||error;
      setSignup(true);
      toast.error(message);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <ImageSlider images={IMAGE} />

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/Public/logo.svg"
              alt="StreamHive Logo"
              className="h-40 mb-2"
            />
            <p className="text-center  text-sm sm:text-base">
              Buzzing with your favorite streams and creators 🐝
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6  text-center">Login</h2>

          <form className="space-y-7">
            <div>
              <label className="floating-label">
                <span>Your Username</span>
                <input
                  value={formData.username}
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  className="input input-md mt-1 w-full px-4 py-2"
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="floating-label">
                <span>Your Email</span>
                <input
                  name="email"
                  value={formData.email}
                  type="text"
                  placeholder="Your Email"
                  className="input input-md mt-1 w-full px-4 py-2"
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* ✅ Password with toggle */}
            <div className="relative">
              <label className="floating-label">
                <span>Your Password</span>
                <input
                  name="password"
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  className="input input-md mt-1 w-full px-4 py-2 pr-10"
                  onChange={handleChange}
                />
              </label>
              <button
                type="button"
                className="absolute right-3 top-2 text-sm  transition-all delay-100 z-10 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {signup && (
              <p>
                Try signing up-{" "}
                <Link to={"/signup"} className="link-hover link-error">
                  Sign Up
                </Link>
              </p>
            )}

            <button
              type="button"
              className=" btn btn-primary w-full  text-white py-2 rounded cursor-pointer"
              onClick={handleClick}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyRoute("/login")({
  component: LoginPage,
});

export default LoginPage;
