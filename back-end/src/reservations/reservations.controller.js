const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res){
  const data = await reservationService.list(req.query.date)
  res.json({data})
}

async function create(req, res) {
  let reservation = req.body.data;
  reservation = { ...reservation};
  const data = await reservationService.create(reservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
};
