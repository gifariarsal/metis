import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ProfileDetail = () => {
  return (
    <Flex py={10}>
      <Box>
        <Avatar size={"2xl"} name="user" src="" />
      </Box>
      <Box ml={10}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          User's Name
        </Text>
        <Text color={"gray.500"} mb={4}>useremail@gmail.com</Text>
        <Link>
          <Button fontSize={"sm"} fontWeight={500}>
            Edit Profile
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default ProfileDetail;
