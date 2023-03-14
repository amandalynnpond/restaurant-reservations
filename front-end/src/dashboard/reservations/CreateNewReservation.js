import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

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
    date: "",
    time: "",
  }

  const [formData, setFormData] = useState({...initialFormState})

  const handleChange = ({target}) => {
    const value = target.value
    setFormData({
      ...formData,
      [target.name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    history.push("/dashboard")
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
                <label htmlFor="lastName">
                    Last Name
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeHolder="Last Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.last_name}
                    />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber">
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
                <label htmlFor="date">
                    Date
                    <input
                        id="date"
                        type="date"
                        name="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.date}
                    />
                </label>
                <label htmlFor="time">
                    Time 
                    <input
                        id="time"
                        type="time"
                        name="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.time}
                    />
                </label>
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-info">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
              </div>
            </form>
      </main>
    );
  }

export default CreateNewReservation;