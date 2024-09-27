import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { updateUserList } from "../store/Store";
import {
  fetchUserById,
  createUser,
  updateUser,
} from "../services/employeeServices";
interface FormValues {
  name: string;
  email: string;
  employeeId: string;
  mobileNumber: string;
  role: string;
}

interface FormFieldProps {
  id?: string;
  onClose?: (() => void | undefined) | undefined;
}

interface FormDetails {
  name: string;
  email: string;
  employeeId: string;
  mobileNumber: string;
  JobRole: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "This field cannot be left blank",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot be longer than 30 characters",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.empty": "Email Address is required",
    "string.pattern.base": "Invalid Email Address",
  }),
  employeeId: Joi.string().min(4).required().messages({
    "string.empty": "This field cannot be left blank",
    "string.min": "Employee Id must be at least 4 characters long",
  }),
  mobileNumber: Joi.string()
    .pattern(new RegExp("^[6-9]\\d{9}$"))
    .required()
    .messages({
      "string.empty": "This field cannot be left blank",
      "string.pattern.base": "Please enter a valid phone number",
    }),
  role: Joi.string().required().messages({
    "string.empty": "This field cannot be left blank",
  }),
});
const FormField = ({ id, onClose }: FormFieldProps) => {
  const navigate = useNavigate();
  const { toggleCount, setToggleCount } = updateUserList();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      employeeId: "",
      mobileNumber: "",
      role: "",
    },
    resolver: joiResolver(validationSchema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const [formDetails, setFormDetails] = useState<FormDetails | null>(null);

  useEffect(() => {
    if (id) {
      fetchUserById(id).then(setFormDetails).catch(console.error);
    } else {
      reset();
    }
  }, [id, reset]);

  useEffect(() => {
    if (formDetails) {
      setValue("name", formDetails.name || "");
      setValue("email", formDetails.email || "");
      setValue("employeeId", formDetails.employeeId || "");
      setValue("mobileNumber", formDetails.mobileNumber || "");
      setValue("role", formDetails.JobRole || "");
    } else {
      reset();
    }
  }, [formDetails, setValue, reset]);

  const onSubmit = async (data: FormValues) => {
    if (data) {
      if (id) {
        await updateUser(id, {
          name: data.name,
          email: data.email,
          employeeId: data.employeeId,
          mobileNumber: data.mobileNumber,
          JobRole: data.role,
        })
          .then((response) => {
            console.log("response", response);
            toast.success("Data updated successfully!", {
              autoClose: 3000,
              style: {
                backgroundColor: "#4caf50",
                color: "#fff",
              },
            });

            setTimeout(() => {
              form.reset();
              setToggleCount(toggleCount + 1);
              onClose && onClose();
            }, 1000);
          })
          .catch((error) => {
            toast(error.message);
          });
      } else {
        await createUser({
          name: data.name,
          email: data.email,
          employeeId: data.employeeId,
          mobileNumber: data.mobileNumber,
          JobRole: data.role,
        })
          .then((response) => {
            console.log("response", response);
            toast.success("Data created successfully!", {
              autoClose: 3000,
              style: {
                backgroundColor: "#4caf50",
                color: "#fff",
              },
            });
            form.reset();
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          })
          .catch((error) => {
            toast(error.message);
          });
      }
    }
  };
  return (
    <form
      {...form}
      className="bg-white shadow-md px-8 pt-6 pb-8 mb-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <div className="border-b pb-3 border-gray-200">
          <h1 className="font-semibold lg:text-2xl md:text-lg">
            Data Collection Form
          </h1>
          <p className="text-gray-600 text-sm">
            Please provide the following information for data collection
            purposes.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-b border-gray-900/10 pb-4 md:grid-cols-2">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <InputField
                    label="Name"
                    placeholder="Enter your Name"
                    type="text"
                    {...register("name")}
                    {...field}
                    className={`focus:border-blue-500 ${
                      errors.name && "border border-red-500"
                    }`}
                    icon={<CgProfile />}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm lg:text-left text-center">
                  {" "}
                  {errors.name.message}{" "}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <InputField
                    label="Email Id"
                    placeholder="Enter your Email Id"
                    type="email"
                    {...register("email")}
                    {...field}
                    className={`focus:border-blue-500 ${
                      errors.email && "border border-red-500"
                    }`}
                    icon={<MdOutlineMail />}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm lg:text-left text-center">
                  {" "}
                  {errors.email.message}{" "}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <Controller
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <InputField
                    label="Employee Id"
                    placeholder="Enter your Employee Id"
                    type="number"
                    {...register("employeeId")}
                    {...field}
                    className={`focus:border-blue-500 ${
                      errors.employeeId && "border border-red-500"
                    }`}
                    icon={<FaIdBadge />}
                  />
                )}
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm lg:text-left text-center">
                  {" "}
                  {errors.employeeId.message}{" "}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <Controller
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <InputField
                    label="Mobile Number"
                    placeholder="Enter your Mobile Number"
                    type="number"
                    {...register("mobileNumber")}
                    {...field}
                    className={`focus:border-blue-500 ${
                      errors.mobileNumber && "border border-red-500"
                    }`}
                    icon={<MdLocalPhone />}
                  />
                )}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm lg:text-left text-center">
                  {" "}
                  {errors.mobileNumber.message}{" "}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Role
                </label>
                <select
                  id="role"
                  defaultValue=""
                  {...register("role")}
                  className={`sm:text-sm font-normal leading-5 text-gray-900  px-5 pb-2.5 rounded-md bg-white h-10 border w-full ${
                    errors.role
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-indigo-600 focus:border-indigo-600"
                  }  outline-none`}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm lg:text-left text-center">
                    {" "}
                    {errors.role.message}{" "}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center lg:justify-end gap-x-6 md:justify-center xs:justify-center">
        <Button
          label={id ? "Update" : "Submit"}
          type="submit"
          className="w-32 mt-2 m-auto"
        />
        <ToastContainer />
      </div>
    </form>
  );
};

export default FormField;
