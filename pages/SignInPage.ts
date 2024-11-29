import { Page } from '@playwright/test';

export class SignInPage {
  private page: Page;
  private userNameInput = 'input[id="username"]'; 
  private passwordInput = 'input[type="password"]'; 
  private signinButton = 'button[type="submit"]'; 
  private workspaceList = 'ol.items'; // Selector for the workspace list container
  private workspaceItem = (workspaceName: string) =>`li.recent-workspaces-list-item:has(span:has-text("${"TestWS"}"))`; 

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://identity.getpostman.com/login');
  }

  async selectWorkspace(workspaceName: string) {
    await this.page.waitForSelector(this.workspaceList);
    await this.page.click(this.workspaceItem(workspaceName));
  }

  async signIn(email: string, password: string) {
    await this.page.fill(this.userNameInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signinButton);
  }

  async isSignIn(): Promise<boolean> {
    return this.page.isVisible(this.workspaceList);
  }
}


//Verify you are human