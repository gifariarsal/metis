import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Carousel from "../components/Carousel";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Box m={"16px 60px"} gap={4}>
        <Carousel />
        <Box>
          <BlogCard />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Landing;
