import { useKeyPress } from "@/hooks/useKeyPress";
import { useMap } from "@/hooks/useMap";
import { Delete } from "@mui/icons-material";
import { Box, ClickAwayListener, IconButton, Popover } from "@mui/material";
import { useEffect } from "react";
import { ReactNode, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { preventOwnConnection } from "src/utils/map";

export const Node: React.FC<
  NodeProps & { settings: (props: {}) => ReactNode }
> = ({
  children,
  settings,
  xPos,
  yPos,
  isConnectable,
  isDragging,
  id,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x?: number; y?: number } | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const { removeElement, showNodeSettings } = useMap();

  useEffect(() => {
    if (isDragging) {
      setAnchorEl(null);
      setIsSelected(false);
      showNodeSettings(null);
    }
  }, [isDragging]);

  useKeyPress({ keys: ["Delete"], isRegistered: isSelected }, (e) => {
    if (e.code === "Delete") removeElement(id);
  });

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null);
        setIsSelected(false);
        showNodeSettings(null);
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          onMouseDown={() => {
            setPos({ x: xPos, y: yPos });
          }}
          onMouseUp={(e) => {
            if (xPos !== pos?.x || yPos !== pos?.y) return;
            setAnchorEl(e.currentTarget);
            setIsSelected(true);
            showNodeSettings(settings);
          }}
          sx={{
            borderRadius: "4px",
            border: isSelected ? "2px solid lightblue" : "none",
          }}
        >
          {children}
        </Box>
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
      </Box>
      {/**
       * <Popover
        sx={{ top: -20 }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setIsSelected(false);
          showNodeSettings(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      ></Popover>
       */}
    </ClickAwayListener>
  );
};
