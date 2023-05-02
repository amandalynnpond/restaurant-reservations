import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ReservationErrors from "./ReservationErrors";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useParams } from "react-router";
import { readReservation, update } from "../utils/api";
import { formatAsTime } from "../utils/date-time";

function EditReservation(){

  const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

    const [reservation, setReservation] = useState({
      ...initialReservationState
    })
    const [error, setError] = useState(null)
    const {reservationId} = useParams()
    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController()
        readReservation(reservationId, abortController.signal)
        .then((data) => setReservation({...data, "reservation_date": data.reservation_date.split("T")[0], "reservation_time": formatAsTime(data.reservation_time)}))
        .catch(setError)
        return () => abortController.abort
    }, [reservationId])
    
    const handleChange = (event) => {
      if (event.target.name === "people") {
        setReservation({
          ...reservation,
          [event.target.name]: Number(event.target.value),
        });
      } else {
        setReservation({
          ...reservation,
          [event.target.name]: event.target.value,
        });
      }
    };
      const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const reservationErrors = ReservationErrors(reservation)
        if (reservationErrors.length){
          setError(reservationErrors)
        } else {
          try {
            await update(reservation, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`)
          } catch (err) {
            setError([err.message]);
          }
          return () => abortController.abort();
        }
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