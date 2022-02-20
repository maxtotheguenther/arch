import {
  Avatar,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { Node, NodeContent, NodeSettings } from "@/components/map/Node";

export const ServerNode = memo(({ isConnectable }: NodeProps) => {
  return (
    <Node>
      <NodeSettings>
        <Card>
          <CardContent>
            <Typography variant="h5">Service</Typography>
            <Stack spacing={2}>
              <TextField label="Name" variant="filled" />
              <TextField label="Beschreibung" variant="filled" />
            </Stack>
          </CardContent>
        </Card>
      </NodeSettings>
      <NodeContent>
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
      </NodeContent>
    </Node>
  );
});
