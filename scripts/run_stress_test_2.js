const autocannon = require('autocannon');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const BASE_URL = 'https://rajratanm-ecommerce-three.vercel.app';

async function runScenario(title, options) {
  console.log(`\n======================================================`);
  console.log(`⚡ EXTREME LIMIT TEST: ${title}`);
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
      console.log(`   Errors / Non-2xx: ${result.errors + result.timeouts + result.non2xx}`);
      console.log(`   2xx Responses:    ${result['2xx'] || result.requests.total}`);
      console.log(`   Data Read:        ${(result.throughput.total / 1024 / 1024).toFixed(2)} MB`);

      resolve(result);
    });
  });
}

async function main() {
  console.log(`🔥 Starting Stress Test 2: Absolute Limits & Saturation Testing`);
  console.log(`   Base URL: ${BASE_URL}\n`);

  const prisma = new PrismaClient();
  const product = await prisma.product.findFirst({
    where: { inStock: true },
    select: { id: true, price: true }
  });
  await prisma.$disconnect();

  const results = {};

  // Limit Test 1: Heavy Search & Filter with 100 Concurrent Connections
  results.search100 = await runScenario('1. High-Concurrency Search (100 Connections)', {
    url: `${BASE_URL}/api/products?category=precious&search=sapphire`,
    connections: 100,
    duration: 20,
    headers: { 'User-Agent': 'Autocannon-Stress-Test-2' }
  });

  // Limit Test 2: Massive Edge Home Render with 150 Concurrent Connections
  results.edgeHome150 = await runScenario('2. Edge Capacity Test: Homepage (150 Connections)', {
    url: `${BASE_URL}/`,
    connections: 150,
    duration: 20,
    headers: { 'User-Agent': 'Autocannon-Stress-Test-2' }
  });

  // Limit Test 3: Raw Minimal Database Ping under 100 Connections
  results.dbPing100 = await runScenario('3. Raw DB Heartbeat / Pooler Saturation (/api/keep-alive, 100 Connections)', {
    url: `${BASE_URL}/api/keep-alive`,
    connections: 100,
    duration: 20,
    headers: { 'User-Agent': 'Autocannon-Stress-Test-2' }
  });

  // Limit Test 4: Maximum Write Concurrency for Order Placements (35 concurrent checkout workers)
  const orderBody = JSON.stringify({
    customerName: "Stress Test Bot 2",
    customerEmail: "stress.test2@example.com",
    customerPhone: "9828999999",
    address: "Stress Test Lab, Suite 500",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    items: [
      { productId: product.id, quantity: 1 }
    ]
  });

  results.write35 = await runScenario('4. Extreme Write Load: Concurrent Orders (35 Connections)', {
    url: `${BASE_URL}/api/orders`,
    method: 'POST',
    connections: 35,
    duration: 15,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Autocannon-Stress-Test-2'
    },
    body: orderBody
  });

  fs.writeFileSync('scripts/stress_test_2_results.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Stress Test 2 Complete! Raw metrics saved to scripts/stress_test_2_results.json');
}

main().catch(e => {
  console.error('Stress Test 2 Failed:', e);
  process.exit(1);
});
