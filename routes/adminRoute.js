const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const brandController = require('../controllers/brandController');
const typeController = require('../controllers/typeController');
const modelController = require('../controllers/modelController');
const yearController = require('../controllers/yearController');
const priceController = require('../controllers/priceController');
const validation = require('../helpers/validation');
const { authUser, authAdmin } = require('../middlewares/auth');

router.get('/user', authAdmin, adminController.getAllUsers);
router.get('/user-id', authAdmin, adminController.getUser);

// route for vehicle brand
router.post('/brand', authAdmin, brandController.createBrand);
router.patch('/brand/:id', authAdmin, brandController.updateBrand);
router.delete('/brand/:id', authAdmin, brandController.deleteBrand);

// route for vehicle model
router.post('/type', authAdmin, typeController.createType);
router.patch('/type/:id', authAdmin, typeController.updateType);
router.delete('/type/:id', authAdmin, typeController.deleteType);

// route for vehicle model
router.post('/model', authAdmin, modelController.createModel);
router.patch('/model/:id', authAdmin, modelController.updateModel);
router.delete('/model/:id', authAdmin, modelController.deleteModel);

// route for vehicle year
router.post('/year', authAdmin, yearController.createYear);
router.patch('/year/:id', authAdmin, yearController.updateYear);
router.delete('/year/:id', authAdmin, yearController.deleteYear);

// route for pricelist
router.post('/pricelist', authAdmin, priceController.createPrice);
router.patch('/pricelist/:id', authAdmin, priceController.updatePrice);
router.delete('/pricelist/:id', authAdmin, priceController.deletePrice);




module.exports = router;