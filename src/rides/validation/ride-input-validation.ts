import { body } from "express-validator";
import { Currency } from "../types/ride.type";

const clientNameValidation = body("clientName")
  .isString()
  .withMessage("The client Name is should be string")
  .trim()
  .isLength({ min: 3, max: 100 })
  .withMessage("The client name must be at least 3 characters long");

const priceValidation = body("price")
  .isFloat({ gt: 0 })
  .withMessage("The price must be a positive number");

const currencyValidation = body("currency")
  .isString()
  .withMessage("The currency is should be string")
  .isIn(Object.values(Currency))
  .withMessage("The currency must be either 'usd' or 'eu'");

const driverIdValidation = body("driverId")
  .isString()
  .withMessage("The driver id should be string")
  .trim()
  .isMongoId()
  .withMessage("The driver id is incorrect format");

const fromAddressValidation = body("fromAddress")
  .isString()
  .withMessage("The from address should be string")
  .trim()
  .isLength({ min: 10, max: 200 })
  .withMessage("The from address must be at least 10 to 200 characters long");

const toAddressValidation = body("toAddress")
  .isString()
  .withMessage("The to address should be string")
  .trim()
  .isLength({ min: 10, max: 200 })
  .withMessage("The to address must be at least 10 to 200 characters long");

export const rideInputValidation = [
  clientNameValidation,
  priceValidation,
  currencyValidation,
  driverIdValidation,
  fromAddressValidation,
  toAddressValidation,
];
