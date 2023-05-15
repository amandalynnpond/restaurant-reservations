//Front-End Tables Error Catch

function TableErrors(table){
    const tableName = table.table_name
    const capacity = table.capacity
    const errors = []

    //Checks if table name is less than two characters
    if (tableName.length < 2){
        errors.push("Table name must be at least two characters long.")
    }

    //Checks if capacity is at least one
    if (capacity < 1){
        errors.push("Capacity must be at least one.")
    }

    return errors
}

export default TableErrors