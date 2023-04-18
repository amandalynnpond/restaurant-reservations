import React, {useState} from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../reservations/ReservationList";

function SearchReservations(){

    const [mobile_number, setMobile_number] = useState("")
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    const handleChange = ({target}) => {
        setMobile_number(target.value)
        console.log(mobile_number)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        listReservations({ mobile_number }, abortController.signal)
            .then(setReservations)
            .catch(setReservationsError)
        return () => abortController.abort()
    }


    return(
        <main>
            <h4>Search for a reservation:</h4>
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
                <button type="submit" className="btn btn-info">Find</button>
            </form>
            <ReservationList reservations={reservations} />
        </main>
    )
}

export default SearchReservations