import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const EditProfileModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={4}>
          <ModalHeader fontSize={"3xl"} fontWeight={"bold"}>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"}>
              <FormControl id="userName">
                <FormLabel>User Icon</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" name="User" src="/profile">
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                      />
                    </Avatar>
                  </Center>
                  <Box display={"flex"}>
                    <Button size={"sm"}>Change Image</Button>
                  </Box>
                </Stack>
              </FormControl>
              <FormControl id="userName" isRequired>
                <FormLabel>User name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="phone-number" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack spacing={6} direction={"row"}>
              <Button w="full" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color={"white"}
                w="full"
                bgColor={"#9D4EDD"}
                _hover={{ bgColor: "#B75CFF" }}
                _active={{ bgColor: "#6C12B5" }}
              >
                Save Profile
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
