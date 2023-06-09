const express = require('express');
const router = express.Router();
const userController  = require('../controllers/userController');
const brandController = require('../controllers/brandController');
const typeController = require('../controllers/typeController');
const modelController = require('../controllers/modelController');
const yearController = require('../controllers/yearController');
const priceController = require('../controllers/priceController');
const { registerValidator, loginValidator } = require('../middlewares/joi');
const validation = require('../helpers/validation');
const { authUser, authAdmin } = require('../middlewares/auth');


// registration and login route
router.post('/register', validation(registerValidator), userController.registerUser);
router.post('/login', validation(loginValidator), userController.loginUser);
router.delete('/user-id', authUser, userController.deleteUser);

// get method for brand controller
router.get('/brand', authUser, brandController.getAllBrands);
router.get('/brand-id', authUser, brandController.getBrand);

// get method for brand controller
router.get('/type', authUser, typeController.getAllTypes);
router.get('/type-id', authUser, typeController.getType);

// get method for brand controller
router.get('/model', authUser, modelController.getAllModels);
router.get('/model-id', authUser, modelController.getModel);

// get method for brand controller
router.get('/price', authUser, priceController.getAllPrices);
router.get('/price-id', authUser, priceController.getPrice);

// get method for brand controller
router.get('/year', authUser, yearController.getAllYears);
router.get('/year-id', authUser, yearController.getYear);



module.exports = router;