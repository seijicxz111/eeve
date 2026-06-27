import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
  Breadcrumb,
  Button,
  DropdownMenu,
  NavigationMenu,
  Pagination,
  Tabs
} from "../index";

const meta = {
  title: "Components/Navigation",
  tags: ["autodocs", "stable"]
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsExample: Story = {
  render: () => (
    <Tabs
      defaultValue="overview"
      items={[
        { label: "Overview", value: "overview", content: "Overview content" },
        { label: "Analytics", value: "analytics", content: "Analytics content" },
        { label: "Settings", value: "settings", content: "Settings content" }
      ]}
    />
  )
};

export const Breadcrumbs: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Libraries", href: "/libraries" },
        { label: "UI Components", current: true }
      ]}
    />
  )
};

export const PaginationExample: Story = {
  render: function PaginationStory() {
    const [page, setPage] = React.useState(4);
    return <Pagination count={10} page={page} onPageChange={setPage} />;
  }
};

export const MenuAndNavigation: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <NavigationMenu
        items={[
          { label: "Dashboard", href: "#", active: true },
          { label: "Components", href: "#" },
          { label: "Settings", href: "#" }
        ]}
      />
      <DropdownMenu
        trigger={<Button variant="outline">Actions</Button>}
        items={[
          { label: "Duplicate", shortcut: "D" },
          { label: "Archive", shortcut: "A" },
          { type: "separator" },
          { label: "Delete", shortcut: "Del" }
        ]}
      />
    </div>
  )
};
