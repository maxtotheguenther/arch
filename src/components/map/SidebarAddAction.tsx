import { useMap } from "@/hooks/useMap";
import { Add } from "@mui/icons-material";
import { Avatar, IconButton, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { SidebarAction } from "./Sidebar";
import { v4 as uuid } from "uuid";
import { ServerIcon } from "./ServerNode";
import { ClientIcon } from "./ClientNode";
import { GatewayIcon } from "./GatewayNode";

export const SidebarAddAction: React.FC = () => {
  const { addElement } = useMap();
  return (
    <SidebarAction
      id="add"
      icon={<Add />}
      content={(setAnchorEl) => (
        <Stack spacing={2}>
          <IconButton
            onClick={() => {
              setAnchorEl(null);
              addElement({
                cursor: "crosshair",
                element: { id: uuid(), type: "server" },
              });
            }}
          >
            <ServerIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setAnchorEl(null);
              addElement({
                cursor: "crosshair",
                element: { id: uuid(), type: "client" },
              });
            }}
          >
            <ClientIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setAnchorEl(null);
              addElement({
                cursor: "crosshair",
                element: { id: uuid(), type: "gateway" },
              });
            }}
          >
            <GatewayIcon />
          </IconButton>
        </Stack>
      )}
    />
  );
};
