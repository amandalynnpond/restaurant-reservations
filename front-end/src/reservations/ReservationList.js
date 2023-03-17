import React from "react";
import ReservationCard from "./ReservationCard"

function ReservationList({reservations}){

    const reservationList = reservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} />)

    return (
        <div>
            {reservationList}
        </div>
    )
}

export default ReservationList