import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateNewTable(){

  const history = useHistory()
  const initialFormState = {
    table_name: "",
    capacity: "",
  }

  const [formData, setFormData] = useState({...initialFormState})
  const [error, setError] = useState(null)

  const handleChange = ({target}) => {
    const value = target.value
    setFormData({
      ...formData,
      [target.name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
      try {
        await createTable(formData, abortController.signal);
        history.push("/dashboard");
      } catch (err) {
        setError([err.message]);
      }
      return () => abortController.abort();
  }

    return(
        <main>
        <h1>Dashboard</h1>
          <h4 className="mb-0">Create New Table</h4>
            <form name="create" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="table_name">
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
                <label htmlFor="capacity">
                  Table Capacity
                  <input 
                    id="capacity"
                    type="text"
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
                <button type="submit" className="btn btn-info">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
              </div>
            </form>
            <ErrorAlert error={error} />
      </main>
    )
}

export default CreateNewTable