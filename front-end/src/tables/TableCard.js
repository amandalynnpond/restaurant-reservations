import React from "react";
import { useHistory } from "react-router";
import { clearTable } from "../utils/api";

//Displays table details
function TableCard({table}){

    //Default to Free status
    let status = <span className="status-free">Free</span>
    
    //Default no button appears on free table
    let button = <div></div>
    const history = useHistory()

    const handleDelete = async () => {
        const result = window.confirm(`Is this table ready to seat new guests? This cannot be undone.`)
        if (result) {
            const abortController = new AbortController()
            await clearTable(table.table_id, abortController.signal)
            history.push(`/dashboard`)
            return () => abortController.abort
        }
    }

    //Add occupied button and finish table button if status is occupied
    if (table.reservation_id != null){
        status = <span className="status-occupied">Occupied</span>
        button = <button className="btn btn-warning" data-table-id-finish={table.table_id} onClick={handleDelete}>Finish</button>
    }

    return(
        <article className="mt-2 p-3 table">
            <h4>{table.table_name}</h4>
            Capacity: {table.capacity}
            <div data-table-id-status={table.table_id}>
            Status: {status}
            <div>{button}</div>
            </div>
        </article>
    )
}

export default TableCard