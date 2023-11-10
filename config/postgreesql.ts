import knex from "knex";

const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "cars_orm",
    user: "postgres",
    password: "290900",
  },
});

export default knexInstance;