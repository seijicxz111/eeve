import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  ConfirmDialog,
  Dialog,
  Drawer,
  Input,
  Popover,
  Stack,
  Tooltip
} from "../index";

const meta = {
  title: "Components/Overlays",
  tags: ["autodocs", "stable"]
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogExample: Story = {
  render: () => (
    <Dialog
      title="Edit workspace"
      description="Changes apply to every project in this workspace."
      trigger={<Button>Edit workspace</Button>}
      footer={<Button>Save</Button>}
    >
      <Stack>
        <Input label="Workspace name" defaultValue="Design system" />
        <Input label="Slug" defaultValue="design-system" />
      </Stack>
    </Dialog>
  )
};

export const DrawerExample: Story = {
  render: () => (
    <Drawer
      title="Settings"
      description="Manage notification and security preferences."
      trigger={<Button variant="outline">Open drawer</Button>}
      footer={<Button>Save settings</Button>}
    >
      <Stack>
        <Input label="Primary email" defaultValue="team@example.com" />
        <Input label="Backup email" />
      </Stack>
    </Drawer>
  )
};

export const TooltipAndPopover: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Tooltip content="This action creates a release candidate.">
        <Button variant="outline">Hover for help</Button>
      </Tooltip>
      <Popover
        trigger={<Button variant="outline">Open popover</Button>}
        title="Popover title"
      >
        <p className="text-sm text-muted-foreground">
          Popovers support rich interactive content and close on outside interaction.
        </p>
      </Popover>
    </div>
  )
};

export const Confirmation: Story = {
  render: () => (
    <ConfirmDialog
      title="Delete token?"
      description="This action cannot be undone. Existing integrations will stop working."
      trigger={<Button variant="destructive">Delete token</Button>}
      confirmLabel="Delete"
      variant="destructive"
      onConfirm={() => undefined}
    />
  )
};
