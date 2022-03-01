import React from "react";
import {
  EdgeProps,
  getSmoothStepPath,
  getMarkerEnd,
} from "react-flow-renderer";

export const CustomizableEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}: EdgeProps) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  return (
    <>
      <g>
        <path
          id={id}
          style={{
            strokeWidth: "2px",
            cursor: "pointer",
            pointerEvents: "stroke",
            ...style,
          }}
          className="react-flow__edge-path"
          d={edgePath}
          markerEnd={markerEnd}
        />
      </g>
      {/**<image xlinkHref="/json.png" width="20" height="20">
        <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
      </image> */}
    </>
  );
};
