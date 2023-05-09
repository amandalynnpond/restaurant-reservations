import moment from "moment";
import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router";
import { listTables, readReservation, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation(){

    const [reservation, setReservation] = useState([])
    const [tables, setTables] = useState([])
    const [tableId, setTableId] = useState("")
    const {reservationId} = useParams()
    const history = useHistory()
    const [error, setError] = useState(null)
    const SeatingErrors = []


    useEffect(() => {
        const abortController = new AbortController()
        readReservation(reservationId, abortController.signal)
        .then(setReservation)
        .catch(setError)
        listTables(abortController.signal)
        .then(result => result.filter(table => {
            return (table.reservation_id === null)
        }))
        .then(setTables)
        return () => abortController.abort
    }, [reservationId])

    const handleChange = (event) => {
        setTableId(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const selectedTable = tables.find(table => table.table_id === Number(tableId))
        if (selectedTable.capacity < reservation.people){
            SeatingErrors.push("Please choose table that can handle party size.")
            setError(SeatingErrors)
        } else {
            await seatTable(reservation.reservation_id, selectedTable.table_id)
            history.push(`/dashboard`)
            }
        }

    return (
        <article>
            <h3 className="my-4">Seat {reservation.first_name} {reservation.last_name}'s Reservation for {moment(reservation.reservation_date).format('dddd, MMMM Do YYYY')}</h3>
            <div>Please select table:</div>
            <form onSubmit={handleSubmit}>
                <select
                    className="form-control"
                    id="table_id"
                    name="table_id"
                    value={tableId}
                    required={true}
                    onChange={handleChange}
                    >
                        <option value="">- Select a Table -</option>
                        {tables.map((table)=> (
                            <option
                                key={table.table_id}
                                value={table.table_id}
                                onChange={handleChange}
                            >
                                {table.table_name} - {table.capacity}
                            </option> 
                        ))}
                </select>
                <button type="submit" className="btn btn-secondary">Submit</button>
                <button type="button" className="btn btn-warning" onClick={() => history.goBack()}>Cancel</button>
            </form>
            <ErrorAlert error={error} />
        </article>
    )
}

export default SeatReservation