import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import SideLogo from "../assets/logo_purple.png";
import ForgotPassModal from "../components/ForgotPassModal";
import { loginSuccess } from "../redux/reducer/AuthReducer";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignIn = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  
  // modal for forgot password
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onForgot = () => {
    onOpen();
  };

  const navigate = useNavigate();

  // auth
  const dispatch = useDispatch();
  // const loginButton = useSelector((state) => state.AuthReducer.login);

  const login = async (values) => {
    try {
      const { username, email, phone, password } = values;
      const res = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
        }
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(loginSuccess(res.data.token));
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  };

  // validation
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format"),
    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values);
      // navigate()
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
            A professional writer is an amateur who didn't quit.” <br /> ~
            Richard Bach
          </Text>
        </Box>
        <Box w={"70%"} p={"20px 40px"}>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={4}
            p={"20px 40px"}
          >
            <Text>Not a member?</Text>
            <Button
              as={"a"}
              fontSize={"md"}
              fontWeight={400}
              variant={"link"}
              href={"/sign-up"}
              color={"#9D4EDD"}
            >
              Sign up now
            </Button>
          </Box>
          <VStack spacing={"4"} p={"20px 200px"}>
            <Box w={"full"}>
              <Text
                w={"100%"}
                fontSize={"xx-large"}
                display={"flex"}
                justifyContent={"flex-start"}
                fontWeight={"bold"}
              >
                Sign In to Metis
              </Text>
              <Text
                fontSize={"xs"}
                color={"gray.400"}
                fontStyle={"italic"}
                align={"left"}
              >
                You can login by username, email, or phone number
              </Text>
            </Box>
            <Box w={"full"}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl
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
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
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
                    <FormErrorMessage>
                      {formik.errors.password}
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
                  Sign In
                </Button>
              </form>
            </Box>
          </VStack>
        </Box>
      </Flex>
      <ForgotPassModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};

export default SignIn;
