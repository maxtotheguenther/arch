import { Box, IconButton, Paper, Typography } from "@mui/material";
import { memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { Node } from "@/components/map/Node";
import Image from "next/image";
import { Delete } from "@mui/icons-material";

const ServerNode = memo((props: NodeProps) => {
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
      <Typography variant="caption">Beus-API</Typography>
    </Node>
  );
});

ServerNode.displayName = "ServerNode";

const ServerIcon: React.FC = () => {
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
      <Image alt="server" src="/server.png" layout="fill" />
    </Box>
  );
};

export { ServerNode, ServerIcon };
