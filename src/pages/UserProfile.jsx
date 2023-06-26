import {
  Box,
  Select,
  Spacer,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProfileDetail from "../components/ProfileDetail";
import Navbar from "../components/Navbar";
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

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <Box display={"flex"} justifyContent={"center"} m={"40px 60px"}>
        <ProfileDetail />
      </Box>
      <Box display={"flex"} justifyContent={"flex-start"} m={"40px 60px"}>
        <Tabs position="relative" variant="unstyled">
          <TabList gap={10}>
            <Tab>My Writings</Tab>
            <Tab>Bookmarks</Tab>
            <Tab>Likes</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="#9D4EDD"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Spacer />
        <Select focusBorderColor="#C77DFF" w={"fit-content"}>
          <option value="newest" defaultChecked>
            Newest
          </option>
          <option value="latest">Latest</option>
        </Select>
      </Box>
    </>
  );
};

export default withAuth(UserProfile);
