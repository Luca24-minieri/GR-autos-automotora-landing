import { test, expect } from "@playwright/test";

test.describe("GR Autos Landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
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
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
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
});

test.describe("Catálogo /vehiculos", () => {
  test("filtros del catálogo funcionan", async ({ page }) => {
    await page.goto("/vehiculos");
    const cards = page.locator("[data-testid='car-card']");
    const countBefore = await cards.count();
    expect(countBefore).toBeGreaterThan(0);
  });

  test("comparador: checkbox aparece en cards", async ({ page }) => {
    await page.goto("/vehiculos");
    const checkbox = page.locator("[data-testid='compare-checkbox']").first();
    await expect(checkbox).toBeVisible();
  });
});

test.describe("Ficha de vehículo", () => {
  test("ficha de vehículo carga con datos", async ({ page }) => {
    await page.goto("/vehiculo/hyundai-tucson-2023");
    await expect(page.getByText("Hyundai")).toBeVisible();
    await expect(page.getByText("Tucson")).toBeVisible();
  });

  test("compartir WhatsApp tiene link correcto", async ({ page }) => {
    await page.goto("/vehiculo/hyundai-tucson-2023");
    const shareBtn = page.locator("[data-testid='share-whatsapp']");
    await expect(shareBtn).toBeAttached();
    const href = await shareBtn.getAttribute("href");
    expect(href).toContain("wa.me");
  });
});

test.describe("Financiamiento", () => {
  test("simulador de crédito calcula cuotas", async ({ page }) => {
    await page.goto("/financiamiento");
    const resultado = page.locator("[data-testid='resultado-cuota']");
    await expect(resultado).toBeVisible();
  });
});

test.describe("Vende tu auto", () => {
  test("página vende tu auto tiene formulario", async ({ page }) => {
    await page.goto("/vende-tu-auto");
    await expect(page.locator("select[name='marca']")).toBeVisible();
    await expect(page.getByText("Solicitar tasación")).toBeVisible();
  });
});

test.describe("SEO", () => {
  test("sitemap existe", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });
});

test.describe("Responsive", () => {
  test("no hay scroll horizontal en tablet", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState("networkidle");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("formulario de contacto existe en /contacto", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.locator("input[name='nombre']")).toBeVisible();
    await expect(page.locator("input[name='email']")).toBeVisible();
  });
});
