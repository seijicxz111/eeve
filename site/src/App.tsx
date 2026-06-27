import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DropdownMenu,
  EmptyState,
  Input,
  Popover,
  Progress,
  Select,
  Slider,
  Spinner,
  StatCard,
  Switch,
  Tabs,
  Textarea,
  ToastProvider,
  Tooltip,
  useToast
} from "@eeve0906/eeve";
import * as React from "react";

type ThemeMode = "light" | "dark";

const frameworkSnippets = [
  {
    value: "react",
    label: "React",
    content: (
      <CodeBlock
        code={`npm install @eeve0906/eeve react react-dom

import { Button, ToastProvider } from "@eeve0906/eeve";
import "@eeve0906/eeve/styles.css";

export function App() {
  return (
    <ToastProvider>
      <Button variant="primary">Ship product UI</Button>
    </ToastProvider>
  );
}`}
      />
    )
  },
  {
    value: "next",
    label: "Next.js",
    content: (
      <CodeBlock
        code={`// app/layout.tsx
import "@eeve0906/eeve/styles.css";

// app/components/settings-panel.tsx
"use client";

import { Dialog, Input, Switch } from "@eeve0906/eeve";

export function SettingsPanel() {
  return (
    <Dialog title="Workspace settings" trigger={<button>Open</button>}>
      <Input label="Workspace name" />
      <Switch label="Require approvals" />
    </Dialog>
  );
}`}
      />
    )
  },
  {
    value: "vite",
    label: "Vite",
    content: (
      <CodeBlock
        code={`npm create vite@latest dashboard -- --template react-ts
cd dashboard
npm install @eeve0906/eeve

// src/main.tsx
import "@eeve0906/eeve/styles.css";

// src/App.tsx
import { Card, StatCard, Tabs } from "@eeve0906/eeve";`}
      />
    )
  },
  {
    value: "meta",
    label: "Other React frameworks",
    content: (
      <CodeBlock
        code={`Works anywhere React components can run:
- Remix client routes
- Astro islands with @astrojs/react
- TanStack Start apps
- React Router apps

Use server-rendered shells for layout, then mark interactive component islands as client-side where your framework requires it.`}
      />
    )
  }
] satisfies React.ComponentProps<typeof Tabs>["items"];

const componentRows = [
  ["Button", "Input", "Select", "Checkbox", "Switch", "Slider"],
  ["Dialog", "Popover", "Tooltip", "DropdownMenu", "Toast", "Tabs"],
  ["Card", "Badge", "Avatar", "Alert", "Progress", "Skeleton"]
];

const valueProps = [
  {
    title: "Product-grade defaults",
    body: "Accessible Radix primitives, reduced-motion support, keyboard interactions, and strict TypeScript are already wired in."
  },
  {
    title: "Themeable by contract",
    body: "Semantic CSS variables drive light, dark, and custom brand themes without hardcoding colors into components."
  },
  {
    title: "Ready for teams",
    body: "Storybook docs, tests, package exports, npm publishing, GitHub releases, and CI are included from the first version."
  }
];

export function App() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem("eeve-site-theme");
    return stored === "dark" ? "dark" : "light";
  });

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("eeve-site-theme", theme);
  }, [theme]);

  return (
    <ToastProvider>
      <ShowcaseShell theme={theme} onThemeChange={setTheme} />
    </ToastProvider>
  );
}

