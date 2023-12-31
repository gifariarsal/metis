import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const navigate = useNavigate();

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password must be at least 6 characters, 1 symbol, and 1 uppercase"
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(res);
    } catch (error) {
      console.error("Error", error);
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
      navigate("/sign-in");
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
      <Box boxShadow={"lg"} rounded={"2xl"} h={"70%"} w={"40vw"}>
        <form onSubmit={formik.handleSubmit}>
          <VStack px={10} py={10} w={"full"}>
            <Text fontSize={"xl"} fontWeight={700}>
              Reset Password
            </Text>
            <FormControl
              mb={4}
              w={"100%"}
              isRequired
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel mt={4}>New Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  rounded={"lg"}
                  type={showNew ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              {formik.touched.password && formik.errors.password && (
                <FormErrorMessage fontSize={"xs"}>
                  {formik.errors.password}
                </FormErrorMessage>
              )}
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
                  onBlur={formik.handleBlur}
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
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <FormErrorMessage fontSize={"xs"}>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              )}
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
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
