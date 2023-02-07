import { BreadcrumbSeparator, Button, Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import NextLink from 'next/link'
import Router from "next/router";

export default function Home() {

  const { colorMode } = useColorMode();
  
  async function userCustoms(){
    // Get valid app tokens from cookie service
    
    // Get authorization for user
    const data = await fetch('/api/user/checkauth', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const json = await data.json();
    
    
  }

  return (
    <>
      <Flex
        as={"main"}
        id={"Greeter"}
        w={"100%"}
        h={"100vh"}
        position={"relative"}
      >
        <Flex
          width={"100%"}
          height={"100%"}
          position={"absolute"}
          justifyContent={"flex-end"}
          zIndex={99}
        >
          <Image height={600} alt="greeter" src={colorMode === 'dark' ? darkSvg : brightSvg} />
        </Flex>
        <Flex
          height={"100%"}
          w={"40%"}
          p={"5rem"}
          flexDir={"column"}
          position={'absolute'}
          zIndex={99999}
        >
          <Heading>Welcome to JWT Demo</Heading>
          <Heading
            color={"gray.300"}
            size={"2xl"}
          > with Next.js</Heading>
          <Flex
            mt={"2rem"}
            gap={10}
            flexDir={"column"}
            height={"80%"}
          >
            <Text fontWeight={"black"}>Please go to the routes and start demoing away!</Text>
            <Flex
              width={"100%"}
              height={"40%"}
              flexDir={"column"}
              pl={"1rem"}
              gap={8}
              borderRadius={"15px"}
              border={"1px solid gray"}
            >
              <Heading size={"sm"} mt={"10px"}>First you have to login!</Heading>
              <Button
                width={"95%"}
                borderRadius={"5px"}
                textAlign={"center"}
                onClick={()=>{
                  window.location.href = '/user/signup'
                }}
              >
                Sign Up | {`<App>/user/signup`}
              </Button>
              <Button
                width={"95%"}
                borderRadius={"5px"}
                textAlign={"center"}
                onClick={()=>{
                  window.location.href = '/user/login'
                }}
              >
                Login | {`<App>/user/login`}
              </Button>
            </Flex>
            <Flex
              width={"100%"}
              height={"25%"}
              flexDir={"column"}
              pl={"1rem"}
              gap={8}
              borderRadius={"15px"}
              border={"1px solid gray"}
            >
              <Heading size={"sm"} mt={"10px"}>Unless you want to try breaching out!</Heading>
              <Button
                width={"95%"}
                borderRadius={"5px"}
                textAlign={"center"}
                onClick={()=>{
                  userCustoms()
                  window.location.href = '/user/usersonly'
                }}
              >
                Users Only Section | {`<App>/user/usersonly`}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}