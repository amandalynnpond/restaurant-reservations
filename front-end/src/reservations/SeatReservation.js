import moment from "moment";
import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router";
import { listTables, readReservation, seatTable } from "../utils/api";

function SeatReservation(){

    const [reservation, setReservation] = useState([])
    const [tables, setTables] = useState([])
    const [tableId, setTableId] = useState('')
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

    const handleChange = (event) => {
        setTableId(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        try {
            await seatTable(tableId, reservation.reservation_id, abortController.signal)
            history.push(`/dashboard`)
        } catch (err) {
            setError([err.message])
        }
        return () => abortController.abort
    }

    return (
        <article>
            <h4>Seat {reservation.first_name} {reservation.last_name}'s Reservation for {moment(reservation.reservation_date).format('dddd, MMMM Do YYYY')}</h4>
            <div>Please select table:</div>
            <form onSubmit={handleSubmit}>
                <select
                    className="form-control"
                    id="table_id"
                    value={tableId}
                    required={true}
                    onChange={handleChange}
                    >
                        <option>Select Table</option>
                        {tables.map((table)=> (
                            <option key={table.table_id} value={table.table_id}>
                                {table.table_name} - {table.capacity}
                            </option> 
                        ))}
                </select>
                <button type="submit" className="btn btn-info">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
            </form>
        </article>
    )
}

export default SeatReservation