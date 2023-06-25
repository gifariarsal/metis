import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Tag,
  Text,
  Grid,
} from "@chakra-ui/react";
import { BsBookmarkPlus } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BlogCard = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1"
      );
      console.log(response.data);
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    setActivePage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };

  const renderArticleIndex = (index) => {
    return (
      <Button
        key={index}
        onClick={() => setActivePage(index)}
        colorScheme={activePage === index ? "blue" : "gray"}
        mx={1}
        size="sm"
      >
        {index}
      </Button>
    );
  };

  const renderArticleIndexes = () => {
    const totalPages = Math.ceil(articles.length / 3);
    console.log(totalPages);
    const indexes = [];
    for (let i = 1; i <= totalPages; i++) {
      indexes.push(renderArticleIndex(i));
    }
    return indexes;
  };

  return (
    <Box mt={4}>
      <Swiper slidesPerView={3}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {articles
            .slice((activePage - 1) * 3, activePage * 3)
            .map((article) => (
              <SwiperSlide key={article.id}>
                <Card maxW="xs" minH={"xs"}>
                  <CardBody>
                    <Box
                      height={"100px"}
                      position="relative"
                      backgroundPosition="center"
                      backgroundRepeat="no-repeat"
                      backgroundSize="cover"
                      borderRadius="lg"
                      backgroundImage={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                    ></Box>
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{article.title}</Heading>
                      <Text noOfLines={2}>{article.content}</Text>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <IconButton
                      bgColor={"white"}
                      color={"black"}
                      rounded={"full"}
                      size={"md"}
                      _hover={{
                        bgColor: "gray.100",
                      }}
                      aria-label="Bookmark"
                      icon={<BsBookmarkPlus />}
                    />
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
        </Grid>
      </Swiper>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          colorScheme="blue"
          onClick={handlePrevPage}
          disabled={activePage === 1}
        >
          Previous
        </Button>
        {renderArticleIndexes()}
        <Button
          colorScheme="blue"
          onClick={handleNextPage}
          disabled={activePage === Math.ceil(articles.length / 3)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default BlogCard;

{
  /* <Card
  direction={"row"}
  overflow="hidden"
  variant="outline"
  rounded={"xl"}
  size={"sm"}
>
  <Stack>
    <CardBody>
      <Flex mb={"2"} gap={10}>
        <Text fontSize={"sm"} color={"gray.500"}>
          {article.User.username}
        </Text>
        <Text fontSize={"sm"} color={"gray.500"}>
          Published: {new Date(article.createdAt).toLocaleDateString()}
        </Text>
      </Flex>
      <Heading size="lg" mb={"2"} noOfLines={1} lineHeight={"base"}>
        {article.title}
      </Heading>

      <Text noOfLines={2}>{article.content}</Text>
      <Tag size={"md"} rounded={"full"} mt={4} fontWeight={"normal"}>
        {article.Category.name}
      </Tag>
    </CardBody>

    <CardFooter>
      <IconButton
        bgColor={"white"}
        color={"black"}
        rounded={"full"}
        size={"md"}
        _hover={{
          bgColor: "gray.100",
        }}
        aria-label="Bookmark"
        icon={<BsBookmarkPlus />}
      />
    </CardFooter>
  </Stack>
  <Image
    objectFit="cover"
    maxW={"40%"}
    src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
    alt={article.title}
  />
</Card>; */
}
