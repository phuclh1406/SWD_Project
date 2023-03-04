const db = require("../models");
const { Op } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllApplications = (
  { page, limit, order, application_id, ...query }, role_name
) =>
  new Promise(async (resolve, reject) => {
    try {
        const application = await redisClient.get(`applications_${page}`);
        if (application != null && application != "") {
            resolve({
            msg: application ? `Got projects` : "Cannot find projects",
            projects: JSON.parse(application),
            });
        } else {
        const application = await redisClient.get(`admin_applications_${page}`);
        if (application != null && application != "") {
          resolve({
            msg: application ? `Got applications` : "Cannot find applications",
            applications: JSON.parse(application),
          });
        } else {
          const queries = { raw: true, nest: true };
          const offset = !page || +page <= 1 ? 0 : +page - 1;
          const flimit = +limit || +process.env.LIMIT_POST;
          queries.offset = offset * flimit;
          queries.limit = flimit;
          if (order) queries.order = [order];
          if (role_name !== "Admin") {
            query.status = { [Op.ne]: "Deactive" };
          }
        //   if (student_name)
        //     query.application_name = { [Op.substring]: application_name };

          const applications = await db.Application.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: ["student_id", "project_id","createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Student,
                as: "application_student",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                  },
              },
              {
                model: db.Project,
                as: "application_project",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                  },
              },
            ],
          });

          if (role_name !== "Admin") {
            redisClient.setEx(`applications_${page}`, 3600, JSON.stringify(applications));
          } else {
            redisClient.setEx(`admin_applications_${page}`, 3600, JSON.stringify(applications));
          }

          resolve({
            msg: applications ? `Got applications` : "Cannot find applications",
            applications: applications,
          });
        }
    }
    } catch (error) {
        console.log(error);
      reject(error);
    }
  });

  const getAllApplicationsByStudentId = (
    { page, limit, order, application_name, application_id, ...query }, student_id
  ) =>
    new Promise(async (resolve, reject) => {
      try {
          const application = await redisClient.get(`applications_doer_${page}`);
          if (application != null && application != "") {
            resolve({
              msg: application ? `Got applications` : "Cannot find applications",
              applications: JSON.parse(application),
            });
          } else {
            const queries = { raw: true, nest: true };
            const offset = !page || +page <= 1 ? 0 : +page - 1;
            const flimit = +limit || +process.env.LIMIT_POST;
            queries.offset = offset * flimit;
            queries.limit = flimit;
            if (order) queries.order = [order];
            if (student_id) query.student_id = { [Op.eq]: student_id };
  
            const applications = await db.Application.findAndCountAll({
              where: query,
              ...queries,
              attributes: {
                exclude: ["student_id", "project_id","createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Student,
                  as: "application_student",
                  attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                  model: db.Project,
                  as: "application_project",
                  attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                },
              ],
            });
  
              redisClient.setEx(`applications_doer_${page}`, 3600, JSON.stringify(applications));
  
            resolve({
              msg: applications ? `Got applications` : "Cannot find applications",
              applications: applications,
            });
          }
      } catch (error) {
          console.log(error);
        reject(error);
      }
    });

const createApplication = (body, student_id) =>
  new Promise(async (resolve, reject) => {
    try {

        const project = await db.Project.findOne({
            where: { 
              project_id: body?.project_id
            }
          });

          if (project.poster_id === student_id) {
            resolve({
                msg: "You can't apply your project"
              });
          } else {
            const student = await db.Student.findOne({
                where: { 
                    student_id: student_id
                }
              });

            if (project.major_id !== student.major_id) {
                resolve({
                    msg: `You have to be ${project.major_id} to apply this project`
                  });
            } else {
                try {
                    const applications = await db.Application.create({
                        ...body,
                        student_id: student_id
                    });
                    resolve({
                      msg: "Apply successfully",
                      application: applications
                    });
                } catch (error) {
                    resolve({
                        msg: "Apply unsuccessfully"
                      });
                }
                
            }
          }
    } catch (error) {
      reject(error);
    }
  });

  const acceptApplication = (body, student_id) =>
  new Promise(async (resolve, reject) => {
    try {

        const application = await db.Application.findOne({
            where: { 
                application_id: body?.application_id
            }
          });

          const project_id = application.project_id;

        const project = await db.Project.update({ doer_id: student_id, status: "Received" }, {
            where: { project_id },
          });
          resolve({
            msg:
                project[0] > 0
                ? `${project[0]} application is updated`
                : "Cannot update application/ application_id not found",
          });

    } catch (error) {
      reject(error);
    }
  });

const updateApplication = ({ application_id, ...body }, student_id) =>
  new Promise(async (resolve, reject) => {
    try {
        const project = await db.Project.findOne({
            where: { 
              project_id: body?.project_id
            }
          });
          const student = await db.Student.findOne({
            where: { 
                student_id: student_id
            }
          });
          if (project.major_id !== student.major_id) {
            resolve({
                msg: `You have to be ${project.major_id} to apply this project`
              });
        } else {
            const applications = await db.Application.update(body, {
                where: { application_id },
              });
              resolve({
                msg:
                  applications[0] > 0
                    ? `${applications[0]} application is updated`
                    : "Cannot update application/ application_id not found",
              });
        }
    } catch (error) {
      reject(error);
    }
  });

const deleteApplication = (application_ids) =>
  new Promise(async (resolve, reject) => {
    try {
      const applications = await db.Application.update(
        { status: "Deactive" },
        {
          where: { application_id: application_ids },
        }
      );
      resolve({
        msg:
          applications > 0
            ? `${applications} applications is deleted`
            : "Cannot delete applications/ application_id not found",
      });
    } catch (error) {
      reject(error);
    }
  });

const getApplicationById = (application_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const application = await db.Application.findOne({
        where: { application_id: application_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["student_id", "createAt", "updateAt"],
        },
        include: [
          {
            model: db.Student,
            as: "application_student",
            attributes: ["student_id", "student_name", "avatar"],
          },
          {
            model: db.Category,
            as: "application_category",
            attributes: ["cate_id", "cate_name"],
          },
          {
            model: db.Major,
            as: "application_major",
            attributes: ["major_id", "major_name"],
          },
        ],
      });
      if (application) {
        resolve({
          application: application,
        });
      } else {
        resolve({
          msg: `Cannot find application with id: ${application_id}`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getAllApplications,
  getAllApplicationsByStudentId,
  createApplication,
  acceptApplication,
  getApplicationById,
  updateApplication,
  deleteApplication,

};
