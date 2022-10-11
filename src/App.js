import './App.css';
import { Table } from './components/table/table.component';
import {useEffect,useState} from "react";
import React from "react";
import Popup from "reactjs-popup";

function App() {
  const [data, setData] = useState([]);
  

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json(); 
  }

  const [formData,setFormData]=useState({
    name:'',
    pno:'',
    email:'',
    hobbies:''
  })
    const handleChange = (event) =>
    {
        event.preventDefault();
        const fieldName=event.target.getAttribute('name');
        const fieldValue=event.target.value;

        const newFormData={...formData};
        newFormData[fieldName]=fieldValue;

        setFormData(newFormData);
        console.log(formData);
    }


    const handleSubmit =(event)=>
    {
      event.preventDefault();

      const newData={
        name:formData.name,
        email:formData.email,
        pno:formData.pno,
        hobbies:formData.hobbies
      }

    postData('https://internship-backend-main.herokuapp.com/scoreboard', newData)
    .then((data) => {
      console.log(data);
    });

    const newContacts=[...data,newData];
    setData(newContacts);
    }
  useEffect(() => {
    fetch("https://internship-backend-main.herokuapp.com/scoreboard")
      .then((response) => response.json())
      .then((users) => setData(users.score));
      setData([
        {check:false,},
        ...data
      ])
  }, []);

  
  console.log(data);
  
  const handleDelete = (contactId) =>
  {
    const newData=[...data];
    const index=data.findIndex((datas)=>datas._id === contactId);

    fetch(`https://internship-backend-main.herokuapp.com/scoreboard/${contactId}`, 
    {
  method: 'DELETE',
})
.then(res => res.json())
.then(res => console.log(res))

    newData.splice(index,1);
    setData(newData);
  }

  return (
    <div className="App">
    <Popup trigger={<button>Add Information</button>} 
    position="right center">
    <form onSubmit={handleSubmit} className="form">
    <label>
      Name:
      <input type="text" name="name" required onChange={handleChange}/>
    </label>
    <label>
      Phone No:
      <input type="number" name="pno" required onChange={handleChange}/>
    </label>
    <label>
      Email:
      <input type="email" name="email" required onChange={handleChange}/>
    </label>
    <label>
      Hobbies:
      <input type="text" name="hobbies" required onChange={handleChange}/>
    </label>
    <input type="submit" value="Save" className="save" onChange={handleChange}/>
  </form>
   </Popup>
     <Table data={data} handleDelete={handleDelete}/>
    </div>
  );  
}

export default App;
