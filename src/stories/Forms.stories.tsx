import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
  Button,
  Checkbox,
  Field,
  Input,
  RadioGroup,
  SearchInput,
  Select,
  Slider,
  Stack,
  Switch,
  Textarea
} from "../index";

const meta = {
  title: "Components/Forms",
  tags: ["autodocs", "stable"],
  parameters: {
    docs: {
      description: {
        component:
          "Form components share Field-generated IDs, descriptions, error messages, and ARIA state while remaining form-library agnostic."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFields: Story = {
  render: () => (
    <Stack className="max-w-md">
      <Input label="Email" type="email" placeholder="name@example.com" required />
      <Input
        label="Workspace"
        description="Use lowercase letters and hyphens."
        defaultValue="design-system"
      />
      <Input
        label="Token"
        error="Token must be at least 24 characters."
        defaultValue="short"
      />
      <Textarea label="Project notes" placeholder="Add implementation notes..." />
    </Stack>
  )
};

export const Search: Story = {
  render: function SearchStory() {
    const [value, setValue] = React.useState("tokens");
    return (
      <SearchInput
        label="Search components"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onClear={() => setValue("")}
      />
    );
  }
};

export const ChoiceControls: Story = {
  render: () => (
    <Stack className="max-w-md">
      <Checkbox
        label="Enable beta features"
        description="Feature flags can change weekly."
      />
      <Switch label="Email notifications" defaultChecked />
      <RadioGroup
        label="Density"
        defaultValue="comfortable"
        options={[
          { label: "Compact", value: "compact", description: "More rows per screen." },
          { label: "Comfortable", value: "comfortable", description: "Balanced spacing." }
        ]}
      />
    </Stack>
  )
};

export const SelectAndSlider: Story = {
  render: () => (
    <Stack className="max-w-md">
      <Select
        label="Region"
        defaultValue="us"
        options={[
          { label: "United States", value: "us" },
          { label: "Singapore", value: "sg" },
          { label: "Japan", value: "jp" }
        ]}
      />
      <Slider label="Allocation" defaultValue={[45]} max={100} step={5} />
    </Stack>
  )
};

export const FormComposition: Story = {
  render: () => (
    <form className="max-w-md space-y-4">
      <Input label="Name" required />
      <Field
        label="Custom field"
        description="Use Field when composing a bespoke control."
      >
        {(field) => (
          <input
            id={field.id}
            aria-describedby={field.describedBy}
            className="h-10 w-full rounded-md border border-input bg-surface px-3"
          />
        )}
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  )
};
