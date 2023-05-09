import React from "react";
import ReservationCard from "./ReservationCard"

function ReservationList({reservations}){

    let reservationList = reservations.map((reservation) => <ReservationCard key={reservation.reservation_id} reservation={reservation} />)

    if (reservations.length === 0){
        reservationList = <div className="text-center">There are currently no reservations for today.</div>
    }

    return (
        <div className="mb-4">
            <h3 className="text-center">Reservations</h3>
            {reservationList}
        </div>
    )
}

export default ReservationList