import express from 'express';
import {
  getAllProvinces,
  getCitiesByProvince,
  getProvince,
} from '../controllers/provinceController';

const router = express.Router();

router.get('/', getAllProvinces);
router.get('/id/:id', getProvince);
router.get('/name/:name', getProvince);
router.get('/id/:id/cities', getCitiesByProvince);
router.get('/name/:name/cities', getCitiesByProvince);

export default router;
