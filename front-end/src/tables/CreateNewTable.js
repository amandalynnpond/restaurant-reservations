import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableErrors from "./TableErrors";

function CreateNewTable(){

  const history = useHistory()
  const initialFormState = {
    table_name: "",
    capacity: 0,
  }

  const [formData, setFormData] = useState({...initialFormState})
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    if (event.target.name === "capacity") {
      setFormData({
        ...formData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const tableErrors = TableErrors(formData)
    if (tableErrors.length){
      setError(tableErrors)
    } else {
      try {
        await createTable(formData, abortController.signal);
        history.push("/dashboard");
      } catch (err) {
        setError([err.message]);
      }
      return () => abortController.abort();
    }
  }

    return(
        <main>
          <h3 className="my-4">Create New Table</h3>
            <form name="create" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="table_name" className="mr-3">
                    Table Name
                    <input
                        id="table_name"
                        type="text"
                        name="table_name"
                        placeholder="Table Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.table_name}
                    />
                </label>
                <label htmlFor="capacity" className="mr-3">
                  Table Capacity
                  <input 
                    id="capacity"
                    type="number"
                    name="capacity"
                    placeholder="1"
                    pattern="[0-9]*"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.capacity}
                  />
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-secondary">Submit</button>
                <button type="button" className="btn btn-warning" onClick={() => history.goBack()}>Cancel</button>
              </div>
            </form>
            <ErrorAlert error={error} />
      </main>
    )
}

export default CreateNewTable