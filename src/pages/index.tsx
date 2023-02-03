import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import RegisterForm from '@/components/RegisterForm'
import validateMail from '@/util/validateMail'
import validatePassword from '@/util/validatePassword'
import RenderProperly from '@/components/RenderProperly'
import userLocationValues from '@/util/userLocationValues'

export default function Home() {

  const [userLocation, setUserLocation] = useState<number>(userLocationValues.LOCATION_LOGIN);
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

  return (
    <>
      <Flex 
        as={"main"}
        width={"100%"}
        height={"100vh"}
        justifyContent={"center"}
        mt={"6rem"}
        >
        <Flex
          width={"50vh"}
          height={"60vh"}
          bg={"gray.700"}
          borderRadius={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"2xl"}
          border={"0.5px solid gray"}
          flexDir={"column"}
        >
          <RenderProperly
            id={"formContentWrapper"}
            component={userLocation === userLocationValues.LOCATION_LOGIN ? (<></>) : (<>
              <RegisterForm
                isError={isError}
                usernameRef={usernameRef}
                passwordRef={passwordRef}
                validateForm={validateForm}
                registerUser={registerUser}
                registerFormErrorMessage={registerFormErrorMessage}
              />
            </>)}
          />
        </Flex>
      </Flex>
    </>
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