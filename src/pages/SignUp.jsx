import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import SideLogo from "../assets/logo_purple.png";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const register = async (values) => {
    try {
      const res = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        {
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
          FE_URL: "http://localhost:3000"
        }
      );
      toast({
        title: "Register Success",
        status: "success",
        duration: "2000",
        isClosable: true,
      });
      navigate("/")
    } catch (err) {
      toast({
        title: "Register Failed",
        status: "error",
        duration: "2000",
        isClosable: true,
      });
    }
  };

  // validation
  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      register(values); // Pass the form values to the register function
    },
  });

  return (
    <div>
      <Flex>
        <Box w={"40%"} bgColor={"#E0AAFF"}>
          <Link to={"/"}>
            <Image
              src={SideLogo}
              h={"30px"}
              m={"30px 60px"}
              _hover={{ filter: "brightness(150%)", transition: "300ms" }}
            />
          </Link>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"#6C12B5"}
            m={"30px 60px"}
          >
            “The scariest moment is always just before you start. After that,
            things can only get better.” <br /> ~ Stephen King
          </Text>
        </Box>
        <Box w={"70%"} p={"20px 40px"}>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={4}
            p={"20px 40px"}
          >
            <Text>Already a member?</Text>
            <Button
              as={"a"}
              fontSize={"md"}
              fontWeight={400}
              variant={"link"}
              href={"/sign-in"}
              color={"#9D4EDD"}
            >
              Sign in
            </Button>
          </Box>
          <VStack spacing={4} p={"20px 200px"}>
            <Text
              w={"100%"}
              fontSize={"xx-large"}
              display={"flex"}
              justifyContent={"flex-start"}
              fontWeight={"bold"}
            >
              Sign Up to Metis
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isRequired
                isInvalid={formik.touched.username && formik.errors.username}
              >
                <FormLabel>Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel mt={4}>Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={formik.touched.phone && formik.errors.phone}
              >
                <FormLabel mt={4}>Phone Number</FormLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel mt={4}>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="6+ chars, min. 1 uppercase and 1 symbol"
                  _placeholder={{
                    fontSize: "xs",
                    color: "gray.500",
                  }}
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              >
                <FormLabel mt={4}>Confirm Password</FormLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  rounded={"lg"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <FormErrorMessage>
                      {formik.errors.confirmPassword}
                    </FormErrorMessage>
                  )}
              </FormControl>
              <Checkbox
                display={"flex"}
                alignItems={"baseline"}
                mt={"4"}
                size={"sm"}
              >
                Creating an account means you're okay with our Terms of Service,
                Privacy Policy, and our default Notification Settings.
              </Checkbox>
              <Button
                type="submit"
                display={"flex"}
                justifyContent={"center"}
                w={"100%"}
                mt={"10"}
                rounded={"lg"}
                color={"white"}
                bgColor={"#9D4EDD"}
                _hover={{ bgColor: "#B75CFF" }}
                _active={{ bgColor: "#6C12B5" }}
              >
                Create Account
              </Button>
            </form>
          </VStack>
        </Box>
      </Flex>
    </div>
  );
};

export default SignUp;
