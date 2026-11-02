# Stress Testing & Performance Engineering: Complete Interview Guide
> **Project:** Raj Ratanm — Full-Stack E-Commerce Platform  
> **Target Audience:** Beginner to Intermediate (Explained from first principles for technical interviews)

---

## Table of Contents
1. [The Big Picture: What is Stress Testing?](#1-the-big-picture-what-is-stress-testing)
2. [Core Metrics Explained in Plain English](#2-core-metrics-explained-in-plain-english)
3. [The Testing Tool: Autocannon](#3-the-testing-tool-autocannon)
4. [Test Suite 1: The Baseline Benchmark (5,100+ Requests, 0% Errors)](#4-test-suite-1-the-baseline-benchmark)
5. [Test Suite 2: The Saturation Test (Breaking Point & Limits)](#5-test-suite-2-the-saturation-test)
6. [Architectural Hardening & Optimizations](#6-architectural-hardening--optimizations)
7. [The Numbers Cheat Sheet (Memorize for Interviews)](#7-the-numbers-cheat-sheet)
8. [Comprehensive Interview Q&A & Talking Points](#8-comprehensive-interview-qa--talking-points)

---

## 1. The Big Picture: What is Stress Testing?

### The Real-World Analogy
Imagine opening a physical jewelry store. On a typical Tuesday afternoon, 2 or 3 customers walk in. The cashier rings them up with no problem. 

Now imagine **Black Friday**: 150 people rush through the doors at the exact same second, all grabbing items and racing to the cash registers.
* Can the cashier handle 150 people at once?
* Does the credit card machine crash?
* Do people wait in line for 10 seconds or 10 minutes?
* Do people give up and walk out?

**Stress testing** is doing this to your web application intentionally before real customers do it to you. You simulate tens or hundreds of simulated users hitting your website simultaneously to find out:
1. **How fast** the site responds when busy.
2. **How much traffic** it can handle before slowing down.
3. **Where it breaks first** (the bottleneck).

```
   [ Normal Traffic ]           [ Peak / Stress Traffic ]
 👤   👤   👤                        👥👥👥👥👥👥👥👥👥👥 (100+ users)
   │    │    │                         │  │  │  │  │  │  │  │  │  │
   ▼    ▼    ▼                         ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼
┌──────────────────┐                ┌──────────────────────────────┐
│  Next.js Server  │                │      Next.js Server          │
│ (Handles easily) │                │  (Under High Concurrency)    │
└────────┬─────────┘                └──────────────┬───────────────┘
         │                                         │
         ▼                                         ▼
┌──────────────────┐                ┌──────────────────────────────┐
│ PostgreSQL DB    │                │ Connection Pool / Saturation │
└──────────────────┘                └──────────────────────────────┘
```

---

## 2. Core Metrics Explained in Plain English

When discussing stress tests in an interview, four fundamental metrics always come up:

### 1. Concurrency (Virtual Connections)
* **Definition:** How many simulated users/connections are sending requests **at the exact same instant**.
* **Beginner Tip:** 100 concurrent connections does *not* mean 100 total visits in a day. It means 100 clients actively hammering the server at the exact same split-second.

### 2. Throughput / RPS (Requests Per Second)
* **Definition:** How many complete HTTP requests the server finishes processing in one second.
* **Analogy:** If a cashier rings up 2 customers every second, the cashier's throughput is 2 checkouts/sec.
* **Our Project:** Our search API sustained **131.1 req/s** under normal concurrency, and peaked at **337.9 req/s** under heavy load.

### 3. Latency (Response Time)
* **Definition:** The time delay (measured in milliseconds, `ms`) between a user clicking a button and receiving the response.
* **Rule of thumb:**
  * `< 100 ms`: Feels instantaneous to humans.
  * `100 ms – 300 ms`: Good, responsive web performance.
  * `> 1000 ms (1s)`: Noticeable lag; users start getting impatient.
  * `> 5000 ms (5s)`: Severe delay; users bounce.

### 4. Why Averages Lie: The Power of Percentiles (p50, p95, p99)
In an interview, **never** just say "the average response time was 200ms". Senior engineers care about **percentiles**.

> **The Bar Analogy:**
> Imagine 9 normal people are sitting in a bar earning \$50,000/year. Bill Gates walks into the bar. The *average* wealth in the bar is now \$10 Billion! But that average tells you nothing about the 9 normal people.

In web servers, if 99 users get a 50ms response, but 1 user suffers a 15-second database lock, the "average" might say 200ms. But that 1 user had a broken experience.

* **p50 (Median):** Exactly 50% of requests were faster than this, and 50% were slower. This represents the typical user experience.
  * *Our Checkout p50:* **204 ms**.
* **p95:** 95% of requests were faster than this. Only the slowest 5% took longer.
  * *Our Search p95:* **245 ms**.
* **p99:** 99% of requests were faster than this. Only the 1% worst edge cases took longer.

---

## 3. The Testing Tool: Autocannon

### What is Autocannon?
Autocannon is a fast HTTP/1.1 benchmarking tool written in Node.js, capable of generating massive concurrent traffic even on a single machine.

### Why did we choose Autocannon?
1. **Node.js Ecosystem Integration:** Our entire backend is TypeScript/Next.js/Node.js. Autocannon can be installed as an npm dev dependency (`npm i -D autocannon`) with zero external software (unlike Apache JMeter which requires Java, or k6 which requires a separate binary).
2. **Scriptable in JavaScript:** We wrote standard Node.js test scripts (`scripts/run_stress_test.js`) that query real database products dynamically, construct realistic payload bodies, and output clean JSON results.
3. **Accurate Percentiles:** Autocannon automatically calculates p50, p75, p90, p95, p99, and max latency with high-resolution timers.

---

## 4. Test Suite 1: The Baseline Benchmark

**File:** `scripts/run_stress_test.js`  
**Results:** `scripts/stress_test_results.json`  
**Total Requests:** 5,103 requests across 4 scenarios | **Total Errors:** 0 (0.00%)

### Scenario 1: Catalog Read (`GET /api/products`)
* **What it tests:** Fetching the full list of products for browsing.
* **Concurrency:** 25 connections for 15 seconds.
* **Results:**
  * **Throughput:** 81.9 req/s (1,228 total requests)
  * **Median Latency (p50):** 211 ms
  * **Errors:** 0

### Scenario 2: Search & Category Filter (`GET /api/products?category=precious&search=sapphire`)
* **What it tests:** Complex database queries involving `WHERE` clauses (category match + case-insensitive text search).
* **Concurrency:** 25 connections for 15 seconds.
* **Results:**
  * **Throughput:** 131.1 req/s (1,967 total requests)
  * **Median Latency (p50):** 187 ms
  * **p95 Latency:** 245 ms
  * **Errors:** 0
* **Why so fast?** The query filters efficiently on indexed fields, and payload size is smaller than the full catalog.

### Scenario 3: Homepage Server-Rendered Delivery (`GET /`)
* **What it tests:** Full Next.js server-side rendering (SSR), generating HTML, metadata, and initial page layout.
* **Concurrency:** 40 connections for 15 seconds.
* **Results:**
  * **Throughput:** 95.9 req/s (1,439 total requests)
  * **Median Latency (p50):** 373 ms
  * **p95 Latency:** 744 ms
  * **Errors:** 0

### Scenario 4: Concurrent Checkout Writes (`POST /api/orders`)
* **What it tests:** A customer placing an order (reading DB for stock/price, verifying data, calculating total, inserting `Order` and `OrderItem` inside an atomic transaction).
* **Concurrency:** 10 connections for 10 seconds.
* **Results:**
  * **Throughput:** 46.9 orders/s (469 completed orders)
  * **Median Latency (p50):** 204 ms
  * **p95 Latency:** 265 ms
  * **Errors:** 0
* **Significance:** In e-commerce, write operations (creating orders) are much heavier than read operations. Sustaining **~47 checkouts every second** with zero errors proves the checkout pathway is resilient.

---

## 5. Test Suite 2: The Saturation Test

**File:** `scripts/run_stress_test_2.js`  
**Results:** `scripts/stress_test_2_results.json`  

### The Objective
A stress test is only half complete if you don't find where the system breaks. In Test 2, we deliberately overloaded the system with up to 150 concurrent connections to discover the **breaking point**.

### What Happened Under Extreme Load?

#### 1. Read Scalability: 100 Connections on Search
* **Endpoint:** `/api/products?category=precious&search=sapphire`
* **Connections:** 100 concurrent workers for 20 seconds.
* **Requests Sent:** 6,758 total.
* **Throughput:** **337.9 req/s** (6,349 successful 200 OK responses).
* **Finding:** Read queries scale very well on serverless infrastructure.

#### 2. Edge Rendering: 150 Connections on Homepage (`/`)
* **Connections:** 150 concurrent connections.
* **Results:** 1,416 requests, 100% 2xx responses, 0 crashes.
* **Finding:** Vercel edge infrastructure handles high connection counts on static/SSR pages effortlessly.

#### 3. The Breaking Point: 35 Concurrent Checkout Writes
* **Endpoint:** `POST /api/orders`
* **Connections:** 35 concurrent order creation workers.
* **Results:** 34 orders succeeded; 280 failed with 500 status codes.
* **Why did it break?**
  * Supabase free tier provides a shared PostgreSQL instance with a connection limit of ~15–20 active database connections.
  * When 35 simultaneous workers each tried to open an exclusive database transaction (`prisma.$transaction`) at the same millisecond:
    1. The PostgreSQL connection pool ran out of available connections.
    2. Incoming requests sat waiting for an available connection until they timed out.
    3. The server returned HTTP 500 (Internal Server Error / Connection Pool Timeout).

### The Engineering Conclusion
From this saturation test, we learned our exact operational boundaries:
* **Safe Operating Threshold:** Up to **25–50 concurrent active users** and **~15 checkouts/second** without dropped requests on the free tier.
* **Scaling Roadmap:** To handle flash sales beyond 50+ concurrent buyers, the database needs a dedicated connection pooler (like PgBouncer or Prisma Accelerate) or an asynchronous job queue.

---

## 6. Architectural Hardening & Optimizations

These are the three specific optimizations implemented in the code that made these benchmark numbers possible:

### 1. Atomic Transactions & Server-Side Price Verification
* **File:** `app/api/orders/route.ts`
* **The Problem:** In many junior projects, the client sends `{ productId, price: 100, total: 100 }`. A malicious user can intercept this request and send `price: 1` to buy expensive jewelry for \$1.
* **The Solution:**
  1. The client is only allowed to send `productId` and `quantity`.
  2. The server queries the real price and `inStock` boolean directly from PostgreSQL.
  3. The server computes the total price independently.
  4. The creation of the `Order` and associated `OrderItem` rows is wrapped inside `prisma.$transaction(async (tx) => { ... })`.
* **Why `prisma.$transaction`?**
  * It guarantees **Atomicity (the 'A' in ACID database transactions)**. If the database crashes or disconnects while creating the items, the entire order is rolled back. You never get corrupt, half-created orders in the database.

### 2. Vercel Function Colocation in Singapore (`sin1`)
* **File:** `vercel.json`
* **The Problem:** 
  * Supabase’s PostgreSQL database was deployed in AWS Singapore (`ap-southeast-1`).
  * By default, Vercel deploys serverless functions to Washington D.C., USA (`iad1`).
  * A packet traveling between Washington D.C. and Singapore takes roughly **200–250 ms** just for the round-trip flight across undersea fiber cables. If an API route executes 3 database queries sequentially, that’s 3 × 200 ms = **600 ms of pure network lag** before any code even runs!
* **The Solution:**
  * Added `"regions": ["sin1"]` in `vercel.json`.
  * Now, Vercel executes the code in Singapore, right next to the Supabase database. Network hop latency dropped to **< 5 ms**.

### 3. Keep-Alive Cron Automation
* **File:** `app/api/keep-alive/route.ts` & `vercel.json`
* **The Problem:**
  * Free-tier cloud databases sleep after periods of inactivity.
  * Serverless database connection pools close idle sockets.
  * When a new customer arrives after an hour of inactivity, they experience a **3 to 5 second cold start** while the database wakes up and establishes SSL handshakes.
* **The Solution:**
  * Configured a Vercel Cron job to ping `/api/keep-alive` every day.
  * The endpoint runs `prisma.product.count()` and pings the Supabase REST gateway, ensuring connection pools stay warm and responsive.

### 4. RBAC (Role-Based Access Control) vs RLS
* **Why RBAC?** 
  * Prisma connects to PostgreSQL via a direct connection string as a privileged database user, which bypasses Supabase's client-side Row-Level Security (RLS) policies.
  * To ensure ironclad security, admin routes (`/admin/*`) and admin API endpoints are protected using **Next.js Middleware** and a server-side authentication utility (`lib/auth.ts`) that verifies the user's session against an authorized `ADMIN_EMAIL` whitelist.

---

## 7. The Numbers Cheat Sheet

Print or review this table 10 minutes before your interview:

| Dimension | Exact Metric | What It Proves |
| :--- | :--- | :--- |
| **Total Benchmark Volume** | 5,103 requests across 4 scenarios | Statistically significant sample size |
| **Search Throughput** | **131.1 req/s** (normal) up to **337.9 req/s** (peak) | High-speed catalog search & filtering |
| **Search Latency** | **187 ms (p50)**, **245 ms (p95)** | Sub-250ms response for 95% of users |
| **Checkout Throughput** | **46.9 orders/sec** | Sustained transactional write capability |
| **Checkout Latency** | **204 ms (p50)**, **265 ms (p95)** | Rapid order completion with zero lag |
| **Reliability Rate** | **0% error rate** across baseline suite | Zero timeouts or dropped connections |
| **Max Concurrency Tested**| **150 concurrent connections** | Pushed system to edge capacity |
| **Safe Concurrency Limit** | **25–50 concurrent users**, **~15 checkouts/sec** | Realistic operational limit on free tier |
| **Colocation Region** | Singapore (`sin1`) | Eliminated cross-continental latency |

---

## 8. Comprehensive Interview Q&A & Talking Points

### Question 1: "Why did you decide to stress test this application?"
> **Answer:**  
> *"Because in e-commerce, slow page loads and failed checkouts directly result in lost revenue. A platform might run fine when tested locally by one developer, but real traffic arrives in bursts — especially during marketing campaigns or product drops.*  
> *I wanted to know our actual performance limits before shipping to production. Stress testing allowed us to quantify our throughput, verify latency percentiles, validate that our order transactions wouldn't corrupt under concurrency, and pinpoint our database connection limits."*

---

### Question 2: "Explain the difference between p50, p95, and average latency. Why did you measure percentiles?"
> **Answer:**  
> *"Averages are easily distorted by outliers. If 99 requests take 20ms and one request takes 10 seconds, the average will say roughly 120ms, which hides the fact that a user suffered a 10-second freeze.*  
> *Percentiles give a true picture of user experience: p50 is the median experience where half the users are faster. p95 and p99 represent the tail latency — the worst 5% and 1% of experiences. In our baseline test, our p50 was 187ms and our p95 was 245ms, meaning 95% of all users experienced responses in less than a quarter of a second."*

---

### Question 3: "What was the biggest bottleneck you discovered, and why did it happen?"
> **Answer:**  
> *"Database connection pool exhaustion during concurrent writes. While read endpoints effortlessly handled over 330 requests per second, when we ran 35 concurrent workers continuously executing checkout transactions (`POST /api/orders`), the Supabase free-tier PostgreSQL instance hit its connection ceiling.*  
> *Each order transaction holds a connection while verifying stock and inserting records. With 35 simultaneous workers, connections in the pool were fully occupied, causing subsequent requests to time out. That test allowed us to establish a safe operational limit of ~15 checkouts/second on the current tier."*

---

### Question 4: "If this business experienced a 100x traffic surge tomorrow, how would you scale the architecture?"
> **Answer:**  
> *"I would scale it in three targeted layers:*  
> 1. ***Connection Pooling (PgBouncer / Prisma Accelerate):** Move from direct database connections to an external connection pooler that can multiplex thousands of incoming requests across a managed pool of physical database connections.*  
> 2. ***Read Caching with Redis (Upstash):** Cache our product catalog and search results in Redis with cache invalidation on product updates. Since e-commerce traffic is 90%+ reads, this offloads almost all traffic from PostgreSQL.*  
> 3. ***Asynchronous Order Queue:** Instead of synchronous writes during checkout, we would push order events into an asynchronous queue (like AWS SQS or RabbitMQ). A background worker consumer then writes orders to the database at a controlled, safe ingestion rate without dropping requests."*

---

### Question 5: "How did you prevent client-side price tampering during checkout?"
> **Answer:**  
> *"We adopt a strict zero-trust model with the client. The checkout payload sent from the browser only includes the `productId` and the desired `quantity`. It does not accept a total price or unit price.*  
> *On the server inside `/api/orders`, we fetch the authoritative price and `inStock` status directly from the database, compute the order total server-side, and wrap the creation of the order and order items in an atomic `prisma.$transaction` block so either the full order succeeds or nothing is written."*

---

### Question 6: "Why did you configure function colocation in `sin1`?"
> **Answer:**  
> *"Network latency is bound by the speed of light over fiber. Our Supabase database was hosted in Singapore. By default, Vercel routes serverless functions to the US East region (`iad1`). If our function runs in Washington D.C. and queries a database in Singapore, every database round-trip takes 200ms+ just in transatlantic transit time.*  
> *By configuring `"regions": ["sin1"]` in `vercel.json`, our serverless execution environment and database reside in the same Singapore metropolitan area, cutting database round-trip latency to under 5ms."*

---

### Question 7: "What is the difference between Role-Based Access Control (RBAC) and Row-Level Security (RLS) in your stack?"
> **Answer:**  
> *"Row-Level Security (RLS) is enforced inside the PostgreSQL engine itself, evaluating rules against user JWTs on every query. However, because our application queries PostgreSQL through Prisma ORM using a direct server connection string, Prisma acts as a privileged database role and bypasses client RLS.*  
> *Therefore, we enforced security at the application and routing layer via Role-Based Access Control (RBAC). We verify sessions via Supabase Auth and enforce role authorization in Next.js Middleware and API route handlers (`getAdminUser`), throwing 401 Unauthorized errors if the authenticated email is not on the admin whitelist."*

---

## Summary Checklist for Your Interview

- [x] Know your tool: **Autocannon** (Node.js native, scriptable, high-precision percentiles).
- [x] Know your read numbers: **131 req/s at 245 ms p95**.
- [x] Know your write numbers: **46.9 orders/s at 204 ms median, 0% errors**.
- [x] Know your breaking point: **35 concurrent write transactions exhausted the free-tier connection pool**.
- [x] Know your optimizations: **Atomic transactions, `sin1` regional colocation, and keep-alive cron jobs**.

