# 🛒 Demoblaze E-Commerce End-to-End Automation Suite

This repository features a comprehensive E2E test automation suite for the [Demoblaze](https://www.demoblaze.com/) e-commerce platform. The project is built using **Playwright** with **TypeScript**, following industry-standard best practices and the **Page Object Model (POM)**.

## 🏗️ Architecture & Engineering Approach

* **Framework:** Playwright (TypeScript)
* **Design Pattern:** Page Object Model (POM) – *Ensuring modularity and reusability.*
* **Reporting:** Playwright HTML Reporter – *Detailed execution logs and trace viewer.*
* **Test Strategy:** Divided into **Smoke Tests** (critical flows) and **Functional Tests** (comprehensive feature validation).

---

## 👥 Contributors

This project was developed through the collaborative efforts of the following team members:

* **Taha Onur Aydemir**
* **Taylan Taşkın**
* **Furkan Duksal**
* **Ömer Faruk Yaşar**
* **Kürşat Koç**

---

## 🧪 Detailed Test Coverage

The suite covers **18 specialized scenarios** categorized for maximum reliability:

### 🟢 Smoke Tests (High-Priority Flows)
* **S1:** Successful Login with verified credentials.
* **S2:** Product selection and "Add to Cart" functionality.
* **S3:** Seamless "Register & Auto-Login" user journey.
* **S4:** **Full Checkout Pipeline:** From cart validation to order confirmation.
* **S5:** **Category Filtering:** Verifying Phones, Laptops, and Monitors sorting logic.

### 🔵 Functional Tests (Feature Deep-Dives)
* **F1-F4:** **Registration Logic:** Handling unique usernames and negative/duplicate sign-up attempts.
* **F5:** **Cart Operations:** Successful deletion of items and dynamic price updates.
* **F6:** **Product Specifications:** Validating price, description, and image assets for accuracy.
* **F7:** **Media Interaction:** Verification of "About Us" video modal and player objects.
* **F9:** **DOM Stability:** Ensuring correct UI behavior when switching between product categories.
* **F10-F11:** **Session & Modals:** Logout security and modal persistence during UI interactions.
* **F12-F14:** **Navigation & UI State:** Cart URL routing and input field presence across registration forms.
* **F15-F17:** **Negative Validations:** Attempting login with incorrect passwords and handling empty field errors.
* **F18:** **Session Persistence:** Maintaining user authentication state while navigating via the brand logo/home links.

---

## 🛠️ Installation & Execution

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPO_NAME].git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run all tests:**
    ```bash
    npx playwright test
    ```
4.  **Open the test report:**
    ```bash
    npx playwright show-report
    ```

---

## 📈 Reliability & Optimization
To adapt to the environment's performance, we implemented **Smart Waiting Strategies** and utilized Playwright's **Retry Mechanisms**. This ensures high reliability and minimizes "flaky" results caused by third-party server latency.

---
**© 2025 - Automation Engineering Portfolio Project**
