import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface LoginFormInputs {
  email: string;
  password: string;
  captcha: string;
}

type FormField = keyof LoginFormInputs;

const fields: FormField[] = ["email", "password"];

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha(6));
  const [isVerifiedCaptcha, setIsVerifiedCaptcha] = useState("");
  const [isShown, setIsShown] = useState(false);

  const form = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "", captcha: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/home");
  }, [navigate]);

  const signIn: SubmitHandler<LoginFormInputs> = async (data) => {
    if (data.captcha === captcha) {
      try {
        const result = await loginUser(data.email, data.password);
        if (result.id) {
          login();
          localStorage.setItem("user", JSON.stringify(result));
          toast.success(`Loggin successfull!`, {
            autoClose: 3000,
            style: { backgroundColor: "#4caf50", color: "#fff" },
          });
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      } catch (error) {
        toast.error("Login Failed");
      }
    } else {
      handleCaptchaError(data.captcha);
    }
  };

  const handleCaptchaError = (captchaInput: string) => {
    if (!captchaInput) {
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

  function generateCaptcha(length: number): string {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  }

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto bg-custom-image bg-cover bg-center">
      <div className="flex w-full h-full">
        <div className="xl:my-auto xl:w-[60%] lg:w-[60%] w-full lg:order-2 order-1 md:my-auto p-4 mx-auto">
          <div className="w-full lg:max-w-[50%] md:max-w-[90%] bg-white p-2 h-full mb-4 shadow-custom-shadow mx-auto rounded-md">
            <form onSubmit={handleSubmit(signIn)} className="space-y-6 p-5">
              <img
                src="https://www.designmantic.com/logo-images/172879.png?company=Company%20Name&keyword=logistics&slogan=&verify=1"
                alt="logo"
                className="mt-4 mb-4 h-32 w-32"
              />

              {fields.map((field, idx) => (
                <div
                  key={field}
                  className={`relative bg-[#F8F8F9] rounded ${
                    errors[field] && "border border-red-500"
                  }`}
                >
                  <input
                    type={
                      field === "password" && !isShown ? "password" : "text"
                    }
                    id={field}
                    {...register(field, {
                      required: `${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      } is required`,
                    })}
                    placeholder=" "
                    className={`peer block w-full appearance-none bg-transparent p-3 pt-[38px] pl-4 pb-2 text-sm text-[#333333] outline-none rounded`}
                  />
                  <label
                    htmlFor={field}
                    className={`absolute top-0 left-4 text-sm text-[#595959] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-sm mt-3`}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {errors[field] && (
                    <p className="text-red-500 text-sm lg:text-left text-center">
                      {errors[field]?.message}
                    </p>
                  )}
                </div>
              ))}

              <p className="text-sm text-[#004164] underline mt-6 cursor-pointer">
                Forgot password?
              </p>

              <div className="flex flex-col">
                <div className="flex justify-between">
                  <input
                    id="captcha"
                    type="text"
                    {...register("captcha", {
                      required: "Captcha is required",
                    })}
                    placeholder="Enter the Shown text"
                    className={`border border-[#D4D4D4] bg-[#F8F8F9] h-12 min-w-36 w-full px-4 rounded focus:outline-none ${
                      errors.captcha && "border-red-500"
                    }`}
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
                    {errors.captcha.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-[#28698C] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#28698C] uppercase"
              >
                Log In
                <FaArrowRight className="text-white ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
