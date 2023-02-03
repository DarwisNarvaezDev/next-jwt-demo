import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import RegisterForm from "@/components/UserForm";
import RenderProperly from "@/components/RenderProperly";
import userLocationValues from "@/util/userLocationValues";
import validateMail from "@/util/validateMail";
import validatePassword from "@/util/validatePassword";
import { Box, color, Flex, Heading, useColorMode, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import Image from 'next/image';

export default function userView() {

    const { colorMode } = useColorMode();

    // Register form validation ==============
    const [isError, setIsError] = useState(false);
    const [registerFormErrorMessage, setRegisterFormErrorMessage] = useState('');
    const toast = useToast()
    const usernameRef: any = useRef("");
    const passwordRef: any = useRef("");
    const validateForm = () => {
        const email = usernameRef.current.value;
        const password = passwordRef.current.value;
        if (email === '' || password === '') {
            toast({
                isClosable: true,
                title: 'Failed to sign up',
                position: "top-right",
                status: "error",
            })
            setIsError(true);
            setRegisterFormErrorMessage("Please check the form inputs")
            return false
        }
        if (!validateMail(email)) {
            setIsError(true);
            setRegisterFormErrorMessage("Please provide a valid email")
            return false
        }
        if (!validatePassword(password)) {
            setIsError(true);
            setRegisterFormErrorMessage("The password must have more than 6 characters")
            return false
        }
        setIsError(false)
        return true;
    }
    const registerUser = async () => {
        const data = await fetch('/api/user/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: passwordRef.current.value,
                email: usernameRef.current.value
            })
        });
        const rawOutput = await data.json();
        console.log(rawOutput);
    }
    // Register form validation ==============

    return (
        <Box
            position={"relative"}
        >
            <Flex
                width={"100%"}
                height={"100vh"}
                position={"absolute"}
                justifyContent={"flex-end"}
                zIndex={0}
            >
                <Image height={600} alt="greeter" src={colorMode === 'dark' ? darkSvg : brightSvg} />
            </Flex>
            <Flex
                as={"main"}
                width={"100%"}
                height={"100vh"}
                justifyContent={"center"}
                zIndex={999999}
                position={"absolute"}
            >
                <Flex
                    width={"50vh"}
                    height={"60vh"}
                    mt={"3rem"}
                    borderRadius={"10px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    boxShadow={"2xl"}
                    border={"0.5px solid gray"}
                    flexDir={"column"}
                    bg={"rgba(45, 55, 72, 0.8)"}
                >
                    <RenderProperly
                        id={"formContentWrapper"}
                        component={
                            <RegisterForm
                                isError={isError}
                                usernameRef={usernameRef}
                                passwordRef={passwordRef}
                                validateForm={validateForm}
                                registerUser={registerUser}
                                UserFormErrorMessage={registerFormErrorMessage}
                            />
                        }
                    />
                </Flex>
            </Flex>
        </Box>
    )
}

{/* <RegisterForm
                isError={isError}
                usernameRef={usernameRef}
                passwordRef={passwordRef}
                validateForm={validateForm}
                registerUser={registerUser}
                registerFormErrorMessage={registerFormErrorMessage}
              /> */}