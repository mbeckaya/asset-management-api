import Joi from "joi";

export const assetAssignmentValidator = Joi.object({
  assetId: Joi.number().required(),
  userId: Joi.number().required(),
  assignedAt: Joi.date().iso().required(),
  notes: Joi.string(),
  returnedAt: Joi.date().iso(),
});