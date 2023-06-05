const {
  VehicleBrands,
  VehicleTypes,
  VehicleModels,
  Pricelist,
  VehicleYears,
} = require("../db/models");
const { Response, Error } = require("../helpers/response");

class BrandController {
  static async getAllBrands(req, res, next) {
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
      const totalCount = await VehicleBrands.count(); // Separate query for total count

      const dataBrand = await VehicleBrands.findAll({
        limit: size,
        offset: page * size
      });
      
      // check if there is any data
      if (dataBrand.length < 1) {
        throw new Error(400, "There is no brand yet");
      }
      res.status(200).json({
        total: totalCount,
        limit: size,
        skip: page,
        data: dataBrand
      })
    } catch (error) {
      next(error);
    }
  }
  static async getBrand(req, res, next) {
    // extract id from req.params
    const id = req.query.id;
    const dataBrand = await VehicleBrands.findOne({
      where: { id: id },
    });

    // validate if there is any data with specified ID
    if (!dataBrand) {
      throw new Error(400, `No brand with ID ${id}`);
    }

    return new Response(res, 200, dataBrand);
  }
  static async createBrand(req, res, next) {
    try {
      // extract input from req.body
      const { name } = req.body;

      // create new menu
      const dataBrand = await VehicleBrands.create({
        name: name,
      });

      return new Response(res, 201, dataBrand);
    } catch (error) {
      next(error);
    }
  }
  static async updateBrand(req, res, next) {
    try {
      // extract input from req.body
      const { name } = req.body;
      const id = req.params.id;

      // find and validate if the brand exists
      const searchBrand = await VehicleBrands.findOne({
        where: { id: id },
      });
      if (!searchBrand) {
        throw new Error(400, `There is no brand with ID ${id}`);
      }

      // update brand with the input data
      const updateBrand = await VehicleBrands.update(
        {
          name: name,
        },
        { where: { id: id } }
      );

      return new Response(res, 200, `Successfully update brand ID ${id}`);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBrand(req, res, next) {
    try {
        // extract data from req.params
        const id = req.params.id;
        const searchBrand = await VehicleBrands.findOne({
          where: { id: id },
        });
        // validate if the ID is match  with current data
        if (!searchBrand) {
          throw new Error(400, `No brand with ID ${id}`);
        }
  
        // delete brand
        const deleteUser = await VehicleBrands.destroy({
          where: { id: id },
        });
  
        return new Response(res, 200, "Brand deleted successfully");
      } catch (error) {
        next(error);
      }
  }
}

module.exports = BrandController;
