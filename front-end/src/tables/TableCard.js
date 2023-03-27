import React from "react";

function TableCard({table}){

    let status = "Free"

    if (table.reservation_id != null){
        status = "Occupied"
    }

    return(
        <article>
            <h4>{table.table_name}</h4>
            Capacity: {table.capacity}
            <div data-table-id-status={table.table_id}>
            Status: {status}
            </div>
        </article>
    )
}

export default TableCard