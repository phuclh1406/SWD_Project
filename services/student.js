const db = require("../models");
const { Op } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllStudent = () =>
  new Promise(async (resolve, reject) => {
    try {
      redisClient.get("students", async (error, student) => {
        if (error) console.error(error);
        if (student != null) {
          resolve({
            msg: student ? `Got student` : "Cannot find student",
            student: JSON.parse(student),
          });
        } else {
          const students = await db.Student.findAndCountAll({
            raw: true,
            nest: true,
            where: {
              status: {
                [Op.ne]: "Deactive",
              }
            },
            order: [
              ['updatedAt', 'DESC']
            ],
            attributes: {
              exclude: [
                "role_id",
                "major_id",
                "createAt",
                "updateAt",
                "refresh_token",
              ],
            },
            include: [
              {
                model: db.Role,
                as: "student_role",
                attributes: ["role_id", "role_name"],
              },
              {
                model: db.Major,
                as: "student_major",
                attributes: ["major_id", "major_name"],
              },
            ],
          });
          redisClient.setEx("students", 3600, JSON.stringify(students));

          resolve({
            msg: students ? `Got student` : "Cannot find student",
            students: students,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });

const getAllStudentPaging = ({ page, limit, order, student_name, ...query}) =>
  new Promise(async (resolve, reject) => {
    try {
      redisClient.get(`student_paging_${page}`, async (error, student_paging) => {
        if (error) console.error(error);
        if (student_paging != null) {
          resolve({
            msg: student_paging ? `Got student` : "Cannot find student",
            student_paging: JSON.parse(student_paging),
          });
        } else {
          const queries = { raw: true, nest: true };
          const offset = !page || +page <= 1 ? 0 : +page - 1;
          const flimit = +limit || +process.env.LIMIT_POST;
          queries.offset = offset * flimit;
          queries.limit = flimit;
          if (order) queries.order = [order];
          if (student_name) query.student_name = { [Op.substring]: student_name };
          query.status = { [Op.ne]: "Deactive" };

          const students = await db.Student.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: [
                "role_id",
                "major_id",
                "createAt",
                "updateAt",
                "refresh_token",
              ],
            },
            include: [
              {
                model: db.Role,
                as: "student_role",
                attributes: ["role_id", "role_name"],
              },
              {
                model: db.Major,
                as: "student_major",
                attributes: ["major_id", "major_name"],
              },
            ],
          });
          redisClient.setEx(`student_paging_${page}`, 3600, JSON.stringify(students));

          resolve({
            msg: students ? `Got student` : "Cannot find student",
            students: students,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });


const createStudent = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const student = await db.Student.findOrCreate({
        where: { email: body?.email },
        defaults: {
          ...body,
        },
      });
      resolve({
        msg: student[1]
          ? "Create new student successfully"
          : "Cannot create new student/ Email already exists",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateStudent = ({ student_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const students = await db.Student.update(body, {
        where: { student_id },
      });
      resolve({
        msg:
          students[0] > 0
            ? `${students[0]} student update`
            : "Cannot update student/ student_id not found",
      });
      redisClient.del('students');
    } catch (error) {
      reject(error.message);
    }
  });

  const updateProfile = (body, student_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const students = await db.Student.update(body, {
        where: { student_id: student_id},
      });
      resolve({
        msg:
          students[0] > 0
            ? "Update profile successfully"
            : "Cannot update student/ student_id not found",
      });
    } catch (error) {
      reject(error.message);
    }
  });

const deleteStudent = (student_ids, student_id) =>
  new Promise(async (resolve, reject) => {
    try {
      if (student_ids.includes(student_id)) {
        resolve({
          msg: "Cannot delete student/ Account is in use",
        });
      } else {
        const students = await db.Student.update(
          { status: "Deactive" },
          {
            where: { student_id: student_ids },
          }
        );
        resolve({
          msg:
            students > 0
              ? `${students} student delete`
              : "Cannot delete student/ student_id not found",
        });
        redisClient.del('students');
      }
    } catch (error) {
      reject(error);
    }
  });

const getStudentById = (student_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const student = await db.Student.findOne({
        where: { student_id: student_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: [
            "role_id",
            "major_id",
            "createdAt",
            "updatedAt",
            "refresh_token",
          ],
        },
        include: [
          {
            model: db.Role,
            as: "student_role",
            attributes: ["role_id", "role_name"],
          },
          {
            model: db.Major,
            as: "student_major",
            attributes: ["major_id", "major_name"],
          },
        ],
      });
      if (student) {
        resolve({
          student: student,
        });
      } else {
        resolve({
          msg: `Cannot find student with id: ${student_id}`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getAllStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  createStudent,
  getAllStudentPaging,
  updateProfile,

};

