import React from "react";
import ReservationCard from "./ReservationCard"

function ReservationList({reservations}){

    const reservationList = reservations.map((reservation) => <ReservationCard key={reservation.reservation_id} reservation={reservation} />)

    return (
        <div>
            <h3 className="text-center">Reservations</h3>
            {reservationList}
        </div>
    )
}

export default ReservationList