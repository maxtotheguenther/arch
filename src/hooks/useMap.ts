import { MapContext, MapCtx } from "../pages/[id]/index";
import { useContext } from "react";

export const useMap = (): MapContext => {
  const ctx = useContext(MapCtx);
  if (!ctx) throw new Error("not inside map.");
  return ctx;
};
