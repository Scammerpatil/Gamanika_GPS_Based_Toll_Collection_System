import mongoose, { Schema } from "mongoose";

// VehicleDetails schema embedded within the User schema
const VehicleSchema: Schema = new Schema({
  vehicleImage: {
    type: String,
    default:
      "https://images.cars.com/cldstatic/wp-content/uploads/img1269874436-1552945320828.jpg",
  },
  vehicleVerified: {
    type: Boolean,
    default: false,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  vehicleClass: {
    type: String,
    required: true,
  },
  chassisNo: {
    type: String,
    required: true,
  },
  engineNo: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
    required: true,
  },
  vehicleColor: {
    type: String,
    required: true,
  },
  vehicleSeatCapacity: {
    type: Number,
    required: true,
  },
  vehicleGrossWeight: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerFatherName: String,
  currentFullAddress: {
    type: String,
    required: true,
  },
  permanentFullAddress: {
    type: String,
    required: true,
  },
  vehicleManufacturerName: String,
  modelCode: String,
  model: String,
  bodyType: String,
  cylindersNo: Number,
  vehicleHp: Number,
  vehicleStandingCapacity: Number,
  vehicleSleeperCapacity: Number,
  vehicleUnladenWeight: Number,
  vehicleGrossCombWeight: Number,
  wheelbase: Number,
  length: Number,
  width: Number,
  height: Number,
  laserCode: String,
  latestTaxDetails: {
    taxAmount: Number,
    taxFine: Number,
    receiptDate: Date,
    taxFrom: Date,
    taxUpto: Date,
  },
  financerDetails: {
    hpType: String,
    financerName: String,
    financerFullAddress: String,
    hypothecationDt: Date,
    opDt: Date,
  },
  insuranceDetails: {
    insuranceFrom: Date,
    insuranceUpto: Date,
    insuranceCompanyCode: String,
    insuranceCompanyName: String,
    policyNo: String,
    vahanVerify: Boolean,
    regNo: String,
  },
  puccDetails: {
    puccFrom: Date,
    puccUpto: Date,
    puccCentreNo: String,
    puccNo: String,
    opDt: Date,
  },
  permitDetails: {
    applNo: String,
    pmtNo: String,
    regNo: String,
    rcptNo: String,
    purpose: String,
    permitType: String,
    permitCatg: String,
    permitIssuedOn: Date,
    permitValidFrom: Date,
    permitValidUpto: Date,
  },
});

const UserSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdminApproved: {
    type: Boolean,
    default: false,
  },
  tollRate: {
    type: Number,
    required: true,
  },
  vehicle: {
    type: VehicleSchema,
    required: true,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
