import { Request, Response, NextFunction } from 'express';
import { findByProperty } from '../utils/findByProperty';
import { citiesData, provinceData } from '../data/data';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getAllCity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(citiesData);
});

export const getCity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.params;
  let city;

  if (id) {
    city = findByProperty(citiesData, 'id', Number(id));
  } else if (name) {
    city = findByProperty(citiesData, 'name', name);
  }

  if (!city) {
    return next(new AppError('City not found', 404));
  }
  res.status(200).json(city);
});

export const getProvinceByCity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.params;
  let city;

  if (id) {
    city = findByProperty(citiesData, 'id', Number(id));
  } else if (name) {
    city = findByProperty(citiesData, 'name', name);
  }

  if (!city) {
    return next(new AppError('City not found', 404));
  }

  const cityProvinceId = city?.province_id;
  const province = findByProperty(provinceData, 'id', Number(cityProvinceId));

  if (!province) {
    return next(new AppError('Province not found for this city', 404));
  }
  res.status(200).json(province);
});
