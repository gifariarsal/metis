import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const NavNonUser = () => {
  return (
    <Box>
      <Flex justifyContent={"flex-end"}>
        <Stack direction={"row"} spacing={6}>
          <Link to={"/write-blog"}>
            <Button
              mr={10}
              display={"inline-flex"}
              fontSize={"sm"}
              fontWeight={600}
              color={"gray.800"}
              bg={"white"}
              border={"1px"}
              borderColor={"gray.800"}
              rounded={"lg"}
              _hover={{
                bg: "gray.100",
              }}
            >
              <HiOutlinePencilSquare />
              <Text ml={2}>Write</Text>
            </Button>
          </Link>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/sign-in"}
            color={"gray.800"}
          >
            Sign In
          </Button>
          <Button
            as={"a"}
            display={"inline-flex"}
            fontSize={"sm"}
            fontWeight={700}
            color={"white"}
            bg={"gray.800"}
            rounded={"lg"}
            href={"/sign-up"}
            _hover={{
              bg: "gray.600",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

export default NavNonUser