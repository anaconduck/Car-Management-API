import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.bigIncrements("id").primary();
        table.string("name", 30).notNullable();
        table.string("type", 30).notNullable();
        table.integer("price", 30).notNullable();
        table.text("profile_picture_url");
        table.timestamp("createAt").defaultTo(knex.fn.now());
        table.timestamp("updateAt").defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

