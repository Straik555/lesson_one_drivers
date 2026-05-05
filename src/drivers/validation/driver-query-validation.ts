import { query, ValidationChain } from "express-validator";

export const driverQueryValidation: ValidationChain[] = [
  query("searchDriverNameTerm")
    .optional()
    .isString()
    .withMessage("searchDriverNameTerm must be string")
    .trim(),
  query("searchDriverEmailTerm")
    .optional()
    .isString()
    .withMessage("searchDriverEmailTerm must be string")
    .trim(),
  query("searchVehicleMakeTerm")
    .optional()
    .isString()
    .withMessage("searchVehicleMakeTerm must be string")
    .trim(),
];
