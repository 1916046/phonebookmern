import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [phonebook, setPhonebook] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/get-phone').then(res => {
      setPhonebook(res.data.data.phoneNumbers);
    });
  }, []);

  const addNewNumber = (name, phone) => {
    axios.post('http://localhost:8080/api/v1/add-phone', { name, phone }).then(() => {
      window.location.href = '/';
    });
  };

  const updateNumber = (id, name, phone) => {
    axios.put(`http://localhost:8080/api/v1/update-phone/${id}`, { name, phone }).then(() => {
      window.location.href = '/';
    });
  };

  const deleteNumber = (id) => {
    axios.delete(`http://localhost:8080/api/v1/delete-phone/${id}`).then(() => {
      window.location.href = '/';
    });
  };

  return (
    <Router>
      <div className="container">
        <h1>PhoneBook</h1>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-number">Add Number</Link>
          </li>
        </ul>

        <Routes>
  <Route path="/" element={<Phonebook phonebook={phonebook} deleteNumber={deleteNumber} />} />
  <Route path="/add-number" element={<AddNumber addNewNumber={addNewNumber} />} />
  <Route path="/update-number/:id" element={<UpdateNumber updateNumber={updateNumber} phonebook={phonebook} />} />
</Routes>

      </div>
    </Router>
  );
}

function Phonebook({ phonebook, deleteNumber }) {
  return (
    <div>
      <h2>Phonebook List</h2>
      {phonebook.map((phone, index) => (
        <div key={index}>
          <h3>{phone.name}</h3>
          <p>{phone.phone}</p>
          <button onClick={() => deleteNumber(phone._id)}>Delete</button>
          <Link to={`/update-number/${phone._id}`}>Update</Link>
        </div>
      ))}
    </div>
  );
}

function AddNumber({ addNewNumber }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addNewNumber(name, phone);
  };

  return (
    <div>
      <h2>Add Number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <button type="submit">Add Number</button>
      </form>
    </div>
  );
}

function UpdateNumber({ updateNumber, phonebook }) {
  const { id } = useParams();
  const phoneNumber = phonebook.find(phone => phone._id === id);

  const [name, setName] = useState(phoneNumber.name);
  const [phone, setPhone] = useState(phoneNumber.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNumber(id, name, phone);
  };

  return (
    <div>
      <h2>Update Number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit">Update Number</button>
      </form>
    </div>
  );
}

export default App;