function ShowcaseShell({
  onThemeChange,
  theme
}: {
  onThemeChange: (theme: ThemeMode) => void;
  theme: ThemeMode;
}) {
  return (
    <div className="site-shell">
      <header className="site-nav">
        <a className="brand-mark" href="#top" aria-label="eeve home">
          <img className="brand-icon" src="/icon-192.png" alt="" />
          <span>eeve</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#components">Components</a>
          <a href="#frameworks">Frameworks</a>
          <a href="#adoption">Adoption</a>
        </nav>
        <div className="nav-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onThemeChange(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
          <a className="site-button site-button-sm site-button-outline" href="https://github.com/seijicxz111/eeve">
            GitHub
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Badge variant="primary">Published on npm</Badge>
            <h1 id="hero-title">A React design system that starts where tutorials stop.</h1>
            <p>
              Eeve packages polished, accessible React components with semantic tokens,
              Storybook documentation, tests, and publish-ready infrastructure for serious
              product teams.
            </p>
            <div className="hero-actions">
              <a className="site-button site-button-lg site-button-primary" href="#components">
                Explore components
              </a>
              <a
                className="site-button site-button-lg site-button-outline"
                href="https://www.npmjs.com/package/@eeve0906/eeve"
              >
                View npm package
              </a>
            </div>
            <div className="install-command" aria-label="Install command">
              <span>npm install</span>
              <strong>@eeve0906/eeve</strong>
            </div>
          </div>
          <HeroWorkbench />
        </section>

        <section className="metrics-band" aria-label="Library highlights">
          <StatCard
            label="Public release"
            value="0.2.0"
            trend="npm"
            trendVariant="success"
            description="Published package with typed exports and extracted CSS."
          />
          <StatCard
            label="Component surface"
            value="35+"
            trend="ready"
            trendVariant="primary"
            description="Forms, overlays, content, navigation, feedback, and layouts."
          />
          <StatCard
            label="Quality gates"
            value="CI"
            trend="green"
            trendVariant="success"
            description="Typecheck, lint, tests, builds, Storybook, and package checks."
          />
        </section>

        <section id="components" className="section-grid">
          <div className="section-heading">
            <Badge variant="secondary">Live components</Badge>
            <h2>Show the system, not screenshots.</h2>
            <p>
              These examples are rendered from the package itself: form fields, overlays,
              feedback, navigation patterns, and content primitives all sharing one token
              contract.
            </p>
          </div>
          <ComponentPlayground />
        </section>

        <section className="token-section" aria-labelledby="tokens-title">
          <div>
            <Badge variant="info">Design tokens</Badge>
            <h2 id="tokens-title">Semantic tokens for brandable apps.</h2>
            <p>
              Components read CSS variables like background, surface, border, foreground,
              focus ring, success, warning, and error. Override the variables once and the
              full system follows.
            </p>
          </div>
          <div className="token-grid" aria-label="Token preview">
            {["Primary", "Secondary", "Success", "Warning", "Error", "Info"].map(
              (token) => (
                <div className="token-tile" key={token}>
                  <span className={`token-swatch token-${token.toLowerCase()}`} />
                  <span>{token}</span>
                </div>
              )
            )}
          </div>
        </section>

        <section id="frameworks" className="section-grid section-grid-reversed">
          <FrameworkPanel />
          <div className="section-heading">
            <Badge variant="primary">Framework fit</Badge>
            <h2>Use it in React, Next.js, Vite, and React-powered islands.</h2>
            <p>
              Eeve is a React component library, so it works best anywhere React renders UI:
              Vite apps, Next.js client components, Remix routes, Astro React islands, and
              internal dashboards.
            </p>
            <Alert variant="info" title="Framework rule of thumb">
              Import global styles once. Mark interactive examples as client components in
              server-first frameworks.
            </Alert>
          </div>
        </section>

        <section id="adoption" className="adoption-section">
          <div className="section-heading centered">
            <Badge variant="success">Selling points</Badge>
            <h2>Built for adoption, not a one-off component dump.</h2>
            <p>
              The package demonstrates the architecture buyers and maintainers expect from
              a design-system foundation.
            </p>
          </div>
          <div className="value-grid">
            {valueProps.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="component-index" aria-label="Component index">
            {componentRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="component-row">
                {row.map((component) => (
                  <Badge key={component} variant="neutral">
                    {component}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function HeroWorkbench() {
  return (
    <div className="workbench" aria-label="Product interface preview">
      <div className="workbench-toolbar">
        <div className="workbench-title">
          <Avatar alt="Eeve UI" fallback="EU" />
          <div>
            <Badge variant="success">Live preview</Badge>
            <h2>Workspace health</h2>
          </div>
        </div>
        <DropdownMenu
          trigger={
            <Button variant="outline" size="sm">
              Actions
            </Button>
          }
          items={[
            { label: "Invite teammate", shortcut: "I" },
            { label: "Export report", shortcut: "E" },
            { type: "separator" },
            { label: "Archive workspace", disabled: true }
          ]}
        />
      </div>
      <div className="workbench-grid">
        <Card>
          <CardHeader>
            <CardTitle>Release readiness</CardTitle>
            <CardDescription>Accessible checks, package health, and docs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={86} showValue valueLabel="Release readiness" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Component status</CardTitle>
            <CardDescription>Interactive components with tokenized styling.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mini-stack">
              <Badge variant="primary">Forms</Badge>
              <Badge variant="secondary">Overlays</Badge>
              <Badge variant="info">Navigation</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      <Alert variant="success" title="Published package">
        Install from npm, import the CSS once, and compose production UI immediately.
      </Alert>
    </div>
  );
}

function ComponentPlayground() {
  const { toast } = useToast();
  const [density, setDensity] = React.useState([64]);

  return (
    <div className="playground">
      <Card>
        <CardHeader>
          <CardTitle>Signup workflow</CardTitle>
          <CardDescription>
            Form components keep labels, descriptions, errors, and ARIA wiring together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="form-grid">
            <Input
              label="Team email"
              type="email"
              placeholder="design@company.com"
              description="Used for workspace notifications."
            />
            <Select
              label="Framework"
              defaultValue="next"
              options={[
                { label: "Next.js", value: "next" },
                { label: "Vite React", value: "vite" },
                { label: "Remix", value: "remix" },
                { label: "Astro React island", value: "astro" }
              ]}
            />
            <Textarea
              label="Implementation notes"
              placeholder="Describe the product surface you are building."
              description="Works with form libraries without forcing one."
            />
            <div className="control-pair">
              <Checkbox label="Include accessibility review" defaultChecked />
              <Switch label="Dark mode enabled" defaultChecked />
            </div>
            <Slider
              label={`Interface density: ${density[0]}%`}
              value={density}
              min={40}
              max={100}
              step={4}
              onValueChange={setDensity}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interaction layer</CardTitle>
          <CardDescription>
            Toasts, dialogs, menus, tooltips, and popovers are already accessible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="interaction-grid">
            <Button
              onClick={() => {
                toast({
                  title: "Component imported",
                  description: "The toast system is live and announced politely.",
                  variant: "success"
                });
              }}
            >
              Show toast
            </Button>
            <Dialog
              title="Confirm component adoption"
              description="Dialog focus management, escape handling, and scroll lock are handled by the library."
              trigger={<Button variant="outline">Open dialog</Button>}
              footer={<Button fullWidth>Adopt Eeve</Button>}
            >
              <p className="dialog-copy">
                Use semantic tokens for theme alignment and compose with native form
                behavior for application workflows.
              </p>
            </Dialog>
            <Popover
              title="Package health"
              trigger={<Button variant="secondary">Open popover</Button>}
            >
              <p className="popover-copy">
                Type declarations, package exports, Storybook, CI, and npm publishing are
                already configured.
              </p>
            </Popover>
            <Tooltip content="Keyboard and pointer users both get the same control surface.">
              <Button variant="ghost">Tooltip</Button>
            </Tooltip>
          </div>
          <div className="state-panel">
            <div>
              <Spinner aria-label="Loading integration status" />
              <span>Framework adapters validating</span>
            </div>
            <EmptyState
              title="No design debt"
              description="Start with a maintained system instead of scattered one-off UI."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FrameworkPanel() {
  return (
    <Card className="framework-card">
      <CardHeader>
        <CardTitle>Integration recipes</CardTitle>
        <CardDescription>
          Copy the shape that matches your app shell and import components where they are
          interactive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs items={frameworkSnippets} defaultValue="react" />
      </CardContent>
    </Card>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}
