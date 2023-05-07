const moment = require('moment-timezone')

function ReservationErrors(reservation){
    const reservationDateAndTime = new Date(`${reservation.reservation_date}T${reservation.reservation_time}`)
    const reservationHourAndMinutes = reservation.reservation_time.split(":")
    const reservationHour = parseInt(reservationHourAndMinutes[0])
    const reservationMinute = parseInt(reservationHourAndMinutes[1])
    const now = moment()
    const errors = []

    if (reservationDateAndTime.getDay() === 2){
        
       errors.push("Restaurant is closed on Tuesdays.")
    }

    if (now > reservationDateAndTime){
        errors.push("Reservations must be set to a future time and date.")
    }

    if (reservationHour < 10 || (reservationHour === 10 && reservationMinute < 30)){
            errors.push("Please choose a time before 10:30AM.")
    }

    if (reservationHour > 21 || (reservation === 21 && reservationMinute > 30)){
        errors.push("Please choose a time before 9:30PM.")
    }

    return errors
}

export default ReservationErrors