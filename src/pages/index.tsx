import { BreadcrumbSeparator, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import svg from 'public/cool-background.svg'
import NextLink from 'next/link'

export default function Home() {

  return (
    <>
      <Flex
        as={"main"}
        id={"Greeter"}
        w={"100%"}
        h={"100vh"}
      >
        <Flex
          width={"100%"}
          height={"100%"}
          position={"absolute"}
          justifyContent={"flex-end"}
        >
          <Image alt="greeter" src={svg} />
        </Flex>
        <Flex
            height={"100%"}
            w={"50%"}
            p={"5rem"}
            // bg={"tomato"}
            flexDir={"column"}
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
                width={"50%"}
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
                width={"50%"}
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