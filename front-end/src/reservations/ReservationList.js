import React, {useEffect, useState} from "react";
import ReservationCard from "./ReservationCard"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"

function ReservationList({reservations}){

    const reservationList = reservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} />)

    return (
        <div>
            {reservationList}
        </div>
    )
}

export default ReservationList