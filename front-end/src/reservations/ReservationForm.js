import React from "react";
import { useHistory } from "react-router";

//Reservation Form for both edit and create reservation
function ReservationForm({ handleChange, handleSubmit, formData}){

    const history = useHistory()

    return (
        <form name="create" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="first_name" className="mr-3">
                    First Name
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.first_name ?? ""}
                    />
                </label>
                <label htmlFor="last_name" className="mr-3">
                    Last Name
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.last_name ?? ""}
                    />
                </label>
                <label htmlFor="mobile_number" className="mr-3">
                    Phone
                    <input
                        id="mobile_number"
                        type="tel"
                        pattern="[0-9-]*"
                        name="mobile_number"
                        placeholder="XXX-XXX-XXXX"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.mobile_number ?? ""}
                    />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="reservation_date" className="mr-3">
                    Date
                    <input
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_date ?? ""}
                    />
                </label>
                <label htmlFor="reservation_time" className="mr-3">
                    Time 
                    <input
                        id="reservation_time"
                        type="time"
                        name="reservation_time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_time ?? ""}
                    />
                </label>
                <label htmlFor="people" className="mr-3">
                  Number of Guests
                  <input 
                    id="people"
                    type="number"
                    name="people"
                    placeholder="1"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.people}
                  />
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-secondary">Submit</button>
                <button type="button" className="btn btn-warning" onClick={() => history.goBack()}>Cancel</button>
              </div>
            </form>
    )
}

export default ReservationForm