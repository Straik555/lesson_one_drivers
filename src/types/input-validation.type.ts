import { ErrorsResponse } from "../core/errors.type";

export enum StringValidationVariant {
  EMAIL = "email",
  PHONE = "phone",
}

type StringInputValidation = {
  field: string;
  entity: string;
  variantRegex?: StringValidationVariant;
} & ErrorsResponse;

type VehicleDescriptionInputValidationType = ErrorsResponse &
  Pick<DriverType, "vehicleDescription"> &
  Pick<StringInputValidation, "field">;
type VehicleFeaturesInputValidationType = ErrorsResponse &
  Pick<DriverType, "vehicleFeatures"> &
  Pick<StringInputValidation, "field">;
type VehicleYearInputValidationType = ErrorsResponse &
  Pick<DriverType, "vehicleYear"> &
  Pick<StringInputValidation, "field">;

export type {
  VehicleFeaturesInputValidationType,
  VehicleYearInputValidationType,
  VehicleDescriptionInputValidationType,
  StringInputValidation,
};
