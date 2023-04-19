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

  function update(reservation_id, table_id){
    return knex.transaction(async (trx) => {
      await knex("reservations")
        .where({ reservation_id })
        .update({ status: "seated" })
        .transacting(trx)
      return knex("tables")
      .select("*")
      .where({table_id})
      .update("reservation_id", reservation_id)
      .then((result) => result[0])
    })
  }

  function clear(table_id, reservation_id){
    return knex.transaction(async (trx) => {
      await knex("reservations")
        .where({ reservation_id })
        .update({ status: "finished" })
        .transacting(trx)
      return knex("tables")
      .select("*")
      .where({table_id})
      .update("reservation_id", null)
      .then((result) => result[0])
    })
  }

  module.exports = {
    read,
    list,
    create,
    update,
    clear,
  }