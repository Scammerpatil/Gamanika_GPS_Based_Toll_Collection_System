import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import axios from "axios";
import { Eye, EyeIcon, EyeOffIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VehicleDataTable from "./VehicleData";
import { User } from "@/types/user";
import { Vehicle } from "@/types/vehicle";

const SignUp = ({ router }: { router: any }) => {
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    username: "",
    isVerified: false,
    isAdminApproved: false,
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [otp, setOTP] = useState<string>("");
  const [userOTP, setUserOTP] = useState<string>("");
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState<Vehicle>({
    registrationNumber: "",
    taxMode: "",
    registrationDate: new Date(),
    vehicleType: "",
    vehicleClass: "",
    chassisNo: 0,
    engineNo: 0,
    fuelType: "",
    manufacturingYear: 0,
    vehicleColor: "",
    vehicleSeatCapacity: 0,
    vehicleCategory: "",
    vehicleGrossWeight: 0,
    state: "",
    vehicleVerified: false,
    purchaseDate: new Date(),
    vehicleManufacturerName: "",
    modelCode: "",
    model: "",
    body: "",
    cylindersNo: 0,
    vehicleHp: 0,
    vehicleUnladenWeight: 0,
    vehicleGrossCombWeight: 0,
    wheelBase: 0,
    permitDetails: {
      permitType: "",
      permitValidUpto: new Date(),
    },
  });

  // Password Visibility
  const handleClickShowPassword = () => {
    setPasswordVisibilty(!passwordVisibilty);
  };

  // Verify Email
  const verifyEmail = () => {
    const response = axios.post("/api/auth/verifyemail", {
      email: user.email,
    });
    toast
      .promise(response, {
        loading: "Verifying Email...",
        success: (res) => {
          setOTP(res.data.token);
          (
            document.getElementById("otpContainer") as HTMLDialogElement
          ).showModal();
          return `Email Send to ${res.data.email}`;
        },
        error: "Email Verification Failed",
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Verify Vehicle
  const verifyVehicle = () => {
    const response = JSON.parse(localStorage.getItem("vehicleData") || "{}");
    if (response.result?.reg_no == vehicleDetails?.registrationNumber) {
      setVehicleDetails({
        registrationNumber: response.result.reg_no,
        registrationDate: new Date(response.result.reg_date),
        vehicleType: response.result.vehicle_type,
        vehicleClass: response.result.vehicle_class_desc,
        vehicleCategory: response.result.vehicle_catg,
        chassisNo: response.result.chassis_no,
        engineNo: response.result.engine_no,
        fuelType: response.result.fuel_descr,
        manufacturingYear: response.result.manufacturing_yr,
        vehicleColor: response.result.color,
        vehicleSeatCapacity: response.result.vehicle_seat_capacity,
        vehicleGrossWeight: response.result.vehicle_gross_weight,
        state: response.result.state,
        purchaseDate: new Date(response.result.purchase_date),
        vehicleManufacturerName: response.result.vehicle_manufacturer_name,
        modelCode: response.result.model_code,
        model: response.result.model,
        body: response.result.body_type,
        cylindersNo: response.result.cylinders_no,
        vehicleHp: response.result.vehicle_hp,
        vehicleUnladenWeight: response.result.unladen_weight,
        vehicleGrossCombWeight: response.result.vehicle_gross_comb_weight,
        wheelBase: response.result.wheelbase,
        permitDetails: {
          permitType: response.result.permit_details?.permitType || "",
          permitValidUpto: response.result.permit_details?.permitValidUpto
            ? new Date(response.result.permit_details.permitValidUpto)
            : new Date(),
        },
        taxMode: response.result.tax_mode,
        vehicleVerified: true,
      });

      console.log(vehicleDetails);
    }
    setUser({ ...user, fullName: response.result.owner_name });
    return;
  };

  useEffect(() => {
    if (vehicleDetails.vehicleVerified && user.isVerified) {
      setDisabled(false);
    }
  }, [vehicleDetails, user]);
  // Handle Submit
  const handleSubmit = () => {
    if (user.isVerified && vehicleDetails.vehicleVerified) {
      const data = {
        ...user,
        vehicleDetails,
      };
      const response = axios.post("/api/auth/signup", data);
      toast
        .promise(response, {
          loading: "Creating Account...",
          success: (res) => {
            toast.success(res.data.message);
            (document.getElementById("signup") as HTMLDialogElement).close();
            (document.getElementById("login") as HTMLDialogElement).showModal();
            return res.data.message;
          },
          error: "Account Creation Failed",
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Verify Email and Vehicle Details");
    }
  };

  return (
    <>
      <dialog id="signup" className="modal w-screen">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 border-base-content cursor-pointer"
              onClick={() => {
                (document.getElementById("login") as HTMLDialogElement).close();
              }}
            >
              <X />
            </button>
            <section className="relative z-10 overflow-hidden">
              <div className="container">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="mx-auto max-w-[500px] rounded px-6 py-10 shadow-three sm:p-[60px]">
                      <h3 className="mb-3 text-center text-2xl font-bold sm:text-3xl">
                        Create your account
                      </h3>
                    </div>
                    {/* UserName */}
                    <div className="mb-8">
                      <label
                        htmlFor="username"
                        className="mb-3 block text-sm text-base-content"
                      >
                        {" "}
                        Username{" "}
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className="w-full rounded-sm border border-stroke bg-base px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary bg-base-200"
                      />
                    </div>
                    {/* Full Name */}
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm text-base-content"
                      >
                        {" "}
                        Full Name{" "}
                      </label>
                      <input
                        type="text"
                        name="name"
                        readOnly
                        disabled
                        value={user.fullName}
                        onChange={(e) =>
                          setUser({ ...user, fullName: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className="w-full rounded-sm border border-stroke bg-base-200 text-base-content px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary"
                      />
                    </div>
                    {/* Email */}
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm text-base-content"
                      >
                        {" "}
                        Work Email{" "}
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                          placeholder="Enter your Email"
                          className="w-full rounded-sm border border-stroke bg-base-200 text-base-content px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary"
                        />
                        <button
                          className={`rounded-sm border border-stroke bg-primary text-primary-content px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent hover:bg-primary/80`}
                          onClick={verifyEmail}
                        >
                          {!user.isVerified ? "Verify" : "Verified"}
                        </button>
                        <br />
                      </div>
                    </div>
                    {/* Vehicle Number Plate */}
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm text-base-content"
                      >
                        {" "}
                        Vehicle Number{" "}
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          name="Vehicle Number"
                          value={vehicleDetails?.registrationNumber}
                          onChange={(e) =>
                            setVehicleDetails({
                              ...vehicleDetails,
                              registrationNumber: e.target.value,
                            })
                          }
                          placeholder="Enter your Vehicle Number"
                          className="w-full rounded-sm border uppercase border-stroke bg-base-200 text-primary-content px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary"
                        />
                        <button
                          className={`w-50 ${
                            vehicleDetails.vehicleVerified ? "hidden" : ""
                          } rounded-sm border border-stroke bg-primary text-primary-content px-6 py-3 outline-none transition-all duration-300 focus:border-primary hover:bg-primary/80`}
                          onClick={verifyVehicle}
                          disabled={vehicleDetails.vehicleVerified}
                        >
                          {!vehicleDetails.vehicleVerified
                            ? "Verify"
                            : "Verified"}
                        </button>
                        {vehicleDetails.vehicleVerified && (
                          <button
                            className="w-50 rounded-sm border border-stroke bg-primary text-primary-content px-6 py-3 outline-none transition-all duration-300 focus:border-primary hover:bg-primary/80"
                            onClick={() => {
                              (
                                document.getElementById(
                                  "vehicleData"
                                ) as HTMLDialogElement
                              ).showModal();
                            }}
                          >
                            Check Details
                          </button>
                        )}
                        <br />
                      </div>
                    </div>
                    {/* Password */}
                    <div className="mb-8">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm text-base-content"
                      >
                        {" "}
                        Your Password{" "}
                      </label>
                      <OutlinedInput
                        className="h-[50px] w-full rounded-sm border border-stroke px-3 py-3 outline-none transition-all duration-300 focus:border-primary bg-base-200 text-base-content"
                        type={passwordVisibilty ? "text" : "password"}
                        value={user.password}
                        placeholder="Password"
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                              className="text-base-content"
                            >
                              {passwordVisibilty ? <EyeOffIcon /> : <EyeIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </div>
                    <div className="mb-8 flex">
                      <label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                          />
                          <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <span>
                          By creating account means you agree to the
                          <a href="#0" className="text-primary hover:underline">
                            {" "}
                            Terms and Conditions{" "}
                          </a>
                          , and our
                          <a href="#0" className="text-primary hover:underline">
                            {" "}
                            Privacy Policy{" "}
                          </a>
                        </span>
                      </label>
                    </div>
                    {/* Sign UP Protocol */}
                    <div className="mb-6">
                      <button
                        disabled={disabled}
                        className={`flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-primary-content font-medium shadow-submit duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50`}
                        onClick={handleSubmit}
                      >
                        Sign up
                      </button>
                    </div>
                    <p className="text-center text-base font-medium text-body-color">
                      Already using LG Data Dairies?{" "}
                      <button
                        onClick={() => {
                          (
                            document.getElementById(
                              "signup"
                            ) as HTMLDialogElement
                          ).close();
                          (
                            document.getElementById(
                              "login"
                            ) as HTMLDialogElement
                          ).showModal();
                        }}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 top-0 z-[-1]">
                <svg
                  width="1440"
                  height="969"
                  viewBox="0 0 1440 969"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_95:1005"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1440"
                    height="969"
                  >
                    <rect width="1440" height="969" fill="#090E34" />
                  </mask>
                  <g mask="url(#mask0_95:1005)">
                    <path
                      opacity="0.1"
                      d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                      fill="url(#paint0_linear_95:1005)"
                    />
                    <path
                      opacity="0.1"
                      d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                      fill="url(#paint1_linear_95:1005)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_95:1005"
                      x1="1178.4"
                      y1="151.853"
                      x2="780.959"
                      y2="453.581"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop
                        offset="1"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_95:1005"
                      x1="160.5"
                      y1="220"
                      x2="1099.45"
                      y2="1192.04"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop
                        offset="1"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </section>
          </form>
        </div>
      </dialog>
      <dialog id="otpContainer" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box flex flex-col justify-center items-center gap-5">
          <h1 className="mt-5">Verify Your Email</h1>
          <label
            htmlFor="name"
            className="mb-3 block text-sm text-base-content"
          >
            Please Enter the OTP
          </label>
          <div className="flex gap-2 mt-5">
            <input
              type="text"
              name="otp"
              value={userOTP}
              onChange={(e) => setUserOTP(e.target.value)}
              placeholder="Enter OTP"
              className="w-50 rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
            />
            <button
              className="w-50 rounded-sm border border-stroke bg-accent text-accent-content px-6 py-3 outline-none transition-all duration-300 focus:border-primary"
              onClick={() => {
                if (otp === userOTP) {
                  setUser({ ...user, isVerified: true });
                  toast.success("Email Verified Successfully");
                  (
                    document.getElementById("otpContainer") as HTMLDialogElement
                  ).close();
                  (
                    document.getElementById("signup") as HTMLDialogElement
                  ).showModal();
                } else {
                  toast.error("Invalid OTP");
                }
              }}
            >
              Verify
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline text-base-content">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {vehicleDetails && <VehicleDataTable vehicleData={vehicleDetails} />}
    </>
  );
};

export default SignUp;
