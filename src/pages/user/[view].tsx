import darkSvg from '/public/drk-indx-bg.svg'
import brightSvg from '/public/brth-indx-bg.svg'
import UserForm from "@/components/UserForm";
import RenderProperly from "@/components/RenderProperly";
import validateMail from "@/util/validateMail";
import validatePassword from "@/util/validatePassword";
import { Box, cookieStorageManager, Flex, Heading, useColorMode, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import qs from 'querystring'
import { useRouter } from 'next/router';

export default function userView() {

    const router = useRouter();

    const { colorMode } = useColorMode();
    const [isError, setIsError] = useState(false);
    const [formErrorMessage, setformErrorMessage] = useState('');
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
                description: "An email and a password must be submitted."
            })
            setIsError(true);
            setformErrorMessage("Please check the form inputs")
            return false
        }
        if (!validateMail(email)) {
            setIsError(true);
            setformErrorMessage("Please provide a valid email")
            return false
        }
        if (!validatePassword(password)) {
            setIsError(true);
            setformErrorMessage("The password must have more than 6 characters")
            return false
        }
        setIsError(false)
        return true;
    }
    // Register form ==============
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
        const { accessToken, message } = await data.json();
        if (!accessToken) {
            toast({
                isClosable: true,
                title: 'Failed to sign up',
                position: "top-right",
                status: "error",
                description: message
            })
        } else {
            toast({
                isClosable: true,
                title: 'Sign up succeded',
                position: "top-right",
                status: "success",
            })
            // Redirect to usersonly
            window.location.replace('/user/usersonly')
        }
    }
    // Register form ==============

    // Login form ==============
    const userLogin = async () => {
        const data = await fetch('/api/user/signin', {
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
        const { accessToken, message } = await data.json();
        if (!accessToken) {
            toast({
                isClosable: true,
                title: 'Failed to sign in',
                position: "top-right",
                status: "error",
                description: message
            })
            if (message === 'Invalid password') {
                setIsError(true);
                setformErrorMessage("Invalid Password")
                passwordRef.current.value = ''
            }
        } else {
            toast({
                isClosable: true,
                title: 'Login succeded',
                position: "top-right",
                status: "success",
            })
            // Login succeds
            window.location.replace('/user/usersonly')
        }
    }
    // Login form ==============

    useEffect(() => {
        const { autherror, prevpage } = router.query;
        if (autherror) {
            toast({
                isClosable: true,
                title: 'Login succeded',
                position: "top-right",
                status: "error",
                description: `You must be signed in to gain access`
            })
        }
    }, [])


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
                            <UserForm
                                isError={isError}
                                usernameRef={usernameRef}
                                passwordRef={passwordRef}
                                validateForm={validateForm}
                                registerUser={registerUser}
                                UserFormErrorMessage={formErrorMessage}
                                userLogin={userLogin}
                            />
                        }
                    />
                </Flex>
            </Flex>
        </Box>
    )
}

export async function getServerSideProps({ req }) {

    const view = req.url.split('/')[2]
    if (view === 'login') {
        const queryString = qs.decode(req.headers?.cookie, "; ");
        const data = fetch('http://127.0.0.1:3000/api/user/checkauth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*"
            },
            body: JSON.stringify(queryString)
        })
        const status = (await data).status
        if (status === 200) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/user/usersonly`
                }
            }
        }
        else if (status === 500) {
            const error = await (await data).json()
            if (error.name === 'TokenExpiredError') {
                return {
                    redirect: {
                        permanent: false,
                        destination: `/user/refresh`
                    }
                }
            }
        }
        else if (status === 202) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/user/refresh`
                }
            }
        }

    }


    return {
        props: {}
    }
}