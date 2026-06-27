import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Code,
  Divider,
  Grid,
  StatCard,
  Typography
} from "../index";

const meta = {
  title: "Components/Content",
  tags: ["autodocs", "stable"]
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="display">Design system foundations</Typography>
      <Typography variant="h2">Composable React components</Typography>
      <Typography variant="lead">
        A concise lead paragraph for high-level context.
      </Typography>
      <Typography>Body text inherits semantic foreground tokens.</Typography>
      <Typography variant="muted">Muted text is used for supporting metadata.</Typography>
      <Code>npm install eeve-ui-components</Code>
    </div>
  )
};

export const CardsAndStats: Story = {
  render: () => (
    <Grid columns={3}>
      <StatCard label="Revenue" value="$48.2k" trend="+12%" trendVariant="success" />
      <StatCard label="Errors" value="23" trend="-8%" trendVariant="success" />
      <StatCard label="Latency" value="189ms" trend="+4%" trendVariant="warning" />
    </Grid>
  )
};

export const CardComposition: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar alt="Seiji CXZ" fallback="SC" />
          <div>
            <CardTitle>Component review</CardTitle>
            <CardDescription>Ready for design-system QA.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant="primary">Stable</Badge>
        <Divider />
        <p className="text-sm text-muted-foreground">
          Cards provide a framed surface for repeated content, not full page sections.
        </p>
      </CardContent>
      <CardFooter>
        <Code>Card</Code>
      </CardFooter>
    </Card>
  )
};
