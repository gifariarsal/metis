import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const verify = async () => {
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success",
        status: "success",
        duration: "2000",
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        status: "error",
        duration: "2000",
        isClosable: true,
      });
    }
  };

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
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Verify your account
          </Text>
          <Text fontSize={"md"} mt={10}>
            Click button below to verify your account
          </Text>
          <Button
            onClick={() => verify()}
            type="submit"
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
            Verify
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EmailVerification;
