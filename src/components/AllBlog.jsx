import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BlogCard from "./BlogCard";

const Explore = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(0);


  const fetchData = async () => {
    try {
      const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategory}&sort=${sortOrder}&page=${index}&search=${searchTerm}`;
      const response = await axios.get(url);
      // console.log(response.data);
      setPage(response.data.page);
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, sortOrder, index, searchTerm]);

  const handleNextPage = () => {
    if (index < page) setIndex(index + 1);
  };

  const handlePrevPage = () => {
    if (index > 1) {
      setIndex(index - 1);
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

  const handlePageChange = (pageIndex) => {
    setIndex(pageIndex);
  };
  const renderPageButtons = () => {
    const totalPages = page;
    const startPage = Math.max(1, index - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    const pageButtons = [];
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      pageButtons.push(
        <Button
          key={pageNum}
          mx={1}
          size="sm"
          onClick={() => handlePageChange(pageNum)}
          isActive={index === pageNum}
          disabled={index === pageNum}
        >
          {pageNum}
        </Button>
      );
    }

    return pageButtons;
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
      <Box m={"40px 0px 24px"}>
        <Heading fontSize={"4xl"}>All Articles</Heading>
      </Box>
      <Box
        my={"16px"}
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
      <Box>
        <Swiper slidesPerView={4}>
          {sortedArticles
            .slice((activePage - 1) * 5, activePage * 5)
            .map((article) => (
              <SwiperSlide key={article.id}>
                <BlogCard
                  title={article.title}
                  content={article.content}
                  username={article.User.username}
                  createdAt={article.createdAt}
                  name={article.Category.name}
                  imageURL={article.imageURL}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          size={"sm"}
          colorScheme="blackAlpha"
          onClick={handlePrevPage}
          disabled={activePage === 1}
        >
          Previous
        </Button>
        {renderPageButtons()}
        <Button
          size={"sm"}
          colorScheme="blackAlpha"
          onClick={handleNextPage}
          disabled={activePage === Math.ceil(articles.length / 5)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Explore;
