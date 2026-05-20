import Joi from "joi";

export const assetValidator = Joi.object({
  brand: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
  reseller: Joi.string().min(1).required(),
  purchasedAt: Joi.date().iso().required(),
  model: Joi.string().min(1).required(),
  serial: Joi.string().min(1).required(),
  warrantyMonths: Joi.number().required(),
  price: Joi.number().required()
});