import { BreadcrumbSeparator, Button, Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import NextLink from 'next/link'

export default function Home() {

  const { colorMode } = useColorMode();

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
            >
              <Text fontWeight={"black"}>Please go to the authentication routes to start demoing away!</Text>
              <Button
                ml={"1rem"} 
                as={NextLink}
                href='/user/signup'
                width={"60%"}
                borderRadius={"5px"}
                textAlign={"center"}
                p={"1rem"}
                >
                Sign Up | {`<App>/user/signup`}
              </Button>
              <Button
                ml={"1rem"} 
                as={NextLink}
                href='/user/login'
                width={"60%"}
                borderRadius={"5px"}
                textAlign={"center"}
                p={"1rem"}
                >
                Login | {`<App>/user/login`}
              </Button>
            </Flex>
          </Flex>
      </Flex>
    </>
  )
}