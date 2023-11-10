import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgreesql";

export class CarEntity extends Model {
  id?: bigint;
  name!: string;
  type!: string;
  price!: number;
  profile_picture_url!: string;

  static get tableName() {
    return "cars";
  }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;