const knex = require("../db/connection")

function read(tableId){
  return knex("tables")
    .select("*")
    .where({table_id: tableId })
    .first()
}

async function list() {
    return knex("tables")
      .select("*")
      .orderBy("table_name");
  }

function create(table) {
    return knex("tables")
      .insert(table)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

  function update(table_id, reservation_id){
    return knex("tables")
      .select("*")
      .where({table_id})
      .update("reservation_id", reservation_id)
      .then((result) => result[0])
  }

  module.exports = {
    read,
    list,
    create,
    update,
  }