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

const ChangePhoneModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    currentPhone: Yup.string()
      .required("Current Phone is required"),
    newPhone: Yup.string()
      .required("New Phone is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
        {
          currentPhone: values.currentPhone,
          newPhone: values.newPhone,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Phone changed successfully");
      toast({
        title: "Phone changed successfully",
        description: "check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error changing phone",
        description: error.response.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("Error changing phone:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPhone: "",
      newPhone: "",
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
            Want to change your phone number?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.currentPhone && formik.errors.currentPhone
              }
            >
              <FormLabel mt={4}>Current Phone Number</FormLabel>
              <Input
                id="currentPhone"
                name="currentPhone"
                type="tel"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPhone}
                focusBorderColor="#C77DFF"
                placeholder="Enter your current phone number"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.currentPhone && formik.errors.currentPhone && (
                <FormErrorMessage>
                  {formik.errors.currentPhone}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={formik.touched.newPhone && formik.errors.newPhone}
            >
              <FormLabel mt={4}>New Phone Number</FormLabel>
              <Input
                id="newPhone"
                name="newPhone"
                type="tel"
                rounded={"lg"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPhone}
                focusBorderColor="#C77DFF"
                placeholder="Enter your new phone number"
                _placeholder={{ fontSize: "sm", color: "gray.400" }}
              />
              {formik.touched.newPhone && formik.errors.newPhone && (
                <FormErrorMessage>{formik.errors.newPhone}</FormErrorMessage>
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

export default ChangePhoneModal;
