const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const redisClient = require("../config/redis_config");
const countAllProjectInOneAPI = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({});
        const { count: count1 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 DAY)"),
            },
          },
        }, { Sequelize });
        const { count: count2 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 30 DAY)"),
            },
          },
        }, { Sequelize });
        const { count: count3 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 180 DAY)"),
            },
          },
        }, { Sequelize });
        const { count: count4 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 365 DAY)"),
            },
          },
        }, { Sequelize });
      resolve({
        all: count > 0 ? count : "No record",
        in_1_week: count1 > 0 ? count1 : "No record",
        in_1_month: count2 > 0 ? count2 : "No record",
        in_6_month: count3 > 0 ? count3 : "No record",
        in_1_year: count4 > 0 ? count4 : "No record"
      });
      console.log(count, count1, count2, count3, count4)
    } catch (error) {
      reject(error);
    }
  });

  const countAllAccount = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Student.findAndCountAll({where: {
          role_id: {
            [Op.ne]: '5826d1d9-c33a-45c5-b93e-894e1dde10bd'
          }
        },});
        const { count: count1 } = await db.Student.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 DAY)"),
            },
            role_id: {
              [Op.ne]: '5826d1d9-c33a-45c5-b93e-894e1dde10bd'
            }
          },
        }, { Sequelize });
        const { count: count2 } = await db.Student.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 30 DAY)"),
            },
            role_id: {
              [Op.ne]: '5826d1d9-c33a-45c5-b93e-894e1dde10bd'
            }
          },
        }, { Sequelize });
        const { count: count3 } = await db.Student.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 180 DAY)"),
            },
            role_id: {
              [Op.ne]: '5826d1d9-c33a-45c5-b93e-894e1dde10bd'
            }
          },
        }, { Sequelize });
        const { count: count4 } = await db.Student.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 365 DAY)"),
            },
            role_id: {
              [Op.ne]: '5826d1d9-c33a-45c5-b93e-894e1dde10bd'
            }
          },
        }, { Sequelize });
      resolve({
        all: count > 0 ? count : "No record",
        in_1_week: count1 > 0 ? count1 : "No record",
        in_1_month: count2 > 0 ? count2 : "No record",
        in_6_month: count3 > 0 ? count3 : "No record",
        in_1_year: count4 > 0 ? count4 : "No record",
      });
    } catch (error) {
      reject(error);
    }
  });

  const countAllFinishProject = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({where: {
          status: {
            [Op.eq]: 'Finished'
          }
        },});
        const { count: count1 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 DAY)"),
            },
            status: {
              [Op.eq]: 'Finished'
            }
          },
        }, { Sequelize });
        const { count: count2 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 30 DAY)"),
            },
            status: {
              [Op.eq]: 'Finished'
            }
          },
        }, { Sequelize });
        const { count: count3 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 180 DAY)"),
            },
            status: {
              [Op.eq]: 'Finished'
            }
          },
        }, { Sequelize });
        const { count: count4 } = await db.Project.findAndCountAll({
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 365 DAY)"),
            },
            status: {
              [Op.eq]: 'Finished'
            }
          },
        }, { Sequelize });
      resolve({
        all: count > 0 ? count : "No record",
        in_1_week: count1 > 0 ? count1 : "No record",
        in_1_month: count2 > 0 ? count2 : "No record",
        in_6_month: count3 > 0 ? count3 : "No record",
        in_1_year: count4 > 0 ? count4 : "No record",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {countAllProjectInOneAPI, countAllAccount, countAllFinishProject}