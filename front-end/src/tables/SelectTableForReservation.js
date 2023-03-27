import React from "react";

function SelectTableForReservation({tables, reservation, handleChange}){

    const availableTables = tables.map((table) => <div><input type="radio" name="reservation_id" value={reservation.reservation_id} onChange={handleChange} /> {table.table_name} - {table.capacity}</div>)

    return (
        <div>
            {availableTables}
        </div>
    )
}

export default SelectTableForReservation