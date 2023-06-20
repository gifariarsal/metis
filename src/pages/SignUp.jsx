import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import SideLogo from "../assets/logo_purple.png";
import React from "react";

const SignUp = () => {
  return (
    <div>
      <Flex>
        <Box w={"40%"} bgColor={"#E0AAFF"}>
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
            “The scariest moment is always just before you start. After that,
            things can only get better.” <br /> ~ Stephen King
          </Text>
        </Box>
        <Box w={"70%"} p={"20px 40px"}>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={4}
            p={"20px 40px"}
          >
            <Text>Already a member?</Text>
            <Button
              as={"a"}
              fontSize={"md"}
              fontWeight={400}
              variant={"link"}
              href={"/sign-in"}
              color={"#9D4EDD"}
            >
              Sign in
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
              Sign Up to Metis
            </Text>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" rounded={"lg"} />
            </FormControl>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" rounded={"lg"} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" rounded={"lg"} />
            </FormControl>
            <FormControl id="phone-number" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input type="tel" rounded={"lg"} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="6+ character"
                rounded={"lg"}
              />
              <FormHelperText fontSize={"xs"}>
                Password must contain at least 6 characters, 1 symbol, and 1
                uppercase
              </FormHelperText>
            </FormControl>
            <Checkbox
              display={"flex"}
              alignItems={"baseline"}
              mt={"4"}
              size={"sm"}
            >
              Creating an account means you're okay with our Terms of Service,
              Privacy Policy, and our default Notification Settings.
            </Checkbox>
            <Button
              display={"flex"}
              justifyContent={"center"}
              w={"100%"}
              mt={"10"}
              rounded={"lg"}
              color={"white"}
              bgColor={"#9D4EDD"}
              _hover={{ bgColor: "#B75CFF" }}
              _active={{ bgColor: "#6C12B5" }}
            >
              Create Account
            </Button>
          </VStack>
        </Box>
      </Flex>
    </div>
  );
};

export default SignUp;
