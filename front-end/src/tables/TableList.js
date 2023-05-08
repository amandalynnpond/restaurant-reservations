import React from "react";
import TableCard from "./TableCard";

function TableList({tables}){

    const tableList = tables.map((table) => <TableCard key={table.table_id} table={table} />)

    return (
        <div>
            <h3 className="text-center">Tables</h3>
            {tableList}
        </div>
    )
}

export default TableList