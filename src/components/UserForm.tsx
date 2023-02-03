import { color, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useColorMode, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useRef, useState } from "react";

type UserFormProps = {
    isError: boolean,
    usernameRef: React.RefObject<HTMLInputElement>,
    passwordRef: React.RefObject<HTMLInputElement>,
    validateForm: Function,
    registerUser: Function,
    UserFormErrorMessage: string
}

export default function UserForm({
    isError,
    usernameRef,
    passwordRef,
    validateForm,
    registerUser,
    UserFormErrorMessage
}: UserFormProps) {

    const { colorMode } = useColorMode();
    const router = useRouter()
    const { view } = router.query;

    return (
        <>
            <Heading size={"xl"} color={"white"}>
                { view === 'signup' ? 'Sign Up' : 'Login' }
            </Heading>
            <FormControl
                id={"UserForm"}
                display={"flex"}
                flexDir={"column"}
                pt={"2rem"}
                height={"100%"}
                w={"100%"}
                isInvalid={isError}
                color={"gray.400"}
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
                <Flex
                    gap={5}
                    justifyContent={"center"}
                >
                    <Input
                        w={"50%"}
                        mt={"3rem"}
                        type={"submit"}
                        bg={view === 'signup' ? "green.500" : "blue.500"}
                        variant={"filled"}
                        value={view === 'signup' ? "Create" : "Login"}
                        cursor={"pointer"}
                        color={"white"}
                        onClick={(e) => {
                            e.preventDefault()
                            if (validateForm()) registerUser()
                        }}
                    />
                    <Input
                        w={"50%"}
                        mt={"3rem"}
                        type={"submit"}
                        bg={"gray.700"}
                        variant={"outline"}
                        value={"Cancel"}
                        cursor={"pointer"}
                        color={"white"}
                        onClick={()=>{
                            router.push({
                                pathname: '/'
                            })
                        }}
                    >
                    </Input>
                </Flex>
                {isError && (
                    <FormErrorMessage>{UserFormErrorMessage ? UserFormErrorMessage : 'Please check the form'}</FormErrorMessage>
                )}
            </FormControl>
        </>
    )
}