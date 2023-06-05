const {
    VehicleBrands,
    VehicleTypes,
    VehicleModels,
    Pricelists,
    VehicleYears,
  } = require("../db/models");
  const { Response, Error } = require("../helpers/response");
  
  class PriceController {
    static async getAllPrices(req, res, next) {
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
        const totalCount = await Pricelists.count(); // Separate query for total count
  
        const dataPrice = await Pricelists.findAll({
          limit: size,
          offset: page * size
        });
        
        // check if there is any data
        if (dataPrice.length < 1) {
          throw new Error(400, "There is no data yet");
        }
        res.status(200).json({
          total: totalCount,
          limit: size,
          skip: page,
          data: dataPrice
        })
      } catch (error) {
        next(error);
      }
    }
    static async getPrice(req, res, next) {
      // extract id from req.params
      const id = req.query.id;
      const dataPrice = await Pricelists.findOne({
        where: { id: id },
      });
  
      // validate if there is any data with specified ID
      if (!dataPrice) {
        throw new Error(400, `No price with ID ${id}`);
      }
  
      return new Response(res, 200, dataPrice);
    }
    static async createPrice(req, res, next) {
      try {
        // extract input from req.body
        const { yearID, modelID, price_inMillion } = req.body;

        // check if year exists & model exists
        const checkYear = await VehicleYears.findOne({
            where: { id: yearID}
        });
        if (!checkYear) {
            throw new Error(400, 'Invalid year')
        }

        const checkModel = await VehicleModels.findOne({
            where: { id: modelID}
        })
        if (!checkModel) {
            throw new Error(400, 'Invalid model')
        }

        // create new pricelist
        const dataPricelist = await Pricelists.create({
          yearID: yearID,
          modelID: modelID,
          price_inMillion: price_inMillion
        });
  
        return new Response(res, 201, dataPricelist);
      } catch (error) {
        next(error);
      }
    }
    static async updatePrice(req, res, next) {
      try {
        // extract input from req.body
        const { yearID, modelID, price_inMillion } = req.body;
        const id = req.params.id;
  
        // find and validate if the price exists
        const searchPrice = await Pricelists.findOne({
          where: { id: id },
        });
        if (!searchPrice) {
          throw new Error(400, `There is no pricelist with ID ${id}`);
        }
  
        // update year with the input data
        const updateYear = await Pricelists.update(
          {
            yearID: yearID,
            modelID: modelID,
            price_inMillion: price_inMillion
          },
          { where: { id: id } }
        );
  
        return new Response(res, 200, `Successfully update price ID ${id}`);
      } catch (error) {
        next(error);
      }
    }
    static async deletePrice(req, res, next) {
      try {
          // extract data from req.params
          const id = req.params.id;
          const searchPrice = await Pricelists.findOne({
            where: { id: id },
          });

          // validate if the ID is match  with current data
          if (!searchPrice) {
            throw new Error(400, `No pricelist with ID ${id}`);
          }
    
          // delete price
          const deletePrice = await Pricelists.destroy({
            where: { id: id },
          });
    
          return new Response(res, 200, "Pricelist deleted successfully");
        } catch (error) {
          next(error);
        }
    }
  }
  
  module.exports = PriceController;