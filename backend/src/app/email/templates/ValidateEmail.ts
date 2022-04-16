import { UserModel } from "../../models/User";
import { LOGGER } from "../../util/Logger";
import { createTransport } from "../Email";

export default async (user: UserModel) => {
  const transporter = createTransport();
  const mailOpts = {
    to: user.email,
    from: process.env.NODEMAILER_ADDRESS,
    subject: `Please Verify your Email Address for ${process.env.APP_NAME}`,
    html: `<!DOCTYPE html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/> <title>Verify Your Email Address for ${process.env.APP_NAME}</title> <style type="text/css">a:hover{text-decoration: underline !important;}</style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;">&nbsp;</td></tr><tr> <td style="text-align:center;"> <a href="http://${process.env.URL}" title="logo" target="_blank"> <img width="60" src="${process.env.LOGO}" title="logo" alt="logo"> </a> </td></tr><tr> <td style="height:20px;">&nbsp;</td></tr><tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;">&nbsp;</td></tr><tr> <td style="padding:0 35px;"> <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Please Validate your Email</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">A new account for ${process.env.APP_NAME} has been registered to this email address.</p><p> <strong> To verify this email, press the button below. If you did not register with this email address, you can ignore this email entirely.</strong> </p><a href="http://${process.env.URL}/api/v1/user/auth/email/validate?_id=${user._id}" style="background:#00bee0;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;"> Verify Email </a> </td></tr><tr> <td style="height:40px;">&nbsp;</td></tr></table> </td><tr> <td style="height:20px;">&nbsp;</td></tr><tr> <td style="text-align:center;"> <p style="font-size:14px; color:#076778; line-height:18px; margin:0 0 0;">&copy; <strong>http://${process.env.URL}/</strong></p></td></tr><tr> <td style="height:80px;">&nbsp;</td></tr></table> </td></tr></table> </body> </html>`,
  };

  try {
    await transporter.sendMail(mailOpts);
  } catch (ex) {
    LOGGER.error(ex);
  }
};
