const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res){
  const data = await reservationService.list(req.query.date)
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
    } else if (propertyName === "people"){
      if(data.people < 1){
        next({
          status: 400,
          message: `Number of guests must be at least one.`
        })
      }
    }
    return next()
  }
}

function validateReservationTime(req, res, next){
  const { data = {} } = req.body
  const reservationDate = new Date(data.reservation_date)
  const reservationTime = new Date(`${data.reservation_date}T${data.reservation_time}`)
  const today = new Date()
  if (reservationDate.getUTCDay() === 2){
    next({
      status: 400,
      message: `Restaurant is closed on Tuesdays.`
    })
  } else if (today > reservationTime){
    next({
      status: 400,
      message: `Reservations must be set to a future time and date.`
    })
  }
  return next()
}

async function create(req, res) {
  let reservation = req.body.data;
  reservation = { ...reservation};
  const data = await reservationService.create(reservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    validateReservationTime,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    asyncErrorBoundary(create)
  ],
};
