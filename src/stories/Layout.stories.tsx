import type { Meta, StoryObj } from "@storybook/react-vite";

import { AspectRatio, Badge, Container, Grid, Inline, Stack } from "../index";

const meta = {
  title: "Components/Layout",
  tags: ["autodocs", "stable"]
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayoutPrimitives: Story = {
  render: () => (
    <Container size="md">
      <Stack gap={6}>
        <Inline>
          <Badge>Stack</Badge>
          <Badge>Inline</Badge>
          <Badge>Container</Badge>
          <Badge>Grid</Badge>
          <Badge>AspectRatio</Badge>
        </Inline>
        <Grid columns={3}>
          <AspectRatio className="rounded-lg bg-muted" />
          <AspectRatio className="rounded-lg bg-muted" ratio={4 / 3} />
          <AspectRatio className="rounded-lg bg-muted" ratio={1} />
        </Grid>
      </Stack>
    </Container>
  )
};
