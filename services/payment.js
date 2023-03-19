const db = require("../models");
const { Op } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllTransactions = (
  { poster_id, ...query }
) =>
  new Promise(async (resolve, reject) => {
    try {
        const transaction = await redisClient.get('transactions');
        if (transaction != null && transaction != "") {
          resolve({
            msg: `Got transactions`,
            transactions: JSON.parse(transaction),
          });
        } else {
          const queries = { raw: true, nest: true };
          queries.order = [['updatedAt', 'DESC']];
          if (poster_id)
            query.poster_id = { [Op.eq]: poster_id };
          const transactions = await db.Transaction.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Student,
                as: "transaction_poster",
                attributes: ["student_id", "student_name", "avatar"],
              },
              {
                model: db.Student,
                as: "transaction_doer",
                attributes: ["student_id", "student_name", "avatar"],
              },
              {
                model: db.Deliverable,
                as: "transaction_deliverable",
                attributes: ["deliverable_id", "title", "file"],
              }
            ],
          });
            redisClient.setEx('transactions', 3600, JSON.stringify(transactions));

          resolve({
            msg: transactions ? `Got transactions` : "Cannot find transactions",
            transactions: transactions,
          });
        }
    } catch (error) {
        console.log(error);
        reject(error);
    }
  });

module.exports = {
  getAllTransactions
};
