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
import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [showOld, setShowOld] = React.useState(false);
  const handleClickOld = () => setShowOld(!showOld);

  const [showNew, setShowNew] = React.useState(false);
  const handleClickNew = () => setShowNew(!showNew);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const changePassword = async (values) => {
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
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

  const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password must be at least 6 characters, 1 symbol, and 1 uppercase"
      )
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      changePassword(values);
      navigate(-1);
    },
  });

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
    >
      <Box boxShadow={"lg"} rounded={"2xl"} w={"40vw"}>
        <form onSubmit={formik.handleSubmit}>
          <VStack px={10} py={10} w={"full"}>
            <Text fontSize={"xl"} fontWeight={700} mb={6}>
              Change Password
            </Text>
            <FormControl
              mb={4}
              w={"100%"}
              isRequired
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel>Current Password</FormLabel>
              <InputGroup>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  rounded={"lg"}
                  type={showOld ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                />
                <InputRightElement width="3.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickOld}>
                    {showOld ? (
                      <IoEyeOffOutline size={"20px"} />
                    ) : (
                      <IoEyeOutline size={"20px"} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.currentPassword &&
                formik.errors.currentPassword && (
                  <FormErrorMessage fontSize={"xs"}>
                    {formik.errors.currentPassword}
                  </FormErrorMessage>
                )}
            </FormControl>
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
                  type={showNew ? "text" : "password"}
                  rounded={"lg"}
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
                  type={showConfirm ? "text" : "password"}
                  rounded={"lg"}
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
              {formik.touched.password && formik.errors.confirmPassword && (
                <FormErrorMessage fontSize={"xs"}>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              )}
            </FormControl>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              mt={6}
              w={"full"}
            >
              <Button onClick={goBack}>Cancel</Button>
              <Button
                type="submit"
                rounded={"lg"}
                color={"white"}
                bgColor={"#9D4EDD"}
                _hover={{ bgColor: "#B75CFF" }}
                _active={{ bgColor: "#6C12B5" }}
              >
                Save Password
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
