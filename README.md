# Why choose PlayWright over other frameworks?
I prefer to choose Playwright for this assignment because it offers various options like:
Support multi-browser,  which you can easily set headless: false to see real-time automation. Playwright supports Chromium, Firefox, and WebKit
Debugging tools, to find out the failure reason faster and debug issues step-by-step.
Flexibility with both UI and API testing. In case of APIs, it helps to simplify backend testing process

## Setup
1. We are going to skip some initial setup like installing Node.js, npm, ...
2. Clone the repository: git clone <URL>
3. package intallation: npm install

### PlayWright test execution 
1. In order to run all test case on tests file: npx playwright test
2. In order to run specific test case: npx playwright test tests/signin.spec.ts


## POM Structure
```markdown

AUTOMATIONWITHPLAYWRIGHT/
│
├── .github/                     
├── node_modules/                
├── pages/                       # Page Object Models (POMs)
│   ├── CollectionPage.ts        # Handles collections and requests
│   ├── SignInPage.ts            # Handles sign-in functionality
│
├── playwright-report/           
├── test-results/                
├── TestCases/                   # Manual test case files
│   ├── Collection.yaml          # Test cases for collections
│   ├── SignIn.yaml              # Test cases for sign-in
│
├── tests/                       # Automated test files
│   ├── col1.spec.ts             # Tests for "col1"
│   ├── col2.spec.ts             # Tests for "col2"
│   ├── SignIn.spec.ts           # Tests for sign-in functionality
│   ├── SignInWithWorkSpace.spec.ts # Tests for sign-in with workspace selection
│
├── .env                         # Environment variables
├── .gitignore                  
├── package.json               
├── package-lock.json          
├── playwright.config.ts         # Playwright configuration
└── README.md                    # Project documentation

