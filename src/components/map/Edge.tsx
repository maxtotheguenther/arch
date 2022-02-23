import React from "react";
import {
  EdgeProps,
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";
import styles from "./Edge.module.scss";

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
      <svg
        x={edgeCenterX - 40 / 2}
        y={edgeCenterY - 40 / 2}
        width="40"
        height="40"
        className={styles.Edge}
        style={{
          offsetPath: `path('${edgePath}')`,
        }}
      >
        <rect
          style={{
            width: "100%",
            height: "100%",
            fill: "red",
            stroke: "black",
            strokeWidth: 5,
            opacity: 0.5,
          }}
        />
      </svg>
    </>
  );
};
