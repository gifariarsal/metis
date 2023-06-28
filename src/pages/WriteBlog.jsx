import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeArticle } from "../redux/reducer/ArticleReducer";

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

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategory(res.data);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      country: document.getElementById("country").value,
      CategoryId: selectedOption,
      url: "/",
      keywords: document.getElementById("keywords").value,
    };
    const file = document.getElementById("file").files[0];
    dispatch(makeArticle(data, file));
  };

  return (
    <Box>
      <Navbar />
      <form onSubmit={handleSubmit}>
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
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" id="title" rounded={"lg"} />
          </FormControl>
          <FormControl id="content">
            <FormLabel>Content</FormLabel>
            <Textarea h={"250px"}></Textarea>
          </FormControl>
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Select value={selectedOption} onChange={handleOptionChange}>
              <option value="">Select Category</option>
              {category &&
                category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Keyword</FormLabel>
            <Input type="text" id="keywords" />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input type="text" id="country" />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              id="file"
              variant={""}
              accept=".jpg, .jpeg, png"
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <Box mb={6} position={"relative"}>
                <img
                  src={selectedImage}
                  alt="Preview"
                  style={{
                    maxWidth: "332px",
                    maxHeight: "300px",
                    marginTop: "10px",
                  }}
                />
              </Box>
            )}
            <FormHelperText fontSize={"xs"} color={"gray.400"}>
              Image format should be .jpg, .jpeg, or .png with maximum size is 2
              MB
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            display={"flex"}
            justifyContent={"center"}
            w={"100%"}
            mt={"10"}
            rounded={"lg"}
            color={"white"}
            bgColor={"#9D4EDD"}
            _hover={{ bgColor: "#B75CFF" }}
            _active={{ bgColor: "#6C12B5" }}
          >
            Publish
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default withAuth(WriteBlog);
