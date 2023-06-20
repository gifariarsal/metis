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
import React from "react";
import ProfileDetail from "../components/ProfileDetail";
import NavbarUser from "../components/NavbarUser";

const UserProfile = () => {
  return (
    <>
      <NavbarUser />
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

export default UserProfile;
