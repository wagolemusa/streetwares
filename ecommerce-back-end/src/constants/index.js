import  { config } from "dotenv";

config()

export const DB = process.env.APP_DB;
export const SECRET = process.env.APP_SECRET;
export const DOMAIN = process.env.APP_DOMAIN;
export const HOST_NUMBER = process.env.HOST_NUMBER;
export const APP_HOST_EMAIL = process.env.APP_HOST_EMAIL;
export const SENDGRID_API = process.env.APP_SENDGRID_API;
export const accountSid = process.env.TWILIO_ACCOUNT_SID;
export const authToken = process.env.TWILIO_AUTH_TOKEN;
export const PORT = process.env.PORT || process.env.APP_PORT;

// var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN)
