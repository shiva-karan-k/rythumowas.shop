# Shared UI Component System

Created a unified component library at `packages/ui` that both `rythumowas.shop` and `farmer-portal` can use.

## Structure

```
packages/ui/
├── components/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── badge.tsx
├── lib/
│   └── utils.ts
├── index.tsx
├── styles.css
└── package.json
```

## Usage in Projects

Both projects now have `@rythumowa/ui` as a workspace dependency:

```tsx
// In any component
import { Button, Card, Input, Badge } from '@rythumowa/ui'

<Button variant="default">Click me</Button>
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

## Benefits

1. **Single source of truth** - Components defined once, used everywhere
2. **Consistent styling** - Same look and feel across all apps
3. **Easy updates** - Change once, applies to all projects
4. **Type safety** - Full TypeScript support
5. **No duplication** - Stop copying components between projects

## Adding New Components

1. Create component in `packages/ui/components/`
2. Export from `packages/ui/index.tsx`
3. Use in any project with `import from '@rythumowa/ui'`

## Workspace Setup

Using pnpm workspaces defined in `pnpm-workspace.yaml`:
- rythumowas.shop
- farmer-portal
- medusa-backend
- packages/*
