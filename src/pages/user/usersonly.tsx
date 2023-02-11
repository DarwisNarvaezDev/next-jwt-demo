import { Button, Flex, Heading, IconButton, Link, List, ListItem, Text, useColorMode } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import qs from 'querystring'
import { useEffect, useState } from "react";
import Theme from "@/util/Theme";

export default function () {

    const colorMode = useColorMode();
    const [authInfo, setAuthInfo] = useState([
        { key: "Access Token", value: "Example" },
        { key: "Refresh Token", value: "Example" },
        { key: "User", value: "Example@example.com" },
        { key: "Hash", value: "Hash" },
        { key: "Joined", value: "000/000/000" },
    ]);

    async function logout() {
        const data = await fetch('/api/user/logout');
        const json = await data.json();
        if (data.ok) {
            window.location.replace('/')
        }
    }

    async function deleteAccessOrRefresh(key) {
        const data = await fetch('/api/user/revoketoken', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"*"
            }, body: JSON.stringify(key)
        });
        const json = await data.json();
        if (data.ok) {
            window.location.reload()
        }
    }

    async function getAuthData() {
        const data = await fetch('/api/user/getsessiondata');
        const json = await data.json();
        setAuthInfo(json)
    }

    useEffect(() => {
        getAuthData()
        document.title = "Users Area | JWT Demo"
        let flag = false
        setInterval(() => {
            if (!flag) {
                document.title = "Users Area | JWT Demo"
                flag = !flag
            } else {
                document.title = "VIP's only!"
                flag = !flag
            }
        }, 3000)
    }, [])

    return (
        <>
            <Flex
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                mb={"3rem"}
            >
                <Flex
                    mt={"4rem"}
                    width={Theme.usersOnly.container.dimentions}
                    height={"80%"}
                    border={"1px solid gray"}
                    borderRadius={"15px"}
                    gap={5}
                    boxShadow={"2xl"}
                    flexDir={Theme.usersOnly.container.flexDirection}
                    >
                    <Flex
                        flexDir={"column"}
                        p={"2rem"}
                        
                        >
                        <Heading size={"lg"}>You gained access! 🤘</Heading>
                        <Heading ml={"5px"} size={"md"} fontWeight={"light"} mt={"20px"}>Now you can... 🥁</Heading>
                        <Flex
                            width={"100%"}
                            border={"1px solid gray"}
                            borderRadius={"15px"}
                            flexDir={"column"}
                            height={"100%"}
                            mt={"10px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            mt={"1rem"}
                            paddingTop={"1rem"}
                            paddingBottom={"1rem"}
                            gap={8}
                        >
                            <Button 
                                size={"lg"}
                                onClick={()=>{
                                    window.location.replace('https://github.com/DarwisNarvaezDev')
                                }}
                                >Follow the dev on GH</Button>
                            <Button 
                                size={"lg"}
                                onClick={()=>{
                                    logout()
                                }}
                                >Logout</Button>
                        </Flex>
                    </Flex>
                    <Flex
                        height={"90%"}
                        width={Theme.usersOnly.authInfo.dimentions}
                        bg={"gray.900"}
                    >
                        <Flex
                            p={"2rem"}
                            color={"gray.200"}
                            flexDir={"column"}
                            height={"100%"}
                            width={"100%"}
                        >
                            <Heading size={"md"}>Auth Information</Heading>
                            <Flex
                                flexDir={"column"}
                                pt={"2rem"}
                                height={"80%"}
                                width={"100%"}
                            >
                                {
                                    authInfo.map((line, index) => {
                                        return (
                                            <Flex
                                                key={index}
                                                flexDir={"column"}
                                                justifyContent={"space-between"}
                                                gap={15}
                                                height={"auto"}
                                                width={"100%"}
                                                whiteSpace={"break-spaces"}
                                                wrap={"wrap"}
                                                wordBreak={"break-word"}
                                                >
                                                <Flex
                                                    height={"100%"}
                                                    width={"100%"}
                                                >
                                                    <Text
                                                    fontWeight={"thin"}
                                                    mb={"20px"}
                                                    ><strong>{line.key} {line.button && (<Button onClick={()=>{
                                                        if( line.value.includes('Access') ){
                                                            deleteAccessOrRefresh({ deleteRefresh: true })
                                                        }else{
                                                            deleteAccessOrRefresh({ deleteAccess: true })
                                                        }
                                                    }} bg={"red"} color={"black"} size={"xs"}>Revoke</Button>)} </strong>: {`${line.value}`}</Text>
                                                </Flex>
                                            </Flex>
                                        )
                                    })
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export async function getServerSideProps({ req, res }) {

    const queryString = qs.decode(req.headers?.cookie, "; ");

    if (Object.keys(queryString).length !== 0) {
        const data = fetch('http://127.0.0.1:3000/api/user/checkauth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*"
            },
            body: JSON.stringify(queryString)
        })
        const status = (await data).status
        if (status === 202) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/user/refresh`
                }
            }
        }
        else if (status !== 202 && (await data).status !== 200) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/user/login?autherror=true&prevpage=usersonly`
                }
            }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: `/user/login?autherror=true&prevpage=usersonly`
            }
        }
    }

    return {
        props: {}
    }
}