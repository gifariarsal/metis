import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ForgotPassModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"2xl"} fontWeight={700}>
            Forgot your password?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"sm"} mb={4} fontWeight={400} color={"gray.600"}>
            Enter the email address you used when you joined and we'll send you
            a link to reset your password.
          </Text>
          <Input
            type="email"
            rounded={"lg"}
            focusBorderColor="#C77DFF"
            placeholder="yours@email.com"
            _placeholder={{ fontSize: "sm", color: "gray.400" }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            display={"flex"}
            justifyContent={"center"}
            w={"100%"}
            rounded={"lg"}
            color={"white"}
            bgColor={"#9D4EDD"}
            _hover={{ bgColor: "#B75CFF" }}
            _active={{ bgColor: "#6C12B5" }}
          >
            Send Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPassModal;
