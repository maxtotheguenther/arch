import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { Node } from "@/components/map/Node";
import Image from "next/image";

const GatewayNode = memo((props: NodeProps) => {
  return (
    <Node
      {...props}
      settings={(base) => (
        <Card>
          <CardContent>
            <Typography variant="h5">Service</Typography>
            <Stack spacing={2}>
              <TextField label="Name" variant="filled" />
              <TextField label="Beschreibung" variant="filled" />
            </Stack>
          </CardContent>
        </Card>
      )}
    >
      <GatewayIcon />
    </Node>
  );
});

GatewayNode.displayName = "GatewayNode";

const GatewayIcon: React.FC = () => {
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
      <Image alt="gateway" src="/gateway.png" layout="fill" />
    </Box>
  );
};

export { GatewayIcon, GatewayNode };
