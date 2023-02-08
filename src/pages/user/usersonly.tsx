import { Button, Flex, Heading, IconButton, Link, List, ListItem, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import qs from 'querystring'
import Router from "next/router";
import { json } from "stream/consumers";
import { useEffect } from "react";

export default function () {

    async function logout(){
        const data = await fetch('/api/user/logout');
        const json = await data.json();
        if( data.ok ){
            window.location.replace('/')
        }        
    }

    useEffect(() => {
        document.title = "Users Area | JWT Demo"
        let flag = false
        setInterval(()=>{
          if( !flag ){
            document.title = "Users Area | JWT Demo"
            flag = !flag
          }else{
            document.title = "VIP's only!"
            flag = !flag
          }
        }, 3000)
      }, [])

    return (
        <>
            <Flex
                width={"100%"}
                height={"100vh"}
                justifyContent={"center"}
            >
                <Flex
                    mt={"4rem"}
                    width={"40%"}
                    height={"60%"}
                    p={"2rem"}
                    border={"1px solid gray"}
                    borderRadius={"15px"}
                    flexDir={"column"}
                    gap={5}
                    boxShadow={"2xl"}
                >
                    <Heading>You gained access! 🤘</Heading>
                    <Heading ml={"5px"} size={"md"} fontWeight={"light"}>Now you can... 🥁</Heading>
                    <List
                        mt={"1rem"}
                        ml={"1rem"}
                        spacing={8}
                    >
                        <ListItem>
                            <Link fontSize={"2xl"} href='https://github.com/DarwisNarvaezDev' isExternal>
                                Follow the developer in GH <ExternalLinkIcon mx='2px' />
                            </Link>
                        </ListItem>
                        <ListItem fontSize={"2xl"}>
                            Or <Button 
                                ml={"10px"}
                                onClick={()=>{
                                    logout()
                                }}
                                >Log Out</Button>
                        </ListItem>
                    </List>
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