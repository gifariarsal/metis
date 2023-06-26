import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  Avatar,
  Image,
  Input,
  Select,
  Card,
  CardBody,
  Stack,
  Tag,
  CardFooter,
  IconButton,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Navbar from "../components/Navbar";
import { BsBookmarkPlus } from "react-icons/bs";

const Explore = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");

  const fetchData = async () => {
    try {
      const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategory}&sort=${sortOrder}&page=1`;
      const response = await axios.get(url);
      console.log(response.data);
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, sortOrder]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
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
    const indexes = [];
    for (let i = 1; i <= totalPages; i++) {
      indexes.push(renderArticleIndex(i));
    }
    return indexes;
  };

  const filteredArticles = articles.filter((article) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseTitle = article.title.toLowerCase();
    const lowerCaseAuthor = article.User.username.toLowerCase();
    const lowerCaseCategory = article.Category.name.toLowerCase();

    return (
      lowerCaseTitle.includes(lowerCaseSearchTerm) ||
      lowerCaseAuthor.includes(lowerCaseSearchTerm) ||
      lowerCaseCategory.includes(lowerCaseSearchTerm)
    );
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortOrder === "ASC") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "DESC") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "createdAt_ASC") {
      return a.createdAt.localeCompare(b.createdAt);
    } else if (sortOrder === "createdAt_DESC") {
      return b.createdAt.localeCompare(a.createdAt);
    }
  });

  return (
    <Box>
      <Navbar />
      <Box m={"24px 60px 40px"}>
        <Heading fontSize={"4xl"}>Explore Articles</Heading>
      </Box>
      <Box
        m={"16px 60px"}
        display={"flex"}
        justifyContent={"space-between"}
        gap={4}
      >
        <Input
          placeholder="Search..."
          rounded={"xl"}
          focusBorderColor="#C77DFF"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          placeholder="All Categories"
          rounded={"xl"}
          focusBorderColor="#C77DFF"
          value={selectedCategory}
          onChange={handleCategoryFilter}
        >
          <option value="1">Bisnis</option>
          <option value="2">Ekonomi</option>
          <option value="3">Teknologi</option>
          <option value="4">Olahraga</option>
          <option value="5">Kuliner</option>
          <option value="6">Internasional</option>
          <option value="7">Fiksi</option>
        </Select>
        <Select
          placeholder="Sort"
          rounded={"xl"}
          focusBorderColor="#C77DFF"
          value={sortOrder}
          onChange={handleSortOrder}
        >
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
          <option value="createdAt_ASC">Oldest First</option>
          <option value="createdAt_DESC">Newest First</option>
        </Select>
      </Box>
      <Box m={"24px 60px"} gap={4}>
        <Swiper slidesPerView={3}>
          {sortedArticles
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
      </Box>
      <Box display="flex" justifyContent="center" mt={8}>
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

export default Explore;
