import { Connection } from "react-flow-renderer";

export function preventOwnConnection(connection: Connection) {
  return connection.target !== connection.source;
}
