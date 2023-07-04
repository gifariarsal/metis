import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const ChangeUsernameModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    currentUsername: Yup.string()
      .required("Current Username is required"),
    newUsername: Yup.string()
      .required("New Username is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
        {
          currentUsername: values.currentUsername,
          newUsername: values.newUsername,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Username changed successfully");
      toast({
        title: "Username changed successfully",
        description: "check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error changing username",
        description: error.response.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("Error changing username:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      currentEmail: "",
      newEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"2xl"} fontWeight={700}>
            Want to change your username?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.currentUsername && formik.errors.currentUsername
              }
            >
              <FormLabel mt={4}>Current Username</FormLabel>
              <Input
                id="currentUsername"
                name="currentUsername"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentUsername}
                focusBorderColor="#C77DFF"
                placeholder="Enter your current username"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.currentUsername && formik.errors.currentUsername && (
                <FormErrorMessage>
                  {formik.errors.currentUsername}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.newUsername && formik.errors.newUsername}
            >
              <FormLabel mt={4}>New Username</FormLabel>
              <Input
                id="newUsername"
                name="newUsername"
                type="text"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newUsername}
                focusBorderColor="#C77DFF"
                placeholder="Enter your new username"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.newUsername && formik.errors.newUsername && (
                <FormErrorMessage>{formik.errors.newUsername}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              display={"flex"}
              justifyContent={"center"}
              w={"100%"}
              rounded={"lg"}
              color={"white"}
              bgColor={"#9D4EDD"}
              _hover={{ bgColor: "#B75CFF" }}
              _active={{ bgColor: "#6C12B5" }}
            >
              Send Request
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ChangeUsernameModal;
