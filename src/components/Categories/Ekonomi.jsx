import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Button } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BlogCard from "../BlogCard";

const Ekonomi = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [popularArticles, setPopularArticles] = useState([]);

  const fetchData = async () => {
    try {
      const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=2&sort=DESC&page=${index}&size=10&orderBy=total_fav`;
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
  }, []);

  const sortedArticles = articles
    .sort((a, b) => b.total_fav - a.total_fav)
    .slice(0, 10);

  // Update popular articles whenever the sorted articles change
  useState(() => {
    setPopularArticles(sortedArticles);
  }, [sortedArticles]);

  const handleNextPage = () => {
    if (index < page) setIndex(index + 1);
  };

  const handlePrevPage = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
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

  return (
    <Box>
      <Box m={"40px 0px 16px"}>
        <Heading fontSize={"4xl"}>Economy</Heading>
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

export default Ekonomi;
