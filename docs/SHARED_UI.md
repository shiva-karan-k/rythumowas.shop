# Shared UI Component Library

## Overview

`@rythumowa/ui` is a workspace package providing consistent components across all apps.

## Installation

Already configured in workspace. Just import:

```tsx
import { Button, Card, Input, Badge } from '@rythumowa/ui'
```

## Components

### Button
```tsx
<Button variant="default">Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

### Input
```tsx
<Input 
  type="text" 
  placeholder="Enter text"
  className="w-full"
/>
```

### Badge
```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

## Utilities

### cn() - ClassName Merger
```tsx
import { cn } from '@rythumowa/ui'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

## Adding New Components

1. Create in `packages/ui/components/`
2. Export from `packages/ui/index.tsx`
3. Use in any project

## Styling

All components use Tailwind CSS with RythuMowa green theme:
- Primary: green-600
- Hover: green-700
- Text: gray-700
- Border: gray-200

## Benefits

✅ Single source of truth
✅ Consistent design
✅ Type-safe
✅ Easy updates
✅ No duplication
