import React from "react";
import TableCard from "./TableCard";

function TableList({tables}){

    const tableList = tables.map((table) => <TableCard key={table.id} table={table} />)

    return (
        <div>
            <h3>Tables</h3>
            {tableList}
        </div>
    )
}

export default TableList