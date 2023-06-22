import { Box, Text, VStack } from "@chakra-ui/react";
import { TbCircleCheckFilled } from "react-icons/tb";
import React from "react";

const EmailVerification = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100w"}
      h={"100vh"}
    >
      <Box boxShadow={"lg"} rounded={"2xl"}>
        <VStack px={20} py={10}>
          <TbCircleCheckFilled size={"150px"} color="#9D4EDD" />
          <Text fontSize={"xl"} mt={10}>
            Your account has been verified!
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default EmailVerification;
