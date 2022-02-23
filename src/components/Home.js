import React from 'react';
import Notes from './Notes.js';
const Home = (props) => {
    
    return (
        <>
            <div>
               
                <Notes showAlert={props.showAlert}/>
            </div>
        </>
    )
}
export default Home;