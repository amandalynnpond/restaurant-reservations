import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList"
import moment from "moment/moment";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const reservationDate = useQuery().get('date')
  if (reservationDate){
    date = reservationDate
  }
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>Dashboard</h1>
      <h4 className="mb-0">Reservations for {moment(date).format('dddd, MMMM Do YYYY')} </h4>
      <div className="d-md-flex mb-3">
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${today(date)}`)}>Today</button>
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList key={reservations} reservations={reservations} />
    </main>
  );
}

export default Dashboard;
