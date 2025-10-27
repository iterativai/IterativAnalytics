# Dark Mode Visual Guide

## UI Components Overview

### 1. Theme Toggle Button (Closed State)

```
┌──────────────────────────────────┐
│  [App Header]            [🌙] ● │  ← Toggle button (top right)
│                                  │     ● = Color-coded indicator
└──────────────────────────────────┘     Blue dot = Dark theme
                                         Orange dot = Light theme
```

**Features:**
- Circular button with backdrop blur
- Icon changes based on current theme:
  - ☀️ Sun icon = Light mode
  - 🌙 Moon icon = Dark mode
  - 🖥️ Monitor icon = System mode
- Color-coded dot indicator (bottom right)
- Smooth hover animation (scale 1.05)

### 2. Hover State (Tooltip Visible)

```
┌─────────────────────────────┐
│  Theme: Dark                │  ← Tooltip appears on hover
│  ⌃⇧T to cycle              │     Shows current theme
└─────────────────────────────┘     Shows keyboard shortcut
            ▼
        ┌──────┐
        │ [🌙] ●│  ← Button (hovered)
        └──────┘
```

### 3. Theme Selection Menu (Open State)

```
        ┌──────┐
        │ [🌙] ●│  ← Toggle button (clicked)
        └──┬───┘
           │
    ┌──────▼─────────────────┐
    │  ☀️  Light            │  ← Hover highlights row
    │ ────────────────────  │
    │  🌙  Dark          ● │  ← Active theme (dot)
    │ ────────────────────  │
    │  🖥️  System           │
    │ ────────────────────  │
    │  Using: Dark          │  ← System mode indicator
    └───────────────────────┘
```

**Menu Features:**
- Smooth slide-down animation
- Three theme options with icons
- Active theme highlighted (blue background)
- Active theme has blue dot indicator
- System mode shows current resolved theme
- Hover state on each option (slides right 4px)
- Click outside to close (backdrop)

## Theme Modes Explained

### ☀️ Light Mode
```
╔════════════════════════════════╗
║  Bright Background             ║
║  Dark Text                     ║
║  Best for: Daytime reading     ║
║  Colors: White, Light Gray     ║
╚════════════════════════════════╝
```

### 🌙 Dark Mode
```
╔════════════════════════════════╗
║  Dark Background               ║
║  Light Text                    ║
║  Best for: Low-light work      ║
║  Colors: Dark Gray, Near Black ║
╚════════════════════════════════╝
```

### 🖥️ System Mode
```
╔════════════════════════════════╗
║  Follows OS Preference         ║
║  Automatic Switching           ║
║  Best for: Set & Forget        ║
║  Updates: Real-time            ║
╚════════════════════════════════╝
```

## Animation States

### 1. Theme Switch Animation
```
Frame 1 (0ms):    [Old Theme]
                  Opacity: 1.0

Frame 2 (150ms):  [Transitioning]
                  Opacity: 0.8
                  Colors: Interpolating

Frame 3 (300ms):  [New Theme]
                  Opacity: 1.0
                  Complete!
```

### 2. Icon Rotation Animation
```
Old Icon:  🌙  →  Rotate -180°
                  Opacity: 0

New Icon:  ☀️  ←  Rotate to 0°
                  Opacity: 1
                  Duration: 300ms
```

### 3. Menu Open/Close Animation
```
Opening:
  Frame 1: Opacity 0, Scale 0.95, Y -10px
  Frame 2: Opacity 1, Scale 1.0,  Y 0px
  Duration: 200ms

Closing:
  Reverse of opening
  Duration: 200ms
```

## Color Indicators

### Theme Indicator Dot Colors
```
🔵 Blue (#6366f1)   = Dark theme active
🟠 Orange (#f59e0b) = Light theme active
```

### Menu States
```
Default Row:   Gray background, Gray text
Hover Row:     Dark gray background, White text
Active Row:    Blue background (20% opacity), Blue text
```

## Keyboard Shortcuts Visual

