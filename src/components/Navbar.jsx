import { Box, Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import Logo from "../assets/logo_black.png";
import React from "react";

export const Navbar = () => {
  return (
    <header>
      <Box>
        <Flex
          bg={"white"}
          color={"#1c1c1c"}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"#EFD3FF"}
          align={"center"}
        >
          <Box w={"50%"}>
            <Flex pl={10} justifyContent={"flex-start"} align={"center"}>
              <Image src={Logo} h={"10"}></Image>
              <Input
                ml={4}
                placeholder="Search..."
                rounded={"full"}
                focusBorderColor="#C77DFF"
                w={"auto"}
              />
              <Text
              size={"md"}
              ml={4}
              >Filter</Text>
            </Flex>
          </Box>
          <Box w={"50%"}>
            <Flex pr={10} justifyContent={"flex-end"}>
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  href={"#"}
                  color={"gray.800"}
                >
                  Sign In
                </Button>
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"gray.800"}
                  href={"#"}
                  _hover={{
                    bg: "gray.600",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </header>
  );
};