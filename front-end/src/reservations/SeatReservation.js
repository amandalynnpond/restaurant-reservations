import moment from "moment";
import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router";
import SelectTableForReservation from "../tables/SelectTableForReservation";
import { listTables, readReservation } from "../utils/api";

function SeatReservation(){

    const [reservation, setReservation] = useState([])
    const [tables, setTables] = useState([])
    const [error, setError] = useState(undefined)
    const {reservationId} = useParams()
    const history = useHistory()

    const initialFormState = {
        table: ""
      }

    useEffect(() => {
        const abortController = new AbortController()
        readReservation(reservationId, abortController.signal)
        .then(setReservation)
        .catch(setError)
        listTables(abortController.signal)
        .then(setTables)
        return () => abortController.abort
    }, [reservationId])

    return (
        <article>
            <h4>Seat {reservation.first_name} {reservation.last_name}'s Reservation for {moment(reservation.reservation_date).format('dddd, MMMM Do YYYY')}</h4>
            <div>Please select table:</div>
            <form>
                <SelectTableForReservation tables={tables} reservation={reservation} />
                <button type="submit" className="btn btn-info">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
            </form>
        </article>
    )
}

export default SeatReservation