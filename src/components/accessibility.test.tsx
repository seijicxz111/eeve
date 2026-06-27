import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  Stack
} from "./index";

describe("accessibility smoke checks", () => {
  it("has no automated violations for representative controls", async () => {
    const { container } = render(
      <Stack>
        <Alert title="Saved" variant="success">
          Settings were saved.
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack>
              <Input label="Email" type="email" />
              <Select
                label="Role"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Editor", value: "editor" }
                ]}
              />
              <Button>Save</Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
