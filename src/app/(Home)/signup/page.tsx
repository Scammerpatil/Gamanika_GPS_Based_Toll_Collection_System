"use client";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { IconButton, InputAdornment } from "@mui/material";
import VehicleDetailsTable from "@/components/VehicleInformation";
import { set } from "mongoose";

enum VehicleType {
  CAR = "Car",
  JEEP = "Jeep",
  VAN = "Van",
  LIGHT_MOTOR_VEHICLE = "Light Motor Vehicle",
  LIGHT_COMMERCIAL_VEHICLE = "Light Commercial Vehicle",
  MINI_BUS = "Mini Bus",
  BUS = "Bus",
  TRUCK_TWO_AXLES = "Truck (Two axles)",
  THREE_AXLE_COMMERCIAL_VEHICLE = "Three-axle commercial vehicle",
  HCM_EME_MAV = "Heavy Construction Machinery or Earth Moving Equipment or Multi Axle Vehicle (four to six axles)",
  OVERSIZED_VEHICLE = "Oversized Vehicle (seven or more axles)",
}

enum FuelType {
  PETROL = "Petrol",
  DIESEL = "Diesel",
  CNG = "CNG",
  ELECTRIC = "Electric",
  HYBRID = "Hybrid",
}

interface VehicleFinancerDetails {
  hpType: string;
  financerName: string;
  financerAddressLine1: string;
  financerAddressLine2: string;
  financerAddressLine3: string;
  financerDistrict: number;
  financerPincode: number;
  financerState: string;
  financerFullAddress: string;
  hypothecationDt: Date | string;
  opDt: Date | string;
}

interface VehicleInsuranceDetails {
  insuranceFrom: Date | string;
  insuranceUpto: Date | string;
  insuranceCompanyCode: number;
  insuranceCompanyName: string;
  policyNo: string;
  vahanVerify: boolean;
  regNo: string;
}

interface VehiclePuccDetails {
  puccFrom: Date | string;
  puccUpto: Date | string;
  puccCentreNo: string;
  puccNo: string;
  opDt: Date | string;
}

interface VehiclePermitDetails {
  applNo: string;
  pmtNo: string;
  regNo: string;
  rcptNo: string;
  purpose: string;
  permitType: string;
  permitCatg: string;
  permitIssuedOn: Date | string;
  permitValidFrom: Date | string;
  permitValidUpto: Date | string;
}

interface VehicleDetails {
  vehicleNumberPlate: string;
  vehicleVerified: boolean;
  vehicleType: VehicleType;
  vehicleClass: string;
  chassisNo: string;
  engineNo: string;
  fuelType: FuelType;
  manufacturingYear: number;
  vehicleColor: string;
  vehicleSeatCapacity: number;
  vehicleGrossWeight: number;
  state: string;
  registrationNumber: string;
  registrationDate: Date | string;
  ownerName: string;
  address: string;
  officeCode: number;
  officeName: string;
  purchaseDate: Date | string;
  ownerCount: number;
  ownerFatherName: string;
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentAddressLine3: string;
  currentDistrictName: string;
  currentStateName: string;
  currentPincode: number;
  currentFullAddress: string;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentAddressLine3: string;
  permanentDistrictName: string;
  permanentStateName: string;
  permanentPincode: number;
  permanentFullAddress: string;
  ownerCodeDescr: string;
  regTypeDescr: string;
  vehicleManufacturerName: string;
  modelCode: string;
  model: string;
  bodyType: string;
  cylindersNo: number;
  vehicleHp: number;
  vehicleStandingCapacity: number;
  vehicleSleeperCapacity: number;
  vehicleUnladenWeight: number;
  vehicleGrossCombWeight: number;
  normsDescr: string;
  wheelbase: number;
  cubicCap: number;
  floorArea: number;
  acFitted: boolean;
  audioFitted: boolean;
  videoFitted: boolean;
  vehiclePurchaseAs: string;
  vehicleCatg: string;
  dealerCode: string;
  dealerName: string;
  dealerFullAddress: string;
  saleAmount: number;
  laserCode: string;
  garageAdd: string;
  length: number;
  width: number;
  height: number;
  regUpto: Date | string;
  fitUpto: Date | string;
  opDt: Date | string;
  importedVehicle: boolean;
  otherCriteria: number;
  status: string;
  taxMode: string;
  paymentMode: string;
  taxAmt: number;
  taxFine: number;
  rcptDt: Date | string;
  taxFrom: Date | string;
  taxUpto: Date | string;
  collectedBy: string;
  rcptNo: string;
  financerDetails: VehicleFinancerDetails;
  insuranceDetails: VehicleInsuranceDetails;
  puccDetails: VehiclePuccDetails;
  permitDetails: VehiclePermitDetails;
}

interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp: string;
  vehicle: VehicleDetails;
}

const SignupPage = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [container, setContainer] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpContainer, setOtpContainer] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [user, setUser] = useState<User>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    isVerified: false,
    otp: "",
    vehicle: {
      vehicleVerified: false,
      vehicleNumberPlate: "",
      vehicleType: VehicleType.CAR,
      vehicleClass: "",
      chassisNo: "",
      engineNo: "",
      fuelType: FuelType.PETROL,
      manufacturingYear: new Date().getFullYear(),
      vehicleColor: "",
      vehicleSeatCapacity: 0,
      vehicleGrossWeight: 0,
      state: "",
      registrationNumber: "",
      registrationDate: new Date(),
      ownerName: "",
      address: "",
      officeCode: 0,
      officeName: "",
      purchaseDate: new Date(),
      ownerCount: 0,
      ownerFatherName: "",
      currentAddressLine1: "",
      currentAddressLine2: "",
      currentAddressLine3: "",
      currentDistrictName: "",
      currentStateName: "",
      currentPincode: 0,
      currentFullAddress: "",
      permanentAddressLine1: "",
      permanentAddressLine2: "",
      permanentAddressLine3: "",
      permanentDistrictName: "",
      permanentStateName: "",
      permanentPincode: 0,
      permanentFullAddress: "",
      ownerCodeDescr: "",
      regTypeDescr: "",
      vehicleManufacturerName: "",
      modelCode: "",
      model: "",
      bodyType: "",
      cylindersNo: 0,
      vehicleHp: 0,
      vehicleStandingCapacity: 0,
      vehicleSleeperCapacity: 0,
      vehicleUnladenWeight: 0,
      vehicleGrossCombWeight: 0,
      normsDescr: "",
      wheelbase: 0,
      cubicCap: 0,
      floorArea: 0,
      acFitted: false,
      audioFitted: false,
      videoFitted: false,
      vehiclePurchaseAs: "",
      vehicleCatg: "",
      dealerCode: "",
      dealerName: "",
      dealerFullAddress: "",
      saleAmount: 0,
      laserCode: "",
      garageAdd: "",
      length: 0,
      width: 0,
      height: 0,
      regUpto: new Date(),
      fitUpto: new Date(),
      opDt: new Date(),
      importedVehicle: false,
      otherCriteria: 0,
      status: "",
      taxMode: "",
      paymentMode: "",
      taxAmt: 0,
      taxFine: 0,
      rcptDt: new Date(),
      taxFrom: new Date(),
      taxUpto: new Date(),
      collectedBy: "",
      rcptNo: "",
      financerDetails: {
        hpType: "",
        financerName: "",
        financerAddressLine1: "",
        financerAddressLine2: "",
        financerAddressLine3: "",
        financerDistrict: 0,
        financerPincode: 0,
        financerState: "",
        financerFullAddress: "",
        hypothecationDt: new Date(),
        opDt: new Date(),
      },
      insuranceDetails: {
        insuranceFrom: new Date(),
        insuranceUpto: new Date(),
        insuranceCompanyCode: 0,
        insuranceCompanyName: "",
        policyNo: "",
        vahanVerify: false,
        regNo: "",
      },
      puccDetails: {
        puccFrom: new Date(),
        puccUpto: new Date(),
        puccCentreNo: "",
        puccNo: "",
        opDt: new Date(),
      },
      permitDetails: {
        applNo: "",
        pmtNo: "",
        regNo: "",
        rcptNo: "",
        purpose: "",
        permitType: "",
        permitCatg: "",
        permitIssuedOn: new Date(),
        permitValidFrom: new Date(),
        permitValidUpto: new Date(),
      },
    },
  });

  useEffect(() => {
    if (
      user.fullName &&
      user.email &&
      user.vehicle.vehicleNumberPlate &&
      user.vehicle.vehicleVerified &&
      user.password.length >= 8 &&
      emailVerified
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  // Handle OTP
  const otpContainerClose = async () => {
    if (otpContainer) {
      if (otp === user.otp) {
        toast.success("OTP Verified");
        setEmailVerified(true);
        setOtpContainer(false);
        setContainer(true);
        localStorage.setItem("email", user.email);
        user.isVerified = true;
      } else {
        toast.error("Invalid OTP");
      }
    } else {
      toast.error("OTP not verified");
    }
  };
  // handle Close button
  const handleClose = () => {
    setOtpContainer(false);
  };

  // Verify Email
  const verifyEmail = async () => {
    if (!user.email.includes("@")) {
      toast.error("Please Enter a Valid Email");
      return;
    }
    if (!user.email || user.email === "") {
      toast.error("Please Enter Email");
      return;
    }
    const email = localStorage.getItem("email")!;
    if (email === user.email) {
      toast.success("Email Already Verified");
      setContainer(true);
      setOtpContainer(false);
      setEmailVerified(true);
      user.isVerified = true;
      return;
    }
    const responsePromise = axios.post("/api/verifyemail", {
      email: user.email,
    });
    toast.promise(
      responsePromise,
      {
        loading: "Loading",
        success: (data) => {
          setContainer(false);
          return `Email Sent Successfully to ${data.data.vehicleData.email}`;
        },
        error: (err) => `This just happened: ${err.toString()}`,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "😒",
        },
      }
    );
    const response = await responsePromise;
    setOtp(response.data.token);
    setOtpContainer(true);
    user.isVerified = true;
  };
  // Password Visibility
  const handleClickShowPassword = () => {
    setPasswordVisibilty(!passwordVisibilty);
  };
  // Verify Vehicle
  const verifyVehicle: any = () => {
    if (!user.vehicle.vehicleNumberPlate) {
      toast.error("Please Enter Vehicle Number");
      return;
    }

    const vehicleNumber = user.vehicle.vehicleNumberPlate.toUpperCase();
    const regex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    const vehicleData = JSON.parse(localStorage.getItem("vehicleData")!);

    if (vehicleData?.result) {
      const result = vehicleData.result;

      setUser((prevUser) => ({
        ...prevUser,
        fullName: result.owner_name || "NA",
        vehicle: {
          vehicleVerified: true,
          vehicleNumberPlate: result.reg_no || "NA",
          vehicleType: result.vehicle_type || "NA",
          vehicleClass: result.vehicle_class_desc || "NA",
          chassisNo: result.chassis_no || "NA",
          engineNo: result.engine_no || "NA",
          fuelType: result.fuel_descr || "NA",
          manufacturingYear: result.manufacturing_yr || 0,
          vehicleColor: result.color || "NA",
          vehicleSeatCapacity: result.vehicle_seat_capacity || 0,
          vehicleGrossWeight: result.vehicle_gross_weight || 0,
          state: result.state || "NA",
          registrationNumber: result.reg_no || "NA",
          registrationDate: result.reg_date
            ? new Date(result.reg_date)
            : new Date(),
          ownerName: result.owner_name || "NA",
          address: result.current_full_address || "NA",
          officeCode: result.office_code || "NA",
          officeName: result.office_name || "NA",
          purchaseDate: result.purchase_date
            ? new Date(result.purchase_date)
            : new Date(),
          ownerCount: result.owner_count || 0,
          ownerFatherName: result.owner_father_name || "NA",
          currentAddressLine1: result.current_address_line1 || "NA",
          currentAddressLine2: result.current_address_line2 || "NA",
          currentAddressLine3: result.current_address_line3 || "NA",
          currentDistrictName: result.current_district_name || "NA",
          currentStateName: result.current_state_name || "NA",
          currentPincode: result.current_pincode || "NA",
          currentFullAddress: result.current_full_address || "NA",
          permanentAddressLine1: result.permanent_address_line1 || "NA",
          permanentAddressLine2: result.permanent_address_line2 || "NA",
          permanentAddressLine3: result.permanent_address_line3 || "NA",
          permanentDistrictName: result.permanent_district_name || "NA",
          permanentStateName: result.permanent_state_name || "NA",
          permanentPincode: result.permanent_pincode || "NA",
          permanentFullAddress: result.permanent_full_address || "NA",
          ownerCodeDescr: result.owner_code_descr || "NA",
          regTypeDescr: result.reg_type_descr || "NA",
          vehicleManufacturerName: result.vehicle_manufacturer_name || "NA",
          modelCode: result.model_code || "NA",
          model: result.model || "NA",
          bodyType: result.body_type || "NA",
          cylindersNo: result.cylinders_no || 0,
          vehicleHp: result.vehicle_hp || 0,
          vehicleStandingCapacity: result.vehicle_standing_capacity || 0,
          vehicleSleeperCapacity: result.vehicle_sleeper_capacity || 0,
          vehicleUnladenWeight: result.unladen_weight || 0,
          vehicleGrossCombWeight: result.vehicle_gross_comb_weight || 0,
          normsDescr: result.norms_descr || "NA",
          wheelbase: result.wheelbase || 0,
          cubicCap: result.cubic_cap || 0,
          floorArea: result.floor_area || 0,
          acFitted: result.ac_fitted === "Y",
          audioFitted: result.audio_fitted === "Y",
          videoFitted: result.video_fitted === "Y",
          vehiclePurchaseAs: result.vehicle_purchase_as || "NA",
          vehicleCatg: result.vehicle_catg || "NA",
          dealerCode: result.dealer_code || "NA",
          dealerName: result.dealer_name || "NA",
          dealerFullAddress: result.dealer_full_address || "NA",
          saleAmount: result.sale_amount || 0,
          laserCode: result.laser_code || "NA",
          garageAdd: result.garage_add || "NA",
          length: result.length || 0,
          width: result.width || 0,
          height: result.height || 0,
          regUpto: result.reg_upto ? new Date(result.reg_upto) : new Date(),
          fitUpto: result.fit_upto ? new Date(result.fit_upto) : new Date(),
          opDt: result.op_dt ? new Date(result.op_dt) : new Date(),
          importedVehicle: result.imported_vehicle === "Y",
          otherCriteria: result.other_criteria || "NA",
          status: result.status || "NA",
          taxMode: result.tax_mode || "NA",
          paymentMode: result.payment_mode || "NA",
          taxAmt: result.tax_amt || 0,
          taxFine: result.tax_fine || 0,
          rcptDt: result.latest_tax_details?.rcpt_dt
            ? new Date(result.latest_tax_details.rcpt_dt)
            : new Date(),
          taxFrom: result.latest_tax_details?.tax_from
            ? new Date(result.latest_tax_details.tax_from)
            : new Date(),
          taxUpto: result.latest_tax_details?.tax_upto
            ? new Date(result.latest_tax_details.tax_upto)
            : new Date(),
          collectedBy: result.latest_tax_details?.collected_by || "NA",
          rcptNo: result.latest_tax_details?.rcpt_no || "NA",
          financerDetails: {
            hpType: result.financer_details?.hp_type || "NA",
            financerName: result.financer_details?.financer_name || "NA",
            financerAddressLine1:
              result.financer_details?.financer_address_line1 || "NA",
            financerAddressLine2:
              result.financer_details?.financer_address_line2 || "NA",
            financerAddressLine3:
              result.financer_details?.financer_address_line3 || "NA",
            financerDistrict:
              result.financer_details?.financer_district || "NA",
            financerPincode: result.financer_details?.financer_pincode || "NA",
            financerState: result.financer_details?.financer_state || "NA",
            financerFullAddress:
              result.financer_details?.financer_full_address || "NA",
            hypothecationDt: result.financer_details?.hypothecation_dt
              ? new Date(result.financer_details.hypothecation_dt)
              : new Date(),
            opDt: result.financer_details?.op_dt
              ? new Date(result.op_dt)
              : new Date(),
          },
          insuranceDetails: {
            insuranceFrom: result.vehicle_insurance_details?.insurance_from
              ? new Date(result.vehicle_insurance_details.insurance_from)
              : new Date(),
            insuranceUpto: result.vehicle_insurance_details?.insurance_upto
              ? new Date(result.vehicle_insurance_details.insurance_upto)
              : new Date(),
            insuranceCompanyCode:
              result.vehicle_insurance_details?.insurance_company_code || "NA",
            insuranceCompanyName:
              result.vehicle_insurance_details?.insurance_company_name || "NA",
            policyNo: result.vehicle_insurance_details?.policy_no || "NA",
            vahanVerify:
              result.vehicle_insurance_details?.vahan_verify === "true",
            regNo: result.vehicle_insurance_details?.reg_no || "NA",
          },
          puccDetails: {
            puccFrom: result.vehicle_pucc_details?.pucc_from
              ? new Date(result.vehicle_pucc_details.pucc_from)
              : new Date(),
            puccUpto: result.vehicle_pucc_details?.pucc_upto
              ? new Date(result.vehicle_pucc_details.pucc_upto)
              : new Date(),
            puccCentreNo: result.vehicle_pucc_details?.pucc_centreno || "NA",
            puccNo: result.vehicle_pucc_details?.pucc_no || "NA",
            opDt: result.vehicle_pucc_details?.op_dt
              ? new Date(result.vehicle_pucc_details.op_dt)
              : new Date(),
          },
          permitDetails: {
            applNo: result.permit_details?.appl_no || "NA",
            pmtNo: result.permit_details?.pmt_no || "NA",
            regNo: result.permit_details?.reg_no || "NA",
            rcptNo: result.permit_details?.rcpt_no || "NA",
            purpose: result.permit_details?.purpose || "NA",
            permitType: result.permit_details?.permit_type || "NA",
            permitCatg: result.permit_details?.permit_catg || "NA",
            permitIssuedOn: result.permit_issued_on
              ? new Date(result.permit_issued_on)
              : new Date(),
            permitValidFrom: result.permit_valid_from
              ? new Date(result.permit_valid_from)
              : new Date(),
            permitValidUpto: result.permit_valid_upto
              ? new Date(result.permit_valid_upto)
              : new Date(),
            permitGoodsToCarry: result.permit_goods_to_carry || "NA",
            permitArea: result.permit_area || "NA",
          },
        },
      }));

      setVehicleDetails(result);
      return;
    }

    if (regex.test(vehicleNumber)) {
      try {
        const response = axios.post("/api/vehicle/verifyvehicle", {
          vehicleNumberPlate: user.vehicle.vehicleNumberPlate,
        });
        toast.promise(
          response,
          {
            loading: "Loading...",
            success: (data) => {
              setVehicleDetails(data.data.vehicleData);
              localStorage.setItem(
                "vehicleData",
                JSON.stringify(data.data.vehicleData)
              );
              return `Vehicle Verified with ${data.data.vehicleData.registrationNumber}`;
            },
            error: (err) => `This just happened: ${err.toString()}`,
          },
          {
            success: {
              duration: 5000,
              icon: "🔥",
            },
            error: {
              duration: 5000,
              icon: "😒",
            },
          }
        );
      } catch (error: any) {
        toast.error(error.toString());
      }
    } else {
      setUser({
        ...user,
        vehicle: {
          ...user.vehicle,
          vehicleNumberPlate: "",
        },
      });

      toast.error("Enter Valid Vehicle Number");
    }
  };

  // Submit the form
  const handleSubmit = async () => {
    const usernameRegex = /^[a-z0-9_]+$/;
    if (!usernameRegex.test(user.username)) {
      toast.error("Username should be alphanumeric");
      return;
    }
    if (!user.username || user.username === "" || user.username.length < 4) {
      toast.error("Please Enter a Valid Username");
      return;
    }
    user.fullName = user.fullName.trim();
    const responsePromise = axios.post("/api/auth/signup", user);
    toast.promise(
      responsePromise,
      {
        loading: "Loading",
        success: (data) => {
          router.push("/signin");
          return `User Created Successfully with email ${user.email}`;
        },
        error: (err) => `This just happened: ${err}`,
      },
      {
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "😒",
        },
      }
    );
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  It's totally free and super easy
                </p>
                <button className="mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, register with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                {/* UserName */}
                <div className="mb-8">
                  <label
                    htmlFor="username"
                    className="mb-3 block text-sm text-dark dark:text-white"
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
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                {/* Full Name */}
                <div className="mb-8">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm text-dark dark:text-white"
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
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none capitalize"
                  />
                </div>
                {/* Email */}
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
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
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    <button
                      className={`rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      onClick={verifyEmail}
                    >
                      {!emailVerified ? "Verify" : "Verified"}
                    </button>
                    <br />
                  </div>
                  <button
                    className={`${
                      container ? "hidden" : ""
                    } mt-2 rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                    onClick={() => setOtpContainer(true)}
                  >
                    Open Container
                  </button>
                </div>
                {/* Vehicle Number Plate */}
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Vehicle Number{" "}
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      name="Vehicle Number"
                      value={user.vehicle.vehicleNumberPlate}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          vehicle: {
                            ...user.vehicle,
                            vehicleNumberPlate: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter your Vehicle Number"
                      className="w-full rounded-sm border uppercase border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    <button
                      className={`rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      onClick={verifyVehicle}
                    >
                      {!user.vehicle.vehicleVerified ? "Verify" : "Verified"}
                    </button>
                    <br />
                  </div>
                </div>
                {/* Password */}
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Your Password{" "}
                  </label>
                  <OutlinedInput
                    className="h-[50px] w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    id="outlined-adornment-password"
                    type={passwordVisibilty ? "text" : "password"}
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {passwordVisibilty ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
                      <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
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
                    className={`flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-submit-dark`}
                    onClick={handleSubmit}
                  >
                    Sign up
                  </button>
                </div>
                <p className="text-center text-base font-medium text-body-color">
                  Already using LG Data Dairies?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {user.vehicle.vehicleVerified && (
          <VehicleDetailsTable data={vehicleDetails} />
        )}
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
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className={`contianer fixed inset-0 z-10 h-screen w-screen items-center justify-center gap-10 ${
            otpContainer ? "flex" : "hidden"
          }`}
        >
          <div className="relative flex h-1/3 w-1/3 flex-col items-center justify-between overflow-hidden rounded-xl border border-[rgba(44,48,59,0.3)] p-10 shadow-lg backdrop-blur-[5px] dark:bg-[rgba(44,48,59,0.57)] dark:shadow-[rgba(0,0,0,0.1)]">
            <button
              className="absolute right-0 top-0 flex h-1/6 w-1/12 items-center justify-center rounded-bl-2xl border-white bg-slate-200 pl-3 pt-2.5 dark:bg-body-color-dark"
              onClick={handleClose}
            >
              <svg
                className="block h-full w-full text-[#2C303B] dark:text-white"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
              >
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337" />
              </svg>
            </button>
            <h1>Verify Your Email</h1>
            <label
              htmlFor="name"
              className="mb-3 block text-sm text-dark dark:text-white"
            >
              Please Enter the OTP
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="otp"
                value={user.otp}
                onChange={(e) => setUser({ ...user, otp: e.target.value })}
                placeholder="Enter OTP"
                className="w-50 rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color"
              />
              <button
                className="w-50 rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color"
                onClick={otpContainerClose}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
