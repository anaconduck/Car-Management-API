import { CarRequest } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/cars";

class CarServices {
      //create
      static async createCar(car: CarRequest): Promise<Car> {
        const carToCreate: Car = {
          name: car.name,
          type: car.type,
          price: car.price,
          profile_picture_url: car.profile_picture_url,
        };
        const createdCar = await CarsRepository.createCar(carToCreate);
    
        return createdCar;
      }

      //read
      static async getCars(): Promise<Car[]> {
        const listCar = await CarsRepository.getCars();
    
        return listCar;
      }
      static async getCarsById(queryId: number): Promise<Car[]> {
        const listCar = await CarsRepository.getCarsById(queryId);
        return listCar;
      }

      //update
      static async updateCarById(
        queryId: number,
        car: CarRequest): Promise<Car | null> {
        const carToUpdate: Car = {
            name: car.name,
            type: car.type,
            price: car.price,
            profile_picture_url: car.profile_picture_url,
        };
        const updatedCar = await CarsRepository.updateCarById(queryId, carToUpdate);
        return updatedCar;
      }

      //delete
      static async deleteCarById(queryId: number): Promise<Car | null> {
        const deletedCar = await CarsRepository.deleteCarById(queryId);
        return deletedCar;
      }
}

export default CarServices;