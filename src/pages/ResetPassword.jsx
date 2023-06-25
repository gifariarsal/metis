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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";

const ResetPassword = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password must contain at least 6 characters, 1 symbol, and 1 uppercase"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const resetPass = async (values) => {
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        }
      );

      // Handle success response
      console.log(res);
      // Show a success message or close the modal
    } catch (error) {
      // Handle error response
      console.error("Error", error);
      // Show an error message to the user
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetPass(values);
      // navigate()
    },
  });

  const [showNew, setShowNew] = React.useState(false);
  const handleClickNew = () => setShowNew(!showNew);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

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
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              mb={4}
              w={"100%"}
              isRequired
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  rounded={"lg"}
                  type={showConfirm ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
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
            <FormControl
              isRequired
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            >
              <FormLabel>Confirm New Password</FormLabel>
              <InputGroup>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  rounded={"lg"}
                  type={showConfirm ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
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
              Save Password
            </Button>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default ResetPassword;
