const db = require("../models");
const { Op } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllApplications = (
  { student_id, project_id, application_id, ...query }, role_name
) =>
  new Promise(async (resolve, reject) => {
    try {
        const application = await redisClient.get(`applications`);
        if (application != null && application != "") {
            resolve({
            msg: application ? `Got projects` : "Cannot find projects",
            projects: JSON.parse(application),
            });
        } else {
        const application = await redisClient.get(`admin_applications`);
        if (application != null && application != "") {
          resolve({
            msg: application ? `Got applications` : "Cannot find applications",
            applications: JSON.parse(application),
          });
        } else {
          const queries = { raw: true, nest: true };
          queries.order = [['updatedAt', 'DESC']];
          if (role_name !== "Admin") {
            query.status = { [Op.notIn]: ['Deactive'] };
          }
          if (student_id)
            query.student_id = { [Op.eq]: student_id };
          if (project_id)
            query.project_id = { [Op.eq]: project_id };

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
            redisClient.setEx(`applications`, 3600, JSON.stringify(applications));
          } else {
            redisClient.setEx(`admin_applications`, 3600, JSON.stringify(applications));
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

const createApplication = (body, student_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const application = await db.Application.findOne({
        where: { 
          student_id: student_id,
          project_id: body?.project_id,
        }
      });
      if (application) {
        resolve({
          msg: "You have already applied this project"
        });
      } else {
        const project = await db.Project.findOne({
          where: { 
            project_id: body?.project_id
          }, 
          include: [{
            model: db.Major,
            as: "project_major",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }]
        });

        if (project.poster_id === student_id) {
          resolve({
              msg: "You can't apply your project"
            });
        } else {
          const student = await db.Student.findOne({
              where: { 
                  student_id: student_id
              }, 
              include: [{
                model: db.Major,
                as: "student_major",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              }]
            });
          if (project.major_id !== student.major_id) {
              resolve({
                  msg: `You have to be ${project.project_major.major_name} major to apply this project`
                });
          } else {
              try {
                  const applications = await db.Application.create({
                      ...body,
                      price: project?.price,
                      student_id: student_id
                  });
                  resolve({
                    msg: "Apply successfully"
                  });
              } catch (error) {
                  resolve({
                      msg: "Apply unsuccessfully"
                    });
              }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });

  const acceptApplication = (query, student_id) =>
  new Promise(async (resolve, reject) => {
    try {
        const application = await db.Application.findOne({
            where: { 
                application_id: query?.application_id
            },
            include: [
              {
                model: db.Student,
                as: "application_student",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              }
          ]
          });

          const project_owner = await db.Project.findOne({
            raw: true,
            nest:true,
            where: { 
                project_id: application.project_id
            },
            include: [
              {
                model: db.Student,
                as: "project_poster",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              }
          ]
          });

          if(project_owner.project_poster.student_id !== student_id) {
            resolve({
              msg: 'You are not owner of this project to accept application',
            });
          } else {
            const doer_id = application.application_student.student_id;
            const project_id = application.project_id;
            const project_update = await db.Project.update(
              { doer_id: doer_id, status: "Received" }, 
              {
                where: { project_id },
              });
            const application_update = await db.Application.update(
                { status: "Accepted" }, 
                {
                  where: { project_id },
                });
              resolve({
                msg:
                    project_update[0] > 0 && application_update[0] > 0
                    ? `Accept application successfully`
                    : "Cannot accept application/ application_id not found",
              });
          }
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
          const project = await db.Project.findOne({
            where: { 
              project_id: body?.project_id
            }, 
            include: [{
              model: db.Major,
              as: "project_major",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            }]
          });
  
          if (project.poster_id === student_id) {
            resolve({
                msg: "You can't apply your project"
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
        }
    } catch (error) {
      reject(error);
    }
  });

const deleteApplication = (application_ids) =>
  new Promise(async (resolve, reject) => {
    try {
        const applications = await db.Application.update({status: 'Deactive'}, {
            where: { application_id: application_ids },
        });
        resolve({
            msg: applications > 0 ? `${applications} applications is deleted` : 'Cannot delete applications/ application_id not found',
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
  createApplication,
  acceptApplication,
  getApplicationById,
  updateApplication,
  deleteApplication,

};
