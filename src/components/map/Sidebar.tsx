import { Box, IconButton, Paper, Popover, Stack } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export const Sidebar: React.FC = ({ children }) => {
  return (
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
        <Stack spacing={1}>{children}</Stack>
      </Paper>
    </Box>
  );
};

export const SidebarAction: React.FC<{
  id: string;
  icon: ReactNode;
  content: (
    setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
  ) => ReactNode;
}> = ({ id, icon, content }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        {icon}
      </IconButton>
      <Popover
        sx={{ marginLeft: 2 }}
        id={Boolean(anchorEl) ? `${id}-popover` : undefined}
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
        <Paper sx={{ p: 2 }}>{content(setAnchorEl)}</Paper>
      </Popover>
    </>
  );
};
