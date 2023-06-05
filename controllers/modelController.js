const {
    VehicleBrands,
    VehicleTypes,
    VehicleModels,
    Pricelists,
    VehicleYears,
  } = require("../db/models");
  const { Response, Error } = require("../helpers/response");
  
  class ModelController {
    static async getAllModels(req, res, next) {
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
        const totalCount = await VehicleModels.count(); // Separate query for total count
  
        const dataModel = await VehicleModels.findAll({
          limit: size,
          offset: page * size,
          include: [
            {
              model: Pricelists,
            },
          ],
        });
        
        // check if there is any data
        if (dataModel.length < 1) {
          throw new Error(400, "There is no model yet");
        }
        res.status(200).json({
          total: totalCount,
          limit: size,
          skip: page,
          data: dataModel
        })
      } catch (error) {
        next(error);
      }
    }
    static async getModel(req, res, next) {
      // extract id from req.params
      const id = req.query.id;
      const dataModel = await VehicleModels.findOne({
        where: { id: id },
      });
  
      // validate if there is any data with specified ID
      if (!dataModel) {
        throw new Error(400, `No model with ID ${id}`);
      }
  
      return new Response(res, 200, dataModel);
    }
    static async createModel(req, res, next) {
      try {
        // extract input from req.body
        const { name, typeID } = req.body;

        // check if typeID exists
        const checkTypeID = await VehicleTypes.findByPk(typeID);
        if (!checkTypeID) {
          throw new Error(400, 'Invalid brand ID')
        }

        // create new vehicle model
        const dataModel = await VehicleModels.create({
          name: name,
          typeID: typeID
        });
  
        return new Response(res, 201, dataModel);
      } catch (error) {
        next(error);
      }
    }
    static async updateModel(req, res, next) {
      try {
        // extract input from req.body
        const { name, typeID } = req.body;
        const id = req.params.id;
  
        // find and validate if the model exists
        const searchModel = await VehicleModels.findOne({
          where: { id: id },
        });
        if (!searchModel) {
          throw new Error(400, `There is no model with ID ${id}`);
        }
  
        // update model with the input data
        const updateModel = await VehicleModels.update(
          {
            name: name,
            typeID: typeID
          },
          { where: { id: id } }
        );
  
        return new Response(res, 200, `Successfully update model ID ${id}`);
      } catch (error) {
        next(error);
      }
    }
    static async deleteModel(req, res, next) {
      try {
          // extract data from req.params
          const id = req.params.id;
          const searchModel = await VehicleModels.findOne({
            where: { id: id },
          });

          // validate if the ID is match  with current data
          if (!searchModel) {
            throw new Error(400, `No model with ID ${id}`);
          }
    
          // delete model
          const deleteModel = await VehicleModels.destroy({
            where: { id: id },
          });
    
          return new Response(res, 200, "Model deleted successfully");
        } catch (error) {
          next(error);
        }
    }
  }
  
  module.exports = ModelController;