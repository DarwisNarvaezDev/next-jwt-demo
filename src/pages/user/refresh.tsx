import { Heading } from "@chakra-ui/react";
import Router from "next/router";
import { useEffect } from "react";

export interface RefreshProps {

}

export default function refresh({}: RefreshProps){
  
  const doTokenRefresh = async () =>{
    const data = await fetch('/api/user/refreshAuth');
    if( data.ok ){
        window.location.replace("/user/usersonly")
    }else{
        console.log("Redirect to login with message");
        
    }
  };

  useEffect(() => {
    doTokenRefresh()
  }, [])
  
  
    return (
    <>
        <Heading>This is refresh page</Heading>
    </>
  )
}