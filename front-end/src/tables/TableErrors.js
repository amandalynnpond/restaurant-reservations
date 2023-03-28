function TableErrors(table){
    const tableName = table.table_name
    const capacity = table.capacity
    const errors = []

    if (tableName.length < 2){
        errors.push("Table name must be at least two characters long.")
    }

    if (capacity < 1){
        errors.push("Capacity must be at least one.")
    }

    return errors
}

export default TableErrors