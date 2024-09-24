import Axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [studentList, setStudentList] = useState([]); // Initialize studentList as an empty array

  
    const getStudent = () => {
      Axios.get("https://backend-pan.onrender.com/student/").then((response) => {
        setStudentList(response.data);
      });
    };

  // Empty dependency array to fetch data only once on component mount

  const addStudent = async () => {
    try {
      const response = await Axios.post('https://backend-pan.onrender.com/create/', {
        name,
        email,
      });
      // Handle success response (optional: display confirmation message)
      setStudentList([...studentList, { email, name }]);
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  const updateEmail = (id) => {
    Axios.put("https://backend-pan.onrender.com/update", { email: newEmail, id: id }).then(
      (response) => {
        setStudentList(
          studentList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  email: newEmail
                }
              : val;
          })
        );
      }
    );
  };


  const deleteStudent = (id) => {
    Axios.delete(`https://backend-pan.onrender.com/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  

  return (
    <div className="App container">
      <h1>Student info</h1>
      <div className="info">
        <form action="">
          <div className="mb-3">
            <label for="Email1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={addStudent}>
            Submit
          </button>
        </form>
        <hr />
        <div className="student">
          <button className="btn btn-success" onClick={getStudent}>
            Show Students
          </button>
          <br /><br />
          {studentList.map((val, key) => (
            <div className="student card" key={key}>
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Email: {val.email}</p>
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="text"
                    placeholder="you@gmail.com"
                    onChange={(event) => {
                      setNewEmail(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateEmail(val.id)}}>Update</button>
                  

                  <button className="btn btn-danger" onClick={() => {deleteStudent(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;