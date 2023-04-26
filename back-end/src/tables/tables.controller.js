const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reservationService = require("../reservations/reservations.service")

//MIDDLEWARE
async function tableExists(req, res, next){
    const table = await tablesService.read(req.params.table_id)
    if (table){
        res.locals.table = table
        return next()
    }
    return next({
        status: 404,
        message: `Table does not exist.`
    })
  }

  function bodyDataHas(propertyName){
    return function(req, res, next){
      const { data = {} } = req.body
      if(!data[propertyName]){
        next({
          status: 400,
          message: `Must include ${propertyName}`
        })
      }
      return next()
    }
  }

  function tableHasValidProperties(req, res, next){
    const { data = {} } = req.body
    const tableName = data.table_name
    const tableCapacity = data.capacity
    if (tableName.length < 2){
      next({
        status: 400,
        message: `table_name must be at least two characters long.`
      })
    } else if (tableCapacity < 1 || isNaN(tableCapacity)){
      next({
        status: 400,
        message: `Table capacity must be a number and at least one.`
      })
    }
    return next()
  }

  async function seatingReservationValidation(req, res, next){
    const { reservation_id } = req.body.data
    const table = res.locals.table
    const reservation = await reservationService.read(reservation_id)
    if (reservation.people > table.capacity){
      next({
        status: 400,
        message: `Please choose a table that can handle party size.`
      })
    } else if (table.reservation_id != null){
      next({
        status: 400,
        message: `Table is already occupied.`
      })
    }
    return next()
  }

  function clearTableValidation(req, res, next){
    const table = res.locals.table
    if (table.reservation_id === null){
      next({
        status: 400,
        message: `Table does not have a reservation seated at it.`
      })
    }
    return next()
  }

  async function read(req, res, next){
    res.json({ data: res.locals.table })
  }

  async function list(req, res){
    const data = await tablesService.list()
    res.json({data})
  }

  async function create(req, res) {
    let table = req.body.data;
    table = { ...table};
    const data = await tablesService.create(table);
    res.status(201).json({ data });
  }

  async function update(req, res) {
    const { reservation_id } = req.body.data;
    const data = await tablesService.update(
      reservation_id,
      res.locals.table.table_id
    );
    res.status(200).json({ data });
  }

  async function clear(req, res){
    const { table_id } = res.locals.table
    const { reservation_id } = res.locals.table
    const data = await tablesService.clear(table_id, reservation_id)
    res.status(200).json({ data }) 
  }

  module.exports = {
    read: [
        tableExists,
        read
    ],
    list: [asyncErrorBoundary(list)],
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        tableHasValidProperties,
        asyncErrorBoundary(create)
    ],
    update: [
      tableExists,
      asyncErrorBoundary(seatingReservationValidation),
      update,
    ],
    clear: [
      tableExists,
      clearTableValidation,
      asyncErrorBoundary(clear)
    ]
  }