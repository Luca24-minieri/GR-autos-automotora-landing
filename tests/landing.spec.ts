import { test, expect } from "@playwright/test";

test.describe("GR Autos Landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("la página carga sin errores de consola", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("el hero section es visible", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
  });

  test("el navbar tiene todos los links", async ({ page }) => {
    await expect(page.getByText("Catálogo")).toBeVisible();
    await expect(page.getByText("Financiamiento")).toBeVisible();
    await expect(page.getByText("Contacto")).toBeVisible();
  });

  test("el botón de WhatsApp existe y tiene link correcto", async ({ page }) => {
    const whatsapp = page.locator("a[href*='wa.me']");
    await expect(whatsapp).toBeAttached();
  });

  test("las cards de autos se renderizan", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(1000);
    const cards = page.locator("[data-testid='car-card']");
    await expect(cards).toHaveCount(6);
  });

  test("el formulario de contacto existe", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await expect(page.locator("input[name='nombre']")).toBeVisible();
    await expect(page.locator("input[name='email']")).toBeVisible();
  });

  test("responsive: navbar se convierte en hamburguesa en mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator("[data-testid='menu-hamburger']")).toBeVisible();
  });

  test("responsive: no hay scroll horizontal en mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test("responsive: cards se apilan en 1 columna en mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(1000);
    const cards = page.locator("[data-testid='car-card']");
    const firstCard = await cards.first().boundingBox();
    const secondCard = await cards.nth(1).boundingBox();
    if (firstCard && secondCard) {
      expect(secondCard.y).toBeGreaterThan(firstCard.y + firstCard.height - 10);
    }
  });

  test("responsive: iPad muestra grid de 2 columnas", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(1000);
    const cards = page.locator("[data-testid='car-card']");
    const firstCard = await cards.first().boundingBox();
    const secondCard = await cards.nth(1).boundingBox();
    if (firstCard && secondCard) {
      expect(secondCard.y).toBeCloseTo(firstCard.y, -1);
    }
  });

  test("no hay scroll horizontal en mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForLoadState("networkidle");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("no hay scroll horizontal en tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState("networkidle");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("touch targets son mínimo 44px en mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const buttons = await page.locator("button, a").all();
    for (const btn of buttons.slice(0, 10)) {
      const box = await btn.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
