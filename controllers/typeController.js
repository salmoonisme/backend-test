const {
    VehicleBrands,
    VehicleTypes,
    VehicleModels,
    Pricelist,
    VehicleYears,
  } = require("../db/models");
  const { Response, Error } = require("../helpers/response");
  
  class TypeController {
    static async getAllTypes(req, res, next) {
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
        const totalCount = await VehicleTypes.count(); // Separate query for total count
  
        const dataType = await VehicleTypes.findAll({
          limit: size,
          offset: page * size
        });
        
        // check if there is any data
        if (dataType.length < 1) {
          throw new Error(400, "There is no type yet");
        }
        res.status(200).json({
          total: totalCount,
          limit: size,
          skip: page,
          data: dataType
        })
      } catch (error) {
        next(error);
      }
    }
    static async getType(req, res, next) {
      // extract id from req.params
      const id = req.query.id;
      const dataType = await VehicleTypes.findOne({
        where: { id: id },
      });
  
      // validate if there is any data with specified ID
      if (!dataType) {
        throw new Error(400, `No type with ID ${id}`);
      }
  
      return new Response(res, 200, dataType);
    }
    static async createType(req, res, next) {
      try {
        // extract input from req.body
        const { name, brandID } = req.body;

        // check if brandID exists
        const checkBrandID = await VehicleBrands.findByPk(brandID);
        if (!checkBrandID) {
          throw new Error(400, 'Invalid brand ID')
        }

        // create new vehicle type
        const dataType = await VehicleTypes.create({
          name: name,
          brandID: brandID
        });
  
        return new Response(res, 201, dataType);
      } catch (error) {
        next(error);
      }
    }
    static async updateType(req, res, next) {
      try {
        // extract input from req.body
        const { name, brandID } = req.body;
        const id = req.params.id;
  
        // find and validate if the type exists
        const searchType = await VehicleTypes.findOne({
          where: { id: id },
        });
        if (!searchType) {
          throw new Error(400, `There is no type with ID ${id}`);
        }
  
        // update type with the input data
        const updateType = await VehicleTypes.update(
          {
            name: name,
            brandID: brandID
          },
          { where: { id: id } }
        );
  
        return new Response(res, 200, `Successfully update type ID ${id}`);
      } catch (error) {
        next(error);
      }
    }
    static async deleteType(req, res, next) {
      try {
          // extract data from req.params
          const id = req.params.id;
          const searchType = await VehicleTypes.findOne({
            where: { id: id },
          });

          // validate if the ID is match  with current data
          if (!searchType) {
            throw new Error(400, `No type with ID ${id}`);
          }
    
          // delete type
          const deleteType = await VehicleTypes.destroy({
            where: { id: id },
          });
    
          return new Response(res, 200, "Type deleted successfully");
        } catch (error) {
          next(error);
        }
    }
  }
  
  module.exports = TypeController;