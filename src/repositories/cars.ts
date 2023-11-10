import { raw } from "objection";
import { Car, CarEntity } from "../models/entity/car";
import { CarRequest } from "../models/dto/car";

class CarsRepository {
    static async createCar(car: Car): Promise<Car> {
        const createdCar = await CarEntity.query().insert({
            name: car.name,
            type: car.type,
            price: car.price,
            profile_picture_url: car.profile_picture_url,
        });
    
        return createdCar;
      }

      static async getCars(): Promise<Car[]> {
        const listCar = await CarEntity.query();
        return listCar;
      }
    
      static async getCarsById(queryId: number): Promise<Car[]> {
        const listCarById = await CarEntity.query().where("id", queryId);
        return listCarById;
      }

      static async updateCarById(
        queryId: number,
        car: CarRequest
      ): Promise<Car | null> {
        const updateCar = await CarEntity.query().findById(queryId);
    
        if (updateCar) {
          await CarEntity.query().findById(queryId).patch({
            name: car.name,
            type: car.type,
            price: car.price,
            profile_picture_url: car.profile_picture_url,
          });
          return updateCar;
        } else {
          return null;
        }
      }

      static async deleteCarById(queryId: number): Promise<Car | null> {
        const deletedCar = await CarEntity.query().findById(queryId);
    
        if (deletedCar) {
          await CarEntity.query().findById(queryId).delete();
          return deletedCar;
        } else {
          return null;
        }
      }
}

export default CarsRepository;