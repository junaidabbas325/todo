import React, { useState } from 'react'
import Blog from './blog'

const Blogs = (props) => {
    
    const [searchInput, setSearchInput] = useState('')
    const task = props.Data
    const DeleteFunc = props.DeleteFunc
    const searchFunc = props.searchFunc
    const onSubmitEven = (e) => {
        e.preventDefault()
        searchFunc(searchInput)
        
    }
    return(
        <div   >
        <div className="headerText">Nest & React</div>
        <div className="searchBoxmain">
       <form onSubmit={(e)=>onSubmitEven(e)}><div className="searchBox"><input placeholder="Search here" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/><button>Search</button></div></form></div>
        {
            !task.length ?
            <h1 className="loading">Loading</h1> : task.map((data)=>{
                return (
                    <div >
                <Blog Data={data} DeleteFunc={DeleteFunc} />
                <div className="blogSpace"> </div>
                </div>
                )
            })
        }
        
        </div>
    )
}
export default Blogs