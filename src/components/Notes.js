import React, { useContext, useEffect, useRef,useState } from "react";
import {useHistory} from 'react-router-dom'
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem.js";
const Notes = (props) => {
  const context = useContext(noteContext);
  let history=useHistory();
  const { notes, getNotes,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else
    {
       history.push("/login");
    }
    //eslint-disable-next-line
  }, []);
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const handleClick = (e) => {
    e.preventDefault();//this will prevent page from reloading
    refClose.current.click()//this will close the modal by clicking the "close" button in modal
    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Updated Successfully","success");
    
}
const onChange=(e)=>{
    
     setNote({...note,[e.target.name]:e.target.value})//in this we are setting notes with earlier values + the values we are entering in description box in frontend
}

  const ref = useRef(null); //useref heps us to give a reference to a variable
  const refClose=useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click(); //this will click the current element at which reference is there, so "Launch demo modal" button will be clicked automatically
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  };
    
  
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"  //d-none will not display the button
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    placeholder="Enter a title of min. length 5"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label  className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a description of min. length 5"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                ref={refClose} 
              >
                Close
              </button>
              <button disabled={note.etitle.length<5||note.edescription<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Your Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h1>Your Notes</h1>
        <h4 className="container mx-2">
        {notes.length===0 && "No notes to display"}
        </h4>
        {notes.map((note) => {
          return <Noteitem showAlert={props.showAlert} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};
export default Notes;
