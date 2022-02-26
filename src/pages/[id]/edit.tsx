import { NextPage } from "next";
import {
  Background as MapBackground,
  BackgroundVariant,
  ConnectionMode,
  Controls as MapControls,
  MiniMap,
} from "react-flow-renderer";
import { Sidebar } from "@/components/map/Sidebar";
import { SidebarAddAction } from "@/components/map/SidebarAddAction";
import { Map } from "@/components/map/Map";
import { ServerNode } from "@/components/map/ServerNode";
import { ClientNode } from "@/components/map/ClientNode";
import { GatewayNode } from "@/components/map/GatewayNode";
import { CustomizableEdge } from "@/components/map/Edge";
import { Box, Paper, Typography } from "@mui/material";

const Page: NextPage = () => {
  return (
    <Map
      elements={[{ id: "2", type: "server", position: { x: 100, y: 400 } }]}
      nodeTypes={{
        server: ServerNode,
        client: ClientNode,
        gateway: GatewayNode,
      }}
      edgeTypes={{
        customizable: CustomizableEdge,
      }}
      snapToGrid={true}
      snapGrid={[5, 5]}
      connectionMode={ConnectionMode.Loose}
    >
      <Sidebar>
        <SidebarAddAction />
      </Sidebar>
      <Box
        sx={{
          position: "fixed",
          zIndex: 5,
          right: 0,
          width: "20%",
          height: "100%",
        }}
      >
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h4">Hello</Typography>
        </Paper>
      </Box>
      <MapBackground variant={BackgroundVariant.Dots} />
      <MapControls />
      <MiniMap />
    </Map>
  );
};

export default Page;
