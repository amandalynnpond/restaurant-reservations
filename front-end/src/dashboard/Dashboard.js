import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList"
import TableList from "../tables/TableList";
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
  const [tables, setTables] = useState([]);
  const history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format('dddd, MMMM Do YYYY')} </h4>
        <div className="select-days-group">
          <button type="button" className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
          <button type="button" className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${today(date)}`)}>Today</button>
          <button type="button" className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations.filter((reservation) => {return reservation.status !== "finished"})} />
      <TableList tables={tables} />
    </main>
  );
}

export default Dashboard;
