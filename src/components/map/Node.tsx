import { Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Children, memo, ReactNodeArray, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";

export const Node: React.FC = ({ children }) => {
  return <Box sx={{ position: "relative" }}>{children}</Box>;
};

export const NodeContent: React.FC = ({ children }) => {
  return <>{children}</>;
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
          top: -25,
          right: -25,
        }}
      >
        <Settings />
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
