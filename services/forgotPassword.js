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

        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);

        console.log(now);
        const otpRecord = await db.Otp.create({
          otp,
          time_expired: now,
          student_id,
        });
        console.log(otpRecord);
        console.log(otpRecord[0]);
        console.log(otpRecord[1]);
        sendEmail({
          to: body?.mailTo,
          templateId: "d-7db778ad382642aaa1bc7ee2ed842f74",
          dynamic_template_data: { otp: otp },
        });
        deleteOTPAfterTimeLimit(otp);
        resolve({
          msg: "OTP generated and email sent successfully",
          otp: otpRecord.dataValues
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

const verifyOtp = ({OTP, otp_id}) =>
  new Promise(async (resolve, reject) => {
    try {
      const userOtp = await db.Otp.findOne({
        where: { otp_id: otp_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["student_id", "createAt", "updateAt"],
        },
        include: [
          {
            model: db.Student,
            as: "otp_student",
          },
        ],
      });
      
      if (userOtp) {
        const student = await db.Student.findOne({
          where: { student_id: userOtp.otp_student.student_id },
        });
  
        const now = new Date();
        if (!student.accessChangePassword) {
          if (userOtp.time_expired < now) {
            if (userOtp.otp === OTP) {
              resolve({
                msg: "Valid OTP",
              });
              const students = await db.Student.update({
                accessChangePassword: true,
              }, {
                where: { student_id: userOtp.student_id},
              });
            }
            resolve({
              msg: "Invalid OTP"
            });
          }
          resolve({
            msg: "Otp is expired",
          });
        }
        resolve({
          msg: "Already verify",
        });
      }
      resolve({
        msg: "Otp not found",
      });
      
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  sendMails,
  verifyOtp,
  
};
