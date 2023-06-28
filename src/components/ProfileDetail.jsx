import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

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
        const { username: fetchedUsername, avatar: fetchedAvatar, email: fetchEmail } =
          response.data;
        setUsername(fetchedUsername);
        setAvatar(fetchedAvatar);
        setEmail(fetchEmail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSaveChange = () => {
    onOpen();
  };

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
          <Button fontSize={"sm"} fontWeight={500} onClick={onSaveChange}>
            Edit Profile
          </Button>
        </Box>
      </Flex>
      <EditProfileModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default ProfileDetail;
