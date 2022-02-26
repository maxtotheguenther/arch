import { Delete } from "@mui/icons-material";
import { Box, IconButton, Popover } from "@mui/material";
import { useEffect } from "react";
import { ReactNode, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { preventOwnConnection } from "src/utils/map";

export const Node: React.FC<
  NodeProps & { settings: (props: { baseSettings: ReactNode }) => ReactNode }
> = ({ children, settings, xPos, yPos, ...props }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x?: number; y?: number } | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (props.isDragging) {
      setAnchorEl(null);
      setIsSelected(false);
    }
  }, [props.isDragging]);
  return (
    <>
      <Box>
        <Box
          onMouseDown={() => {
            setPos({ x: xPos, y: yPos });
          }}
          onMouseUp={(e) => {
            if (xPos !== pos?.x || yPos !== pos?.y) return;
            setAnchorEl(e.currentTarget);
            setIsSelected(true);
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
          isConnectable={props.isConnectable}
          isValidConnection={preventOwnConnection}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={props.isConnectable}
          isValidConnection={preventOwnConnection}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="c"
          isConnectable={props.isConnectable}
          isValidConnection={preventOwnConnection}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="d"
          isConnectable={props.isConnectable}
          isValidConnection={preventOwnConnection}
        />
      </Box>
      <Popover
        sx={{ top: -20 }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setIsSelected(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {settings({
          baseSettings: (
            <>
              <IconButton>
                <Delete />
              </IconButton>
            </>
          ),
        })}
      </Popover>
    </>
  );
};
