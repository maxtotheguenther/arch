import { useMap } from "@/hooks/useMap";
import { Add } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { SidebarAction } from "./Sidebar";

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
                onDrop: (x, y) => {
                  if (!wrapper.current) throw new Error("no wrapper detected.");
                  const bounds = wrapper.current.getBoundingClientRect();
                  const position = instance.project({
                    x: x - bounds.left,
                    y: y - bounds.top,
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
            <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>
              Server
            </Avatar>
          </IconButton>
        </Stack>
      )}
    />
  );
};
