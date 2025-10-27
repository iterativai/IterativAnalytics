# Design System Quick Reference

> Fast reference for daily development with IterativAnalytics Design System

---

## 🎨 Colors

### Primary Colors
```tsx
// Blue (Primary Actions)
className="text-blue-500 bg-blue-500 border-blue-500"

// Green (Success/Growth)
className="text-green-500 bg-green-500"

// Red (Error/Warning)
className="text-red-500 bg-red-500"

// Gray (Neutral)
className="text-gray-600 bg-gray-100"
```

### Semantic Tokens
```tsx
className="text-primary bg-background border-border"
className="text-destructive bg-destructive-foreground"
```

---

## 📏 Spacing

Use 4px base unit (spacing-1 = 4px):

```tsx
// Common spacings
className="p-4"      // 16px padding (standard)
className="p-6"      // 24px padding (sections)
className="gap-4"    // 16px gap
className="space-y-6" // 24px vertical spacing

// Margins
className="mt-8 mb-12" // 32px top, 48px bottom
```

**Quick Guide:**
- `spacing-2` (8px) - Tight spacing
- `spacing-4` (16px) - Standard spacing
- `spacing-6` (24px) - Section spacing
- `spacing-8` (32px) - Major sections

---

## 🔤 Typography

### Sizes
```tsx
className="text-xs"    // 12px - labels
className="text-sm"    // 14px - secondary text
className="text-base"  // 16px - body (default)
className="text-lg"    // 18px - emphasized
className="text-xl"    // 20px - small headings
className="text-2xl"   // 24px - headings
className="text-3xl"   // 30px - page titles
```

### Weights
```tsx
className="font-normal"    // 400 - body
className="font-medium"    // 500 - emphasis
className="font-semibold"  // 600 - headings
className="font-bold"      // 700 - strong emphasis
```

---

## 🎭 Components

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">Get Started</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Edit</Button>
<Button variant="destructive">Delete</Button>
```

**Variants:** `primary`, `secondary`, `ghost`, `destructive`, `outline`, `link`  
**Sizes:** `sm`, `md` (default), `lg`, `xl`

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card variant="premium" hover>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-bold">$124,500</p>
  </CardContent>
</Card>
```

**Variants:** `default`, `premium`, `glass`, `elevated`

### Input
```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>
```

### Badge
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Failed</Badge>
```

---

## 📊 Data Display

### Metric Card Pattern
```tsx
<Card>
  <CardContent className="pt-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Revenue</p>
        <p className="text-3xl font-bold">$124,500</p>
      </div>
      <Badge variant="success">+12.5%</Badge>
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      vs. last month
    </p>
  </CardContent>
</Card>
```

### Table Pattern
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Revenue</TableHead>
      <TableHead>Growth</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.revenue}</TableCell>
        <TableCell>{row.growth}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## 🎯 Layout

### Grid Layout
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Flex Layout
```tsx
// Horizontal spacing
<div className="flex items-center gap-4">
  <Button>Save</Button>
  <Button variant="ghost">Cancel</Button>
</div>

// Space between
<div className="flex items-center justify-between">
  <h2>Title</h2>
  <Button>Action</Button>
</div>
```

### Container
```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

---

## 🎬 Animations

### Transitions
```tsx
className="transition-all duration-200"  // Fast (150-200ms)
className="transition-all duration-300"  // Standard (250-300ms)
className="transition-colors"            // Only colors
className="transition-transform"         // Only transform
```

### Hover Effects
```tsx
// Card hover
className="hover:shadow-lg hover:-translate-y-1 transition-all"

// Button hover
className="hover:bg-primary/90 transition-colors"

// Scale effect
className="hover:scale-105 transition-transform"
```

---

## ♿ Accessibility

### Required Attributes
```tsx
// Images
<img src="/chart.png" alt="Revenue trend over time" />

// Links
<a href="/dashboard" aria-label="Go to dashboard">
  <DashboardIcon aria-hidden="true" />
</a>

// Forms
<Label htmlFor="email">Email</Label>
<Input id="email" aria-describedby="email-hint" />
<p id="email-hint" className="text-sm text-muted-foreground">
  We'll never share your email
</p>
```

### Focus States
All interactive elements have visible focus states by default. Don't remove them!

```tsx
// Custom focus (if needed)
className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

---

## 📱 Responsive Design

### Breakpoints
```tsx
// Mobile first approach
className="
  text-base           /* Mobile (default) */
  md:text-lg         /* Tablet (768px+) */
  lg:text-xl         /* Desktop (1024px+) */
"

className="
  p-4                /* Mobile */
  md:p-6            /* Tablet */
  lg:p-8            /* Desktop */
"
```

### Hide/Show
```tsx
className="hidden md:block"        // Hide on mobile
className="block md:hidden"        // Show only on mobile
className="md:flex md:items-center" // Flex on tablet+
```

---

## 🚀 Performance

### Image Optimization
```tsx
// Use LazyImage component
import { LazyImage } from '@/components/LazyImage';

<LazyImage
  src="/chart.webp"
  lowQualitySrc="/chart-thumb.jpg"
  alt="Chart"
  className="w-full h-auto"
/>
```

### Code Splitting
```tsx
// Lazy load heavy components
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

<Suspense fallback={<Skeleton className="h-64" />}>
  <HeavyChart data={data} />
</Suspense>
```

### Loading States
```tsx
import { Skeleton } from '@/components/ui/skeleton';

// While loading
{isLoading ? (
  <Skeleton className="h-32 w-full" />
) : (
  <Card>{content}</Card>
)}
```

---

## ✅ Common Patterns

### Form with Validation
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Modal Pattern
```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
    </DialogHeader>
    <p>Are you sure you want to continue?</p>
    <div className="flex gap-4 mt-6">
      <Button onClick={onConfirm}>Confirm</Button>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
    </div>
  </DialogContent>
</Dialog>
```

### Toast Notification
```tsx
import { useToast } from '@/hooks/use-toast';

function Component() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
    });
  };

  const showError = () => {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    });
  };
}
```

---

## 🔍 Quick Checks

### Before Committing
- [ ] Used design tokens (no arbitrary values)
- [ ] Components are responsive
- [ ] Keyboard accessible
- [ ] Alt text on images
- [ ] TypeScript types correct
- [ ] No console.logs
- [ ] Tested on mobile

### Color Contrast
Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Body text: 4.5:1 minimum
- Large text: 3:1 minimum

### Touch Targets
- Minimum 44x44px for interactive elements
- Adequate spacing between tap targets

---

## 📚 Resources

- **Design Principles**: [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md)
- **Full Documentation**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Component Library**: `client/src/components/ui/`
- **Tailwind Config**: `tailwind.config.ts`
- **Theme Config**: `theme.json`

---

**💡 Pro Tips:**
1. Compose from existing components before creating new ones
2. Use semantic HTML first, style second
3. Test with keyboard navigation
4. Check mobile view early and often
5. Follow the 4px spacing system
6. Prefer Tailwind utilities over custom CSS

---

**Need Help?** Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) or ask the team!
