import * as dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import { CollectionPage } from '../pages/CollectionPage';

test.describe('Automation Tests for Collection col1', () => {
  test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.navigate();
    await signInPage.signIn(process.env.POSTMAN_EMAIL!, process.env.POSTMAN_PASSWORD!);

    const isSignIn = await signInPage.isSignIn();
    expect(isSignIn).toBe(true);
  });


  // Test Case 1: Create collection col1
  test('User can create a collection named col1', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    await collectionPage.navigateToCollections();
    await collectionPage.createCollection('col1');
  });


  // Test Case 5: Add GET request to col1
  test('Add a GET request to Postman echo endpoint in col1', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    // Add GET request to col1
    await collectionPage.addHttpRequest('col1', 'TestGET', 'https://postman-echo.com/get', 'GET');
  });


  // Test Case 6: Add POST request to col1
  test('Add a POST request to Postman echo endpoint in col1', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    // Add POST request to col1
    await collectionPage.addHttpRequest('col1', 'TestPOST', 'https://postman-echo.com/post', 'POST');
  });


  // Test Case 8: Fail to save GET request without a name
  test('Fail to save a GET request to col1 without a name', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    await collectionPage.addHttpRequest('col1', '', 'https://postman-echo.com/get', 'GET');

    const errorMessage = await page.locator('text=Request name is required').isVisible();
    expect(errorMessage).toBe(true);
  });


  // Test Case 9: Fail to save POST request without a URL
  test('Fail to save a POST request to col1 without a URL', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    await collectionPage.addHttpRequest('col1', 'TestPOST', '', 'POST');

    const errorMessage = await page.locator('text=Request URL is required').isVisible();
    expect(errorMessage).toBe(true);
  });
});

