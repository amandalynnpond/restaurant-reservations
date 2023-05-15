import React, {useState} from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../reservations/ReservationList";

//Searches reservations by mobile number
function SearchReservations(){

    const [mobile_number, setMobile_number] = useState("")
    const [reservations, setReservations] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [reservationsError, setReservationsError] = useState(null);
    let results = ""

    const handleChange = ({target}) => {
        setMobile_number(target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        setSubmitted(true)
        listReservations({ mobile_number }, abortController.signal)
            .then(setReservations)
            .catch(setReservationsError)
        return () => abortController.abort()
    }

    if (reservations.length > 0){
        results = <ReservationList reservations={reservations} />
    } else {
        results = "No reservations found"
    }



    return(
        <main>
            <h3 className="my-4">Search for a reservation:</h3>
            <form name="search" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="mobile_number">
                        Phone Number
                    </label>
                    <input
                        id="mobile_number"
                        type="text"
                        name="mobile_number"
                        placeholder="XXX-XXX-XXXX"
                        className="form-control"
                        onChange={handleChange}
                        value={mobile_number}
                        >
                    </input>
                </div>
                <button type="submit" className="btn btn-secondary">Find</button>
            </form>
            {submitted ? results : ""}
        </main>
    )
}

export default SearchReservations