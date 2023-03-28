const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

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

  async function read(req, res, next){
    res.json({ data: res.locals.table })
  }

  async function list(req, res){
    const data = await tablesService.list()
    res.json({data})
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

  module.exports = {
    read: [
        tableExists,
        read
    ],
    list: [asyncErrorBoundary(list)],
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        asyncErrorBoundary(create)
    ],
    update: [
      tableExists,
      update,
    ]
  }