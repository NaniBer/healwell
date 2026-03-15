# HealWell UI Design Specification

**Date:** 2026-03-15
**Status:** Approved
**Approach:** A - Ultra Minimal
**Design Philosophy:** Calm & Healing, Simple & Clean

---

## User Requirements Summary

- Colors: Clean minimal neutrals with one accent
- Layout: Sectioned with clear headers, minimal decoration
- Visuals: Just 1-2 carefully placed emojis for warmth
- Buttons: Outlined style with border only
- Spacing: Variable - tighter for content, more space around headers
- Font: Friendly & readable, slightly rounded
- Header: Progress bar showing healing progress
- Mood: Calm & healing - soothing, peaceful
- Background: Cream/off-white (not pure white)

---

## Design Approaches Considered

### Approach A: Ultra Minimal ✅ SELECTED

**Description:** Pure whites, grays, blacks. Single accent color (muted sage green). Very sparse visual elements - one emoji on welcome screen only. Outlined buttons in black or dark gray. Clean typography.

**Trade-offs:**
- ✅ Extremely fast to implement, very modern
- ✅ Feels calm and uncluttered
- ❌ Might feel too stark for some users
- ✅ Easy to maintain and iterate on

---

### Approach B: Gentle Warmth (DOCUMENTED FOR FUTURE)

**Description:** Mostly neutral (whites, warm grays) with soft beige accents. More visual warmth - a small emoji on each section header for personality. Outlined buttons with slightly thicker borders and rounded corners. System font.

**Trade-offs:**
- ✅ More welcoming and personal
- ✅ Still feels calm and not overwhelming
- ❌ Slightly more complex than Approach A
- ✅ Better for emotional app context

---

### Approach C: Healing Progress Focus (DOCUMENTED FOR FUTURE)

**Description:** Similar to A but with more emphasis on the progress element. A prominent progress bar at the top that updates. Color scheme: neutrals + calming blue accent. One emoji on welcome screen only. Clean typography.

**Trade-offs:**
- ✅ Progress-focused, motivating
- ✅ Still minimal and calm
- ❌ Progress bar adds visual complexity
- ✅ Good for recovery context

---

## Approved Design (Approach A)

### Color Palette

**Primary Colors:**
- Background: Cream/off-white (`#f9f9f9` or `#faf9f6`)
- Text: Near black (`#111111`) for headings, dark gray (`#666666`) for body
- Borders: Light gray (`#e0e0e0`)
- Accent: Muted sage green (`#8fa898`)

**Usage Rules:**
- Cream background everywhere
- Black for all primary text and button borders
- Gray only for secondary text and muted states
- Sage green: Used sparingly - only for progress bar and one emoji on welcome screen

---

### Typography

**Font Family:**
- System font stack (SF Pro for Apple, San Francisco, Helvetica Neue, Helvetica, Arial)

**Font Sizes:**
- Page headings (`<h1>`): 24px, bold, letter-spacing: -0.5px
- Section headings (`<h2>`): 18px, semibold
- Body text: 14px, regular, line-height: 1.5
- Small text: 12px, regular, line-height: 1.4

**Color Usage:**
- Headings: Near black (`#111111`)
- Body text: Dark gray (`#666666`)
- Small/secondary text: Medium gray (`#999999`)

**Other Guidelines:**
- No italics
- No uppercase text except for very small labels

---

### Layout Structure

**Overall Structure:**
- Centered single-column layout, max-width 400px
- Consistent vertical rhythm

**Top Header (Fixed):**
- Cream background with subtle bottom border
- Progress bar centered, 4px height, sage green
- App name "HealWell" in small gray text below progress bar
- Height: 70px total

**Content Sections:**
- Each section starts with subtle divider line (1px, light gray)
- Section heading: 18px, semibold, near black, 24px space below
- Content follows with 16px spacing between items
- Section ends with 32px space before next divider

**Variable Spacing Rule:**
- Content items within sections: 16px apart
- Section transitions: 32px apart
- Important elements (buttons): 48px from content above

---

### Components

**Primary Button:**
- Background: White (`#ffffff`)
- Border: 2px solid black (`#111111`)
- Text: Black, semibold, 14px
- Corners: 8px radius
- Padding: 16px vertical, 24px horizontal
- Hover: Border darkens, no background change
- Full width on mobile

**Secondary Button:**
- No background (transparent)
- No border
- Text: Dark gray, medium weight, 14px, underlined
- Padding: 12px vertical, 16px horizontal

