import { Box, Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import Logo from "../assets/logo_black.png";
import React from "react";
import { Link } from "react-router-dom";

const NavbarNonUser = () => {
  return (
    <header>
      <Box>
        <Flex
          bg={"white"}
          color={"#1c1c1c"}
          minH={"60px"}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"#EFD3FF"}
          align={"center"}
        >
          <Box w={"50%"} m={"16px 60px"}>
            <Flex justifyContent={"flex-start"} align={"center"}>
              <Link to={"/"}>
                <Image
                  src={Logo}
                  h={"32px"}
                  _hover={{ filter: "brightness(150%)", transition: "300ms" }}
                ></Image>
              </Link>
              <Input
                ml={4}
                placeholder="Search..."
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
                rounded={"xl"}
                focusBorderColor="#C77DFF"
                w={"auto"}
              />
              <Text size={"md"} ml={4}>
                Filter
              </Text>
            </Flex>
          </Box>
          <Box w={"50%"} m={"16px 60px"}>
            <Flex justifyContent={"flex-end"}>
              <Stack direction={"row"} spacing={6}>
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  href={"/sign-in"}
                  color={"gray.800"}
                >
                  Sign In
                </Button>
                <Button
                  as={"a"}
                  display={"inline-flex"}
                  fontSize={"sm"}
                  fontWeight={700}
                  color={"white"}
                  bg={"gray.800"}
                  rounded={"lg"}
                  href={"/sign-up"}
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

export default NavbarNonUser;