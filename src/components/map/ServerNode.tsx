import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { Node } from "@/components/map/Node";
import Image from "next/image";
import { useMap } from "@/hooks/useMap";
import { Delete } from "@mui/icons-material";

export const ServerNode = memo((props: NodeProps) => {
  return (
    <Node
      {...props}
      settings={(base) => (
        <Paper sx={{ p: 1 }}>
          <Box sx={{ display: "flex" }}>
            <IconButton>
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      )}
    >
      <ServerIcon />
    </Node>
  );
});

export const ServerIcon: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 50,
        height: 50,
        "& img": {
          userSelect: "none",
          pointerEvents: "none",
        },
      }}
    >
      <Image src="/server.png" layout="fill" />
    </Box>
  );
};
