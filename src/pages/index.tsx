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
  updateEdge,
} from "react-flow-renderer";
import type { Property } from "csstype";
import { v4 as uuid } from "uuid";

type AddEvent = {
  cursor: Property.Cursor;
  onLocationSelect: (x: number, y: number) => void;
};

const initalElements: Elements = [
  { id: "2", type: "server", position: { x: 100, y: 400 } },
  //{ id: "3", type: "server", position: { x: 300, y: 400 } },
  //{ id: "2-3", source: "2", target: "3", type: "smoothstep", animated: true },
];

const TestPage: NextPage = () => {
  const [elements, setElements] = useState<Elements>(initalElements);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [addEvent, initAddEvent] = useState<AddEvent | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<OnLoadParams | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        cursor: addEvent?.cursor || "default",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component="aside"
        sx={{
          zIndex: 5,
          marginLeft: "10px",
          position: "fixed",
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 1,
            bgcolor: "white",
            height: "auto",
            "& button": {
              userSelect: "none",
              cursor: "pointer",
            },
          }}
        >
          <Stack spacing={1}>
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Add />
              </IconButton>
              <Popover
                sx={{ marginLeft: 2 }}
                id={Boolean(anchorEl) ? "simple-popover" : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
              >
                <Paper sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <IconButton
                      onClick={() => {
                        setAnchorEl(null);
                        initAddEvent({
                          cursor: "crosshair",
                          onLocationSelect: (x, y) => {
                            if (
                              !reactFlowWrapper ||
                              !reactFlowWrapper.current ||
                              !reactFlowInstance
                            )
                              throw new Error("refs not initialized...");
                            const reactFlowBounds =
                              reactFlowWrapper.current.getBoundingClientRect();
                            const position = reactFlowInstance.project({
                              x: x - reactFlowBounds.left,
                              y: y - reactFlowBounds.top,
                            });
                            setElements((els) =>
                              els.concat({
                                id: uuid(),
                                type: "server",
                                position,
                              })
                            );
                            initAddEvent(null);
                          },
                        });
                      }}
                    >
                      <Avatar
                        sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}
                      >
                        Server
                      </Avatar>
                    </IconButton>
                  </Stack>
                </Paper>
              </Popover>
            </>
          </Stack>
        </Paper>
      </Box>
      <Box sx={{ widht: "100%", height: "100%" }} ref={reactFlowWrapper}>
        <NoSsr>
          <ReactFlow
            {...(addEvent && {
              onClick: (e) => addEvent.onLocationSelect(e.pageX, e.pageY),
            })}
            nodeTypes={{ server: Server }}
            snapToGrid={true}
            snapGrid={[5, 5]}
            elements={elements}
            draggable={false}
            onLoad={(flow) => {
              flow.fitView();
              setReactFlowInstance(flow);
            }}
            onConnect={(params) =>
              setElements((els) =>
                addEdge({ ...params, type: "smoothstep", animated: true }, els)
              )
            }
            onEdgeUpdate={(oldEdge, newConnection) =>
              setElements((els) => updateEdge(oldEdge, newConnection, els))
            }
          >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
          </ReactFlow>
        </NoSsr>
      </Box>
    </Box>
  );
};

export default TestPage;

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
