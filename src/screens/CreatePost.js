import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/CreatePost.css'


const CreatePost = (props) => {
    const [inputTitle, setInputTitle] = useState('')
    const [inputDesc, setInputDesc] = useState('')
    const [inputStatus, setInputStatus] = useState('')
    const [formData, setfromData] = useState({})

    const FormSubmit = (e) =>{
        e.preventDefault()        
        props.createFunc(formData)
    }
    useEffect(() => {
        setfromData({
            title: inputTitle,
            description: inputDesc,
            status: inputStatus
        })
    }, [inputTitle, inputDesc, inputStatus])
    return(
        <>
        <form onSubmit={(e)=>FormSubmit(e)}>
        <div className="containFOrm">
        <div className="headerText">Add TODOS</div>
        <h4>Title</h4>
       <div className="searchBoxPost"><input required placeholder="Title" onChange={(e)=>setInputTitle(e.target.value)} /></div>
       <h4>Description</h4>
       <div className="searchBoxPost"><input required type="text" placeholder="Description" onChange={(e)=>setInputDesc(e.target.value)} /></div>
       <h4>Status</h4>
       <div className="searchBoxPost">
           <select required  onChange={(e)=>setInputStatus(e.target.value)} >
             <option value="0">Status:</option>
             <option value="IN_PROGRESS">IN_PROGRESS</option>
             <option value="IN_COMPLETE">IN_COMPLETE</option>
             <option value="COMPLETE">COMPLETE</option> 
           </select>
        </div>
                <div className="FormBtn">
                <Link to="/"><button type="button" className="Cancel">Cancel</button></Link>
                <button type="submit" className="Create">Create</button>
                </div>
    </div>
    </form>
        </>
    )
}
export default CreatePost