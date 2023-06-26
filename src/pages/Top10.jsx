import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import Navbar from "../components/Navbar";
import axios from "axios";

const Top10 = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [popularArticles, setPopularArticles] = useState([]);

  // Sort articles by popularity and slice the top 5
  const sortedArticles = articles
    .sort((a, b) => b.total_fav - a.total_fav)
    .slice(0, 10);

  // Update popular articles whenever the sorted articles change
  useState(() => {
    setPopularArticles(sortedArticles);
  }, [sortedArticles]);

  return (
    <Box>
      <Navbar />
      <Box m={"24px 60px 40px"}>
        <Heading fontSize={"4xl"}>Top 10 Articles</Heading>
      </Box>
      <Box m={"16px 60px"}>
        <Flex justifyContent={"space-between"} direction={"column"} gap={4}>
          {sortedArticles.map((article) => (
            <Card
              display={"flex"}
              justifyContent={"space-between"}
              direction={"row"}
              size={"sm"}
              overflow="hidden"
              variant="outline"
              rounded={"xl"}
              h={"200px"}
            >
              <Box w={"70%"}>
                <Stack>
                  <CardBody>
                    <Flex mb={"2"} gap={14}>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        {article.User.username}
                      </Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Published:{" "}
                        {new Date(article.createdAt).toLocaleDateString()}
                      </Text>
                    </Flex>
                    <Heading size="lg" mb={"4"} noOfLines={1}>
                      {article.title}
                    </Heading>

                    <Text noOfLines={2}>{article.content}</Text>
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
              </Box>
              <Box w={"30%"} display={"flex"} justifyContent={"flex-end"}>
                <Image
                  objectFit="cover"
                  maxW={"200px"}
                  src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                  alt=""
                />
              </Box>
            </Card>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Top10;
