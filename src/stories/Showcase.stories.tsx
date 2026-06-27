import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ConfirmDialog,
  DropdownMenu,
  Grid,
  Input,
  NavigationMenu,
  Select,
  Stack,
  StatCard,
  Switch,
  Tabs,
  ToastProvider,
  useToast
} from "../index";

const meta = {
  title: "Examples/Product Showcase",
  tags: ["stable"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ShowcaseContent() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background p-4 text-foreground sm:p-6">
      <Stack gap={6}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <NavigationMenu
            items={[
              { label: "Dashboard", href: "#", active: true },
              { label: "Projects", href: "#" },
              { label: "Settings", href: "#" }
            ]}
          />
          <DropdownMenu
            trigger={<Button variant="outline">Team menu</Button>}
            items={[
              { label: "Invite member" },
              { label: "Billing" },
              { type: "separator" },
              { label: "Sign out" }
            ]}
          />
        </div>

        <Alert title="Deployment ready" variant="success">
          Production checks have completed for the latest release candidate.
        </Alert>

        <Grid columns={3}>
          <StatCard
            label="Active users"
            value="12,842"
            trend="+9%"
            trendVariant="success"
          />
          <StatCard
            label="Conversion"
            value="7.4%"
            trend="+1.2%"
            trendVariant="success"
          />
          <StatCard label="Open issues" value="38" trend="-5" trendVariant="info" />
        </Grid>

        <Grid columns={2}>
          <Card>
            <CardHeader>
              <CardTitle>Authentication form</CardTitle>
              <CardDescription>
                Form controls share labels and error surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Stack>
                <Input label="Email" type="email" defaultValue="admin@example.com" />
                <Input label="Password" type="password" />
                <Checkbox label="Remember this device" />
                <Button onClick={() => toast({ title: "Signed in", variant: "success" })}>
                  Sign in
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Responsive controls inside a reusable surface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Stack>
                <Select
                  label="Theme"
                  defaultValue="system"
                  options={[
                    { label: "System", value: "system" },
                    { label: "Light", value: "light" },
                    { label: "Dark", value: "dark" }
                  ]}
                />
                <Switch label="Weekly summary" defaultChecked />
                <ConfirmDialog
                  title="Reset settings?"
                  description="This will restore defaults for this workspace."
                  trigger={<Button variant="outline">Reset settings</Button>}
                  onConfirm={() => toast({ title: "Settings reset", variant: "warning" })}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Tabs
          defaultValue="activity"
          items={[
            {
              label: "Activity",
              value: "activity",
              content: <Badge variant="info">24 events this week</Badge>
            },
            {
              label: "Security",
              value: "security",
              content: <Badge variant="success">No incidents</Badge>
            }
          ]}
        />
      </Stack>
    </div>
  );
}

export const ProductSurface: Story = {
  render: () => (
    <ToastProvider>
      <ShowcaseContent />
    </ToastProvider>
  )
};
