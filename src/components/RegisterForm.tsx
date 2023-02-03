import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react";

type RegisterFormProps = {
    isError: boolean,
    usernameRef: React.RefObject<HTMLInputElement>,
    passwordRef: React.RefObject<HTMLInputElement>,
    validateForm: Function,
    registerUser: Function,
    registerFormErrorMessage: string
}

export default function RegisterForm({
    isError,
    usernameRef,
    passwordRef,
    validateForm,
    registerUser,
    registerFormErrorMessage
}: RegisterFormProps) {

    return (
        <>
            <Heading size={"xl"}>
                Sign up
            </Heading>
            <FormControl
                id={"registerForm"}
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
                <Flex
                    gap={5}
                    justifyContent={"center"}
                >
                    <Input
                        w={"50%"}
                        mt={"3rem"}
                        type={"submit"}
                        bg={"green.700"}
                        variant={"filled"}
                        value={"Done"}
                        cursor={"pointer"}
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
                    >
                    </Input>
                </Flex>
                {isError && (
                    <FormErrorMessage>{registerFormErrorMessage ? registerFormErrorMessage : 'Please check the form'}</FormErrorMessage>
                )}
            </FormControl>
        </>
    )
}