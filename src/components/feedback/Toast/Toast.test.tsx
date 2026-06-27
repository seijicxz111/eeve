import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "../../primitives/Button";
import { ToastProvider, useToast } from "./Toast";

function ToastLauncher() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Saved",
          description: "Your changes were saved successfully.",
          variant: "success",
          duration: 100000
        })
      }
    >
      Launch toast
    </Button>
  );
}

describe("Toast", () => {
  it("creates and dismisses notifications", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastLauncher />
      </ToastProvider>
    );

    await user.click(screen.getByRole("button", { name: /launch toast/i }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved successfully.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /dismiss notification/i }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });
});
