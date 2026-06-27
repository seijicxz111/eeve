import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders variants, custom classes, and native attributes", () => {
    render(
      <Button variant="secondary" className="custom-class" data-testid="button">
        Save
      </Button>
    );

    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("Save");
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveAttribute("type", "button");
  });

  it("forwards refs", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Focusable</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports polymorphic rendering with asChild", () => {
    render(
      <Button asChild>
        <a href="/docs">Read docs</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Read docs" });
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("handles clicks and keyboard activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Activate</Button>);

    const button = screen.getByRole("button", { name: "Activate" });
    button.focus();
    await user.keyboard("[Enter]");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("prevents disabled and loading actions", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button loading loadingText="Saving profile" onClick={onClick}>
          Save
        </Button>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Disabled" }));
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Saving profile")).toHaveClass("sr-only");
    expect(screen.getByRole("button", { name: /save/i })).toHaveAttribute(
      "aria-busy",
      "true"
    );
    expect(onClick).not.toHaveBeenCalled();
  });
});
