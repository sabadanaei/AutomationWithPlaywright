import * as dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import { CollectionPage } from '../pages/CollectionPage';

test.describe('Automation Tests for Collection col2', () => {
  test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);

    await signInPage.navigate();
    await signInPage.signIn(process.env.POSTMAN_EMAIL!, process.env.POSTMAN_PASSWORD!);

    const isSignIn = await signInPage.isSignIn();
    expect(isSignIn).toBe(true);
  });


  // Test Case 2: Create collection col2
  test('User can create a collection named col2', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    await collectionPage.navigateToCollections();
    await collectionPage.createCollection('col2');
  });


  // Test Case 7: Add gRPC request to col2
  test('Add a gRPC request to Postman echo endpoint in col2', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.addGrpcRequest('col2', 'TestGRPC', 'postman-echo.com');
  });


  // Test Case 10: Fail to save a gRPC request without a name
  test('Fail to save a gRPC request to col2 without a name', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.addGrpcRequest('col2', '', 'postman-echo.com');
    const errorMessage = await page.locator('text=Request name is required').isVisible();
    expect(errorMessage).toBe(true);
  });
});
