const db = require("../models");
const { Op } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllProjects = (
  { project_name, poster_id, ...query },
  role_name
) =>
  new Promise(async (resolve, reject) => {
    try {
      const project = await redisClient.get('projects');
      if (project != null && project != "") {
        resolve({
          msg: project ? `Got projects` : "Cannot find projects",
          projects: JSON.parse(project),
        });
      } else {
        const adminProject = await redisClient.get('admin_projects');
        if (adminProject != null && adminProject != "") {
          resolve({
            msg: adminProject ? `Got projects` : "Cannot find projects",
            projects: JSON.parse(adminProject),
          });
        } else {
          const queries = { raw: true, nest: true };
          queries.order = [['updatedAt', 'DESC']];
          if (project_name)
            query.project_name = { [Op.substring]: project_name };
          if (poster_id)
            query.poster_id = { [Op.eq]: poster_id };
          if (role_name !== "Admin") {
            query.status = { [Op.notIn]: ['Deactive', 'Received'] };
          }
          const projects = await db.Project.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: ["poster_id", "doer_id", "cate_id", "major_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Student,
                as: "project_poster",
                attributes: ["student_id", "student_name", "avatar"],
              },
              {
                model: db.Student,
                as: "project_doer",
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
            redisClient.setEx('projects', 3600, JSON.stringify(projects));
          } else {
            redisClient.setEx('admin_projects', 3600, JSON.stringify(projects));
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

  const getAllProjectsHome = (
    { project_name, ...query }
  ) =>
    new Promise(async (resolve, reject) => {
      try {
          const adminProject = await redisClient.get('projects_home');
          if (adminProject != null && adminProject != "") {
            resolve({
              msg: adminProject ? `Got projects` : "Cannot find projects",
              projects: JSON.parse(adminProject),
            });
          } else {
            const queries = { raw: true, nest: true };
            queries.order = [['updatedAt', 'DESC']];
            if (project_name)
              query.project_name = { [Op.substring]: project_name };
              query.status = { [Op.notIn]: ['Deactive', 'Received'] };
  
            const projects = await db.Project.findAndCountAll({
              where: query,
              ...queries,
              attributes: {
                exclude: ["student_id", "createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Student,
                  as: "project_poster",
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
              redisClient.setEx('projects_home', 3600, JSON.stringify(projects));
  
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
    //           //   query.status = { [Op.ne]: "Deactive" };
    
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

const createProject = (body, student_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const projects = await db.Project.findOrCreate({
        where: { 
          project_name: body?.project_name,
          status: "Active", 
        },
        defaults: {
          ...body,
          poster_id: student_id
        },
      });
      resolve({
        msg: projects[1]
          ? "Create new project successfully"
          : "Cannot create new project/ Project name already has",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateProject = ({ project_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
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
            as: "project_poster",
            attributes: ["student_id", "student_name", "avatar"],
          },
          {
            model: db.Student,
            as: "project_doer",
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
      // if (project) {
      //   resolve({
      //     project: project,
      //   });
      // } else {
      //   resolve({
      //     msg: `Cannot find project with id: ${project_id}`,
      //   });
      // }

      resolve({
        msg: project ? `Get project by id ${project_id}` : `Cannot find project with id ${project_id}`,
        project: project ? project : null
      })
      
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
  getAllProjectsHome,

};
