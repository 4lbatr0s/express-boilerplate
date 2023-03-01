import Joi from "joi";

const createValidation = Joi.object({
    full_name:Joi.string().required().min(3),
    password:Joi.string().required().min(8),
    email:Joi.string().email().required().min(8),
}).unknown(true);

const updateValidation = Joi.object({
    full_name:Joi.string().min(3),
    email:Joi.string().email().min(8),
}).unknown(true);

const loginValidation = Joi.object({
    email:Joi.string().email().required().min(8),
    password:Joi.string().required().min(8),
}).unknown(true);

const resetPasswordValidation = Joi.object({
    email:Joi.string().email().required().min(8),
}).unknown(true);

const changePasswordValidation = Joi.object({
    password:Joi.string().required().min(8),
}).unknown(true);


export default { createValidation, loginValidation, resetPasswordValidation, changePasswordValidation, updateValidation};