import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  try {
    // Desktop viewport - Home page
    const desktopPage = await context.newPage();
    await desktopPage.setViewportSize({ width: 1920, height: 1080 });
    console.log('Navigating to home page...');
    await desktopPage.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({ path: 'screenshots/desktop-home.png', fullPage: true });
    console.log('✓ Desktop home screenshot captured');
    
    // Click on first product card to open modal
    console.log('Opening product modal...');
    const firstCard = await desktopPage.locator('.MuiCard-root').first();
    await firstCard.click();
    await desktopPage.waitForTimeout(1500);
    await desktopPage.screenshot({ path: 'screenshots/desktop-product-modal.png' });
    console.log('✓ Product modal screenshot captured');
    
    // Close modal
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(500);
    
    // Navigate to cart (empty state)
    console.log('Navigating to cart...');
    await desktopPage.goto('http://localhost:5173/cart', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: 'screenshots/desktop-cart-empty.png', fullPage: true });
    console.log('✓ Empty cart screenshot captured');
    
    // Go back to home and add items to cart
    console.log('Adding items to cart...');
    await desktopPage.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    
    // Add first item
    const card1 = await desktopPage.locator('.MuiCard-root').first();
    await card1.click();
    await desktopPage.waitForTimeout(500);
    const addToCartBtn = await desktopPage.locator('button:has-text("Add to cart")');
    await addToCartBtn.click();
    await desktopPage.waitForTimeout(500);
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(500);
    
    // Add second item
    const card2 = await desktopPage.locator('.MuiCard-root').nth(1);
    await card2.click();
    await desktopPage.waitForTimeout(500);
    const addToCartBtn2 = await desktopPage.locator('button:has-text("Add to cart")');
    await addToCartBtn2.click();
    await desktopPage.waitForTimeout(500);
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(500);
    
    // Navigate to cart with items
    await desktopPage.goto('http://localhost:5173/cart', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: 'screenshots/desktop-cart-with-items.png', fullPage: true });
    console.log('✓ Cart with items screenshot captured');
    
    // Navigate to favorites
    await desktopPage.goto('http://localhost:5173/fav', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: 'screenshots/desktop-favorites.png', fullPage: true });
    console.log('✓ Favorites screenshot captured');
    
    // Header with cart badge
    await desktopPage.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: 'screenshots/desktop-header-with-badge.png', clip: { x: 0, y: 0, width: 1920, height: 150 } });
    console.log('✓ Header with cart badge screenshot captured');
    
    // Tablet viewport
    const tabletPage = await context.newPage();
    await tabletPage.setViewportSize({ width: 768, height: 1024 });
    await tabletPage.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await tabletPage.waitForTimeout(2000);
    await tabletPage.screenshot({ path: 'screenshots/tablet-home.png', fullPage: true });
    console.log('✓ Tablet home screenshot captured');
    
    // Mobile viewport
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 667 });
    await mobilePage.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ path: 'screenshots/mobile-home.png', fullPage: true });
    console.log('✓ Mobile home screenshot captured');
    
    // Mobile cart
    await mobilePage.goto('http://localhost:5173/cart', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({ path: 'screenshots/mobile-cart.png', fullPage: true });
    console.log('✓ Mobile cart screenshot captured');
    
    console.log('\n✅ All screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
})();
