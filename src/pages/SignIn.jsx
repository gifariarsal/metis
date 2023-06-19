import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import SideLogo from "../assets/logo_purple.png";
import React from "react";
import { Link } from "react-router-dom";
import ForgotPassModal from "../components/ForgotPassModal";

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onForgot = () => {
    onOpen();
  }

  return (
    <div>
      <Flex>
        <Box w={"40%"} h={"100vh"} bgColor={"#E0AAFF"}>
          <Link href="/">
            <Image
              src={SideLogo}
              h={"30px"}
              m={"30px 60px"}
              _hover={{ filter: "brightness(150%)", transition: "300ms" }}
            />
          </Link>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"#6C12B5"}
            m={"30px 60px"}
          >
            A professional writer is an amateur who didn't quit.” <br /> ~
            Richard Bach
          </Text>
        </Box>
        <Box w={"70%"} p={"20px 40px"}>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={4}
            p={"20px 40px"}
          >
            <Text>Not a member?</Text>
            <Button
              as={"a"}
              fontSize={"md"}
              fontWeight={400}
              variant={"link"}
              href={"/sign-up"}
              color={"#9D4EDD"}
            >
              Sign up now
            </Button>
          </Box>
          <VStack spacing={"4"} p={"20px 200px"}>
            <Text
              w={"100%"}
              fontSize={"xx-large"}
              display={"flex"}
              justifyContent={"flex-start"}
              fontWeight={"bold"}
            >
              Sign In to Metis
            </Text>
            <FormControl>
              <FormLabel>Username or Email Address</FormLabel>
              <Input type="email" rounded={"lg"} />
              <FormLabel mt={"4"}>
                <Flex alignItems={"baseline"} justifyContent={"space-between"}>
                  Password
                  <Button variant={"link"} onClick={onForgot}>
                    <Text
                      fontSize={"xs"}
                      fontWeight={400}
                      color={"blue"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Forgot Password?
                    </Text>
                  </Button>
                </Flex>
              </FormLabel>
              <Input type="password" rounded={"lg"} />
              <Button
                display={"flex"}
                justifyContent={"center"}
                w={"100%"}
                mt={"6"}
                rounded={"lg"}
                color={"white"}
                bgColor={"#9D4EDD"}
                _hover={{ bgColor: "#B75CFF" }}
                _active={{ bgColor: "#6C12B5" }}
              >
                Sign In
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Flex>
      <ForgotPassModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};

export default SignIn;
