import { Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import { useEffect } from "react";

export default function Home() {

  const { colorMode } = useColorMode();

  useEffect(() => {
    document.title = "Home | JWT Demo"
    let flag = false
    setInterval(()=>{
      if( !flag ){
        document.title = "Home | JWT Demo"
        flag = !flag
      }else{
        document.title = "Sign up!"
        flag = !flag
      }
    }, 3000)
  }, [])
  

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
          w={"45%"}
          p={"5rem"}
          flexDir={"column"}
          position={'absolute'}
          zIndex={99999}
        >
          <Flex
            flexDir={"column"}
            width={"100%"}
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
              <Text fontWeight={"black"} fontSize={"lg"}>Please go to the routes and start demoing away!</Text>
              <Flex
                width={"80%"}
                flexDir={"column"}
                gap={6}
                borderRadius={"15px"}
                border={"1px solid gray"}
                justifyContent={"space-around"}
                alignItems={"center"}
                pt={"1rem"}
                pb={"1rem"}
              >
                <Heading size={"md"} mt={"10px"}>First you have to login!</Heading>
                <Button
                  size={"md"}
                  borderRadius={"5px"}
                  textAlign={"center"}
                  onClick={() => {
                    window.location.href = '/user/signup'
                  }}
                >
                  Sign Up | {`<App>/user/signup`}
                </Button>
                <Button
                  size={"md"}
                  borderRadius={"5px"}
                  textAlign={"center"}
                  onClick={() => {
                    window.location.href = '/user/login'
                  }}
                >
                  Login | {`<App>/user/login`}
                </Button>
              </Flex>
              <Flex
                width={"80%"}
                flexDir={"column"}
                gap={6}
                borderRadius={"15px"}
                border={"1px solid gray"}
                justifyContent={"center"}
                alignItems={"center"}
                wordBreak={"break-all"}
                pt={"1rem"}
                pb={"1rem"}
              >
                <Heading size={"md"} mt={"10px"}>Unless you want to try breaching out!</Heading>
                <Button
                  size={"md"}
                  borderRadius={"5px"}
                  textAlign={"center"}
                  overflowWrap={"break-word"}
                  onClick={() => {
                    window.location.href = '/user/usersonly'
                  }}
                >
                  Users Only Section | {`<App>/user/usersonly`}
                </Button>
              </Flex>
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </>
  )
}