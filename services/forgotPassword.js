const db = require("../models");
const sgMail = require("@sendgrid/mail");

const sendMails = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const student = await db.Student.findOne({
        where: { email: body?.mailTo },
      });

      if (!student) {
        resolve({
          msg: "Cannot find student with email",
        });
      } else {
        const { student_id } = student;
        const otp = generateOTP();
        const otpRecord = await db.Otp.create({ otp, student_id });
        sendEmail({
          to: body?.mailTo,
          templateId: "d-7db778ad382642aaa1bc7ee2ed842f74",
          dynamic_template_data: { otp: otp },
        });
        deleteOTPAfterTimeLimit(otp);
        resolve({
          msg: "OTP generated and email sent successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

const sendEmail = ({ to, templateId, dynamic_template_data }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: to,
    from: "thanhvien3210@gmail.com",
    templateId: templateId,
    dynamic_template_data: dynamic_template_data,
  };
  return sgMail.send(msg);
};

const generateOTP = () => {
  return String(Math.floor(100000 + Math.random() * 900000)).padStart(6, "0");
};

const deleteOTPAfterTimeLimit = async (otp) => {
  setTimeout(async () => {
    await db.Otp.destroy({ where: { otp } });
  }, 300000);
};

module.exports = {
  sendMails,
};
