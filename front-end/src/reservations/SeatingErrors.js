import { useEffect, useState } from "react"
import { readTable } from "../utils/api"

function SeatingErrors(reservation, table_id){

    const [table, setTable] = useState([])
    const [error, setError] = useState(null)
    const errors = []

    useEffect(() => {
        const abortController = new AbortController()
        readTable(table_id, abortController.signal)
        .then(setTable)
        .catch(setError)
        return () => abortController.abort
    }, [table_id])
    
    if (reservation.people > table.capacity){
        errors.push("Please choose table that can handle party size.")
    }

    if (table.reservation != null){
        errors.push("Please choose an unoccupied table.")
    }
    return errors
}

export default SeatingErrors