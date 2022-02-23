import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { NodeProps, Position, Handle } from "react-flow-renderer";
import { Node, NodeContent, NodeSettings } from "@/components/map/Node";
import Image from "next/image";
import { preventOwnConnection } from "src/utils/map";

export const GatewayNode = memo(({ isConnectable }: NodeProps) => {
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
        <GatewayIcon />
        <Handle
          type="source"
          position={Position.Top}
          id="a"
          isConnectable={isConnectable}
          isValidConnection={preventOwnConnection}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={isConnectable}
          isValidConnection={preventOwnConnection}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="c"
          isConnectable={isConnectable}
          isValidConnection={preventOwnConnection}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="d"
          isConnectable={isConnectable}
          isValidConnection={preventOwnConnection}
        />
      </NodeContent>
    </Node>
  );
});

export const GatewayIcon: React.FC = () => {
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
      <Image src="/gateway.png" layout="fill" />
    </Box>
  );
};
