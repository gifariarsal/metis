import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiMailSend } from "react-icons/bi";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/logo_purple.png";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <Box h={"200px"} bgColor={"#F5F5F8"}>
        <Flex>
          <Box w={"50%"} m={"16px 60px"}>
            <Image src={FooterLogo} h={"28px"} />
            <Stack direction={"row"} spacing={8} mt={"32px"}>
              <Link to={"https://twitter.com/"}>
                <FaTwitter size={"24px"} color="#1A202C" />
              </Link>
              <Link to={"https://www.youtube.com/"}>
                <FaYoutube size={"24px"} color="#1A202C" />
              </Link>
              <Link to={"https://www.instagram.com/"}>
                <FaInstagram size={"24px"} color="#1A202C" />
              </Link>
            </Stack>
            <Text fontSize={"sm"} mt={"54px"} color={"gray.500"}>
              © 2023 Metis. All rights reserved
            </Text>
          </Box>
          <Box w={"50%"} m={"16px 60px"}>
            <Stack align={"flex-start"}>
              <Text fontWeight={500}>Stay up to date</Text>
              <Stack direction={"row"} spacing={4}>
                <Input
                  placeholder={"Your email address"}
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  rounded={"xl"}
                  bg={"whiteAlpha.600"}
                  focusBorderColor="#C77DFF"
                  _focus={{
                    bg: "whiteAlpha.900",
                  }}
                />
                <IconButton
                  bg={"gray.800"}
                  color={"white"}
                  rounded={"xl"}
                  _hover={{
                    bg: "gray.600",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Footer;
