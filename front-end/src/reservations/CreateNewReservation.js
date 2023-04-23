import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationErrors from "./ReservationErrors";
import ReservationForm from "./ReservationForm";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function CreateNewReservation(){

  const history = useHistory()
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  }

  const [formData, setFormData] = useState({...initialFormState})
  const [error, setError] = useState(null)

  const handleChange = ({target}) => {
    const value = target.value
    setFormData({
      ...formData,
      [target.name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const reservationErrors = ReservationErrors(formData)
    console.log(formData.reservation_date)
    if (reservationErrors.length){
      setError(reservationErrors)
    } else {
      try {
        await createReservation(formData, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (err) {
        setError([err.message]);
      }
      return () => abortController.abort();
    }
  }
  
    return (
      <main>
          <h4 className="mb-0">Create New Reservation</h4>
            <ReservationForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
            <ErrorAlert error={error} />
      </main>
    );
  }

export default CreateNewReservation;