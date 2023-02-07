import { Heading } from "@chakra-ui/react";
import qs from 'querystring'
import Router from "next/router";


export interface UsersOnlyProps {

}

export default function ({ }: UsersOnlyProps) {

    return (
        <>
            <Heading>Only users can see this</Heading>
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
        if (status === 200) {
            console.log("redirect");
        }
        else if (status === 202) {
            console.log("redirect to refresh");
        }
        else if (status !== 202 && (await data).status !== 200) {
            console.log("Do nothing");
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: `/user/login?autherror=true&prevpage=usersonly`
            }
        }
    }
}