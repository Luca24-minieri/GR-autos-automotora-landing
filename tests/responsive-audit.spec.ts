import { test, expect } from "@playwright/test";

const pages = [
  { name: "Home", path: "/" },
  { name: "Vehiculos", path: "/vehiculos" },
  { name: "Financiamiento", path: "/financiamiento" },
  { name: "Vende tu auto", path: "/vende-tu-auto" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Contacto", path: "/contacto" },
];

const viewports = [
  { name: "iPhone SE", width: 375, height: 812 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "iPad", width: 768, height: 1024 },
  { name: "Desktop 1440", width: 1440, height: 900 },
  { name: "Desktop 1920", width: 1920, height: 1080 },
];

for (const page of pages) {
  for (const vp of viewports) {
    test(`${page.name} (${vp.name} ${vp.width}x${vp.height}) - no horizontal overflow`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const p = await context.newPage();
      await p.goto(page.path, { waitUntil: "domcontentloaded" });

      // Wait a bit for any animations/lazy loads
      await p.waitForTimeout(1000);

      const overflow = await p.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,
        };
      });

      // Also check for specific problematic elements
      const overflowingElements = await p.evaluate(() => {
        const results: string[] = [];
        const all = document.querySelectorAll("*");
        const vpWidth = document.documentElement.clientWidth;
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > vpWidth + 2 || rect.left < -2) {
            const tag = el.tagName.toLowerCase();
            const cls = el.className
              ? `.${String(el.className).split(" ").slice(0, 3).join(".")}`
              : "";
            const id = el.id ? `#${el.id}` : "";
            const rightOverflow =
              rect.right > vpWidth + 2
                ? ` (right: ${Math.round(rect.right)}px, vp: ${vpWidth}px)`
                : "";
            const leftOverflow =
              rect.left < -2
                ? ` (left: ${Math.round(rect.left)}px)`
                : "";
            results.push(
              `${tag}${id}${cls}${rightOverflow}${leftOverflow}`
            );
          }
        }
        return results.slice(0, 20); // limit to first 20
      });

      console.log(
        `[${page.name}] ${vp.name}: scrollW=${overflow.scrollWidth} clientW=${overflow.clientWidth} overflow=${overflow.hasOverflow}`
      );
      if (overflowingElements.length > 0) {
        console.log(`  Overflowing elements:`, overflowingElements);
      }

      expect(
        overflow.hasOverflow,
        `Horizontal overflow detected on ${page.name} at ${vp.width}px. scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}. Elements: ${overflowingElements.join(", ")}`
      ).toBe(false);

      await context.close();
    });
  }
}
