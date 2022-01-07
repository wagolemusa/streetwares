// import { check } from "express-validator";
// const firstname = check("firstname", "First Name is required").not().isEmpty();
// const lastname = check("lastname", "Lastname is required").not().isEmpty();
// const email  = check("email", "Please Provide  a valid email address").isEmail();
// const password = check(
//     "password",
//     "password is required of minimum length of 6."
// )
// .isLength({
//     min: 6,
// })

// export const RegisterValidations = [firstname, lastname, email];
// export const AuthenticationValidations = [email, password];
// export const ResetPassword = [ email ]


import { check, validationResult } from "express-validator";

exports.validateRequest = [
    check('firstname').notEmpty().withMessage('firstName is required'),
    check('lastname').notEmpty().withMessage('lastname is required'),
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 character long')
];

exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 character long')
];

// exports.isRequestValidated = (req, res, next) => {
//     const errors = validationResult(req);
//     if(errors.array().length > 0) {
//         return res.status(400).json({error: errors.array()[0].msg })
//     }
// }