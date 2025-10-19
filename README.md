# Jmeter-Ecommerce-Project-for-Performance-Testing

A comprehensive performance testing framework built using **Apache JMeter**, designed to simulate real-world load on the **AutomationExercise E-commerce Application**.  
This project covers a full end-to-end user journey with correlation, assertions, timers, parameterization, controllers, and non-GUI execution with HTML dashboard reporting.

---

## 🚀 Project Overview

**Objective:** Evaluate performance, stability, and responsiveness of an E-commerce platform under simulated concurrent users.

**User Journey Covered:**
1. Launch Application
2. User Login (with CSRF Correlation)
3. Product Search (Driven by CSV Data)
4. Add to Cart & View Cart
5. Checkout & Payment Flow (With Token Validation)
6. Download Invoice
7. Logout

---

## 🧰 Tech Stack & Tools

| Tool/Feature         | Usage |
|----------------------|------------------------------------------------|
| Apache JMeter        | Load & Performance Testing |
| CSV Data Set Config  | Data-driven product search |
| Regular Expression Extractor | CSRF Token Correlation |
| HTTP Header & Cookie Manager | Session & Request Handling |
| Assertions           | Response, Size & Duration Validation |
| Timers               | Realistic Think Time (Constant, Gaussian, Throughput) |
| Controllers          | Transaction, Loop, Conditional Flow |
| JSR223 (Groovy)      | Custom logic & advanced scripting |
| Non-GUI Mode         | CLI execution & HTML reporting |
| Distributed Mode     | Optional Master-Slave Testing |

---

## 🔁 Key Features Implemented

✅ **Correlation (CSRF Token Handling)** using Regular Expression Extractor  
✅ **Parameterization** thru `productsList.csv`  
✅ **Assertions** for response validation & SLA compliance  
✅ **Realistic Timers** simulating user think-time  
✅ **Custom JSR223 (Groovy Logic)** – Picking unique matches  
✅ **Referer Handling** to avoid CSRF & 403 errors  
✅ **Controllers** for structured, modular test flow  
✅ **Non-GUI Mode Execution** with PDF/HTML reporting  

---

## 🗂 CSV Data Handling

| File Name | Purpose |
|-----------|---------|
| `productsList.csv` | List of dynamic search queries (Dress, Jeans, Shoes etc.) |

---

## 💻 How to Run (GUI Mode)

1. Open JMeter
2. Load EcommerceFlow.jmx
3. Click Start ▶
4. View results via:
  - View Results Tree
  - Aggregate Report
  - Graph Results

## 💻 How to Run (Non-GUI Mode)

jmeter -n -t "EcommerceFlow.jmx" \
       -l "results/results.jtl" \
       -e -o "reports/"

## 🚀 Future Enhancements (Planned)

1. CI/CD Integration using Jenkins or GitHub Actions
2. Stress & Spike Testing
3. Automated report publishing via pipeline

## 📜 Author

- Gaurang Gajjar
- Software Tester & Automation Enthusiast
- gauranggajjar26@gmail.com

GitHub: https://github.com/26Gaurang/Jmeter-Ecommerce-Project-for-Performance-Testing
