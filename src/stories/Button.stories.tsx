import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button, IconButton } from "../index";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs", "stable"],
  args: {
    children: "Save changes",
    onClick: fn()
  },
  parameters: {
    componentSubtitle:
      "A polymorphic action primitive with variants, sizes, loading states, and accessible disabled behavior."
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <IconButton icon={<span aria-hidden="true">+</span>} label="Create item" />
    </div>
  )
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "Saving profile"
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /save changes/i }));
    await expect(args.onClick).toHaveBeenCalled();
  }
};
