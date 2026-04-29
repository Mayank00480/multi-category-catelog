The core design decision was to treat the itemprops array as the single source of truth for rendering — the detail page never knows what properties a category has in advance. It simply maps over item.itemprops and renders each { label, value } pair as a row in a spec table. This makes the component work identically for a car's RPM, a phone's lens type, or a laptop's GPU without any conditional logic.

For the home page, items are grouped by category using a getItemsByCategory helper, then rendered as horizontal-scroll card strips. Each category gets a unique accent colour injected as a CSS custom property (--cat-accent), so the ItemCard component adapts its badge, hover border, and "View Details" text colour purely through CSS — no inline style branching in JSX.

Navigation uses slug-based routing: each item name is converted to a URL-safe slug ("Kia Sonet" → "kia-sonet") via a deterministic toSlug() function, which is also used in generateStaticParams to statically pre-render all detail pages at build time.


Approximately 1.5 – 2 hours end-to-end: