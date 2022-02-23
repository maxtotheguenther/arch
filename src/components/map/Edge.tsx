import React from "react";
import {
  EdgeProps,
  getBezierPath,
  getEdgeCenter,
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
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  console.log("STYLE", { d: edgePath, style });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <rect
        width="20"
        height="20"
        style={{
          fill: "red",
          stroke: "black",
          strokeWidth: 5,
          opacity: 0.5,
        }}
      >
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        <svg>
          <div>asdasddddddddddddddddddddddddddddddddddddddddddddddddd</div>
        </svg>
      </rect>
    </>
  );
};
