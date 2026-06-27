import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../primitives/Button";
import { ConfirmDialog } from "./ConfirmDialog";
import { Dialog } from "./Dialog";

describe("overlays", () => {
  it("opens Dialog, locks scroll, and closes with Escape", async () => {
    const user = userEvent.setup();
    render(
      <Dialog title="Edit profile" trigger={<Button>Edit</Button>}>
        Dialog content
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Edit" }));
    expect(screen.getByRole("dialog", { name: "Edit profile" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Edit profile" })
    ).not.toBeInTheDocument();
  });

  it("runs ConfirmDialog confirmation action", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        title="Delete item?"
        description="This cannot be undone."
        trigger={<Button>Delete</Button>}
        onConfirm={onConfirm}
      />
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
