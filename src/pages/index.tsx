import { Settings, Add } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  NoSsr,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { NextPage } from "next";
import { memo, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Elements,
  Handle,
  NodeProps,
  OnLoadParams,
  Position,
  ReactFlowProvider,
  updateEdge,
} from "react-flow-renderer";
import type { Property } from "csstype";
import { v4 as uuid } from "uuid";
import { Sidebar, SidebarAction } from "@/components/map/Sidebar";
import { SidebarAddAction } from "@/components/map/SidebarAddAction";
import { Map } from "@/components/map/Map";

type AddEvent = {
  cursor: Property.Cursor;
  onLocationSelect: (x: number, y: number) => void;
};

const Page: NextPage = () => {
  return (
    <Map
      elements={[{ id: "2", type: "server", position: { x: 100, y: 400 } }]}
      nodeTypes={{ server: Server }}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <Sidebar>
        <SidebarAddAction />
      </Sidebar>
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
    </Map>
  );
};

export default Page;

const Server = memo(({ isConnectable }: NodeProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <Box sx={{ position: "relative" }}>
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
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
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
        <Card>
          <CardContent>
            <Typography variant="h5">Service</Typography>
            <Stack spacing={2}>
              <TextField label="Name" variant="filled" />
              <TextField label="Beschreibung" variant="filled" />
            </Stack>
          </CardContent>
        </Card>
      </Popover>
      <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>
        <Handle
          type="target"
          position={Position.Bottom}
          id="a"
          style={{ bottom: 5, marginLeft: 10, background: "green" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={{ bottom: 5, marginRight: 10, background: "red" }}
          isConnectable={isConnectable}
        />
        Server
      </Avatar>
    </Box>
  );
});
