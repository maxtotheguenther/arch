import { MapContext, MapCtx } from "@/components/map/Map";
import { useContext } from "react";
import { OnLoadParams } from "react-flow-renderer";

export const useMap = (): MapContext & { instance: OnLoadParams<any> } => {
  const ctx = useContext(MapCtx);
  if (!ctx) throw new Error("not inside map.");
  const instance = ctx.instance;
  if (!instance) throw new Error("not initialized yet.");
  return { ...ctx, instance };
};
