const knex = require("../db/connection")

function read(reservation_id){
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first()
}

async function list(date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNot({ status: "finished"})
      .orderBy("reservation_time");
  }

  function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

  function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

  async function updateStatus(reservation_id, status) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: status }, "*")
        .then((result) => result[0]);
}

async function update(reservation_id, reservation){
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(reservation, "*")
    .then((result) => result[0])
}

  module.exports = {
    read,
    list,
    create,
    search,
    updateStatus,
    update
  }