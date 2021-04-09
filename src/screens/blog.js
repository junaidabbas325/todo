import React from 'react'
import { Link } from 'react-router-dom'
import './styles/blog.css'

const Blog = (props) => {
    const task = props.Data
    
    
    return(
        <>
        <div className="contain">
            <div className="blogHeadingInner">
            <h1 style={{color: 'rgb(52, 50, 124)', textTransform: 'uppercase', fontSize: '2.5em'}}>
                {task.title}
                </h1>
                <div className="statusIcon">
                    <p>{task.status}</p>
                    <div className="circle"
                    style={
                        task.status === 'IN_COMPLETE' ?
                        {backgroundColor: 'orange'} :
                        task.status === 'COMPLETE' ?
                        {backgroundColor: 'green'} :
                        task.status === 'IN_PROGRESS' ?
                        {backgroundColor: 'red'} : null
                    }>
                        </div>
                        </div>
            <p className="descriptionData">{task.description}</p>
            </div>
            <div className="speacialBtn">
                <button className="speacialBtnEdit"><Link to={`/update/${task.id}`}>Edit</Link></button>
                <button className="speacialBtnDelete" onClick={()=>props.DeleteFunc(task.id)}>Delete</button>
            </div>
            
        </div>
        
        </>
    )
}
export default Blog