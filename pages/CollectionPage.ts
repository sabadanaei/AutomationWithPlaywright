import { Page } from '@playwright/test';

export class CollectionPage {
  private page: Page;

  private collectionsTab = 'button[data-testid="tab-collections"]'; 
  private newCollectionButton = 'button[data-testid="new-collection"]'; 
  private collectionNameInput = 'input[data-testid="collection-name"]'; 
  private saveCollectionButton = 'button[data-testid="save-collection"]'; s
  private newRequestButton = 'button[data-testid="new-request"]'; 
  private requestTypeDropdown = 'button[data-testid="http-method"]'; 
  private urlInput = 'input[data-testid="request-url"]'; 
  private saveRequestButton = 'button[data-testid="save-request"]';
  private requestNameInput = 'input[data-testid="request-name"]';
  private grpcTypeButton = 'text=gRPC';
  private grpcEndpointInput = 'input[data-testid="grpc-endpoint"]';
  constructor(page: Page) {
    this.page = page;
  }

  // Click on Collections
  async navigateToCollections() {
    await this.page.click(this.collectionsTab);
  }

  // Create a new collection
  async createCollection(collectionName: string) {
    await this.page.click(this.newCollectionButton); // Click on new because import option is available too
    await this.page.fill(this.collectionNameInput, collectionName); // Collection name
    await this.page.click(this.saveCollectionButton); 
  }

  // Add a GET or POST Request 
  async addHttpRequest(collectionName: string, requestName: string, url: string, method: string) {
    await this.page.click(this.newRequestButton); 
    await this.page.click(this.requestTypeDropdown); // Open dropdown (can select whether it's GET or POST)
    await this.page.click(`text=${method.toUpperCase()}`); // Select GET or POST
    await this.page.fill(this.urlInput, url); 
    await this.page.fill(this.requestNameInput, requestName); 
    await this.page.fill('input[data-testid="collection-input"]', collectionName); // Add collection link
    await this.page.click(this.saveRequestButton); 
  }

  // Add a gRPC Request
  async addGrpcRequest(collectionName: string, requestName: string, endpoint: string) {
    await this.page.click(this.newRequestButton); 
    await this.page.click(this.grpcTypeButton); 
    await this.page.fill(this.grpcEndpointInput, endpoint); // Fill in gRPC endpoint
    await this.page.fill(this.requestNameInput, requestName); 
    await this.page.fill('input[data-testid="collection-input"]', collectionName); /// Add collection link
    await this.page.click(this.saveRequestButton); 
  }
}
