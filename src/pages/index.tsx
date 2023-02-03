import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isError, setIsError] = useState(false);
  const toast = useToast()
  const usernameRef: any = useRef("");
  const passwordRef: any = useRef("");

  const validateForm = () => {
    if (usernameRef.current.value === '' || passwordRef.current.value === '') {
      toast({
        isClosable: true,
        title: 'Failed to sign in',
        position: "top-right",
        status: "error",
      })
      setIsError(true);
      return false
    } else {
      setIsError(false);
      return true
    }
  }

  const registerUser = async () => {

    const data = await fetch('/api/user/register', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "Darwis",
        password: "123",
        email: "darwis@darwis.com"
      })
    });
    const rawOutput = await data.json();
    console.log(rawOutput);
  }

  return (
    <>
      <main className={styles.main}>
        <Flex
          width={"50vh"}
          height={"70vh"}
          bg={"gray.700"}
          borderRadius={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"2xl"}
          border={"0.5px solid gray"}
          flexDir={"column"}
          p={"3rem"}
        >
          <FormControl
            display={"flex"}
            flexDir={"column"}
            pt={"2rem"}
            height={"100%"}
            w={"100%"}
            isInvalid={isError}
          >
            <FormLabel>Email</FormLabel>
            <Input type={"email"} ref={usernameRef}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  if (validateForm()) registerUser()
                }
              }}
            />
            <FormLabel mt={"5"}>Password</FormLabel>
            <Input type={"password"} ref={passwordRef}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  if (validateForm()) registerUser()
                }
              }}
            />
            <Input
              mt={"3rem"}
              type={"submit"}
              variant={"filled"}
              value={"Login"}
              onClick={(e) => {
                e.preventDefault()
                if (validateForm()) registerUser()
              }}
            />
            {isError && (
              <FormErrorMessage>Please check the form.</FormErrorMessage>
            )}
          </FormControl>
        </Flex>
      </main>
    </>
  )
}
