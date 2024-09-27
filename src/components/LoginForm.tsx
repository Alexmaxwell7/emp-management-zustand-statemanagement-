import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const generateCaptcha = (length: number) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    // Ensure at least one character from each category
    const captchaArray = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
    ];

    // Fill the remaining length with random characters from all categories
    const allChars = lowercase + uppercase + numbers;
    for (let i = 3; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      captchaArray.push(allChars[randomIndex]);
    }

    // Shuffle the array to randomize character positions
    return captchaArray.sort(() => Math.random() - 0.5).join("");
  };

  const [captcha, setCaptcha] = useState(generateCaptcha(6)); // Generate a 6-character CAPTCHA
  const [isVerifiedCaptcha, setIsVerifiedCaptcha] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      captcha: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const signIn = async (data: any) => {
    if (data.captcha === captcha) {
      try {
        const result = await loginUser(data.email, data.password);
        login();
        localStorage.setItem("user", JSON.stringify(result));
        console.log("Login successful", result);
        navigate("/home");
      } catch (error) {
        console.error("Login failed", error);
      }
    } else if (data.captcha.length === 0) {
      setIsVerifiedCaptcha("Captcha value is empty");
    } else {
      setIsVerifiedCaptcha("Incorrect Captcha. Please try again.");
      setCaptcha(generateCaptcha(6));
      setTimeout(() => {
        form.reset();
        setIsVerifiedCaptcha("");
      }, 2000);
    }
  };
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <div className="w-full h-full overflow-hidden overflow-y-auto bg-custom-image bg-cover bg-center">
        <div className="flex w-full h-full">
          <div className="xl:my-auto xl:w-[60%] lg:w-[60%] w-full lg:order-2 order-1 md:my-auto p-4 mx-auto">
            <div className="w-full lg:max-w-[50%] md:max-w-[90%] bg-white p-2 h-full mb-4 shadow-custom-shadow mx-auto rounded-md">
              <form onSubmit={handleSubmit(signIn)} className="space-y-6 p-5">
                <img
                  src="https://www.designmantic.com/logo-images/172879.png?company=Company%20Name&keyword=logistics&slogan=&verify=1"
                  className="mt-4 mb-4 h-32 w-32"
                  alt="logo"
                />

                <div className="bg-[#F8F8F9] rounded">
                  <div className="relative w-full  bg-[#F8F8F9] rounded">
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: "Email is required" })}
                      placeholder=" "
                      className={`peer block w-full appearance-none bg-transparent p-3 pt-[38px] pl-4 pb-2 text-sm text-[#333333] outline-none rounded ${
                        errors?.email && "border border-red-500"
                      }`}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute top-0 left-4 text-sm text-[#595959] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#595959] peer-focus:top-0 peer-focus:text-sm mt-3`}
                    >
                      Email
                    </label>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm lg:text-left text-center">
                    {" "}
                    {errors.email.message}{" "}
                  </p>
                )}

                <div
                  className={`flex w-full  bg-[#F8F8F9] rounded ${
                    errors?.password && "border border-red-500"
                  }`}
                >
                  <div className="flex relative w-2/3">
                    <input
                      type={isShown ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder=" "
                      className={`peer block w-full bg-transparent p-3 pt-[38px] pl-4 pb-2 text-sm text-[#333333] outline-none rounded`}
                    />
                    <label
                      htmlFor="password"
                      className={`absolute top-0 left-4 text-sm text-[#595959] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#595959] peer-focus:top-0 peer-focus:text-sm mt-3`}
                    >
                      Password
                    </label>
                  </div>
                  <div className="flex relative w-1/3 justify-end ">
                    <button
                      type="button"
                      onClick={() => setIsShown((prev) => !prev)}
                    >
                      {isShown ? (
                        <IoMdEye className="mr-2" />
                      ) : (
                        <IoMdEyeOff className="mr-2" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm lg:text-left text-center">
                    {" "}
                    {errors.password.message}{" "}
                  </p>
                )}

                <div className="flex justify-end">
                  <div className="text-sm">
                    <p className="text-sm text-[#004164] underline  mt-6 cursor-pointer">
                      Forgot password?
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <input
                        className={`border border-[#D4D4D4] bg-[#F8F8F9] h-12 min-w-36 w-full px-4 py-2 rounded focus:outline-none focus:border-[#D4D4D4] text-sm ${
                          errors.captcha && " border-red-500"
                        }`}
                        id="captcha"
                        type="text"
                        {...register("captcha", {
                          required: "Captcha is required",
                        })}
                        placeholder="Enter the Shown text"
                        autoComplete="Captcha"
                      />

                      <div className="flex min-w-28 w-full bg-white h-12 border border-[#D4D4D4] rounded ml-2">
                        <p className="w-full font-semibold my-auto tracking-wide ml-2">
                          {captcha}
                        </p>
                        <button
                          type="button"
                          onClick={() => setCaptcha(generateCaptcha(6))}
                        >
                          <FiRefreshCcw className="text-[#1E3672] mr-2 ml-2" />
                        </button>
                      </div>
                    </div>
                    {isVerifiedCaptcha && (
                      <p className="text-red-500 text-sm pt-2 lg:text-left text-center">
                        {isVerifiedCaptcha}
                      </p>
                    )}
                    {errors.captcha && (
                      <p className="text-red-500 text-sm lg:text-left text-center">
                        {" "}
                        {errors.captcha.message}{" "}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-[#28698C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-[#28698C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
                  >
                    Log In
                    <FaArrowRight className="text-white ml-2 my-auto" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
