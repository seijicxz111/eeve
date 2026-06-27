import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";
import { Switch } from "./Switch";
import { Textarea } from "./Textarea";

describe("form controls", () => {
  it("links labels, descriptions, errors, and invalid state for Input", () => {
    render(
      <Input
        label="Email"
        description="Use a work address."
        error="Email is required."
        required
      />
    );

    const input = screen.getByLabelText(/email/i);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Use a work address. Email is required.");
    expect(screen.getByRole("alert")).toHaveTextContent("Email is required.");
  });

  it("supports uncontrolled and controlled checkbox state", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Checkbox
        label="Accept terms"
        defaultChecked={false}
        onCheckedChange={onCheckedChange}
      />
    );

    await user.click(screen.getByRole("checkbox", { name: /accept terms/i }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("supports textarea native attributes", () => {
    render(<Textarea label="Notes" maxLength={120} readOnly defaultValue="Draft" />);
    const textarea = screen.getByLabelText("Notes");
    expect(textarea).toHaveValue("Draft");
    expect(textarea).toHaveAttribute("maxlength", "120");
    expect(textarea).toHaveAttribute("readonly");
  });

  it("supports radio and switch keyboard interaction", async () => {
    const user = userEvent.setup();
    render(
      <>
        <RadioGroup
          label="Plan"
          defaultValue="free"
          options={[
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" }
          ]}
        />
        <Switch label="Notifications" />
      </>
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();

    const switchControl = screen.getByRole("switch", { name: /notifications/i });
    switchControl.focus();
    await user.keyboard("[Space]");
    expect(switchControl).toBeChecked();
  });
});
