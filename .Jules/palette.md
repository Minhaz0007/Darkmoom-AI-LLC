## 2025-02-19 - Accessible Accordion Pattern
**Learning:** The application uses a custom accordion implementation for 'Solutions' and 'FAQ' sections. Adding `aria-expanded`, `aria-controls`, and `role="region"` significantly improves screen reader experience without changing the visual design.
**Action:** Use this pattern for all future collapsible content in this application:
- Toggle Button: `aria-expanded={isOpen}`, `aria-controls={contentId}`
- Content Region: `id={contentId}`, `role="region"`, `aria-labelledby={headingId}`

## 2025-02-19 - Dark Mode Glassmorphism
**Learning:** Achieving readability in a deep dark theme (#020617) requires high contrast text (#f8fafc) and subtle glass effects. Using `bg-slate-950/95` provides necessary depth without losing legibility, while `shadow-[0_0_20px_rgba(2,132,199,0.4)]` creates focus without harsh borders.
**Action:** Use the `glass-card` and `glass-nav` utility classes for all overlay elements in dark mode to maintain consistency and depth.
