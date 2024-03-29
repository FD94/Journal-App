import { Box, Toolbar } from "@mui/material";
import { Navbar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Navbar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
