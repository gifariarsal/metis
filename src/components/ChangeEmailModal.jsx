import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup"

const ChangeEmailModal = ({isOpen, onClose}) => {
    const toast = useToast();
    const validationSchema = Yup.object().shape({
      currentEmail: Yup.string()
        .email("Invalid email address format")
        .required("Current Email is required"),
      newEmail: Yup.string()
        .email("Invalid email address format")
        .required("New Email is required"),
    });

    const handleSubmit = async (values) => {
      try {
        const token = localStorage.getItem("token");

        await axios.patch(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
          {
            currentEmail: values.currentEmail,
            newEmail: values.newEmail,
            FE_URL: "http://localhost:3000",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Email changed successfully");
        toast({
          title: "Email changed successfully",
          description: "check your email for verification",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error changing email",
          description: error.response.data,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.error("Error changing email:", error);
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
            Want to change your email?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.currentEmail && formik.errors.currentEmail
              }
            >
              <FormLabel mt={4}>Current Email</FormLabel>
              <Input
                id="currentEmail"
                name="currentEmail"
                type="email"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentEmail}
                focusBorderColor="#C77DFF"
                placeholder="Enter your current email"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.currentEmail && formik.errors.currentEmail && (
                <FormErrorMessage>
                  {formik.errors.currentEmail}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.newEmail && formik.errors.newEmail}
            >
              <FormLabel mt={4}>New Email</FormLabel>
              <Input
                id="newEmail"
                name="newEmail"
                type="email"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newEmail}
                focusBorderColor="#C77DFF"
                placeholder="Enter your new email"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.newEmail && formik.errors.newEmail && (
                <FormErrorMessage>{formik.errors.newEmail}</FormErrorMessage>
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
}

export default ChangeEmailModal