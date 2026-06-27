# Publishing

Publishing is intentionally prepared but not executed automatically outside approved release workflows.

## Pre-Publish Checklist

```bash
npm view eeve-ui-components name version
npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run build
npm run build:storybook
npm pack --dry-run
```

If the package name is unavailable, update `package.json` `name`, README links, and workflow references before publishing.

## Local Tarball Verification

```bash
npm pack
mkdir ../ui-components-consumer
cd ../ui-components-consumer
npm create vite@latest . -- --template react-ts
npm install
npm install ../project_2/eeve-ui-components-0.1.0.tgz
npm run build
```

Verify imports, styles, TypeScript declarations, light/dark themes, a dialog, a menu, a form, and a toast interaction.

## Release

```bash
npm run changeset
npm run version
npm run release
```

`npm publish` must not be run without explicit maintainer approval.
