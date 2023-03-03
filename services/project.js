const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllProjects = (
  { page, limit, order, project_name, ...query },
  role_name
) =>
  new Promise(async (resolve, reject) => {
    try {
      const project = await redisClient.get(`projects_${page}`);
      if (project != null && project != "") {
        resolve({
          msg: project ? `Got projects` : "Cannot find projects",
          projects: JSON.parse(project),
        });
      } else {
        const adminProject = await redisClient.get(`admin_projects_${page}`);
        if (adminProject != null && adminProject != "") {
          resolve({
            msg: adminProject ? `Got projects` : "Cannot find projects",
            projects: JSON.parse(adminProject),
          });
        } else {
          const queries = { raw: true, nest: true };
          const offset = !page || +page <= 1 ? 0 : +page - 1;
          const flimit = +limit || +process.env.LIMIT_POST;
          queries.offset = offset * flimit;
          queries.limit = flimit;
          if (order) queries.order = [order];
          if (project_name)
            query.project_name = { [Op.substring]: project_name };
          if (role_name !== "Admin") {
            query.status = { [Op.ne]: "deactive" };
          }

          const projects = await db.Project.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: ["student_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Student,
                as: "project_student",
                attributes: ["student_id", "student_name", "avatar"],
              },
              {
                model: db.Category,
                as: "project_category",
                attributes: ["cate_id", "cate_name"],
              },
              {
                model: db.Major,
                as: "project_major",
                attributes: ["major_id", "major_name"],
              },
            ],
          });

          if (role_name !== "Admin") {
            redisClient.setEx(`projects_${page}`, 3600, JSON.stringify(projects));
          } else {
            redisClient.setEx(`admin_projects_${page}`, 3600, JSON.stringify(projects));
          }

          resolve({
            msg: projects ? `Got projects` : "Cannot find projects",
            projects: projects,
          });
        }
      }
    } catch (error) {
        console.log(error);
      reject(error);
    }
  });

  const getProjectsByPosterId = (
    { page, limit, order, project_name, ...query },
    student_id
  ) =>
    new Promise(async (resolve, reject) => {
      try {
          const adminProject = await redisClient.get(`projects_poster_${page}`);
          if (adminProject != null && adminProject != "") {
            resolve({
              msg: adminProject ? `Got projects` : "Cannot find projects",
              projects: JSON.parse(adminProject),
            });
          } else {
            const queries = { raw: true, nest: true };
            const offset = !page || +page <= 1 ? 0 : +page - 1;
            const flimit = +limit || +process.env.LIMIT_POST;
            queries.offset = offset * flimit;
            queries.limit = flimit;
            if (order) queries.order = [order];
            if (project_name)
              query.project_name = { [Op.substring]: project_name };
              query.student_id = { [Op.eq]: student_id };
              query.status = { [Op.ne]: "deactive" };
  
            const projects = await db.Project.findAndCountAll({
              where: query, 
              ...queries,
              attributes: {
                exclude: ["student_id", "createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Student,
                  as: "project_student",
                  attributes: ["student_id", "student_name", "avatar"],
                },
                {
                  model: db.Category,
                  as: "project_category",
                  attributes: ["cate_id", "cate_name"],
                },
                {
                  model: db.Major,
                  as: "project_major",
                  attributes: ["major_id", "major_name"],
                },
              ],
            });
              redisClient.setEx(`projects_poster_${page}`, 3600, JSON.stringify(projects));
            resolve({
              msg: projects ? `Got projects` : "Cannot find projects",
              projects: projects,
            });
          }
      } catch (error) {
          console.log(error);
        reject(error);
      }
    });

    const getProjectsByDoerId = (
      { page, limit, order, project_name, ...query },
      student_id
    ) =>
      new Promise(async (resolve, reject) => {
        try {
            const adminProject = await redisClient.get(`admin_projects_${page}`);
            if (adminProject != null && adminProject != "") {
              resolve({
                msg: adminProject ? `Got projects` : "Cannot find projects",
                projects: JSON.parse(adminProject),
              });
            } else {
              const queries = { raw: true, nest: true };
              const offset = !page || +page <= 1 ? 0 : +page - 1;
              const flimit = +limit || +process.env.LIMIT_POST;
              queries.offset = offset * flimit;
              queries.limit = flimit;
              if (order) queries.order = [order];
                query.student_id = { [Op.eq]: student_id };
                query.status = { [Op.ne]: "deactive" };
    
              const projects = await db.Application.findAndCountAll({
                where: query, 
                ...queries,
                attributes: {
                  exclude: ["student_id", "post_id", "createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Student,
                    as: "project_student",
                    attributes: ["student_id", "student_name", "avatar"],
                  },
                ],
              });
                redisClient.setEx(`projects_poster_${page}`, 3600, JSON.stringify(projects));
              resolve({
                msg: projects ? `Got projects` : "Cannot find projects",
                projects: projects,
              });
            }
          
        } catch (error) {
            console.log(error);
          reject(error);
        }
      });

    // const getProjectsByDoerId = (
    //   { page, limit, order, project_name, ...query },
    //   student_id
    // ) =>
    //   new Promise(async (resolve, reject) => {
    //     try {
    //         const project_redis = await redisClient.get(`projects_doer_${page}`);
    //         if (project_redis != null && Project != "") {
    //           resolve({
    //             msg: project_redis ? `Got projects` : "Cannot find projects",
    //             project_redis: JSON.parse(project_redis),
    //           });
    //         } else {
    //           // const queries = { raw: true, nest: true };
    //           // const offset = !page || +page <= 1 ? 0 : +page - 1;
    //           // const flimit = +limit || +process.env.LIMIT_POST;
    //           // queries.offset = offset * flimit;
    //           // queries.limit = flimit;
    //           // if (order) queries.order = [order];
    //           // if (project_name)
    //           //   query.project_name = { [Op.substring]: project_name };
    //           //   query.student_id = { [Op.eq]: student_id };
    //           //   query.status = { [Op.ne]: "deactive" };
    
    //           // const projects = await db.Project.findAndCountAll({
    //           //   where: query, 
    //           //   ...queries,
    //           //   attributes: {
    //           //     exclude: ["student_id", "createdAt", "updatedAt"],
    //           //   },
    //           //   include: [
    //           //     {
    //           //       model: db.Student,
    //           //       as: "project_student",
    //           //       attributes: ["student_id", "student_name", "avatar"],
    //           //     },
    //           //   ],
    //           // });

    //           const projects = await sequelize.query(`
    //             SELECT *
    //             FROM students s
    //             LEFT JOIN applications a ON s.student_id = a.student_id
    //             LEFT JOIN posts p ON a.post_id = p.post_id 
    //             LEFT JOIN projects pj ON p.project_id = pj.project_id
    //             WHERE s.student_id = ?
    //             ORDER BY s.student_id ASC
    //             LIMIT ?
    //             OFFSET ?
    //           `, {
    //             replacements: [student_id, pageSize, (page - 1) * pageSize],
    //             type: sequelize.QueryTypes.SELECT
    //           });
              
    //           redisClient.setEx(`projects_doer_${page}`, 3600, JSON.stringify(projects));
    
    //           resolve({
    //             msg: projects ? `Got projects` : "Cannot find projects",
    //             projects: projects,
    //           });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //       reject(error);
    //     }
    //   });

