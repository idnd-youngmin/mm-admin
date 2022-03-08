import React from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

const Nav = ({ value, setValue, handleChange }) => {
  return (
    <>
      <Box className="nav" sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          className="MuiTabs-flexContainer"
        >
          <Tab value="one" label="대시보드" />
          <Tab value="two" label="유저" />
          <Tab value="three" label="상품" />
          <Tab value="four" label="관리자" />
        </Tabs>
      </Box>
    </>
  );
};

export default Nav;
