import React from "react";
import ReservationCard from "./ReservationCard"

function ReservationList({reservations}){

    const reservationList = reservations.filter((reservation) => {
        return reservation.status !== "finished"
    }).map((reservation) => <ReservationCard key={reservation.reservation_id} reservation={reservation} />)

    return (
        <div>
            {reservationList}
        </div>
    )
}

export default ReservationList