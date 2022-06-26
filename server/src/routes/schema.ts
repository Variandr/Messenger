import { check } from "express-validator/check";

export type ValidationSchema =
  | typeof RegisterSchema
  | typeof LoginSchema
  | typeof EditUsernameSchema
  | typeof EditStatusSchema
  | typeof NewChatSchema
  | typeof AddMemberSchema;

export const LoginSchema = [
  check("login", "Login need to be more then 5 and less then 20 symbols")
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 20 }),
  check("password", "Password cannot be less then 8 symbols")
    .notEmpty()
    .isString()
    .isLength({ min: 8 }),
];

export const RegisterSchema = [
  ...LoginSchema,
  check("username", "Username cannot be less then 1 and more then 40 symbols")
    .optional({ checkFalsy: true })
    .isString(),
  check("remember").optional({ checkFalsy: true }).isBoolean(),
];

export const EditUsernameSchema = [check("username").notEmpty().isString()];

export const EditStatusSchema = [check("status").notEmpty().isString()];

export const NewChatSchema = [
  check("name").notEmpty().isString(),
  check("users.*.id").notEmpty().isNumeric(),
];

export const AddMemberSchema = [check("userId").notEmpty().isNumeric()];
