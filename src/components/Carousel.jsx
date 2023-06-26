import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import axios from "axios";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  const [slider, setSlider] = React.useState(null);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const sortedArticlesData = articles.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const limitedArticlesData = sortedArticlesData.slice(0, 4);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <Box
      position={"relative"}
      height={"400px"}
      width={"full"}
      rounded={"lg"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(-50%, -50%)"}
        rounded={"full"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(50%, -50%)"}
        rounded={"full"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {limitedArticlesData.map((article) => (
          <Box
            key={article.id}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container width="full" height="400px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                px={10}
                py={2}
                top="87%"
                transform="translate(0, -50%)"
                bg={"rgba(0, 0, 0, 0.6)"}
                color={"white"}

              >
                <Heading fontSize={"4xl"} noOfLines={1}>{article.title}</Heading>
                <Text fontSize={"md"}>
                  {article.User.username}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
