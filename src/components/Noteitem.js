import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote} = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <img
          src="https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash-can fa-xl fa-flip mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square fa-xl fa-shake mx-2"
            onClick={() => {
                updateNote(note);
                
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
