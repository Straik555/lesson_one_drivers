import { ErrorsResponse } from "../core/errors.type";
import { CreateDriverModelType } from "../router/model/create-driver.model";
import {
  stringInputValidation,
  vehicleDescriptionInputValidation,
  vehicleFeaturesInputValidation,
  vehicleYearInputValidation,
} from "./driverInputValidation";
import { StringValidationVariant } from "../types/input-validation.type";

export const createDriverValidation = (
  driver: CreateDriverModelType,
  errorMessages: ErrorsResponse,
) => {
  for (const key in driver) {
    switch (key) {
      case "vehicleDescription":
        vehicleDescriptionInputValidation({
          errorsMessages: errorMessages.errorsMessages,
          vehicleDescription: driver[key],
          field: key,
        });
        break;
      case "vehicleFeatures":
        vehicleFeaturesInputValidation({
          errorsMessages: errorMessages.errorsMessages,
          vehicleFeatures: driver[key] as string[],
          field: key,
        });
        break;
      case "vehicleYear":
        vehicleYearInputValidation({
          errorsMessages: errorMessages.errorsMessages,
          vehicleYear: driver[key] as number,
          field: key,
        });
        break;
      default: {
        const variantRegex =
          key === "phoneNumber"
            ? StringValidationVariant.PHONE
            : key === "email"
              ? StringValidationVariant.EMAIL
              : undefined;
        stringInputValidation({
          errorsMessages: errorMessages.errorsMessages,
          entity: driver[key as keyof CreateDriverModelType] as string,
          field: key,
          variantRegex,
        });
      }
    }
  }
};
