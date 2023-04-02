import React from "react";
import { useHistory } from "react-router";
import { clearTable } from "../utils/api";

function TableCard({table}){

    let status = "Free"
    let button = <div></div>
    const history = useHistory()

    const handleDelete = () => {
        const result = window.confirm(`Is this table ready to seat new guests? This cannot be undone.`)
        if (result) {
            clearTable(table.table_id)
            .then(history.go(0))
        }
    }

    if (table.reservation_id != null){
        status = "Occupied"
        button = <button className="btn btn-info" data-table-id-finish={table.table_id} onClick={handleDelete}>Finish</button>
    }

    return(
        <article>
            <h4>{table.table_name}</h4>
            Capacity: {table.capacity}
            <div data-table-id-status={table.table_id}>
            Status: {status}
            {button}
            </div>
        </article>
    )
}

export default TableCard