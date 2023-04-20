import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useParams } from "react-router";
import { readReservation } from "../utils/api";

function EditReservation(){

    const [reservation, setReservation] = useState([])
    const [error, setError] = useState(null)
    const {reservationId} = useParams()
    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController()
        readReservation(reservationId, abortController.signal)
        .then(setReservation)
        .catch(setError)
        return () => abortController.abort
    }, [reservationId])
    
      const handleChange = ({target}) => {
        const value = target.value
        setReservation({
          ...reservation,
          [target.name]: value
        })
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(reservation, "submitted!")
      }

    return(
        <main>
            <h4 className="mb-0">Edit {reservation.first_name} {reservation.last_name}'s Reservation</h4>
            <ReservationForm handleChange={handleChange} handleSubmit={handleSubmit} formData={reservation} />
            <ErrorAlert error={error} />
        </main>
    )
}

export default EditReservation