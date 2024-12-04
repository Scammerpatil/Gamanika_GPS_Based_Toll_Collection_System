import formatDate from "@/helper/DateFormatter";
import { Vehicle } from "@/types/vehicle";

const VehicleDataTable = ({ vehicleData }: { vehicleData: Vehicle }) => {
  const displayValue = (value: unknown) => {
    if (value instanceof Date) {
      return formatDate(value);
    } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
      return new Date(value).toLocaleDateString();
    } else if (typeof value === "object" && value !== null) {
      return null;
    }
    return value;
  };

  return (
    <>
      <dialog id="vehicleData" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box flex flex-col justify-center items-center gap-5">
          <h1 className="mt-5 text-3xl font-bold text-base-content">
            Verify Your Vehicle Data
          </h1>

          <div className="modal-action overflow-y-auto w-full">
            <div className="p-4 w-full">
              <table className="table table-zebra w-full text-left">
                <thead>
                  <tr>
                    <th className="bg-base-200 text-base-content px-4 py-2">
                      Field
                    </th>
                    <th className="bg-base-200 text-base-content px-4 py-2">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(vehicleData).map(([key, value]) => {
                    const formattedValue = displayValue(value);
                    return formattedValue !== null ? (
                      <tr key={key} className="hover:bg-base-100">
                        <td className="border-t border-base-300 px-4 py-2 text-base-content">
                          {key}
                        </td>
                        <td className="border-t border-base-300 px-4 py-2 text-base-content">
                          {formattedValue as React.ReactNode}
                        </td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <form method="dialog">
            <button
              className="btn btn-outline text-base-content mt-4"
              onClick={() => {
                (
                  document.getElementById("signup") as HTMLDialogElement
                ).showModal();
              }}
            >
              Close
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default VehicleDataTable;
