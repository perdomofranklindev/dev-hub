# Submenu Auto-Collapse Algorithm

## Overview

Our application features an intelligent submenu auto-collapse system that ensures only the relevant menu sections are expanded based on the current page. This document explains how this algorithm works.

## How It Works

### The Problem

When navigating through a multi-level menu structure:
- We want to automatically expand parent menus that lead to the current page
- We want to collapse all other menus that aren't relevant to the current page
- This creates a clean, focused navigation experience

### The Solution

Our algorithm follows these steps:

1. **Identify the Current Path**: When a user navigates to a page, we capture the current URL path
2. **Find Parent Menus**: We trace upward through the menu tree to find all parent menus that contain the current page
3. **Expand Only Relevant Menus**: We expand only those parent menus, collapsing everything else

### Technical Implementation

The core of the algorithm is in two key functions:

#### 1. Finding Parent IDs

```typescript
const findParentIds = (path: string): string[] => {
  const parentIds: string[] = [];

  const traverse = (items: MenuItem[]): boolean => {
    return items.some((item) => {
      // If this is the current page, we found a match
      if (item.path === path) return true;
      
      // If this item has children, check them recursively
      if (item.subItems) {
        const found = traverse(item.subItems);
        if (found) {
          // If a child matches, this is a parent we need to expand
          parentIds.push(item.id);
          return true;
        }
      }
      return false;
    });
  };

  // Start traversal from top-level menu items
  menuOptions.forEach((section) => {
    traverse(section.items);
  });

  return parentIds.reverse();
}
```

#### 2. Auto-Expanding Submenus

```typescript
const autoExpandSubmenus = (currentPath: string) => {
  // Get all parent menu IDs for the current path
  const parentIds = findParentIds(currentPath);
  
  // Replace the current set of open menus with ONLY these parent IDs
  setOpenSubmenus(new Set(parentIds));
};
```

## Benefits

This approach provides several advantages:

- **Cleaner UI**: Only relevant navigation paths are expanded
- **Better Focus**: Users aren't distracted by unrelated menu items
- **Intuitive Navigation**: The sidebar visually shows the hierarchical location of the current page
- **Reduced Clutter**: Especially helpful for deep menu structures with many options

## Example Scenario

Imagine a menu structure like:

```
Dashboard
Products
  - Categories
    - Electronics
    - Clothing
  - Inventory
    - Stock Levels
    - Suppliers
Users
  - Permissions
  - Profiles
```

If a user navigates to "Stock Levels":
- The algorithm identifies "Products" and "Inventory" as parent menus
- It expands only these menus
- "Categories" and "Users" sections remain collapsed
- This creates a clear visual path: Products → Inventory → Stock Levels