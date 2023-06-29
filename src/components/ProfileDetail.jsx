import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangePhoneModal from "./ChangePhoneModal";
import ChangeUsernameModal from "./ChangeUsernameModal";

const ProfileDetail = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

  const {
    isOpen: isOpenUsername,
    onOpen: onOpenUsername,
    onClose: onCloseUsername,
  } = useDisclosure();

  const {
    isOpen: isOpenPhone,
    onOpen: onOpenPhone,
    onClose: onClosePhone,
  } = useDisclosure();

  const {
    isOpen: isOpenEmail,
    onOpen: onOpenEmail,
    onClose: onCloseEmail,
  } = useDisclosure();

  const onUsernameChange = () => {
    onOpenUsername();
  };
  const onEmailChange = () => {
    onOpenEmail();
  };
  const onPhoneChange = () => {
    onOpenPhone();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const {
          username: fetchedUsername,
          avatar: fetchedAvatar,
          email: fetchEmail,
        } = response.data;
        setUsername(fetchedUsername);
        setAvatar(fetchedAvatar);
        setEmail(fetchEmail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Flex py={10}>
        <Box>
          <Avatar size={"2xl"} name="User" src={avatar} />
        </Box>
        <Box ml={10}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            {username}
          </Text>
          <Text color={"gray.500"} mb={4}>
            {email}
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Button fontSize={"sm"} fontWeight={500}>
                Edit Profile
              </Button>
            </MenuButton>
            <MenuList w={"100px"}>
              <Button variant={"unstyled"} w={"full"}>
                <MenuItem>Change Username</MenuItem>
              </Button>
              <Button variant={"unstyled"} w={"full"} onClick={onEmailChange}>
                <MenuItem>Change Email</MenuItem>
              </Button>
              <Button variant={"unstyled"} w={"full"}>
                <MenuItem>Change Phone Number</MenuItem>
              </Button>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      {/* <ChangeUsernameModal
        isOpen={isOpenUsername}
        onOpen={onOpenUsername}
        onClose={onCloseUsername}
      />
      <ChangePhoneModal
        isOpen={isOpenPhone}
        onOpen={onOpenPhone}
        onClose={onClosePhone}
      /> */}
      <ChangeEmailModal
        isOpen={isOpenEmail}
        onOpen={onOpenEmail}
        onClose={onCloseEmail}
      />
    </>
  );
};

export default ProfileDetail;
