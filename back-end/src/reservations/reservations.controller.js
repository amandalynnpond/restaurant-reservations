const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reservationExists(req, res, next){
  const { reservation_id } = req.params
  const reservation = await reservationService.read(reservation_id)
  if (reservation){
      res.locals.reservation = reservation
      console.log(reservation)
      return next()
  }
  return next({
      status: 404,
      message: `Reservation does not exist.`
  })
}

async function read(req, res, next){
  res.json({ data: res.locals.reservation })
}

async function list(req, res){
  const { date } = req.query
  const { mobile_number } = req.query
  if (date){
    const data = await reservationService.list(date)
    res.json({data})
  } else if (mobile_number){
    const data = await reservationService.search(mobile_number)
    res.json({data})
  }
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
  const reservationHourAndMinutes = data.reservation_time.split(":")
  const reservationHour = parseInt(reservationHourAndMinutes[0])
  const reservationMinute = parseInt(reservationHourAndMinutes[1])
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
  } else if (reservationHour < 10 || (reservationHour === 10 && reservationMinute < 30)){
    next({
      status: 400,
      message: `Please choose a time before 10:30AM.`
    })
  } else if (reservationHour > 21 || (reservationHour === 21 && reservationMinute > 30)){
    next({
      status: 400,
      message: `Please choose a time before 9:30PM.`
    })
  }
  return next()
}

async function create(req, res) {
  let reservation = req.body.data;
  reservation = { ...reservation};
  console.log(reservation)
  const data = await reservationService.create(reservation);
  res.status(201).json({ data });
}

async function cancelReservation(req, res) {
  const { status, reservation } = res.locals;
  const updatedReservation = {
    ...reservation,
    status,
  };
  const result = await service.cancelReservation(updatedReservation);
  const data = result[0];
  res.json({ data });
}

module.exports = {
  readReservation: [
    reservationExists,
    read
  ],
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
  cancelReservation: [
    reservationExists,
    asyncErrorBoundary(cancelReservation)
  ]
};
