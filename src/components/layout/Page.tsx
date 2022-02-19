import { Container } from "@mui/material";

export const Page: React.FC = ({ children }) => {
  return (
    <Container sx={{ height: "100%" }} maxWidth="lg">
      {children}
    </Container>
  );
};
