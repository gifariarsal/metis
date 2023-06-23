import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { logoutSuccess } from "../redux/reducer/AuthReducer";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NavUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token))
    navigate("/")
  }
  return (
    <Box>
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
                <Link to={"/user-profile"}>Profile</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/change-password"}>Change Password</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem color={"red"}>
                <Button variant={"unstyled"} onClick={() => handleLogout()}>Sign Out</Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavUser