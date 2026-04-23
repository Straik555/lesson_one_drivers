import {
  StringInputValidation,
  StringValidationVariant,
  VehicleDescriptionInputValidationType,
  VehicleFeaturesInputValidationType,
  VehicleYearInputValidationType,
} from "../types/input-validation.type";

const phoneRegex = /^(\d{3})-(\d{3})-(\d{4})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isCorrectType = (val: any, variant: "string" | "number"): boolean =>
  typeof val === variant;

const stringInputValidation = ({
  field,
  errorsMessages,
  entity,
  variantRegex,
}: StringInputValidation) => {
  const isCorrect = isCorrectType(entity, "string");

  if (!isCorrect) {
    errorsMessages.push({
      message: "Incorrect type",
      field,
    });
  }
  if (!entity || (isCorrect && entity.trim().length < 1)) {
    errorsMessages.push({
      message: `The ${field} is required`,
      field,
    });
  }
  if (variantRegex && isCorrect) {
    const regex =
      variantRegex === StringValidationVariant.EMAIL ? emailRegex : phoneRegex;
    const isValid = regex?.test(entity.trim());

    if (!isValid) {
      errorsMessages.push({
        message: "Incorrect data or format",
        field,
      });
    }
  }
};

const vehicleYearInputValidation = ({
  vehicleYear,
  errorsMessages,
  field,
}: VehicleYearInputValidationType) => {
  const isCorrect = isCorrectType(vehicleYear, "number");

  if (!isCorrect) {
    errorsMessages.push({
      message: "Incorrect type",
      field,
    });
  }

  if (isCorrect && !vehicleYear) {
    errorsMessages.push({
      message: `The ${field} is require`,
      field,
    });
  }

  const year = new Date().getFullYear();
  if (isCorrect && (vehicleYear < 1900 || vehicleYear > year)) {
    errorsMessages.push({
      message: `The wrong year is impossible, less than 1920 or bigger than ${year}`,
      field,
    });
  }
};

const vehicleDescriptionInputValidation = ({
  vehicleDescription,
  field,
  errorsMessages,
}: VehicleDescriptionInputValidationType) => {
  if (vehicleDescription === null) {
    return;
  } else {
    stringInputValidation({
      errorsMessages,
      field,
      entity: vehicleDescription as string,
    });
  }
};

const vehicleFeaturesInputValidation = ({
  vehicleFeatures,
  errorsMessages,
  field,
}: VehicleFeaturesInputValidationType) => {
  const isArray = Array.isArray(vehicleFeatures);
  if (!isArray) {
    errorsMessages.push({
      message: "Incorrect type",
      field,
    });
  }
  if (isArray && vehicleFeatures.length < 1) {
    return;
  }
  if (isArray && vehicleFeatures.length > 0) {
    for (let i = 0; vehicleFeatures.length > i; i++) {
      stringInputValidation({
        errorsMessages,
        field,
        entity: vehicleFeatures[i],
      });
    }
  }
};

export {
  stringInputValidation,
  vehicleDescriptionInputValidation,
  vehicleYearInputValidation,
  vehicleFeaturesInputValidation,
};
