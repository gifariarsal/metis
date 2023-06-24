import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Carousel from "../components/Carousel"
import { Box, Flex } from "@chakra-ui/react";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Flex m={"16px 60px"} gap={4}>
        <Box w={"full"} display={"flex"} flexDir={"column"} gap={4}>
          <Carousel />
          <BlogCard />
        </Box>
      </Flex>
      <Footer />
    </div>
  );
};

export default Landing;
