const EditableRow = ({editFormData,handleEditFormChange,handleEditFormSubmit,handleCancel}) =>
{
    return (
        
        <tr>
        <td>
        <input type="text" name="name" required placeholder="enter a name" value={editFormData.name} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type="number" name="pno" required placeholder="enter phone number" value={editFormData.pno} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type="email" name="email" required placeholder="enter email" value={editFormData.email} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type="text" name="hobbies" required placeholder="enter hobbies" value={editFormData.hobbies} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <button type="submit" onClick={handleEditFormSubmit}>Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
        </td>

        </tr>
       
    )
}

export {EditableRow}