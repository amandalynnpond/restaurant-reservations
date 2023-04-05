import React from "react"

function ReservationCard({reservation}){

    const reservation_id = reservation.reservation_id

    return(
        <article>
            <h4>{reservation.first_name} {reservation.last_name}</h4>
            {reservation.people} guests | {reservation.reservation_time}
            <div data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</div>
            <a href={`/reservations/${reservation_id}/seat`}>
                <button type="button" className="btn btn-secondary">Seat</button>
            </a>

        </article>
    )
}

export default ReservationCard