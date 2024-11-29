import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';

// The following test case ran into problem in real because the postman sign in page needs human verification
//It suupose to navigate to postman manually ebter usetname, password and human verification and after login click on TestWS workspace
test.describe('Sign In Tests', () => {
    test('Manually log in and select a specific workspace', async ({ page }) => {
        const signInPage = new SignInPage(page);
        await signInPage.navigate();
    
        //Try to manually enter user and password and uman verification -> failed
        console.log('Please manually enter credentials and complete CAPTCHA...');
        await page.pause();
    
        const isSignIn = await signInPage.isSignIn();
        expect(isSignIn).toBe(true);
    
        await signInPage.selectWorkspace('TestWS');
        const workspaceHeader = await page.locator('span:has-text("TestWS")'); 
        expect(await workspaceHeader.isVisible()).toBe(true);
      });
    });