import React from "react"

function ReservationCard({reservation}){

    return(
        <article>
            <h4>{reservation.first_name} {reservation.last_name}</h4>
            {reservation.people} guests | {reservation.reservation_time}
        </article>
    )
}

export default ReservationCard