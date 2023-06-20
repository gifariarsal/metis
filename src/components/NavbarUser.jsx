import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Logo from "../assets/logo_black.png";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import React from "react";
import { Link } from "react-router-dom";

const NavbarUser = () => {
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
              <Button
                mr={10}
                as={"a"}
                display={"inline-flex"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"gray.800"}
                rounded={"lg"}
                href={"#"}
                _hover={{
                  bg: "gray.600",
                }}
              >
                <HiOutlinePencilSquare />
                <Text ml={2}>Write</Text>
              </Button>
              <Flex alignItems={"center"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to="/user-profile">Profile</Link>
                    </MenuItem>
                    <MenuItem>Edit Profile</MenuItem>
                    <MenuDivider />
                    <MenuItem color={"red"}>Sign out</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </header>
  );
};

export default NavbarUser;
