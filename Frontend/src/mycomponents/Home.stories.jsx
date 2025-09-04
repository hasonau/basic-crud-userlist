import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "MyComponents/Home",
  component: Home,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = () => <Home />;
