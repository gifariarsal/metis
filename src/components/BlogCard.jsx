import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Stack,
  Text,
  Tag,
  Flex,
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
        "https://minpro-blog.purwadhikabootcamp.com/api/blog"
      );
      console.log(response.data);
      // console.log(response.data);
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedArticlesData = articles.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleNextPage = () => {
    const totalPages = Math.ceil(articles.length / 3);
    if (activePage < totalPages && activePage < 3)
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
        colorScheme={activePage === index ? "blackAlpha" : "gray"}
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
        {sortedArticlesData
          .slice((activePage - 1) * 3, activePage * 3)
          .map((article) => (
            <SwiperSlide key={article.id}>
              <Box display={"flex"} justifyContent={"space-between"} p={4}>
                  <Card w={"full"} h={"430px"}>
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
                        <Heading size="md" noOfLines={1}>
                          {article.title}
                        </Heading>
                        <Text noOfLines={2}>{article.content}</Text>
                        <Text fontSize={"sm"} color={"gray.500"}>
                          {article.User.username}
                        </Text>
                        <Text fontSize={"sm"} color={"gray.500"}>
                          Published:{" "}
                          {new Date(article.createdAt).toLocaleDateString()}
                        </Text>
                      </Stack>
                      <Tag
                        size={"md"}
                        rounded={"full"}
                        mt={4}
                        fontWeight={"normal"}
                      >
                        {article.Category.name}
                      </Tag>
                    </CardBody>
                    <CardFooter mt={"-4"}>
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
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          size={"sm"}
          colorScheme="blackAlpha"
          onClick={handlePrevPage}
          disabled={activePage === 1}
        >
          Previous
        </Button>
        {renderArticleIndexes()}
        <Button
          size={"sm"}
          colorScheme="blackAlpha"
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
