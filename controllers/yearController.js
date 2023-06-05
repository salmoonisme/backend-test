const {
    VehicleBrands,
    VehicleTypes,
    VehicleModels,
    Pricelists,
    VehicleYears,
  } = require("../db/models");
  const { Response, Error } = require("../helpers/response");
  
  class YearController {
    static async getAllYears(req, res, next) {
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
        const totalCount = await VehicleYears.count(); // Separate query for total count
  
        const dataYear = await VehicleYears.findAll({
          limit: size,
          offset: page * size
        });
        
        // check if there is any data
        if (dataYear.length < 1) {
          throw new Error(400, "There is no data yet");
        }
        res.status(200).json({
          total: totalCount,
          limit: size,
          skip: page,
          data: dataYear
        })
      } catch (error) {
        next(error);
      }
    }
    static async getYear(req, res, next) {
      // extract id from req.params
      const id = req.query.id;
      const dataYear = await VehicleYears.findOne({
        where: { id: id },
      });
  
      // validate if there is any data with specified ID
      if (!dataYear) {
        throw new Error(400, `No year with ID ${id}`);
      }
  
      return new Response(res, 200, dataYear);
    }
    static async createYear(req, res, next) {
      try {
        // extract input from req.body
        const { year } = req.body;

        // check if year exists
        const checkYear = await VehicleYears.findOne({
            where: { year: year}
        });
        if (checkYear) {
            throw new Error(400, 'Year already exists')
        }

        // create new year
        const dataYear = await VehicleYears.create({
          year: year
        });
  
        return new Response(res, 201, dataYear);
      } catch (error) {
        next(error);
      }
    }
    static async updateYear(req, res, next) {
      try {
        // extract input from req.body
        const { year } = req.body;
        const id = req.params.id;
  
        // find and validate if the year exists
        const searchYear = await VehicleYears.findOne({
          where: { id: id },
        });
        if (!searchYear) {
          throw new Error(400, `There is no year with ID ${id}`);
        }
  
        // update year with the input data
        const updateYear = await VehicleYears.update(
          {
            year: year,
          },
          { where: { id: id } }
        );
  
        return new Response(res, 200, `Successfully update year ID ${id}`);
      } catch (error) {
        next(error);
      }
    }
    static async deleteYear(req, res, next) {
      try {
          // extract data from req.params
          const id = req.params.id;
          const searchType = await VehicleYears.findOne({
            where: { id: id },
          });

          // validate if the ID is match  with current data
          if (!searchType) {
            throw new Error(400, `No year with ID ${id}`);
          }
    
          // delete type
          const deleteType = await VehicleYears.destroy({
            where: { id: id },
          });
    
          return new Response(res, 200, "Year deleted successfully");
        } catch (error) {
          next(error);
        }
    }
  }
  
  module.exports = YearController;