```
┌─────────────────────────────────────┐
│  Press: Ctrl + Shift + T            │
│         (or Cmd + Shift + T on Mac) │
│                                     │
│  Result: Cycles through themes      │
│          Light → Dark → System      │
└─────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (> 768px)
```
┌────────────────────────────────────┐
│  [Logo]               [Theme] [≡]  │  ← Full button visible
└────────────────────────────────────┘
                        ↑
                  Toggle button here
```

### Mobile (< 768px)
```
┌──────────────────────┐
│  [Logo]      [🌙] [≡]│  ← Compact button
└──────────────────────┘
              ↑
         Still accessible
```

## Cross-Tab Synchronization

```
Tab 1                      Tab 2
┌──────────┐              ┌──────────┐
│ Theme: 🌙│              │ Theme: 🌙│
└──────────┘              └──────────┘
     │                         │
     │  User changes to ☀️     │
     ▼                         ▼
┌──────────┐              ┌──────────┐
│ Theme: ☀️│ ────────────→│ Theme: ☀️│
└──────────┘   Auto sync  └──────────┘
```

## System Preference Detection

```
Operating System
┌─────────────────────┐
│ Dark Mode: ON       │
└──────────┬──────────┘
           │
           ▼
    App (System Mode)
┌─────────────────────┐
│ Detected: Dark      │
│ Applied: Dark       │
└─────────────────────┘

User changes OS to Light
           │
           ▼
┌─────────────────────┐
│ Detected: Light     │
│ Applied: Light      │
│ Transition: Smooth  │
└─────────────────────┘
```

## Component Tree

```
App
├── ThemeProvider (Context)
│   ├── theme: 'light' | 'dark' | 'system'
│   ├── resolvedTheme: 'light' | 'dark'
│   ├── setTheme()
│   └── toggleTheme()
│
└── SectorThemeProvider
    └── AppContent
        ├── DarkModeToggle
        │   ├── Toggle Button
        │   ├── Tooltip
        │   └── Dropdown Menu
        │       ├── Light Option
        │       ├── Dark Option
        │       └── System Option
        │
        └── [Rest of App]
```

## State Flow Diagram

```
User Action
    │
    ├─→ Click Toggle Button
    │       │
    │       ├─→ Open Menu
    │       ├─→ Select Theme
    │       └─→ Close Menu
    │
    ├─→ Press Ctrl+Shift+T
    │       │
    │       └─→ Cycle Theme
    │
    └─→ Change OS Setting
            │
            └─→ Auto Update (System mode)

Every Action Triggers:
    │
    ├─→ Update Context State
    ├─→ Save to localStorage
    ├─→ Apply CSS Classes
    ├─→ Trigger Transition
    └─→ Sync Other Tabs
```

## Transition Timeline

```
0ms     Theme change initiated
        ├─ Add .theme-transitioning class
        ├─ Update theme state
        └─ Save to localStorage

50ms    Colors start interpolating
        └─ Visual change becomes noticeable

150ms   Halfway through transition
        └─ Colors approximately 50% interpolated

300ms   Transition complete
        ├─ Remove .theme-transitioning class
        ├─ Sync complete across tabs
        └─ UI fully updated

Total: 300ms smooth transition
```

## Accessibility Indicators

```
┌─────────────────────────────────┐
│  [Theme Toggle]                 │
│  ↑                              │
│  Keyboard Focus Ring            │
│  ARIA Label: "Toggle theme"     │
│  Tab Order: Included            │
│  Screen Reader: Announces state │
└─────────────────────────────────┘
```

## Color Contrast Ratios

### Dark Mode
```
Background: #0f172a (Very Dark Blue)
Text:       #f1f5f9 (Off White)
Contrast:   14.5:1 (AAA Standard) ✅
```

### Light Mode
```
Background: #ffffff (White)
Text:       #0f172a (Very Dark Blue)
Contrast:   14.5:1 (AAA Standard) ✅
```

## Best Practices for Usage

### ✅ Do
- Use `resolvedTheme` for conditional rendering
- Provide theme options in user settings
- Test in all three modes
- Use keyboard shortcuts for power users
- Respect system preferences (default to 'system')

### ❌ Don't
- Force a specific theme on users
- Ignore system preferences
- Skip transition animations (they improve UX)
- Forget to test accessibility
- Override user's saved preference

---

**Visual Guide Version:** 1.0  
**Last Updated:** October 2024
