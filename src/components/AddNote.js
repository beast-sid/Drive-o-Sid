import React, { useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added successfully","success")
    }
    const onChange=(e)=>{
        
         setNote({...note,[e.target.name]:e.target.value})//in this we are setting notes with earlier values + the values we are entering in description box in frontend
    }
    return (
        <div className="container my-3">
            <h1>Add Your Notes</h1>
            <form>
                <div className="my-3">
                    <label  className="form-label">Title</label>
                    <input value={note.title} type="text" placeholder="Enter a title of min. length 5" className="form-control" id="title" name="title"  onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label  className="form-label" >Description</label>
                    <input type="text" value={note.description} placeholder="Enter a description of min. length 5" className="form-control" id="description" name="description" onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>

                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Your Note</button>
            </form>
        </div>
    );
}
export default AddNote;