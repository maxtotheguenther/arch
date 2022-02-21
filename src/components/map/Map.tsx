import { Box, NoSsr } from "@mui/material";
import { createContext, RefObject, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Elements,
  FlowElement,
  OnLoadParams,
  ReactFlowProps,
  updateEdge,
} from "react-flow-renderer";
import type { Property } from "csstype";

type AddElementEvent = {
  cursor: Property.Cursor;
  element: Omit<FlowElement, "position">;
};

export type MapContext = {
  wrapper: RefObject<HTMLDivElement>;
  instance: OnLoadParams<any> | null;
  addEvent: (props: AddElementEvent) => void;
};

export const MapCtx = createContext<MapContext | null>(null);

export const Map: React.FC<ReactFlowProps> = ({
  children,
  elements: initalElements,
  ...props
}) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [addEvent, setAddEvent] = useState<AddElementEvent | null>(null);
  const [instance, setInstance] = useState<OnLoadParams | null>(null);
  const [elements, setElements] = useState<Elements>(initalElements);

  function add(x: number, y: number) {
    if (addEvent) {
      if (!wrapper.current || !instance)
        throw new Error("no wrapper or instance available");
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

  return (
    <Box
      sx={{
        widht: "100%",
        height: "100%",
        cursor: addEvent?.cursor || "default",
      }}
      ref={wrapper}
    >
      <NoSsr>
        <MapCtx.Provider value={{ addEvent: setAddEvent, wrapper, instance }}>
          <ReactFlow
            {...props}
            {...(addEvent && {
              onClick: (e) => add(e.pageX, e.pageY),
            })}
            elements={elements}
            onLoad={(flow) => {
              props.onLoad?.(flow);
              flow.fitView();
              setInstance(flow);
            }}
            onConnect={(params) =>
              setElements((els) =>
                addEdge(
                  { ...params, type: "customizable", animated: true },
                  els
                )
              )
            }
            onEdgeUpdate={(oldEdge, newConnection) =>
              setElements((els) => updateEdge(oldEdge, newConnection, els))
            }
          >
            {instance !== null ? children : null}
          </ReactFlow>
        </MapCtx.Provider>
      </NoSsr>
    </Box>
  );
};
