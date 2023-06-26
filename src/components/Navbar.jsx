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
  Stack,
  Text,
} from "@chakra-ui/react";
import Logo from "../assets/logo_black.png";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/reducer/AuthReducer";

const Navbar = () => {
  const login = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };

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
              <Link to={"/top10"}>
              <Button size={"sm"} ml={4}>
                Top 10 Articles
              </Button>
              </Link>
            </Flex>
          </Box>
          <Box w={"50%"} m={"16px 60px"}>
            <Flex justifyContent={"flex-end"}>
              <Link to={"/write-blog"}>
                <Button
                  mr={10}
                  display={"inline-flex"}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"gray.800"}
                  bg={"white"}
                  border={"1px"}
                  borderColor={"gray.800"}
                  rounded={"lg"}
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  <HiOutlinePencilSquare />
                  <Text ml={2}>Write</Text>
                </Button>
              </Link>
              {login ? (
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
                      <Link to={"/user-profile"}>
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <Link to={"/change-password"}>
                        <MenuItem>Change Password</MenuItem>
                      </Link>
                      <MenuDivider />
                      <MenuItem color={"red"}>
                        <Button
                          variant={"unstyled"}
                          onClick={() => handleLogout()}
                        >
                          Sign Out
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Box>
                  <Stack direction={"row"} spacing={6} ml={4}>
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
                </Box>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </header>
  );
};

export default Navbar;
