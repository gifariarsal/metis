import React from "react";
import Navbar from "../components/NavbarUser";
import NavbarNonUser from "../components/NavbarNonUser";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { Box, Flex } from "@chakra-ui/react";

const Landing = () => {
  return (
    <div>
      <NavbarNonUser />
      <Flex m={"16px 60px"} gap={4}>
        <Box w={"70%"}>
          <BlogCard />
        </Box>
        <Box w={"30%"} bgColor={"red"}>This is sidebar</Box>
      </Flex>
      <Footer />
    </div>
  );
};

export default Landing;
