const {
  Users,
  VehicleBrands,
  VehicleTypes,
  VehicleModels,
  Pricelist,
  VehicleYears,
} = require("../db/models");
const { Response, Error } = require("../helpers/response");

class AdminController {
  static async getAllUsers(req, res, next) {
    try {
      const pageAsNumber = Number.parseInt(req.query.page);
      const sizeAsNumber = Number.parseInt(req.query.size);
    
      let page = 0;
      if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
      }
    
      let size = 10;
      if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
        size = sizeAsNumber;
      }
      //query find all from database
      const totalCount = await Users.count(); // Separate query for total count

      const dataUser = await Users.findAll({
        limit: size,
        offset: page * size
      });
      
      // check if there is any data
      if (dataUser.length < 1) {
        throw new Error(400, "There is no user yet");
      }
      res.status(200).json({
        total: totalCount,
        limit: size,
        skip: page,
        data: dataUser
      })
    } catch (error) {
      next(error);
    }
  }
  static async getUser(req, res, next) {
    // extract id from req.params
    const id = req.query.id;
    const dataUser = await Users.findOne({
      where: { id: id },
    });

    // validate if there is any data with specified ID
    if (!dataUser) {
      throw new Error(400, `No user with ID ${id}`);
    }

    return new Response(res, 200, dataUser);
  }
}

module.exports = AdminController;
