import Router from "next/router";
import { useEffect } from "react";

export default function refresh(){
  
  const doTokenRefresh = async () =>{
    const data = await fetch('/api/user/refreshAuth');
    if( data.ok ){
        // window.location.replace("/user/usersonly")
        Router.push('/user/usersonly')
      }else{
        Router.push('/user/login?autherror=true')
        // window.location.replace('/user/login?autherror=true')
    }
  };

  useEffect(() => {
    doTokenRefresh()
  }, [])
  
    return (
    <>
    </>
  )
}