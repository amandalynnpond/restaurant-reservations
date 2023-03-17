import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationErrors from "./ReservationErrors";

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
        <h1>Dashboard</h1>
          <h4 className="mb-0">Create New Reservation</h4>
            <form name="create" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">
                    First Name
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.first_name}
                    />
                </label>
                <label htmlFor="last_name">
                    Last Name
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.last_name}
                    />
                </label>
                <label htmlFor="mobile_number">
                    Phone
                    <input
                        id="mobile_number"
                        type="text"
                        name="mobile_number"
                        placeholder="XXX-XXX-XXXX"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.mobile_number}
                    />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="reservation_date">
                    Date
                    <input
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_date}
                    />
                </label>
                <label htmlFor="reservation_time">
                    Time 
                    <input
                        id="reservation_time"
                        type="time"
                        name="reservation_time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_time}
                    />
                </label>
                <label htmlFor="people">
                  Number of Guests
                  <input 
                    id="people"
                    type="text"
                    name="people"
                    placeholder="1"
                    pattern="[0-9]*"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.people}
                  />
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-info">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
              </div>
            </form>
            <ErrorAlert error={error} />
      </main>
    );
  }

export default CreateNewReservation;