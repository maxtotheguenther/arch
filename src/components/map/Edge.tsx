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

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <image xlinkHref="/json.png" width="30" height="30">
        <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
      </image>
    </>
  );
};
