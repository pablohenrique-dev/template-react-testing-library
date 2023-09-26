import { render } from "@testing-library/react";
import { Button } from "./components/Button";

// test("test", () => {
//   const { getByText } = render(<Button />);

//   const button = getByText("Comprar");

//   expect(button).toBeTruthy();
// });

describe("Button component", () => {
  it("Should render a button component", () => {
    const { getByText } = render(<Button />);

    expect(getByText("Comprar agora")).toHaveAttribute("class", "test");
  });
});
