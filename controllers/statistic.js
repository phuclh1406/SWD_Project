const services = require("../services");
const { BadRequestError, InternalServerError } = require("../errors");

const countAllProject = async (req, res) => {
  try {
    const response = await services.countAllProject();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    throw new InternalServerError(error);
  }
};

const countAllProjectInOneWeek = async (req, res) => {
    try {
      const response = await services.countAllProjectInOneWeek();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new InternalServerError(error);
    }
  };

  const countAllProjectInSixMonth = async (req, res) => {
    try {
      const response = await services.countAllProjectInSixMonth();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new InternalServerError(error);
    }
  };

  const countAllProjectInOneMonth = async (req, res) => {
    try {
      const response = await services.countAllProjectInOneMonth();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new InternalServerError(error);
    }
  };

  const countAllProjectInOneYear = async (req, res) => {
    try {
      const response = await services.countAllProjectInOneYear();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new InternalServerError(error);
    }
  };

  const countAllProjectInOneAPI = async (req, res) => {
    try {
      const response = await services.countAllProjectInOneAPI();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new InternalServerError(error);
    }
  };
module.exports = { countAllProject, countAllProjectInOneAPI, countAllProjectInOneYear, countAllProjectInSixMonth, countAllProjectInOneMonth, countAllProjectInOneWeek};
