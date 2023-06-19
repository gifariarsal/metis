import {
  Box,
  Flex,
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
      <Flex flexDir={"column"} align={"center"}>
        <Box m={"40px 60px"}>
          <ProfileDetail />
        </Box>
        <Box m={"40px 60px"}>
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
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
        </Box>
      </Flex>
    </>
  );
};

export default UserProfile;
