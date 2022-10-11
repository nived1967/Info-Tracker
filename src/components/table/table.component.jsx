import { Fragment } from "react";
import { EditableRow } from "../editable-row.component";
import { useState } from "react";


// const sgMail=require('@sendgrid/mail');
// sgMail.setApiKey('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');



// const onComplete = (fields) => {
//   const message = {
//     to: 'tve20cs085@cet.ac.in',
//     from: 'nivednarayanan7@gmail.com',
//     subject: fields.hobbies,
//     html: `
//     <p><strong>Name:</strong> ${fields.name}</p>
//     <p>${fields.hobbies}</p>`,
//   };

//   sgMail
//     .send(message)
//     .then(() => {
//       console.log('Email Sent!');
//       alert({
//         message: 'Message successfu!',
//         description: 'We have successfully received your email.',
//       });
//     })
//     .catch((error) => {
//       console.error('Error: ', error);
//     });
// };

const Table = ({ data,handleDelete }) => {
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    pno: "",
    email: "",
    hobbies: ""
  });
  const [checkData,setCheckData]=useState({
    _id:null,
    name:"",
    pno:"",
    email:"",
    hobbies:"",
    check:false
});

const handleCheck=(datas)=>
  {
        setCheckData({
          ...checkData,check:!(checkData.check),_id:(datas._id)
        })
        console.log(checkData);
  }

  const [submitMail,setSubmitMail]=useState([]);

  const handleCheckSubmit=(event)=>
  {
    event.preventDefault();
    console.log("Hello");
    const editedCheck = {
      _id:checkData._id,
      name: checkData.name,
      pno: checkData.pno,
      email: checkData.email,
      hobbies: checkData.hobbies,
      check:checkData.check
    };

    console.log(checkData.check);
    if(checkData.check===true)
    {
      console.log(data);
      data.map((datas)=>{
        if(datas._id===checkData._id)
        {
          // onComplete(datas);
        }
      })
    }

   
    
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      name: editFormData.name,
      pno: editFormData.pno,
      email: editFormData.email,
      hobbies: editFormData.hobbies
    };

    console.log(editedContact);
    const newData = [...data];

    const index = data.findIndex((datas) => datas._id === editContactId);

    newData[index] = editedContact;
    fetch(
      `https://internship-backend-main.herokuapp.com/scoreboard/${editContactId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: editedContact.name,
          pno: editedContact.pno,
          email: editedContact.email,
          hobbies: editedContact.hobbies
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    )
      .then((response) => response.json())
      .then((user) => console.log(user));

    setEditContactId(null);
  };

  const handleEditClick = (event, datas) => {
    event.preventDefault();
    setEditContactId(datas._id);

    const formValues = {
      name: datas.fullname,
      pno: datas.pno,
      email: datas.email,
      hobbies: datas.hobbies
    };
    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleCancel = () => {
    setEditContactId(null);
  };

  return (
    <div>
    <button type="button" onClick={handleCheckSubmit}>Send Email</button>
    <h1>Please refresh after editing a row,also select only one row for sending mail</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => (
              <Fragment>
                {editContactId === datas._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                    handleCancel={handleCancel}
                  />
                ) : (
                  <tr key={datas._id}>
                  <td>
                  <input type="checkbox" name="check" value="check" onClick={()=>handleCheck(datas)}/>
                  </td>
                  <td>{datas._id}</td>
                    <td>{datas.name}</td>
                    <td>{datas.pno}</td>
                    <td>{datas.email}</td>
                    <td>{datas.hobbies}</td>
                    <td>
                      <button
                        type="button"
                        onClick={(event) => handleEditClick(event, datas)}
                      >
                        Update
                      </button>
                      <button type="button" onClick={()=>handleDelete(datas._id)}>Delete</button>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export { Table };
