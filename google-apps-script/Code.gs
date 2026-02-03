/**
 * Google Apps Script - Web App API for NatNat Flower Shop
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Copy this entire code into Code.gs
 * 4. Update SPREADSHEET_ID with your Google Sheet ID
 * 5. Deploy → New deployment → Web app
 * 6. Set "Execute as" = Me, "Who has access" = Anyone
 * 7. Copy the Web App URL to your .env file
 */

// ==================== CONFIGURATION ====================
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Sheet ID

// Sheet names (must match exactly with your Google Sheets tabs)
const SHEETS = {
  PRODUCTS: 'Products',
  CATEGORIES: 'Categories',
  TESTIMONIALS: 'Testimonials',
  FEATURES: 'Features',
  SITE_CONTENT: 'SiteContent',
  SITE_CONFIG: 'SiteConfig',
  BESTSELLERS: 'Bestsellers',
  INSTAGRAM: 'Instagram',
  ABOUT: 'About',
  HOW_IT_WORKS: 'HowItWorks'
};

// ==================== MAIN HANDLER ====================
function doGet(e) {
  const output = handleRequest(e);
  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const output = handleRequest(e);
  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRequest(e) {
  try {
    const action = e?.parameter?.action || 'all';
    
    switch (action) {
      case 'products':
        return { success: true, data: getProducts() };
      case 'categories':
        return { success: true, data: getCategories() };
      case 'testimonials':
        return { success: true, data: getTestimonials() };
      case 'features':
        return { success: true, data: getFeatures() };
      case 'siteContent':
        return { success: true, data: getSiteContent() };
      case 'siteConfig':
        return { success: true, data: getSiteConfig() };
      case 'bestsellers':
        return { success: true, data: getBestsellers() };
      case 'instagram':
        return { success: true, data: getInstagram() };
      case 'about':
        return { success: true, data: getAbout() };
      case 'howItWorks':
        return { success: true, data: getHowItWorks() };
      case 'all':
      default:
        return {
          success: true,
          data: {
            products: getProducts(),
            categories: getCategories(),
            testimonials: getTestimonials(),
            features: getFeatures(),
            siteContent: getSiteContent(),
            siteConfig: getSiteConfig(),
            bestsellers: getBestsellers(),
            instagram: getInstagram(),
            about: getAbout(),
            howItWorks: getHowItWorks()
          }
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ==================== HELPER FUNCTIONS ====================
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheetData(sheetName) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return [];
  }
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      let value = row[index];
      
      // Parse boolean strings
      if (value === 'TRUE' || value === 'true') value = true;
      if (value === 'FALSE' || value === 'false') value = false;
      
      // Parse numbers
      if (typeof value === 'string' && !isNaN(value) && value !== '') {
        value = Number(value);
      }
      
      obj[header] = value;
    });
    return obj;
  }).filter(row => {
    // Filter out empty rows
    return Object.values(row).some(v => v !== '' && v !== null && v !== undefined);
  });
}

// ==================== DATA GETTERS ====================

/**
 * Get all products
 * Expected columns: id, name, price, originalPrice, discount, imageUrl, galleryImages, category, isNew, isBestseller, stock, description
 */
function getProducts() {
  const data = getSheetData(SHEETS.PRODUCTS);
  return data.map(product => ({
    ...product,
    // Parse gallery images from comma-separated string to array
    images: product.galleryImages 
      ? product.galleryImages.split(',').map(url => url.trim())
      : [product.imageUrl],
    image: product.imageUrl
  }));
}

/**
 * Get categories
 * Expected columns: id, label, displayOrder
 */
function getCategories() {
  const data = getSheetData(SHEETS.CATEGORIES);
  return data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

/**
 * Get testimonials
 * Expected columns: id, name, rating, text, isActive
 */
function getTestimonials() {
  const data = getSheetData(SHEETS.TESTIMONIALS);
  return data.filter(t => t.isActive !== false);
}

/**
 * Get features
 * Expected columns: id, icon, title, description, displayOrder
 */
function getFeatures() {
  const data = getSheetData(SHEETS.FEATURES);
  return data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

/**
 * Get site content (key-value pairs organized by section)
 * Expected columns: section, key, value
 */
function getSiteContent() {
  const data = getSheetData(SHEETS.SITE_CONTENT);
  const content = {};
  
  data.forEach(row => {
    if (!content[row.section]) {
      content[row.section] = {};
    }
    content[row.section][row.key] = row.value;
  });
  
  return content;
}

/**
 * Get site config (key-value pairs)
 * Expected columns: key, value
 */
function getSiteConfig() {
  const data = getSheetData(SHEETS.SITE_CONFIG);
  const config = {};
  
  data.forEach(row => {
    config[row.key] = row.value;
  });
  
  return config;
}

/**
 * Get bestseller products for homepage
 * Expected columns: id, image, name, price, displayOrder
 */
function getBestsellers() {
  const data = getSheetData(SHEETS.BESTSELLERS);
  return data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

/**
 * Get Instagram feed
 * Expected columns: id, imageUrl, altText, displayOrder
 */
function getInstagram() {
  const data = getSheetData(SHEETS.INSTAGRAM);
  return data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

/**
 * Get About sections
 * Expected columns: id, title, content, image, linkText, linkUrl, displayOrder
 */
function getAbout() {
  const data = getSheetData(SHEETS.ABOUT);
  return data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

/**
 * Get How It Works steps
 * Expected columns: stepNumber, emoji, title, description
 */
function getHowItWorks() {
  const data = getSheetData(SHEETS.HOW_IT_WORKS);
  return data.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0));
}

// ==================== TEST FUNCTION ====================
function testAPI() {
  const result = handleRequest({ parameter: { action: 'all' } });
  Logger.log(JSON.stringify(result, null, 2));
}
