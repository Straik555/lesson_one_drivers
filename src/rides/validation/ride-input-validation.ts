import { body } from "express-validator";
import { Currency } from "../types/ride.type";
import { resourceTypeValidation } from "../../core/middlewares/validation/resource-validation.middleware";
import { ResourceType } from "../../core/types/resource.type";

const clientNameValidation = body("data.attributes.clientName")
  .isString()
  .withMessage("The client Name is should be string")
  .trim()
  .isLength({ min: 3, max: 100 })
  .withMessage("The client name must be at least 3 characters long");

const priceValidation = body("data.attributes.price")
  .isFloat({ gt: 0 })
  .withMessage("The price must be a positive number");

const currencyValidation = body("data.attributes.currency")
  .isString()
  .withMessage("The currency is should be string")
  .isIn(Object.values(Currency))
  .withMessage("The currency must be either 'usd' or 'eu'");

const driverIdValidation = body("data.attributes.driverId")
  .isString()
  .withMessage("The driver id should be string")
  .trim()
  .isMongoId()
  .withMessage("The driver id is incorrect format");

const fromAddressValidation = body("data.attributes.fromAddress")
  .isString()
  .withMessage("The from address should be string")
  .trim()
  .isLength({ min: 10, max: 200 })
  .withMessage("The from address must be at least 10 to 200 characters long");

const toAddressValidation = body("data.attributes.toAddress")
  .isString()
  .withMessage("The to address should be string")
  .trim()
  .isLength({ min: 10, max: 200 })
  .withMessage("The to address must be at least 10 to 200 characters long");

export const rideInputValidation = [
  resourceTypeValidation(ResourceType.Rides),
  clientNameValidation,
  priceValidation,
  currencyValidation,
  driverIdValidation,
  fromAddressValidation,
  toAddressValidation,
];
