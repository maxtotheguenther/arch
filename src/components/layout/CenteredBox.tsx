import Box from "@mui/material/Box";

export const CenteredBox: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};
