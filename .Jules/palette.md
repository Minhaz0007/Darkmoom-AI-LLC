## 2025-02-19 - Accessible Accordion Pattern
**Learning:** The application uses a custom accordion implementation for 'Solutions' and 'FAQ' sections. Adding `aria-expanded`, `aria-controls`, and `role="region"` significantly improves screen reader experience without changing the visual design.
**Action:** Use this pattern for all future collapsible content in this application:
- Toggle Button: `aria-expanded={isOpen}`, `aria-controls={contentId}`
- Content Region: `id={contentId}`, `role="region"`, `aria-labelledby={headingId}`
