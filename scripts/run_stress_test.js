const autocannon = require('autocannon');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://rajratanm-ecommerce-three.vercel.app';

async function runScenario(title, options) {
  console.log(`\n======================================================`);
  console.log(`🔥 Starting Scenario: ${title}`);
  console.log(`   Target: ${options.url}`);
  console.log(`   Connections: ${options.connections} | Duration: ${options.duration}s`);
  console.log(`======================================================`);

  return new Promise((resolve, reject) => {
    autocannon(options, (err, result) => {
      if (err) return reject(err);

      console.log(`\n📊 RESULTS: ${title}`);
      console.log(`   Requests Total:   ${result.requests.total}`);
      console.log(`   Throughput (RPS): ${result.requests.average.toFixed(1)} req/sec`);
      console.log(`   Latency Median:   ${result.latency.p50} ms`);
      console.log(`   Latency p90:      ${result.latency.p90} ms`);
      console.log(`   Latency p95:      ${result.latency.p97_5} ms`);
      console.log(`   Latency p99:      ${result.latency.p99} ms`);
      console.log(`   Latency Max:      ${result.latency.max} ms`);
      console.log(`   Errors / 5xx:     ${result.errors + result.timeouts + result.non2xx}`);
      console.log(`   Data Read:        ${(result.throughput.total / 1024 / 1024).toFixed(2)} MB`);

      resolve(result);
    });
  });
}

async function main() {
  console.log(`🚀 Raj Ratnam High-Concurrency Stress Test Suite`);
  console.log(`   Base Target: ${BASE_URL}\n`);

  // 1. Fetch live product IDs for the write stress test
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    where: { inStock: true },
    select: { id: true, price: true, name: true },
    take: 2
  });
  await prisma.$disconnect();

  if (products.length === 0) {
    console.error('No in-stock products found for order testing!');
    process.exit(1);
  }

  const results = {};

  // Scenario 1: Catalog Read Throughput
  results.catalog = await runScenario('1. Catalog Read (/api/products)', {
    url: `${BASE_URL}/api/products`,
    connections: 25,
    duration: 15,
    headers: { 'User-Agent': 'Autocannon-Stress-Test' }
  });

  // Scenario 2: Search & Category Filter
  results.search = await runScenario('2. Filtered Search (/api/products?category=precious&search=sapphire)', {
    url: `${BASE_URL}/api/products?category=precious&search=sapphire`,
    connections: 25,
    duration: 15,
    headers: { 'User-Agent': 'Autocannon-Stress-Test' }
  });

  // Scenario 3: Homepage Server-Rendered Delivery
  results.homepage = await runScenario('3. Homepage Full Render (/)', {
    url: `${BASE_URL}/`,
    connections: 40,
    duration: 15,
    headers: { 'User-Agent': 'Autocannon-Stress-Test' }
  });

  // Scenario 4: Flash Sale Checkout / Order Placement (POST /api/orders)
  const orderBody = JSON.stringify({
    customerName: "Stress Test Bot",
    customerEmail: "stress.test@example.com",
    customerPhone: "9828000000",
    address: "Benchmark Tower, Floor 10",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    items: [
      { productId: products[0].id, quantity: 1 }
    ]
  });

  results.orders = await runScenario('4. Flash Sale Checkout (POST /api/orders)', {
    url: `${BASE_URL}/api/orders`,
    method: 'POST',
    connections: 10,
    duration: 10,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Autocannon-Stress-Test'
    },
    body: orderBody
  });

  // Summary JSON output
  const summary = {
    timestamp: new Date().toISOString(),
    scenarios: {
      catalog: {
        rps: results.catalog.requests.average,
        totalRequests: results.catalog.requests.total,
        p50: results.catalog.latency.p50,
        p95: results.catalog.latency.p97_5,
        p99: results.catalog.latency.p99,
        errors: results.catalog.errors + results.catalog.timeouts + results.catalog.non2xx
      },
      search: {
        rps: results.search.requests.average,
        totalRequests: results.search.requests.total,
        p50: results.search.latency.p50,
        p95: results.search.latency.p97_5,
        p99: results.search.latency.p99,
        errors: results.search.errors + results.search.timeouts + results.search.non2xx
      },
      homepage: {
        rps: results.homepage.requests.average,
        totalRequests: results.homepage.requests.total,
        p50: results.homepage.latency.p50,
        p95: results.homepage.latency.p97_5,
        p99: results.homepage.latency.p99,
        errors: results.homepage.errors + results.homepage.timeouts + results.homepage.non2xx
      },
      orders: {
        rps: results.orders.requests.average,
        totalRequests: results.orders.requests.total,
        p50: results.orders.latency.p50,
        p95: results.orders.latency.p97_5,
        p99: results.orders.latency.p99,
        errors: results.orders.errors + results.orders.timeouts + results.orders.non2xx
      }
    }
  };

  fs.writeFileSync('scripts/stress_test_results.json', JSON.stringify(summary, null, 2));
  console.log('\n✅ All Scenarios Completed! Results saved to scripts/stress_test_results.json');
}

main().catch(err => {
  console.error('Stress test suite failed:', err);
  process.exit(1);
});