**Card/Section Content:**
- No background (cream shows through)
- No shadows
- Content flows naturally

**Progress Bar:**
- Height: 4px
- Background: Light gray (`#e0e0e0`)
- Fill: Sage green (`#8fa898`)
- Width: 90% of screen width, centered
- Rounded corners: 2px

**Divider:**
- 1px light gray line, full width
- 32px space from content above, 24px to content below

---

### Spacing Scale

- 8px: Small gaps
- 12px: Small padding
- 16px: Standard spacing (content items)
- 24px: Medium spacing (headings to content)
- 32px: Section transitions
- 48px: Important elements (buttons)
- 64px: Major section breaks

**Padding Rules:**
- Content sections: 24px left/right
- Page edges: 20px left/right
- Button vertical: 16px
- Top header: 20px top, 24px bottom

---

### Screen Designs

**Welcome Screen:**
- Full cream background, centered content
- Top: One emoji (💜), 48px
- "HealWell" - 24px bold, near black
- Subtitle: "Your path to healing" - 14px, dark gray
- 32px space
- Features list (3 items): Simple text, no cards
- 48px space
- Primary button: "Start Your Journey" - full width

**Onboarding Screen:**
- Top header with progress bar
- Question: 18px semibold, near black, 32px space below
- Form input: Light gray border, 16px padding, 14px text
- Option buttons: Stacked, outlined in black
- Primary button (fixed or in flow)

**Dashboard Screen:**
- Top header with progress bar (days healed)
- Welcome: "Welcome back, [name]" - 18px semibold
- Section "Today": divider, heading, Daily Check-in button, mood display
- Section "Your Progress": divider, heading, 2 stats side-by-side
- Section "Suggestions": divider, heading, AI suggestion text block

---

### Interactions & States

**Button States:**
- Default: White with black border
- Hover/Press: Border darkens to black
- Disabled: Light gray border, gray text
- Loading: "Loading..." text, reduced opacity

**Form Input States:**
- Default: Light gray border, white background
- Focused: Black border, white background
- Error: Red border, error text below
- Success: Sage green border (rare)

**Progress Bar Animation:**
- Smooth CSS transition: 0.3s ease-in-out

**Page Transitions:**
- Fade in: 0.2s ease-out
- Slide up: 0.3s ease-out

**Feedback:**
- Button press: Subtle scale (0.98)
- Success: Brief checkmark icon (optional)
- Errors: Inline text only

---

### Data Flow & Implementation

**State Management:**
- React state for UI state (screen, form data)
- localStorage for onboarding completion and progress
- Backend API for persistent data (future)

**Progress Tracking:**
- Days healed: Calculated from onboarding date
- Check-ins: Count stored in localStorage
- Progress percentage: (check-ins ÷ target) × 100

**Component Structure:**
```
App
├── Header (progress bar)
├── Welcome
├── Onboarding → QuestionStep
└── Dashboard → Section, Button, ProgressBar, Divider
```

**Styling Approach:**
- Tailwind CSS utility classes
- No custom CSS (except animations)
- Consistent spacing using Tailwind's scale

**Error Handling:**
- Form validation before submission
- Inline error messages only
- Graceful fallback for missing data

---

## Tailwind CSS Classes Reference

**Colors:**
- Cream background: `bg-[#f9f9f9]` or `bg-[#faf9f6]`
- Black text: `text-[#111111]`
- Dark gray: `text-[#666666]`
- Light gray: `text-[#999999]`
- Borders: `border-[#e0e0e0]`
- Sage green: `text-[#8fa898]` or `bg-[#8fa898]`

**Typography:**
- Heading: `text-2xl font-bold tracking-tight`
- Section heading: `text-lg font-semibold`
- Body: `text-[14px] leading-[1.5]`
- Small: `text-[12px] leading-[1.4]`

**Spacing:**
- Use Tailwind scale: `p-3` (12px), `p-4` (16px), `p-6` (24px), `p-8` (32px), `p-12` (48px)

**Buttons:**
- Primary: `bg-white border-2 border-black rounded-lg`
- Secondary: `text-gray-600 underline`

---

## Future Considerations

If switching to Approach B (Gentle Warmth):
- Add small emojis to section headers
- Use beige accent instead of sage green
- Slightly thicker button borders
- More rounded corners (12px)

If switching to Approach C (Healing Progress Focus):
- Make progress bar more prominent (thicker, centered)
- Use calming blue accent (`#7fb3b3`)
- Add progress milestones visualizations
- Emphasize forward-looking messaging

---

**End of Design Specification**
