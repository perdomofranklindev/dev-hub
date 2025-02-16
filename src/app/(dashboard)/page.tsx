import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <Box>
        <Button variant="contained" color="primary">Hello</Button>
        <Button variant="contained" color="secondary">Hello</Button>
        <Button variant="contained" color="warning">Hello</Button>
        <Button variant="contained" color="error">Hello</Button>
        <Button variant="contained" color="info">Hello</Button>
        <Button variant="contained" color="success">Hello</Button>

      </Box>
    </div>
  );
}
