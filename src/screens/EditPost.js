import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../API/authorizationBearer'
import './styles/CreatePost.css'


const EditPost = (props) => {
    const [inputTitle, setInputTitle] = useState('')
    const [inputDesc, setInputDesc] = useState('')
    const [inputStatus, setInputStatus] = useState('')
    const [formData, setfromData] = useState({})
    const validToken = props.validToken
    const routeProps = props.routeProps
    const id = routeProps.match.params.id
    console.log(routeProps, 'from edi')

    useEffect(async ()  => {        
         const  fetchData  = await axiosInstance.get(`tasks/${id}`).then(res =>{
            console.log(res)
            setInputTitle(res.data.title)  
            setInputDesc(res.data.description)  
            setInputStatus(res.data.status)  
            return res.data        
          })
        return async () => {
           await fetchData            
        }
    }, [validToken])



    const FormSubmit = (e) =>{
        e.preventDefault()        
        props.editFunc(formData, id)
        
    }
    useEffect(() => {
        setfromData({
            title: inputTitle,
            description: inputDesc,
            status: inputStatus
        })
    }, [inputTitle, inputDesc, inputStatus])
    console.log(formData, 'formData')
    return(
        <>
        <form onSubmit={(e)=>FormSubmit(e)}>
        <div className="containFOrm">
        <div className="headerText">Add TODOS</div>
        <h4>Title</h4>
       <div className="searchBoxPost"><input value={inputTitle} placeholder="Title" onChange={(e)=>setInputTitle(e.target.value)} /></div>
       <h4>Description</h4>
       <div className="searchBoxPost"><input value={inputDesc} type="text" placeholder="Description" onChange={(e)=>setInputDesc(e.target.value)} /></div>
       <h4>Status</h4>
       <div className="searchBoxPost">
           <select value={inputStatus}  onChange={(e)=>setInputStatus(e.target.value)} >
             <option value="0">Status:</option>
             <option value="IN_PROGRESS">IN_PROGRESS</option>
             <option value="IN_COMPLETE">IN_COMPLETE</option>
             <option value="COMPLETE">COMPLETE</option> 
           </select>
        </div>
                <div className="FormBtn">
                <Link to="/"><button type="button" className="Cancel">Cancel</button></Link>
                <button type="submit" className="Create">Update</button>
                </div>
    </div>
    </form>
        </>
    )
}
export default EditPost