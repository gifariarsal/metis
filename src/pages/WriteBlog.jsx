import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./WriteBlog.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useNavigate } from "react-router-dom";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const login = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!login) {
        navigate("/sign-in");
      }
    }, [login, navigate]);

    if (!login) {
      return null; // or any other placeholder while checking authentication
    }

    return <Component {...props} />;
  };
}

const WriteBlog = () => {
  //set date published to current date
  const currentDate = new Date().toISOString().split("T")[0];

  const [isFormEmpty, setIsFormEmpty] = useState(false);
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // New state for preview image

  const handleContent = (value) => {
    setContent(value);
  };

  // validation for image size and format
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const allowedSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (file.size > allowedSizeInBytes) {
      alert("File size must be maximum 2MB");
      event.target.value = "";
    } else {
      setPreviewImage(URL.createObjectURL(file)); // Set the preview image URL
    }
  };

  // keywords
  const [keywords, setKeywords] = useState([]);

  const handleKeywordsChange = (newKeywords) => {
    setKeywords(newKeywords);
  };

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan nilai kategori dan kata kunci yang dikirim
    console.log("Kategori:", category);
    console.log("Kata Kunci:", keyword);
    // Reset nilai kategori dan kata kunci
    setCategory("");
    setKeyword("");
  };

  const handleCreateBlog = () => {
    // Check if any required fields are empty
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publicationDate = document.getElementById("publicationDate").value;
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value;

    if (!title || !author || !publicationDate || !category || !content) {
      setIsFormEmpty(true);
      return;
    }

    // Perform create blog logic
    setIsFormEmpty(false);
  };

  return (
    <Box>
      <Navbar />
      <VStack spacing={"4"} p={"20px 200px"}>
        <Text
          w={"100%"}
          fontSize={"2xl"}
          display={"flex"}
          justifyContent={"flex-start"}
          fontWeight={"bold"}
        >
          Write Blog
        </Text>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input type="text" rounded={"lg"} />
        </FormControl>
        <FormControl id="author">
          <FormLabel>Author</FormLabel>
          <Input type="text" rounded={"lg"} />
        </FormControl>
        <FormControl id="date">
          <FormLabel>Date Published</FormLabel>
          <Input type="date" value={currentDate} isDisabled rounded={"lg"} />
        </FormControl>
        <FormControl id="content">
          <FormLabel>Content</FormLabel>
          <div className="text-editor">
            <ReactQuill
              value={content}
              onChange={handleContent}
              required
            ></ReactQuill>
          </div>
        </FormControl>
        <FormControl onSubmit={handleSubmitCategory} id="category">
          <FormLabel>Category</FormLabel>
          <Select
            value={category}
            placeholder="Select category"
            onChange={handleCategoryChange}
          >
            <option value="1">Bisnis</option>
            <option value="2">Ekonomi</option>
            <option value="3">Teknologi</option>
            <option value="4">Olahraga</option>
            <option value="5">Kuliner</option>
            <option value="6">Internasional</option>
            <option value="7">Fiksi</option>
          </Select>
        </FormControl>
        <FormControl id="keyword">
          <FormLabel>Keyword</FormLabel>
          <TagsInput value={keywords} onChange={handleKeywordsChange} />
        </FormControl>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"full"}
        >
          <FormControl id="image">
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              variant={""}
              accept=".jpg, .jpeg, png"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" maxH="200px" />
            )}
            <FormHelperText fontSize={"xs"} color={"gray.400"}>
              Image format should be .jpg, .jpeg, or .png with maximum size is 2
              MB
            </FormHelperText>
          </FormControl>
          <FormControl id="image">
            <FormLabel>Video</FormLabel>
            <Input
              type="file"
              variant={""}
              accept="video/*"
              // onChange={handleImageChange}
            />
            <FormHelperText fontSize={"xs"} color={"gray.400"}>
              Video's maximum size is 100
              MB
            </FormHelperText>
          </FormControl>
        </Box>

        <Button
          display={"flex"}
          justifyContent={"center"}
          w={"100%"}
          mt={"10"}
          rounded={"lg"}
          color={"white"}
          onClick={handleCreateBlog}
          bgColor={"#9D4EDD"}
          _hover={{ bgColor: "#B75CFF" }}
          _active={{ bgColor: "#6C12B5" }}
        >
          Publish
        </Button>
      </VStack>
    </Box>
  );
};

export default withAuth(WriteBlog);
