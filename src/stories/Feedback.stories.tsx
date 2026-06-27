import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  Button,
  EmptyState,
  Progress,
  Skeleton,
  Spinner,
  ToastProvider,
  useToast
} from "../index";

const meta = {
  title: "Components/Feedback",
  tags: ["autodocs", "stable"]
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
  render: () => (
    <div className="grid gap-4">
      <Alert title="Profile saved" variant="success">
        The latest account settings are now active.
      </Alert>
      <Alert title="Review billing" variant="warning">
        The payment method expires soon.
      </Alert>
      <Alert title="Unable to deploy" variant="error">
        Fix validation errors before retrying.
      </Alert>
      <Alert title="New insight" variant="info">
        Usage increased 12 percent over the last week.
      </Alert>
    </div>
  )
};

export const LoadingStates: Story = {
  render: () => (
    <div className="grid gap-4">
      <Spinner />
      <Progress value={64} showValue valueLabel="Deployment progress" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
};

export const Empty: Story = {
  render: () => (
    <EmptyState
      title="No projects yet"
      description="Create a project to start documenting reusable interface patterns."
      action={{ label: "Create project" }}
    />
  )
};

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Saved",
          description: "Your changes were saved successfully.",
          variant: "success"
        })
      }
    >
      Show toast
    </Button>
  );
}

export const Toasts: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  )
};
