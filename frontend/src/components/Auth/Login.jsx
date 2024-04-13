import axios from 'axios'
import React from 'react'

const sendData=async()=>{
  const respon=await axios.get("http://localhost:8080/api/v1/test").then(()=>{
    console.log("good");
  }).catch((e)=>{
    console.error("error------"+e);
  });
}
const Login = () => {
  return (
  <>
  <button onClick={sendData}>Click</button>
    <div>Login</div>
  </>
  )
}

export default Login