const createProject = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const projects = await db.Project.findOrCreate({
        where: { project_name: body?.project_name },
        defaults: {
          ...body,
        },
      });
      resolve({
        msg: projects[1]
          ? "Create new project successfully"
          : "Cannot create new project",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateProject = ({ project_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkDuplicateName = await db.Project.findOne({
        where: { project_name: body?.project_name },
      });

      if (checkDuplicateName !== null) {
        resolve({
          msg: "Project name already have",
        });
      }
      const projects = await db.Project.update(body, {
        where: { project_id },
      });
      resolve({
        msg:
          projects[0] > 0
            ? `${projects[0]} project is updated`
            : "Cannot update project/ project_id not found",
      });
    } catch (error) {
      reject(error);
    }
  });

const deleteProject = (project_ids) =>
  new Promise(async (resolve, reject) => {
    try {
      const projects = await db.Project.update(
        { status: "Deactive" },
        {
          where: { project_id: project_ids },
        }
      );
      resolve({
        msg:
          projects > 0
            ? `${projects} projects is deleted`
            : "Cannot delete projects/ project_id not found",
      });
    } catch (error) {
      reject(error);
    }
  });

const getProjectById = (project_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const project = await db.Project.findOne({
        where: { project_id: project_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["student_id", "createAt", "updateAt"],
        },
        include: [
          {
            model: db.Student,
            as: "project_student",
            attributes: ["student_id", "student_name", "avatar"],
          },
          {
            model: db.Category,
            as: "project_category",
            attributes: ["cate_id", "cate_name"],
          },
          {
            model: db.Major,
            as: "project_major",
            attributes: ["major_id", "major_name"],
          },
        ],
      });
      if (project) {
        resolve({
          project: project,
        });
      } else {
        resolve({
          msg: `Cannot find project with id: ${project_id}`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectsByPosterId,

};
