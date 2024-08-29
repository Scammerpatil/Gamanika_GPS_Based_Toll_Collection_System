import React from "react";

const VehicleDetailsTable = (props: any) => {
  const { data } = props;
  console.log(data);

  if (!data) {
    return <p>No vehicle data available</p>;
  }

  const {
    state_code,
    state,
    office_code,
    office_name,
    reg_no,
    reg_date,
    purchase_date,
    owner_count,
    owner_name,
    owner_father_name,
    current_full_address,
    permanent_full_address,
    owner_code_descr,
    reg_type_descr,
    vehicle_class_desc,
    chassis_no,
    engine_no,
    vehicle_manufacturer_name,
    model,
    body_type,
    vehicle_seat_capacity,
    vehicle_gross_weight,
    fuel_descr,
    color,
    manufacturing_yr,
    reg_upto,
    fit_upto,
    vehicle_insurance_details,
    vehicle_pucc_details,
    latest_tax_details,
    financer_details,
  } = data;

  return (
    <div className="overflow-x-auto p-10 bg-white">
      <table className="min-w-full text-left text-sm font-light">
        <thead className="bg-gray-100 border-b font-medium text-gray-900">
          <tr>
            <th scope="col" className="px-6 py-4">
              Field
            </th>
            <th scope="col" className="px-6 py-4">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-b">
            <td className="px-6 py-4">Registration Number</td>
            <td className="px-6 py-4">{reg_no}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Owner Name</td>
            <td className="px-6 py-4">{owner_name}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Owner's Father Name</td>
            <td className="px-6 py-4">{owner_father_name}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">State</td>
            <td className="px-6 py-4">
              {state} ({state_code})
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Office</td>
            <td className="px-6 py-4">
              {office_name} ({office_code})
            </td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Current Address</td>
            <td className="px-6 py-4">{current_full_address}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Permanent Address</td>
            <td className="px-6 py-4">{permanent_full_address}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Vehicle Class</td>
            <td className="px-6 py-4">{vehicle_class_desc}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Vehicle Model</td>
            <td className="px-6 py-4">{model}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Chassis Number</td>
            <td className="px-6 py-4">{chassis_no}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Engine Number</td>
            <td className="px-6 py-4">{engine_no}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Manufacturer</td>
            <td className="px-6 py-4">{vehicle_manufacturer_name}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Color</td>
            <td className="px-6 py-4">{color}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Fuel Type</td>
            <td className="px-6 py-4">{fuel_descr}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Manufacturing Year</td>
            <td className="px-6 py-4">{manufacturing_yr}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Insurance Details</td>
            <td className="px-6 py-4">
              {vehicle_insurance_details?.insurance_company_name}, Policy No:{" "}
              {vehicle_insurance_details?.policy_no}, Valid Till:{" "}
              {vehicle_insurance_details?.insurance_upto}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">PUCC Details</td>
            <td className="px-6 py-4">
              PUCC No: {vehicle_pucc_details?.pucc_no}, Valid Till:{" "}
              {vehicle_pucc_details?.pucc_upto}
            </td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="px-6 py-4">Latest Tax Details</td>
            <td className="px-6 py-4">
              Tax Amount: {latest_tax_details?.tax_amt}, Paid On:{" "}
              {latest_tax_details?.rcpt_dt}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-6 py-4">Financer Details</td>
            <td className="px-6 py-4">
              {financer_details?.financer_name ?? "N/A"}, Hypothecation Date:{" "}
              {financer_details?.hypothecation_dt ?? "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VehicleDetailsTable;
