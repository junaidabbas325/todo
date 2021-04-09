import { useState } from "react";
import Login from "./screens/Login";
import jwt_decode from 'jwt-decode'
import Home from "./screens/Home";

const App = () => {
  
  const accessToken = localStorage.getItem('accessToken')
  const accessTokencheck = !localStorage.getItem('accessToken')

  const currenttime = new Date()
  const tokenget =  () =>{
    if(!accessTokencheck === true){
      let decodedToken =  jwt_decode(accessToken, {complete: true})
       if(decodedToken.exp * 1000 < currenttime.getTime()){
         return false
       }
       else{
        return true
       }
      
    }
    
  }
  
  
  console.log(currenttime.getTime(), tokenget(), 'i am decoded')
  return (
    <div className="App">
         
         {
           console.log(accessTokencheck,  tokenget(), 'i am from coding'),
          accessTokencheck === true && tokenget() === undefined || tokenget() === false ?
        <Login /> : <Home validToken={accessToken} />}
    </div>
  );
}

export default App;
