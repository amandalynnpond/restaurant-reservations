const reservationService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//MIDDLEWARE
async function reservationExists(req, res, next){
  const { reservation_id } = req.params
  const reservation = await reservationService.read(reservation_id)
  if (reservation){
      res.locals.reservation = reservation
      return next()
  }
  return next({
      status: 404,
      message: `Reservation ${reservation_id} does not exist.`
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

function validateNumberOfPeople(req, res, next){
  const { people } = req.body.data;
  console.log(req.body.data)
  //const peopleNumber = Number.parseInt(people)
  if (!Number.isInteger(people) || people <= 1) {
    return next({
    status: 400,
    message: "# of people must be a whole number and >= 1",
  });
  } 
  return next()
}

function validateReservationTime(req, res, next){
  const { data = {} } = req.body
  const dateValidation = Date.parse(data.reservation_date)
  const timeValidation = data.reservation_time
  const reservationDate = new Date(data.reservation_date)
  const reservationTime = new Date(`${data.reservation_date}T${data.reservation_time}`)
  const reservationHourAndMinutes = data.reservation_time.split(":")
  const reservationHour = parseInt(reservationHourAndMinutes[0])
  const reservationMinute = parseInt(reservationHourAndMinutes[1])
  const today = new Date()
  if (isNaN(dateValidation)){
    next({
      status: 400,
      message: `Please use valid date for reservation_date.`
    })
  } else if (!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(timeValidation)){
    next({
      status: 400,
      message: `Please use valid time for reservation_time.`
    })
  } else if (reservationDate.getUTCDay() === 2){
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

function validateBookedStatus(req, res, next){
  const reservation = req.body.data
  if (reservation.status && reservation.status !== "booked"){
    next({
      status: 400,
      message: `Reservation status ${reservation.status} is invalid. Must be "booked" for new reservations.`
    })
  }
  return next()
}

//this doesn't work - console.log during reservationExists with nothing shown
function validateStatus(req, res, next){
  const reservation = res.locals.reservation
  if (reservation.status == "finished"){
    next({
      status:400,
      message: `Reservation cannot be updated if it is already finished.`
    })
  }
  return next()
}

async function read(req, res, next){
  res.json({ data: res.locals.reservation })
}

async function list(req, res){
  const { date } = req.query
  const { mobile_number } = req.query
  if (date){
    const data = await reservationService.list(date)
    res.json({ data })
  } else if (mobile_number){
    const data = await reservationService.search(mobile_number)
    res.json({ data })
  }
}

async function create(req, res) {
  let reservation = req.body.data;
  reservation = { ...reservation };
  const data = await reservationService.create(reservation);
  res.status(201).json({ data });
}

async function updateStatus(req, res) {
  let { status } = req.body.data
  const { reservation_id } = req.params;
  const updatedReservation = await reservationService.updateStatus(reservation_id, status);
  res.status(200).json({ data: updatedReservation });
}

async function update(req, res){
  const reservation = req.body.data
  const reservation_id = reservation.reservation_id
  const data = await reservationService.update(reservation_id, reservation)
  res.status(200).json({ data })
}

module.exports = {
  readReservation: [
    reservationExists,
    read
  ],
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validateReservationTime,
    validateNumberOfPeople,
    validateBookedStatus,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    reservationExists,
    validateStatus,
    asyncErrorBoundary(updateStatus)
  ],
  update: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validateReservationTime,
    asyncErrorBoundary(update)
  ]
};
