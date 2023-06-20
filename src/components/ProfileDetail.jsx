import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditProfileModal from "./EditProfileModal";

const ProfileDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSaveChange = () => {
    onOpen();
  };

  return (
    <>
      <Flex py={10}>
        <Box>
          <Avatar size={"2xl"} name="user" src="" />
        </Box>
        <Box ml={10}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            User's Name
          </Text>
          <Text color={"gray.500"} mb={4}>
            useremail@gmail.com
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
