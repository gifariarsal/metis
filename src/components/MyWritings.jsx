import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Image,
  Select,
  Stack,
  SimpleGrid,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  Tag,
  CardFooter,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { BsBookmarkPlus, BsHeart } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";

const BlogFilter = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  // const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const { username: fetchedUsername, avatar: fetchedAvatar } =
          response.data;
        setUsername(fetchedUsername);
        setAvatar(fetchedAvatar);
        console.log(username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const filteredArticles = articles
    .filter(
      (article) =>
        (article.title.toLowerCase().includes(filter.toLowerCase()) ||
          article.category.toLowerCase().includes(filter.toLowerCase()) ||
          article.author.toLowerCase().includes(filter.toLowerCase()) ||
          (article.keywords &&
            article.keywords.toLowerCase().includes(filter.toLowerCase()))) &&
        article.User.username.toLowerCase() === username
    )
    .filter(
      (article) =>
        category === "" ||
        article.category.toLowerCase() === category.toLowerCase()
    );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "title-az") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title-za") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <Box>
      <Box
        mt={"16px"}
        display={"flex"}
        justifyContent={"space-between"}
        gap={4}
      >
        <FormControl mb={4}>
          <FormLabel>Search</FormLabel>
          <Input
            placeholder="Search title, author, keywords, etc"
            type="text"
            rounded={"xl"}
            focusBorderColor="#C77DFF"
            value={filter}
            onChange={handleFilterChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            rounded={"xl"}
            focusBorderColor="#C77DFF"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {Array.from(
              new Set(articles.map((article) => article.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Sort By</FormLabel>
          <Select
            rounded={"xl"}
            focusBorderColor="#C77DFF"
            mb={4}
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="title-az">A-Z</option>
            <option value="title-za">Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </Select>
        </FormControl>
      </Box>
      <SimpleGrid mb={4} columns={[2, null, 3]} spacing={4}>
        {sortedArticles.map((article) => (
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
                <Tag size={"md"} rounded={"full"} mt={4} fontWeight={"normal"}>
                  {article.Category.name}
                </Tag>
              </CardBody>
              <CardFooter
                display={"flex"}
                justifyContent={"space-between"}
                mt={"-4"}
              >
                <IconButton
                  variant={"ghost"}
                  size={"md"}
                  rounded={"full"}
                  aria-label="Bookmark"
                  icon={<BsBookmarkPlus />}
                />
                <IconButton
                  variant={"ghost"}
                  size={"md"}
                  rounded={"full"}
                  aria-label="Like"
                  icon={<BsHeart />}
                />
              </CardFooter>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BlogFilter;
