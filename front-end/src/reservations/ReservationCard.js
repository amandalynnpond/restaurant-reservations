import React from "react"
import { updateStatus } from "../utils/api"
import { useHistory } from "react-router";

function ReservationCard({reservation}){

    const reservation_id = reservation.reservation_id
    const history = useHistory()

    async function handleCancel() {
      const abortController = new AbortController();
      const result = window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      );
      if (result) {
        await updateStatus(reservation_id, "cancelled", abortController.signal);
      history.go(0)
    }
    return () => abortController.abort();
    }

    let button = <div><a href={`/reservations/${reservation_id}/seat`}><button type="button" className="btn btn-secondary">Seat</button></a>
    <a href={`/reservations/${reservation_id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></a>
    <button type="button" className="btn btn-warning" onClick={handleCancel} data-reservation-id-cancel={reservation.reservation_id}>Cancel</button>
    </div>


    if (reservation.status !== "booked"){
        button = <div></div>
    }

    return(
        <article className="mt-2 p-3 reservation">
            <h4>{reservation.first_name} {reservation.last_name}</h4>
            {reservation.people} guests | {reservation.reservation_time}
            <div data-reservation-id-status={reservation.reservation_id} className="text-capitalize">Status: {reservation.status}</div>
            <div>
                {button}
            </div>
        </article>
    )
}

export default ReservationCard