import { Box, NoSsr, Paper, Typography } from "@mui/material";
import { createContext, RefObject, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  ArrowHeadType,
  ConnectionMode,
  Elements,
  FlowElement,
  MiniMap,
  OnLoadParams,
  updateEdge,
  Background,
  Controls,
  BackgroundVariant,
  removeElements,
} from "react-flow-renderer";
import type { Property } from "csstype";
import { ServerNode } from "@/components/map/ServerNode";
import { ClientNode } from "@/components/map/ClientNode";
import { GatewayNode } from "@/components/map/GatewayNode";
import { CustomizableEdge } from "@/components/map/Edge";
import { NextPage } from "next";
import { Sidebar } from "@/components/map/Sidebar";
import { SidebarAddAction } from "@/components/map/SidebarAddAction";
import Head from "next/head";

type AddElementEvent = {
  cursor: Property.Cursor;
  element: Omit<FlowElement, "position">;
};

export type MapContext = {
  wrapper: RefObject<HTMLDivElement>;
  instance: OnLoadParams<any> | null;
  addElement: (props: AddElementEvent) => void;
  removeElement: (id: string) => void;
};

export const MapCtx = createContext<MapContext | null>(null);

const Map: NextPage = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [addEvent, setAddEvent] = useState<AddElementEvent | null>(null);
  const [instance, setInstance] = useState<OnLoadParams | null>(null);
  const [elements, setElements] = useState<Elements>([]);

  function add(x: number, y: number) {
    if (addEvent) {
      if (!wrapper.current || !instance) return;
      const bounds = wrapper.current.getBoundingClientRect();
      setElements((els) =>
        els.concat({
          ...addEvent.element,
          position: instance.project({
            x: x - bounds.left,
            y: y - bounds.top,
          }),
        })
      );
      setAddEvent(null);
    }
  }

  function removeElement(id: string) {
    const element = elements.filter((_) => _.id === id);
    const updatedElements = removeElements(element, elements);
    setElements(updatedElements);
  }

  return (
    <>
      <Head>
        <title>A title</title>
        <meta name="description" content="A site with a seo description" />
      </Head>
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            cursor: addEvent?.cursor || "default",
          }}
          ref={wrapper}
        >
          <NoSsr>
            <MapCtx.Provider
              value={{
                addElement: setAddEvent,
                removeElement,
                wrapper,
                instance,
              }}
            >
              <ReactFlow
                {...(addEvent && {
                  onClick: (e) => add(e.pageX, e.pageY),
                })}
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
                elements={elements}
                onLoad={(flow) => {
                  flow.fitView();
                  setInstance(flow);
                }}
                onConnect={(params) => {
                  setElements((els) =>
                    addEdge(
                      {
                        ...params,
                        type: "customizable",
                        arrowHeadType: ArrowHeadType.ArrowClosed,
                      },
                      els
                    )
                  );
                }}
                onEdgeUpdate={(oldEdge, newConnection) =>
                  setElements((els) => updateEdge(oldEdge, newConnection, els))
                }
              >
                {instance !== null ? (
                  <>
                    <Sidebar>
                      <SidebarAddAction />
                    </Sidebar>
                    <Background variant={BackgroundVariant.Dots} />
                    <Controls />
                    <MiniMap />
                  </>
                ) : null}
              </ReactFlow>
            </MapCtx.Provider>
          </NoSsr>
        </Box>
        <Box
          sx={{
            zIndex: 5,
            right: 0,
            width: "15%",
            height: "100%",
          }}
        >
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h4">Hello</Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Map;
