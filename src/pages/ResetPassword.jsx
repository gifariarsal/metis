import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ResetPassword = () => {
  const [showNew, setShowNew] = React.useState(false);
  const handleClickNew = () => setShowNew(!showNew);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password must contain at least 6 characters, 1 symbol, and 1 uppercase"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

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
          <FormControl mb={4} w={"100%"} isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                id="newPassword"
                name="newPassword"
                type={showNew ? "text" : "password"}
                rounded={"lg"}
              />
              <InputRightElement width="3.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickNew}>
                  {showNew ? (
                    <IoEyeOffOutline size={"20px"} />
                  ) : (
                    <IoEyeOutline size={"20px"} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm New Password</FormLabel>
            <InputGroup>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                rounded={"lg"}
              />
              <InputRightElement width="3.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
                  {showConfirm ? (
                    <IoEyeOffOutline size={"20px"} />
                  ) : (
                    <IoEyeOutline size={"20px"} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
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
