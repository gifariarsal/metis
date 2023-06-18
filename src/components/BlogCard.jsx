import {
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
import { BsBookmarkPlus } from "react-icons/bs";
import React from "react";

const BlogCard = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        rounded={"xl"}
      >
        <Stack>
          <CardBody>
            <Flex mb={"2"} gap={10}>
              <Text fontSize={"sm"} color={"gray.500"}>
                Author
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Published:
              </Text>
            </Flex>
            <Heading size="lg" mb={"2"}>
              The perfect latte
            </Heading>

            <Text>
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
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
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
      </Card>
    </Flex>
  );
};

export default BlogCard;
