const services = require("../services");
const { BadRequestError, InternalServerError } = require("../errors");

  const countAllProjectInOneAPI = async (req, res) => {
    try {
      const response = await services.countAllProjectInOneAPI();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new InternalServerError(error);
    }
  };
module.exports = {countAllProjectInOneAPI};
