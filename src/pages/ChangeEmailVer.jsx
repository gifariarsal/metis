import { Box } from "@chakra-ui/react";
import React from "react";
import ChangeData from "../components/ChangeData";

const ChangeEmailVer = () => {
  return (
    <Box>
      <ChangeData
        title={"Change your email"}
        content={"Click button below to verify your email change"}
      />
    </Box>
  );
};

export default ChangeEmailVer;
