const db = require("../models");
const { Op } = require("sequelize");
const redisClient = require("../config/redis_config");

const getAllDeliverables = (
  { deliverable_name, application_id, ...query },
  role_name
) =>
  new Promise(async (resolve, reject) => {
    try {
      const deliverable = await redisClient.get("deliverables");
      if (deliverable != null && deliverable != "") {
        resolve({
          msg: deliverable ? `Got deliverables` : "Cannot find deliverables",
          deliverables: JSON.parse(deliverable),
        });
      } else {
        const adminDeliverable = await redisClient.get("admin_deliverables");
        if (adminDeliverable != null && adminDeliverable != "") {
          resolve({
            msg: adminDeliverable
              ? `Got deliverables`
              : "Cannot find deliverables",
            deliverables: JSON.parse(adminDeliverable),
          });
        } else {
          const queries = { raw: true, nest: true };
          queries.order = [["updatedAt", "DESC"]];
          if (application_id)
            query.application_id = { [Op.eq]: application_id };
          if (role_name !== "Admin") {
            query.status = { [Op.notIn]: ["Deactive", "Received"] };
          }
          const deliverables = await db.Deliverable.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
              exclude: ["application_id"],
            },
            include: [
              {
                model: db.Application,
                as: "deliverable_application",
                exclude: ["createdAt", "updatedAt"],
              },
            ],
          });

          if (role_name !== "Admin") {
            redisClient.setEx(
              "deliverables",
              3600,
              JSON.stringify(deliverables)
            );
          } else {
            redisClient.setEx(
              "admin_deliverables",
              3600,
              JSON.stringify(deliverables)
            );
          }

          resolve({
            msg: deliverables ? `Got deliverables` : "Cannot find deliverables",
            deliverables: deliverables,
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const createDeliverable = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const application_id = body?.application_id;
      const deliverables = await db.Deliverable.create({
        ...body,
      });
      await db.Application.update(
        {
          status: "Pending",
        },
        {
          where: { application_id: application_id },
        }
      );
      resolve({
        msg: deliverables
          ? "Create new deliverable successfully"
          : "Cannot create new deliverable",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateDeliverable = ({ deliverable_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const deliverables = await db.Deliverable.update(body, {
        where: { deliverable_id },
      });
      resolve({
        msg:
          deliverables[0] > 0
            ? `${deliverables[0]} deliverable is updated`
            : "Cannot update deliverable/ deliverable_id not found",
      });
    } catch (error) {
      reject(error);
    }
  });

const deleteDeliverable = (deliverable_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deliverable = await db.Deliverable.destroy({
        where: { deliverable_id: deliverable_id },
      });
      const deliverable_find = await db.Deliverable.findOne({
        where: { deliverable_id: deliverable_id },
        include: [
          {
            model: db.Application,
            as: "deliverable_application",
            exclude: ["createdAt", "updatedAt"],
          },
        ],
      });
      console.log(deliverable_find);

      const application_id = deliverable_find.application_id;
      console.log(application_id);

      await db.Application.update(
        {
          status: "Active",
        },
        {
          where: { application_id: application_id },
        }
      );
      resolve({
        msg:
          deliverable > 0
            ? `Deliverables is deleted`
            : "Cannot delete deliverables/ deliverable_id not found",
      });
    } catch (error) {
      reject(error);
    }
  });

const getDeliverableById = (deliverable_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deliverable = await db.Deliverable.findOne({
        where: { deliverable_id: deliverable_id },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["application_id"],
        },
        include: [
          {
            model: db.Application,
            as: "deliverable_application",
            exclude: ["createdAt", "updatedAt"],
          },
        ],
      });
      if (deliverable) {
        resolve({
          deliverable: deliverable,
        });
      } else {
        resolve({
          msg: `Cannot find deliverable with id: ${deliverable_id}`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getAllDeliverables,
  createDeliverable,
  updateDeliverable,
  deleteDeliverable,
  getDeliverableById,
};
