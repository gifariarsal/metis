import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ResetPassword = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
    >
      <Box boxShadow={"lg"} rounded={"2xl"} w={"40vw"}>
        <VStack px={10} py={10} gap={6} w={"full"}>
            <Text fontSize={"xl"} fontWeight={700}>
              Reset Password
            </Text>
            <FormControl id="password" mb={4} w={"100%"} isRequired>
              <FormLabel>New Password</FormLabel>
              <Input type="password" rounded={"lg"} />
            </FormControl>
            <FormControl id="new-password" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input type="password" rounded={"lg"} />
            </FormControl>
          <Button
            display={"flex"}
            justifyContent={"center"}
            w={"100%"}
            mt={"6"}
            rounded={"lg"}
            color={"white"}
            bgColor={"#9D4EDD"}
            _hover={{ bgColor: "#B75CFF" }}
            _active={{ bgColor: "#6C12B5" }}
          >
            Save Password
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ResetPassword;
