# @rythumowa/ui

Shared UI component library for RythuMowa projects.

## Usage

```tsx
import { Button, Card, Input, Badge } from '@rythumowa/ui'
import '@rythumowa/ui/styles.css'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
        <Badge>New</Badge>
      </CardContent>
    </Card>
  )
}
```

## Components

- **Button** - Primary action button with variants (default, outline, ghost, link)
- **Card** - Container with header, content, and footer sections
- **Input** - Text input field
- **Badge** - Status indicator or label

## Styling

All components use Tailwind CSS with a green theme matching RythuMowa branding.
