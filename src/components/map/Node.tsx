import { Settings } from "@mui/icons-material";
import { Box, IconButton, Popover } from "@mui/material";
import { useState } from "react";

export const Node: React.FC = ({ children }) => {
  return <Box sx={{ position: "relative" }}>{children}</Box>;
};

export const NodeContent: React.FC = ({ children }) => {
  return <Box p={1}>{children}</Box>;
};

export const NodeSettings: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disableRipple
        sx={{
          position: "absolute",
          top: -30,
          right: -30,
        }}
      >
        <Settings sx={{ height: 20, width: 20 }} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {children}
      </Popover>
    </>
  );
};
