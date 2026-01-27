const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  // Desktop viewport
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1920, height: 1080 });
  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: 'screenshots/desktop-home.png', fullPage: true });
  
  // Click on first product card to open modal
  await desktopPage.click('.MuiCard-root:first-child');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'screenshots/desktop-product-modal.png' });
  
  // Close modal and navigate to cart
  await desktopPage.keyboard.press('Escape');
  await desktopPage.waitForTimeout(500);
  await desktopPage.click('a[href="cart"]');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'screenshots/desktop-cart-empty.png', fullPage: true });
  
  // Go back to home and add items to cart
  await desktopPage.goto('http://localhost:5173');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.click('.MuiCard-root:first-child');
  await desktopPage.waitForTimeout(500);
  await desktopPage.click('button:has-text("Add to cart")');
  await desktopPage.waitForTimeout(500);
  await desktopPage.keyboard.press('Escape');
  await desktopPage.waitForTimeout(500);
  
  // Add another item
  const cards = await desktopPage.$$('.MuiCard-root');
  if (cards.length > 1) {
    await cards[1].click();
    await desktopPage.waitForTimeout(500);
    await desktopPage.click('button:has-text("Add to cart")');
    await desktopPage.waitForTimeout(500);
    await desktopPage.keyboard.press('Escape');
  }
  
  // Navigate to cart with items
  await desktopPage.click('a[href="cart"]');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'screenshots/desktop-cart-with-items.png', fullPage: true });
  
  // Navigate to favorites
  await desktopPage.goto('http://localhost:5173');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.click('a[href="fav"]');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'screenshots/desktop-favorites.png', fullPage: true });
  
  // Tablet viewport
  const tabletPage = await context.newPage();
  await tabletPage.setViewportSize({ width: 768, height: 1024 });
  await tabletPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(2000);
  await tabletPage.screenshot({ path: 'screenshots/tablet-home.png', fullPage: true });
  
  // Mobile viewport
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 667 });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: 'screenshots/mobile-home.png', fullPage: true });
  
  // Mobile cart
  await mobilePage.click('a[href="cart"]');
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'screenshots/mobile-cart.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshots captured successfully!');
})();
