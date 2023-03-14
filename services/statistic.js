const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const redisClient = require("../config/redis_config");

const countAllProject = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({});
      resolve({
        msg: count > 0
          ? count
          : "No Record",
      });
    } catch (error) {
      reject(error);
    }
  });

  const countAllProjectInOneMonth = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({
            where: {
              createdAt: {
                [Op.gte]: Sequelize.literal('DATE_SUB(NOW(), INTERVAL 30 DAY)')
              }
            }
          }, { Sequelize });
      resolve({
        msg: count > 0
          ? count
          : "No record",
      });
    } catch (error) {
      reject(error);
    }
  });

  const countAllProjectInOneWeek = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({
            where: {
              createdAt: {
                [Op.gte]: Sequelize.literal('DATE_SUB(NOW(), INTERVAL 7 DAY)')
              }
            }
          }, { Sequelize });
      resolve({
        msg: count > 0
          ? count
          : "No record",
      });
    } catch (error) {
      reject(error);
    }
  });

  const countAllProjectInSixMonth = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({
            where: {
              createdAt: {
                [Op.gte]: Sequelize.literal('DATE_SUB(NOW(), INTERVAL 180 DAY)')
              }
            }
          }, { Sequelize });
      resolve({
        msg: count > 0
          ? count
          : "No record",
      });
    } catch (error) {
      reject(error);
    }
  });

  const countAllProjectInOneYear = () =>
  new Promise(async (resolve, reject) => {
    try {
        const { count } = await db.Project.findAndCountAll({
            where: {
              createdAt: {
                [Op.gte]: Sequelize.literal('DATE_SUB(NOW(), INTERVAL 365 DAY)')
              }
            }
          }, { Sequelize });
      resolve({
        msg: count > 0
          ? count
          : "No record",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {countAllProject, countAllProjectInOneMonth, countAllProjectInOneWeek, countAllProjectInSixMonth, countAllProjectInOneYear}