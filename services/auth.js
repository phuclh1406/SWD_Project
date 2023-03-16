require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

const register = ({ email, password, confirm_pass }) => new Promise(async (resolve, reject) => {
  try {
    console.log(hashPassword(password));
    if (confirm_pass !== password) {
      resolve({
        mes: 'Confirm password does not match with password',
    })
    } else {
      const response = await db.Student.findOrCreate({
        where: { email },
        defaults: {
            student_name: email,
            password: hashPassword(password),
            email,
            avatar: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
            role_id: "bd86e723-a2d5-47f5-87f2-9a4bc6fe8bb2",
        }
    })
    resolve({
        mes: response[1] ? 'Register is successful' : 'Email has already used',
    })
    }
      
  } catch (error) {
      reject(error)
  }
})

const login = ({ email, password }) => new Promise(async (resolve, reject) => {
  try {
      const response = await db.Student.findOne({
          where: { email },
          raw: true,
          nest: true,
          attributes: {
            exclude: [
              "role_id",
              "status",
              "createdAt",
              "updatedAt",
              "major_id",
              "refresh_token",
            ],
          },
          include: [
            {
              model: db.Role,
              as: "student_role",
              attributes: ["role_id", "role_name"],
            },
          ],
      })
      const isChecked = response && bcrypt.compareSync(password, response.password)
      const accessToken = isChecked
            ? jwt.sign({ id: response.id, email: response.email, role_code: response.role_code }, process.env.JWT_SECRET, { expiresIn: '1h' })
            : null
        // JWT_SECRET_REFRESH_TOKEN
        const refreshToken = isChecked
            ? jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH, { expiresIn: '1d' })
            : null
        resolve({
            mes: accessToken ? 'Login is successfully' : response ? 'Password is wrong' : 'Not found account',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            'refresh_token': refreshToken,
            user: response,
        })
    
          if (refreshToken) {
            await db.Student.update(
              {
                refresh_token: refreshToken,
              },
              { where: { student_id: response[0].student_id } }
            );
          }
  } catch (error) {
      reject(error)
  }
})

const loginGoogle = ({ name, picture, user_id, email }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Student.findOrCreate({
        where: { email },
        raw: true,
        nest: true,
        defaults: {
          student_id: user_id,
          student_name: name,
          email: email,
          avatar: picture,
          role_id: "5826d1d9-c33a-45c5-b93e-894e1dde10bd",
        },
      });
      // console.log("0",response);
      // console.log("1", response[0]);
      const student = await db.Student.findOne({
        where: { email: email },
        raw: true,
        nest: true,
        attributes: {
          exclude: [
            "role_id",
            "status",
            "createdAt",
            "updatedAt",
            "major_id",
            "refresh_token",
          ],
        },
        include: [
          {
            model: db.Role,
            as: "student_role",
            attributes: ["role_id", "role_name"],
          },
        ],
      });

      const [accessToken, refreshToken] = await Promise.all([
        jwt.sign(
          {
            student_id: response[0].student_id,
            email: response[0].email,
            role_name: student.student_role.role_name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        ),
        jwt.sign(
          { student_id: response[0].student_id },
          process.env.JWT_SECRET_REFRESH,
          { expiresIn: "5d" }
        ),
      ]);

      if (refreshToken) {
        await db.Student.update(
          {
            refresh_token: refreshToken,
          },
          { where: { student_id: response[0].student_id } }
        );
      }

      resolve({
        mes: "Login successfully",
        access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
        refresh_token: refreshToken,
        student: student,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const refreshAccessToken = (refresh_token) =>
  new Promise(async (resolve, reject) => {
    try {
      const student = await db.Student.findOne({
        where: { refresh_token },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["role_id", "status", "createdAt", "updatedAt", "major_id"],
        },
        include: [
          {
            model: db.Role,
            as: "student_role",
            attributes: ["role_name"],
          },
        ],
      });
      if (student) {
        jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH, (err) => {
          if (err) {
            resolve({
              mes: "Refresh token expired",
            });
          } else {
            const accessToken = jwt.sign(
              {
                student_id: student.student_id,
                email: student.email,
                role_name: student.student_role.role_name,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            resolve({
              mes: accessToken
                ? "Create refresh token successfully"
                : "Create refresh token unsuccessfully",
              access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
              refresh_token: refresh_token,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const logout = (student_id) =>
  new Promise(async (resolve, reject) => {
    try {
        const student = await db.Student.findOne({
            where: { student_id },
            raw: true,
            nest: true,
            attributes: {
              exclude: ["role_id", "status", "createdAt", "updatedAt", "major_id"],
            },
            include: [
              {
                model: db.Role,
                as: "student_role",
                attributes: ["role_name"],
              },
            ],
          });

      const response = await db.Student.update(
        {
          refresh_token: null,
        },
        { where: { student_id: student.student_id } }
      );
      resolve({
        mes: "Logout successfully"
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { loginGoogle, refreshAccessToken, logout, login, register };
