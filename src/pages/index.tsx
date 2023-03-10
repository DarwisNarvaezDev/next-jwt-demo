import { Button, Flex, Heading, IconButton, Switch, Text, theme, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import { useEffect, useState } from "react";
import Theme from "@/util/Theme";
import Router from 'next/router'
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Home() {

  const { colorMode, toggleColorMode } = useColorMode();

  const [indexButtons, setIndexButtons] = useState([
    { id: 0, name: 'Sign Up', link: '/user/signup' },
    { id: 1, name: 'Login', link: '/user/login' },
    { id: 2, name: 'Users Only', link: '/user/usersonly' },
  ]);

  useEffect(() => {
    document.title = "Home | JWT Demo"
    let flag = false
    setInterval(() => {
      if (!flag) {
        document.title = "Home | JWT Demo"
        flag = !flag
      } else {
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
          width={["100%"]}
          height={"100%"}
          visibility={Theme.imageContainer.visibility}
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
            mb={"1rem"}
            width={"100%"}
            height={"50px"}
            gap={3}
            alignItems={"center"}
          >
            <IconButton aria-label="Toggle Color Mode" icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
            ></IconButton>
          </Flex>
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
                width={Theme.appHeaderContainer.secondaryTextDimentions}
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
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                  boxShadow={"lg"}
                  width={Theme.buttonContainer.buttons.width}
                  borderRadius={Theme.buttonContainer.buttons.borderRadius}
                  textAlign={"center"}
                  justifyContent={"center"}
                  p={Theme.buttonContainer.buttons.padding}
                  cursor={Theme.buttonContainer.buttons.cursor}
                  fontWeight={Theme.buttonContainer.buttons.fontWeight}
                  onClick={() => {
                    window.location.href = '/user/signup'
                  }}
                >
                  Sign Up | {`<App>/user/signup`}
                </Flex>
                <Flex
                  id="loginButton"
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                  boxShadow={"lg"}
                  width={Theme.buttonContainer.buttons.width}
                  borderRadius={Theme.buttonContainer.buttons.borderRadius}
                  cursor={Theme.buttonContainer.buttons.cursor}
                  textAlign={"center"}
                  justifyContent={"center"}
                  p={Theme.buttonContainer.buttons.padding}
                  fontWeight={Theme.buttonContainer.buttons.fontWeight}
                  onClick={() => {
                    window.location.href = '/user/login'
                  }}
                >
                  Login | {`<App>/user/login`}
                </Flex>
              </Flex>
              <Flex
                width={Theme.buttonContainer.dimentions}
                flexDir={"column"}
                gap={6}
                borderRadius={"15px"}
                border={"1px solid gray"}
                justifyContent={"center"}
                alignItems={"center"}
                wordBreak={"break-all"}
                textAlign={"center"}
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
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                  boxShadow={"lg"}
                  justifyContent={"center"}
                  p={Theme.buttonContainer.buttons.padding}
                  fontWeight={Theme.buttonContainer.buttons.fontWeight}
                  cursor={Theme.buttonContainer.buttons.cursor}
                  onClick={() => {
                    Router.push('/user/usersonly')
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