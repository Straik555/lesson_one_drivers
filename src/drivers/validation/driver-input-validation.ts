import { body } from "express-validator";
import { VehicleFeature } from "../types/driver.type";

const phoneRegex = /^(\d{3})-(\d{3})-(\d{4})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const nameValidation = body("name")
  .isString()
  .withMessage("The name is incorrect format")
  .trim()
  .isLength({ min: 3 })
  .withMessage("The name must be at least 3 characters long");

const phoneNumberValidation = body("phoneNumber")
  .isString()
  .withMessage("The phone number should be string")
  .trim()
  .matches(phoneRegex)
  .withMessage("The phone number is incorrect format")
  .isLength({ min: 12, max: 12 })
  .withMessage("The phone number must be at least 3 characters long");

const emailValidation = body("email")
  .isString()
  .withMessage("The email should be string")
  .trim()
  .isLength({ min: 5, max: 100 })
  .withMessage("The email must be at least 5 to 100 characters long")
  .isEmail();

const vehicleMakeValidation = body("vehicleMake")
  .isString()
  .withMessage("The vehicle make should be string")
  .trim()
  .isLength({ min: 3, max: 100 })
  .withMessage("The vehicle make must be at least 3 to 100 characters long");

const vehicleModelValidation = body("vehicleModel")
  .isString()
  .withMessage("The vehicle model should be string")
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage("The vehicle model must be at least 2 to 100 characters long");

const currentYear = new Date().getFullYear();
const vehicleYearValidation = body("vehicleYear")
  .isInt({ min: 1900, max: currentYear })
  .withMessage("The vehicle year is incorrect format");

const vehicleLicensePlateValidation = body("vehicleLicensePlate")
  .isString()
  .withMessage("The vehicle license plate is incorrect format")
  .trim()
  .isLength({ min: 6, max: 10 })
  .withMessage(
    "The vehicle license plate must be at least 6 to 10 characters long",
  );

const vehicleDescriptionValidation = body("vehicleDescription")
  .optional({
    values: "null",
  })
  .isString()
  .withMessage("the vehicle description should be string")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage(
    "The vehicle license plate must be at least 1 to 100 characters long",
  );

const vehicleFeaturesValidation = body("vehicleFeatures")
  .isArray()
  .withMessage("The vehicle features should be array")
  .optional()
  .custom((vehicleFeatures: VehicleFeature[]) => {
    if (vehicleFeatures.length) {
      const validFeatures = Object.values(VehicleFeature);

      vehicleFeatures.map((feature) => {
        if (!validFeatures.includes(feature)) {
          throw new Error(
            "The vehicle features should contain values of VehicleFeature",
          );
        }
      });
    }
    return true;
  });

export const driverInputValidation = [
  nameValidation,
  phoneNumberValidation,
  emailValidation,
  vehicleMakeValidation,
  vehicleModelValidation,
  vehicleYearValidation,
  vehicleLicensePlateValidation,
  vehicleDescriptionValidation,
  vehicleFeaturesValidation,
];
