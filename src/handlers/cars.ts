import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { Car } from '../models/entity/car';
import CarsService from "../services/cars";
import { CarRequest } from '../models/dto/car';
import fs from 'fs';

class CarsHandler{
  //Create
  async createCar(req: Request, res: Response) {
    const payload: CarRequest = req.body;
    payload.profile_picture_url = (req as any)['uploaded_profile_picture_url'];

    // Payload validation
    if (!payload.name) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Name cannot be empty',
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

    const createdUser: Car = await CarsService.createCar(payload);

    const response: DefaultResponse = {
      status: 'CREATED',
      message: 'Car succesfully created',
      data: {
        added_car: createdUser,
      },
    };

    res.status(201).send(response);
  }

  //Read
  async getCars(req: Request, res: Response) {
    const carsList: Car[] = await CarsService.getCars();

    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carsList,
      },
    };

    res.status(200).send(response);
  }

  async getCarsById(req: Request, res: Response) {
    const queryId: number = parseInt(req.params.id);

    const carsList: Car[] = await CarsService.getCarsById(queryId);

    if (carsList.length === 0) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }
    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carsList,
      },
    };
    res.status(200).send(response);
  }

  //Update
  async updateCarById(req: Request, res: Response) {
    const queryId: number = parseInt(req.params.id);
    const payload: CarRequest = req.body;
    payload.profile_picture_url = (req as any)["uploaded_profile_picture_url"];
    // Payload validation
    if (
      !(
        payload.name &&
        payload.type &&
        payload.price &&
        payload.profile_picture_url
      )
    ) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "Cannot be empty",
        data: {
          updated_car: null,
        },
      };
      res.status(400).send(response);
    }
    const updatedCar: Car | null = await CarsService.updateCarById(
      queryId,
      payload
    );

    if (!updatedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "UPDATED",
      message: "Car successfully updated",
      data: {
        old_car: updatedCar,
        updated_car: payload,
      },
    };
    res.status(200).send(response);
  }

  //Delete
  async deleteCarById(req: Request, res: Response) {
    const queryId: number = parseInt(req.params.id);
    const deletedCar: Car | null = await CarsService.deleteCarById(queryId);

    if (!deletedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "DELETED",
      message: "Car successfully deleted",
      data: {
        deleted_car: deletedCar,
      },
    };

    res.status(200).send(response);
  }
}

export default CarsHandler;