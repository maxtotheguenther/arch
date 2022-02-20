import { useMap } from "@/hooks/useMap";
import { Add } from "@mui/icons-material";
import { Avatar, IconButton, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { SidebarAction } from "./Sidebar";
import { v4 as uuid } from "uuid";

export const SidebarAddAction: React.FC = () => {
  const { wrapper, instance, addEvent } = useMap();
  return (
    <SidebarAction
      id="add"
      icon={<Add />}
      content={(setAnchorEl) => (
        <Stack spacing={2}>
          <IconButton
            onClick={() => {
              setAnchorEl(null);
              addEvent({
                cursor: "crosshair",
                element: { id: uuid(), type: "server" },
              });
            }}
          >
            <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>
              Server
            </Avatar>
          </IconButton>
        </Stack>
      )}
    />
  );
};
