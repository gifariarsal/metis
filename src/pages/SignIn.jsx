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
      .email("Invalid email address format")
      .required("Email is required"),
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
        <Box w={"40%"} h={"100vh"} bgColor={"#E0AAFF"}>
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
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    rounded={"lg"}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <FormLabel htmlFor="password" mt={"4"}>
                    <Flex
                      alignItems={"baseline"}
                      justifyContent={"space-between"}
                    >
                      Password
                      <Button variant={"link"} onClick={onForgot}>
                        <Text
                          fontSize={"xs"}
                          fontWeight={400}
                          color={"blue"}
                          _hover={{ textDecoration: "underline" }}
                        >
                          Forgot Password?
                        </Text>
                      </Button>
                    </Flex>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      rounded={"lg"}
                    />
                    <InputRightElement width="3.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? (
                          <IoEyeOffOutline size={"20px"} />
                        ) : (
                          <IoEyeOutline size={"20px"} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
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
