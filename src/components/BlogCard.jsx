import { Box, Card, CardBody, CardFooter, Heading, IconButton, Stack, Tag, Text, useToast } from '@chakra-ui/react';
import React from 'react'
import { BsBookmarkPlus, BsHeart } from 'react-icons/bs';

const BlogCard = (props) => {
    const login = localStorage.getItem("token");
    const toast = useToast();

    function addBookmark() {
      toast({
        title: "Article is saved!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    function noAddBookmark() {
      toast({
        title: "Save failed",
        status: "error",
        description: "Login to save the article",
        duration: 2000,
        isClosable: true,
      });
    }

    function addLike() {
      toast({
        title: "Article is liked!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    function noAddLike() {
      toast({
        title: "Like failed",
        status: "error",
        description: "Login to like the article",
        duration: 2000,
        isClosable: true,
      });
    }
  return (
    <Box p={4}>
      <Card w={"full"} h={"430px"}>
        <CardBody>
          <Box
            height={"100px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            borderRadius="lg"
            backgroundImage={`https://minpro-blog.purwadhikabootcamp.com/${props.imageURL}`}
          ></Box>
          <Stack mt="6" spacing="3">
            <Heading size="md" noOfLines={1}>
              {props.title}
            </Heading>
            <Text noOfLines={2}>{props.content}</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              {props.username}
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Published: {new Date(props.createdAt).toLocaleDateString()}
            </Text>
          </Stack>
          <Tag size={"md"} rounded={"full"} mt={4} fontWeight={"normal"}>
            {props.name}
          </Tag>
        </CardBody>
        <CardFooter display={"flex"} justifyContent={"space-between"} mt={"-4"}>
          {login ? (
            <IconButton
              variant={"ghost"}
              size={"md"}
              rounded={"full"}
              aria-label="Bookmark"
              onClick={() => addBookmark()}
              icon={<BsBookmarkPlus />}
            />
          ) : (
            <IconButton
              variant={"ghost"}
              size={"md"}
              rounded={"full"}
              aria-label="Bookmark"
              onClick={() => noAddBookmark()}
              icon={<BsBookmarkPlus />}
            />
          )}
          {login ? (
            <IconButton
              variant={"ghost"}
              size={"md"}
              rounded={"full"}
              aria-label="Like"
              onClick={() => addLike()}
              icon={<BsHeart />}
            />
          ) : (
            <IconButton
              variant={"ghost"}
              size={"md"}
              rounded={"full"}
              aria-label="Like"
              onClick={() => noAddLike()}
              icon={<BsHeart />}
            />
          )}
        </CardFooter>
      </Card>
    </Box>
  );
}

export default BlogCard