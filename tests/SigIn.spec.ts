import * as dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';

test.describe('Sign In Automated Tests', () => {

  test('User signs in with valid credentials', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.navigate();

    await signInPage.signIn(process.env.EMAIL!, process.env.PASSWORD!);

    // Assertion
    const isSignIn = await signInPage.isSignIn();
    expect(isSignIn).toBe(true);
  });


  test('User signs in with valid credentials and opens a workspace', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.navigate();
    await signInPage.signIn(process.env.EMAIL!, process.env.PASSWORD!);


    const isSignIn = await signInPage.isSignIn();
    expect(isSignIn).toBe(true);

    await signInPage.selectWorkspace(process.env.WORKSPACE_NAME!);

    // Assertion
    const workspaceHeader = await page.locator(`span:has-text("${process.env.WORKSPACE_NAME}")`).isVisible();
    expect(workspaceHeader).toBe(true);
  });


  test('User resets password and signs in', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.navigate();

    await page.click('text=Forgot Password');

    await page.fill('input[type="email"]', process.env.EMAIL!);
    await page.click('button[type="submit"]');

    console.log('Simulating reset password process...');

    await signInPage.signIn(process.env.EMAIL!, 'new_password');

    // Assertion
    const isSignIn = await signInPage.isSignIn();
    expect(isSignIn).toBe(true);
  });


  test('User fails to sign in with invalid credentials', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.navigate();

    await signInPage.signIn('invalid_email@example.com', 'wrong_password');
 
    // Assertion
    const errorMessage = await page.locator('text=Invalid username/password').isVisible();
    expect(errorMessage).toBe(true);
  });


  test('User fails to sign in with blank credentials', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.navigate();

    await signInPage.signIn('', '');

    // Assertion
    const errorMessage = await page.locator('text=Fields cannot be blank').isVisible();
    expect(errorMessage).toBe(true);
  });
});

