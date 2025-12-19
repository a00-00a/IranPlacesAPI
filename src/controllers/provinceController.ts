import { Request, Response, NextFunction } from 'express';
import { findByProperty } from '../utils/findByProperty';
import { citiesData, provinceData } from '../data/data';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getAllProvinces = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(provinceData);
});

export const getProvince = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.params;
  let province;

  if (id) {
    province = findByProperty(provinceData, 'id', Number(id));
  } else if (name) {
    province = findByProperty(provinceData, 'name', name);
  }

  if (!province) {
    return next(new AppError('Province not found', 404));
  }
  res.status(200).json(province);
});

export const getCitiesByProvince = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.params;
  let provinceId: number | undefined;

  if (id) {
    provinceId = Number(id);
  } else if (name) {
    const province = findByProperty(provinceData, 'name', name);
    if (province) {
      provinceId = province.id;
    }
  }

  if (!provinceId) {
    return next(new AppError('Province not found', 404));
  }

  const cities = citiesData.filter((item: any) => item.province_id === provinceId);

  if (cities.length === 0) {
    return next(new AppError('No cities found for this province', 404));
  }
  res.status(200).json(cities);
});
