import { NextPage } from "next";
import {
  Background as MapBackground,
  BackgroundVariant,
  ConnectionMode,
  Controls as MapControls,
} from "react-flow-renderer";
import { Sidebar } from "@/components/map/Sidebar";
import { SidebarAddAction } from "@/components/map/SidebarAddAction";
import { Map } from "@/components/map/Map";
import { ServerNode } from "@/components/map/ServerNode";
import { ClientNode } from "@/components/map/ClientNode";
import { GatewayNode } from "@/components/map/GatewayNode";

const Page: NextPage = () => {
  return (
    <Map
      elements={[{ id: "2", type: "server", position: { x: 100, y: 400 } }]}
      nodeTypes={{
        server: ServerNode,
        client: ClientNode,
        gateway: GatewayNode,
      }}
      snapToGrid={true}
      snapGrid={[5, 5]}
      connectionMode={ConnectionMode.Loose}
    >
      <Sidebar>
        <SidebarAddAction />
      </Sidebar>
      <MapBackground variant={BackgroundVariant.Dots} />
      <MapControls />
    </Map>
  );
};

export default Page;
