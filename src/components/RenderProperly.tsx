import { Flex } from "@chakra-ui/react"
import { Component, ReactElement } from "react"

export interface RenderProperlyProps {
    id: string,
    component: ReactElement<any, any> | undefined
}

export default function RenderProperly ({ id, component }: RenderProperlyProps){
  return (
    <Flex 
    flexDir={"column"} 
    id={id}
    height={"100%"}
    width={"100%"}
    pt={"1rem"}
    p={"3rem"}
    >
        <>{component}</>
    </Flex>
  )
}