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

export const ClientNode = memo((props: NodeProps) => {
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
      <ClientIcon />
    </Node>
  );
});

export const ClientIcon: React.FC = () => {
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
      <Image src="/laptop.png" layout="fill" />
    </Box>
  );
};
