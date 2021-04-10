import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Blogs from './blogs'
import './styles/Home.css'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import Err from './Err'
import {axiosInstance} from '../API/authorizationBearer'

const Home =  (props) => {
    const validToken = props.validToken
    const username = jwt_decode(validToken, {complete: true})
    const logOut = () => {
        localStorage.setItem('accessToken', '')
        window.location = 'https://stacktodo.herokuapp.com/'
    }
    const [task, setTask] = useState([])
    const [refetch, setRefetch] = useState(false)
    const [Error, setError] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState('')
    const History = useHistory()


    

    useEffect(async ()  => {      
         const  fetchData  = await axiosInstance.get('/tasks/').then(res =>{            
            setTask(res.data)    
            return res.data        
          })
           return async () => {
           await fetchData            
        }
    }, [!task.length === 0, refetch, validToken])
    
    //delete function
    const DeleteFunc = (id) =>{                  
          axiosInstance.delete(`/tasks/${id}`)
          setRefetch(!refetch)         
    }
    
    //create function
    const CreateFunc = async (props) => {
        const data = props         
          try{
            await axiosInstance.post(`tasks/`, data).then(res=>{                
              if(res.status === 201){
                  History.push('/')
              }})
        }
          catch(error){
          }
          setRefetch(!refetch)
    }

    //Update function
    const editFunc = async (props, id) => {
        const data = props                
          await axiosInstance.patch(`tasks/${id}`, data).then(res=>{
          if(res.status === 200){
              History.push('/')
          }})
          setRefetch(!refetch)
    }

    //Search function
    const searchFunc = async (e)=>{        
         const  searchfetchData  = await axiosInstance.get(`tasks?search=${e}`).then(res =>{
            setTask(res.data)    
            return res.data        
          })
         await searchfetchData
    }
    return(
        <>
        
        <nav>
            
            <h1><Link to="/">LOGO</Link></h1>
            
            <div className="logoutBtn">
                
                <button type="button" className="createPostBtn"><Link to="/create">Create</Link></button>
                <button type="button" onClick={()=>logOut()}>
            Logout
        </button>
        </div>
        </nav>
        <h3 style={{marginLeft: '20px', marginTop: '20px'}}>Admin: {username.username}</h3>
        {
            Error === true ? <Err message={ErrorMessage}/> : null
        }
        <Switch>
            <Route exact path="/" render={(routeProps)=><Blogs Data={task} searchFunc={searchFunc} DeleteFunc={DeleteFunc} routeProps={routeProps} />} />
            <Route exact path="/create" render={(routeProps)=><CreatePost createFunc={CreateFunc} routeProps={routeProps} />} />
            <Route exact path="/update/:id" render={(routeProps)=><EditPost validToken={validToken} editFunc={editFunc} routeProps={routeProps} />} />
        </Switch>    
        
        
        </>
    )
}
export default Home