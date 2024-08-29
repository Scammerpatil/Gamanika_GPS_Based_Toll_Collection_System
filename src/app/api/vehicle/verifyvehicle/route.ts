import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { vehicleNumberPlate } = await req.json();
  const options = {
    method: "POST",
    url: "https://rto-vehicle-information-verification-india.p.rapidapi.com/api/v1/rc/vehicleinfo",
    headers: {
      "x-rapidapi-key": "f082f13198msh414f8028ce9f6e1p13c9b1jsn31ebe896d5a5",
      "x-rapidapi-host":
        "rto-vehicle-information-verification-india.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      reg_no: `${vehicleNumberPlate}`,
      consent: "Y",
      consent_text:
        "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
    },
  };
  try {
    const response = await axios.request(options);
    const vehicle = response.data;
    return NextResponse.json({ vehicleData: vehicle }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid Vehicle Number", success: false },
      { status: 400 }
    );
  }
  // const data = {
  //   state_code: "GJ",
  //   state: "Gujarat",
  //   office_code: 1,
  //   office_name: "AHMEDABAD",
  //   reg_no: "GJ01JT0459",
  //   reg_date: "2020-02-13",
  //   purchase_date: "2020-01-30",
  //   owner_count: 1,
  //   owner_name: "JAGDISHKUMAR MANUBHAI RABARI",
  //   owner_father_name: "MANUBHAI RABARI",
  //   current_address_line1: "22,MANSUKHPURAS CHAWL",
  //   current_address_line2: "OPP.VASANT CINEMA OUT SIDE",
  //   current_address_line3: "DARIYAPUR DARVAJA,",
  //   current_district_name: "Ahmedabad",
  //   current_state: "GJ",
  //   current_state_name: "Gujarat",
  //   current_pincode: 380016,
  //   current_full_address:
  //     "22,MANSUKHPURAS CHAWL, OPP.VASANT CINEMA OUT SIDE, DARIYAPUR DARVAJA, Ahmedabad, Gujarat, 380016",
  //   permanent_address_line1: "22,MANSUKHPURAS CHAWL",
  //   permanent_address_line2: "OPP.VASANT CINEMA OUT SIDE",
  //   permanent_address_line3: "DARIYAPUR DARVAJA,",
  //   permanent_district_name: "Ahmedabad",
  //   permanent_state: "GJ",
  //   permanent_state_name: "Gujarat",
  //   permanent_pincode: 380016,
  //   permanent_full_address:
  //     "22,MANSUKHPURAS CHAWL, OPP.VASANT CINEMA OUT SIDE, DARIYAPUR DARVAJA, Ahmedabad, Gujarat, 380016",
  //   owner_code_descr: "INDIVIDUAL",
  //   reg_type_descr: "TEMPORARY REGISTERED VEHICLE",
  //   vehicle_class_desc: "Motor Cab",
  //   chassis_no: "MA3EJKD1S00C51332",
  //   engine_no: "K12MN2392205",
  //   vehicle_manufacturer_name: "MARUTI SUZUKI INDIA LTD",
  //   model_code: "VANA0001E041001",
  //   model: "TOUR S CNG",
  //   body_type: "SALOON",
  //   cylinders_no: 4,
  //   vehicle_hp: 83.08,
  //   vehicle_seat_capacity: 5,
  //   vehicle_standing_capacity: 0,
  //   vehicle_sleeper_capacity: 0,
  //   unladen_weight: 1045,
  //   vehicle_gross_weight: 1480,
  //   vehicle_gross_comb_weight: 0,
  //   fuel_descr: "PETROL/CNG",
  //   color: "PEARL ARCTIC WHITE",
  //   manufacturing_mon: 1,
  //   manufacturing_yr: 2020,
  //   norms_descr: "BHARAT STAGE IV",
  //   wheelbase: 2430,
  //   cubic_cap: 1197,
  //   floor_area: 0,
  //   ac_fitted: "Y",
  //   audio_fitted: "Y",
  //   video_fitted: "N",
  //   vehicle_purchase_as: "B",
  //   vehicle_catg: "LPV",
  //   dealer_code: "GJ00100005",
  //   dealer_name: "KIRAN MOTORS LTD..",
  //   dealer_address_line1: "P-82/1/1 NR SHYAMPUJA BUNGLOWS-2",
  //   dealer_address_line2: "NR HP PETROL PUMP MOTERA",
  //   dealer_address_line3: "",
  //   dealer_district: "474",
  //   dealer_pincode: "380005",
  //   dealer_full_address:
  //     "KIRAN MOTORS LTD.., P-82/1/1 NR SHYAMPUJA BUNGLOWS-2, NR HP PETROL PUMP MOTERA, 474, 380005",
  //   sale_amount: 453880,
  //   laser_code: "HOMO-DATA",
  //   garage_add: "",
  //   length: 3995,
  //   width: 1695,
  //   height: 1555,
  //   reg_upto: "2025-03-27",
  //   fit_upto: "2025-03-27",
  //   op_dt: "2023-03-29 20:38:54.374466",
  //   imported_vehicle: "N",
  //   other_criteria: 0,
  //   status: "Y",
  //   vehicle_type: "Transport",
  //   tax_mode: "L",
  //   verified_on: "2020-02-15",
  //   dl_validation_required: false,
  //   condition_status: false,
  //   vehicle_insurance_details: {
  //     insurance_from: "2023-01-30",
  //     insurance_upto: "2024-01-29",
  //     insurance_company_code: 1114,
  //     insurance_company_name: "ICICI Lombard General Insurance Co. Ltd.",
  //     opdt: "2023-02-02 07:11:46.776711",
  //     policy_no: "3004/MI-11805055/00/000",
  //     vahan_verify: "true",
  //     reg_no: "GJ01JT0459",
  //   },
  //   vehicle_pucc_details: {
  //     pucc_from: "27-03-2023",
  //     pucc_upto: "26-03-2024",
  //     pucc_centreno: "GJ0180084",
  //     pucc_no: "GJ01800840005727",
  //     op_dt: "27-03-2023",
  //   },
  //   permit_details: {
  //     appl_no: "GJ20021758811211",
  //     pmt_no: "GJ2020-CC-6227B",
  //     reg_no: "GJ01JT0459",
  //     rcpt_no: "GJ1D200200001581",
  //     purpose: "Fresh Permit",
  //     permit_type: "Contract Carriage Permit",
  //     permit_catg: "TAXI CAB PERMIT",
  //     permit_issued_on: "2020-02-26",
  //     permit_valid_from: "2020-02-25",
  //     permit_valid_upto: "2025-02-24",
  //   },
  //   latest_tax_details: {
  //     reg_no: "GJ01JT0459",
  //     tax_mode: "L",
  //     payment_mode: "I",
  //     tax_amt: 27233,
  //     tax_fine: 0,
  //     rcpt_dt: "04-02-2020",
  //     tax_from: "2020-01-30",
  //     tax_upto: null,
  //     collected_by: "1705078297",
  //     rcpt_no: "GJ1D200200001581",
  //   },
  //   financer_details: {
  //     hp_type: "HT",
  //     financer_name: "DENA BANK",
  //     financer_address_line1: ".",
  //     financer_address_line2: "",
  //     financer_address_line3: "",
  //     financer_district: 474,
  //     financer_pincode: 380016,
  //     financer_state: "GJ",
  //     financer_full_address: "DENA BANK, ., 474, GJ, 380016",
  //     hypothecation_dt: "2020-01-30",
  //     op_dt: "2020-02-15",
  //   },
  // };
}
