import express from 'express';
import {
  getAllCity,
  getCity,
  getProvinceByCity,
} from '../controllers/cityController';

const router = express.Router();

router.get('/', getAllCity);
router.get('/id/:id', getCity);
router.get('/name/:name', getCity);
router.get('/id/:id/province', getProvinceByCity);
router.get('/name/:name/province', getProvinceByCity);

export default router;
