import { Button, Flex, Heading, Text, theme, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import { useEffect, useState } from "react";
import Theme from "@/util/Theme";

export default function Home() {

  const { colorMode } = useColorMode();

  const [ indexButtons, setIndexButtons ] = useState([
    { id: 0, name: 'Sign Up', link: '/user/signup'  },
    { id: 1, name: 'Login', link: '/user/login'  },
    { id: 2, name: 'Users Only', link: '/user/usersonly'  },
  ]);

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
          id="mainContainer"
          height={"100%"}
          textAlign={Theme.mainContainer.textAlign}
          p={Theme.mainContainer.padding}
          w={Theme.mainContainer.dimentions}
          flexDir={"column"}
          position={'absolute'}
          zIndex={99999}
        >
          <Flex
            flexDir={"column"}
            width={"100%"}
            id={"appheaderContainer"}
          >
            <Heading size={Theme.appHeaderContainer.mainHeading}>Welcome to JWT Demo</Heading>
            <Heading
              color={"gray.300"}
              size={Theme.appHeaderContainer.secondaryHeading}
            > with Next.js</Heading>
            <Flex
              mt={"2rem"}
              gap={10}
              flexDir={"column"}
              height={"80%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Flex
                width={"80%"}
              >
              <Text 
                fontWeight={Theme.appHeaderContainer.fontWeight}
                fontSize={Theme.appHeaderContainer.secondaryText}
                >Please go to the routes and start demoing away!</Text>
              </Flex>
              <Flex
                width={Theme.buttonContainer.dimentions}
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
                <Flex
                  id="SignUpButton"
                  width={Theme.buttonContainer.buttons.width}
                  borderRadius={Theme.buttonContainer.buttons.borderRadius}
                  textAlign={"center"}
                  bg={"gray.200"}
                  p={Theme.buttonContainer.buttons.padding}
                  fontWeight={Theme.buttonContainer.buttons.fontWeight}
                  onClick={()=>{
                    window.location.href = '/user/signup'
                  }}
                >
                  Sign Up | {`<App>/user/signup`}
                </Flex>
                <Flex
                  id="loginButton"
                  width={Theme.buttonContainer.buttons.width}
                  borderRadius={Theme.buttonContainer.buttons.borderRadius}
                  textAlign={"center"}
                  bg={"gray.200"}
                  p={Theme.buttonContainer.buttons.padding}
                  fontWeight={Theme.buttonContainer.buttons.fontWeight}
                  onClick={()=>{
                    window.location.href = '/user/login'
                  }}
                >
                  Login | {`<App>/user/login`}
                </Flex>
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
                <Flex
                  width={"80%"}
                >
                  <Heading size={"md"} mt={"10px"}>Unless you want to try breaching out!</Heading>
                </Flex>
                <Flex
                  id="usersOnlyButton"
                  width={Theme.buttonContainer.buttons.width}
                  borderRadius={Theme.buttonContainer.buttons.borderRadius}
                  textAlign={"center"}
                  bg={"gray.200"}
                  p={Theme.buttonContainer.buttons.padding}
                  fontWeight={Theme.buttonContainer.buttons.fontWeight}
                  onClick={()=>{
                    window.location.href = '/user/usersonly'
                  }}
                >
                  Users Only | {`<App>/user/usersonly`}
                </Flex>
              </Flex>
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </>
  )
}