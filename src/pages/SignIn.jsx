import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const SignIn = () => {
  return (
    <div>
      <Flex>
        <Box w={"40%"} h={"100vh"} bgColor={"#E0AAFF"}></Box>
        <Box w={"60%"} h={"100vh"}>
          <Box p={"20px 40px"}>
            <Text
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              h={"10vh"}
            >
              Did you know that{" "}
              <Link color="teal.500" href="#">
                links can live inline with text
              </Link>
            </Text>
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
              <FormLabel mt={"6"}>Password</FormLabel>
              <Input type="password" rounded={"lg"} />
              <Box w={"100%"} display={"flex"} justifyContent={"flex-end"}>
                <Button
                  display={"flex"}
                  position={"relative"}
                  right={"0"}
                  justifyContent={"center"}
                  w={"50%"}
                  mt={"6"}
                  rounded={"lg"}
                  color={"white"}
                  bgColor={"#9D4EDD"}
                  _hover={{ bgColor: "#B75CFF" }}
                >
                  Sign In
                </Button>
              </Box>
            </FormControl>
          </VStack>
        </Box>
      </Flex>
    </div>
  );
};
