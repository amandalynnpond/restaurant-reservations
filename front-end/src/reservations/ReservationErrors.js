function ReservationErrors(reservation){
    const reservationTime = new Date(`${reservation.reservation_date}T${reservation.reservation_time}`)
    const today = new Date()
    const errors = []

    if (reservationTime.getUTCDay() === 2){
       errors.push("Restaurant is closed on Tuesdays.")
    }

    if (today > reservationTime){
        console.log(reservationTime)
        errors.push("Reservations must be set to a future time and date.")
    }
    return errors
}

export default ReservationErrors