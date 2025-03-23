# Sidebar Behavior

## Overview

The sidebar in our application provides the main navigation structure and adapts to different screen sizes and user interactions. This document explains the core behavior of the sidebar component.

## Key Features

### Responsive Design

- **Desktop Mode**: The sidebar appears as a permanent drawer with full width
- **Mobile Mode**: The sidebar converts to a temporary drawer that can be toggled
- **Width Control**: The sidebar has a configurable width through the `drawerWidth` prop

### State Management

The sidebar's state is managed through the `SidebarContext` which provides:

- `isSidebarOpen`: Boolean indicating if the sidebar is currently expanded
- `onClose`: Function to close the sidebar (especially useful in mobile view)
- `drawerWidth`: The current width of the sidebar

### Interaction Patterns

- **Desktop**: The sidebar remains visible and doesn't overlay content
- **Mobile**: The sidebar slides in from the left and overlays the main content
- **Close Actions**: The sidebar can be closed by clicking outside or using a close button

### Styling

The sidebar uses custom styled components for consistent visual presentation:

- `StyledListItemButton`: Custom styling for menu items with selected state indicators
- `StyledListItemIcon`: Optimized icon placement and spacing

## Implementation

The sidebar is implemented through several components:

1. `Sidebar`: The main container component that handles responsive behavior
2. `SidebarContext`: Context provider for sidebar state management
3. Styled components for visual consistency

## Usage

When implementing the sidebar in a layout:

```tsx
<Sidebar
  isOpen={sidebarOpen}
  onClose={handleCloseSidebar}
  drawerWidth={240}
  isMobile={isMobileDevice}
/>
```
