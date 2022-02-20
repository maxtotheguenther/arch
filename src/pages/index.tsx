import { NextPage } from "next";
import { Background, BackgroundVariant, Controls } from "react-flow-renderer";
import { Sidebar } from "@/components/map/Sidebar";
import { SidebarAddAction } from "@/components/map/SidebarAddAction";
import { Map } from "@/components/map/Map";
import { ServerNode } from "@/components/map/ServerNode";

const Page: NextPage = () => {
  return (
    <Map
      elements={[{ id: "2", type: "server", position: { x: 100, y: 400 } }]}
      nodeTypes={{ server: ServerNode }}
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
