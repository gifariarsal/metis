import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AllBlog from "../components/AllBlog"
import Bisnis from "../components/Categories/Bisnis"
import Carousel from "../components/Carousel";
import { Box } from "@chakra-ui/react";
import Ekonomi from "../components/Categories/Ekonomi";
import Teknologi from "../components/Categories/Teknologi";
import Olahraga from "../components/Categories/Olahraga";
import Kuliner from "../components/Categories/Kuliner";
import Internasional from "../components/Categories/Internasional";
import Fiksi from "../components/Categories/Fiksi";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Box m={"24px 60px"} gap={4}>
        <Carousel />
        <Box>
          <AllBlog />
          <Bisnis />
          <Ekonomi />
          <Teknologi />
          <Olahraga />
          <Kuliner />
          <Internasional />
          <Fiksi />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Landing;
