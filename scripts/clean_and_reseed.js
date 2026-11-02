const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// Read .env if not loaded
try {
  const env = fs.readFileSync('.env', 'utf8');
  env.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2 && !line.startsWith('#')) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  });
} catch (e) {}

const prisma = new PrismaClient();

const curatedProducts = [
  // 1. Precious Gemstones
  {
    name: "Natural Ceylon Blue Sapphire (Neelam)",
    nameHindi: "प्राकृतिक सीलोन नीलम रत्न",
    slug: "natural-ceylon-blue-sapphire-neelam",
    category: "precious",
    price: 4999,
    description: "Authentic deep-blue Ceylon sapphire known to bring mental clarity, discipline, and fast-acting astrological blessings of Lord Saturn (Shani Dev). Certified natural and energized with Vedic mantras.",
    descriptionHindi: "शनि देव के विशेष आशीर्वाद और त्वरित प्रभाव के लिए प्रसिद्ध गहरा नीला सीलोन नीलम। मानसिक स्पष्टता और व्यापार में सफलता हेतु उत्तम।",
    origin: "Ceylon (Sri Lanka)",
    chakra: "Ajna (Third Eye Chakra)",
    healingProps: "Brings mental focus, shields against negative aura, and accelerates career breakthroughs.",
    weight: "4.25 Rati (3.85 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Burma Red Ruby (Manik)",
    nameHindi: "बर्मी लाल माणिक्य रत्न",
    slug: "burma-red-ruby-manik",
    category: "precious",
    price: 5499,
    description: "Vibrant pigeon-blood red ruby representing the Sun (Surya Dev). Enhances leadership qualities, self-confidence, vital energy, and executive authority.",
    descriptionHindi: "सूर्य देव का प्रतिनिधित्व करने वाला सुंदर लाल माणिक्य रत्न। नेतृत्व क्षमता, आत्मविश्वास और यश-कीर्ति में वृद्धि करता है।",
    origin: "Burma (Myanmar)",
    chakra: "Manipura (Solar Plexus Chakra)",
    healingProps: "Boosts vitality, heart chakra energy, professional authority, and public recognition.",
    weight: "5.15 Rati (4.68 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1551122102-63cd339bfaab?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Zambian Natural Emerald (Panna)",
    nameHindi: "प्राकृतिक जाम्बियन पन्ना रत्न",
    slug: "zambian-natural-emerald-panna",
    category: "precious",
    price: 4200,
    description: "Lustrous glowing natural Zambian emerald governed by Mercury (Budh Dev). Highly recommended for students, analysts, traders, and public speakers.",
    descriptionHindi: "बुध ग्रह का कारक सुंदर हरा पन्ना रत्न। शिक्षा, व्यापार, संवाद कला और बौद्धिक क्षमता को निखारने के लिए सर्वश्रेष्ठ।",
    origin: "Zambia",
    chakra: "Anahata (Heart Chakra)",
    healingProps: "Sharpens intellect, calms the nervous system, and enhances commercial success.",
    weight: "4.75 Rati (4.31 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1767131545090-e13ae86c8e13?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Natural Basra Pearl (Saccha Moti)",
    nameHindi: "प्राकृतिक सच्चा मोती हार व रत्न",
    slug: "natural-basra-pearl-moti",
    category: "precious",
    price: 2800,
    description: "Silky smooth natural pearl governed by the Moon (Chandra). Calms anger, balances emotional turbulence, and promotes mental peace.",
    descriptionHindi: "चंद्रमा का शुभ रत्न सच्चा मोती। मानसिक शांति, तनाव मुक्ति और अनिद्रा की समस्या को दूर करने में अत्यंत सहायक।",
    origin: "South Sea",
    chakra: "Swadhisthana (Sacral Chakra)",
    healingProps: "Relieves anxiety, balances emotional energies, and clears mental blockages.",
    weight: "6.25 Rati (5.68 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },

  // 2. Semi-Precious Gemstones
  {
    name: "African Deep Purple Amethyst (Katela)",
    nameHindi: "अफ्रीकी जामुनी कटेला रत्न (एमेथिस्ट)",
    slug: "african-deep-purple-amethyst-katela",
    category: "semi-precious",
    price: 1899,
    description: "Deep violet African amethyst, an astrological upratna for Saturn. Overcomes alcohol addictions, relieves migraine headaches, and fosters deep meditation.",
    descriptionHindi: "शनि का प्रभावशाली उपरत्न जामुनी कटेला। व्यसन मुक्ति, मानसिक शांति, एकाग्रता और गहरी साधना के लिए श्रेष्ठ।",
    origin: "Africa",
    chakra: "Sahasrara (Crown Chakra)",
    healingProps: "Transmutes negative energies into spiritual light and soothes chronic anxiety.",
    weight: "7.20 Rati (6.54 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1780432035257-bcfea5e54bbc?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Golden Brazilian Citrine (Sunela)",
    nameHindi: "गोल्डन ब्राजीलियन सुनेला रत्न (सिट्रीन)",
    slug: "golden-brazilian-citrine-sunela",
    category: "semi-precious",
    price: 1750,
    description: "Radiant golden-yellow Brazilian Citrine, known universally as the Merchant's Stone. Attracts commercial wealth, cash flow, and joyful optimism.",
    descriptionHindi: "व्यापारियों का भाग्य रत्न सुनेला (सिट्रीन)। धन आकर्षण, व्यापार वृद्धि और सकारात्मक दृष्टिकोण विकसित करता है।",
    origin: "Brazil",
    chakra: "Manipura (Solar Plexus)",
    healingProps: "Stimulates digestion, cleanses the aura, and amplifies financial manifestations.",
    weight: "6.80 Rati (6.18 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1784662193205-9b3402aeab27?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },

  // 3. Crystals & Minerals
  {
    name: "Raw Natural Pyrite 'Fool\'s Gold' Cluster",
    nameHindi: "प्राकृतिक पाइराइट वेल्थ क्रिस्टल",
    slug: "raw-natural-pyrite-fools-gold-cluster",
    category: "crystal",
    price: 899,
    description: "Gleaming golden cubic Pyrite cluster from Peru. A powerful financial magnet that shields your workspace from energetic vampires and activates solar plexus drive.",
    descriptionHindi: "धन और समृद्धि आकर्षित करने वाला चमकीला पाइराइट क्लस्टर। कार्यक्षेत्र में सकारात्मक ऊर्जा और आत्मविश्वास का संचार करता है।",
    origin: "Peru",
    chakra: "Solar Plexus",
    healingProps: "Strengthens willpower, inspires bold business decisions, and repels environmental negativity.",
    weight: "180 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1760651691839-d089c1d9ff54?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Natural Amethyst Chakra Healing Stones",
    nameHindi: "प्राकृतिक एमेथिस्ट चक्र हीलिंग स्टोन सेट",
    slug: "natural-amethyst-chakra-healing-stones",
    category: "crystal",
    price: 650,
    description: "Set of naturally polished deep-purple amethyst tumbled stones. Ideal for Reiki practitioners, meditation altars, and bedside sleep healing.",
    descriptionHindi: "रेकी और ध्यान साधना के लिए उपयुक्त चिकने एमेथिस्ट हीलिंग स्टोन। शांति और तनावमुक्ति प्रदायक।",
    origin: "Madagascar",
    chakra: "Third Eye & Crown",
    healingProps: "Calms mental overactivity, balances the nervous system, and promotes vivid peaceful dreams.",
    weight: "120 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1780619691873-294c8f2a84b2?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },

  // 4. Fine Astrological Jewelry
  {
    name: "Royal Rose Gold Gemstone Ring",
    nameHindi: "रॉयल रोज़ गोल्ड जेमस्टोन अंगूठी",
    slug: "royal-rose-gold-gemstone-ring",
    category: "jewelry",
    price: 6499,
    description: "Cushion-cut radiant pink tourmaline/sapphire set in 18k rose gold plating with a sparkling micropavé halo. Exquisite luxury finish with astrological potency.",
    descriptionHindi: "१८ कैरेट रोज़ गोल्ड प्लेटिंग में तैयार शानदार जेमस्टोन अंगूठी। सूक्ष्म डायमंड हेलो के साथ अद्वितीय राजसी चमक।",
    origin: "Jaipur (India)",
    chakra: "Anahata (Heart)",
    healingProps: "Enhances elegance, magnetic personal charm, and balanced emotional expression.",
    weight: "5.8 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Pure 925 Silver Solitaire Ring",
    nameHindi: "शुद्ध ९२५ चांदी सॉलिटेयर अंगूठी",
    slug: "pure-925-silver-solitaire-ring",
    category: "jewelry",
    price: 3499,
    description: "Handcrafted hallmarked 925 sterling silver solitaire ring in a presentation box. Features an open-back setting allowing light energy to touch the skin.",
    descriptionHindi: "९२५ हॉलमार्क शुद्ध चांदी में हस्तनिर्मित क्लासिक सॉलिटेयर अंगूठी। बैक-ओपन डिज़ाइन ताकि रत्न का स्पर्श त्वचा से रहे।",
    origin: "Jaipur (India)",
    chakra: "All Chakras",
    healingProps: "Smoothly channels planetary benefic frequencies into the body's subtle meridians.",
    weight: "5.4 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Crystal Blue Chandelier Earrings",
    nameHindi: "क्रिस्टल ब्लू झूमर झुमके",
    slug: "crystal-blue-chandelier-earrings",
    category: "jewelry",
    price: 2199,
    description: "Artisanal chandelier earrings set with brilliant teardrop ocean-blue crystals and clear marquise stones. Light-catching statement jewelry.",
    descriptionHindi: "बारीक कारीगरी से तैयार नीले क्रिस्टल वाले आकर्षक झूमर झुमके। विशेष अवसरों और त्योहारों के लिए उत्तम।",
    origin: "Jaipur (India)",
    chakra: "Vishuddha (Throat)",
    healingProps: "Promotes joyful creative self-expression and confident social interactions.",
    weight: "8.2 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  }
];

const curatedBlogs = [
  {
    title: "How to Wear Blue Sapphire (Neelam): Rules, Mantras & Precautions",
    titleHindi: "नीलम रत्न धारण करने के नियम, विधि, मंत्र और सावधानियां",
    slug: "how-to-wear-blue-sapphire-neelam-rules-mantras-precautions",
    content: "Blue Sapphire (Neelam) is governed by Lord Saturn and is revered in Vedic astrology for its lightning-fast results. Before wearing, always test the stone for 3 days by tying it in a blue cloth on your right arm. Ideal metal is silver or panchdhatu, worn on the middle finger on a Saturday during Shukla Paksha. Chant the mantra 'Om Sham Shanaishcharaya Namah' 108 times before putting it on.",
    contentHindi: "नीलम शनिदेव का सबसे प्रभावशाली रत्न माना जाता है। इसे धारण करने से पूर्व ३ दिनों तक परीक्षण करना आवश्यक होता है। शुक्ल पक्ष के शनिवार को मध्यमा अंगुली में चांदी अथवा पंचधातु में 'ॐ शं शनैश्चराय नमः' मंत्र के १०८ बार जप के उपरांत इसे धारण करना चाहिए।",
    excerpt: "Learn the proper Vedic procedure to energize, test, and wear natural Blue Sapphire for optimum career and financial breakthroughs.",
    excerptHindi: "नीलम रत्न को धारण करने से पहले परीक्षण, शुद्धिकरण और सही मंत्र विधि की संपूर्ण जानकारी।",
    coverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    published: true,
    publishedAt: new Date("2026-08-15")
  },
  {
    title: "Identifying Real vs. Synthetic Emeralds (Panna): A Buyer's Practical Checklist",
    titleHindi: "असली और नकली पन्ना रत्न की पहचान कैसे करें: आसान गाइड",
    slug: "identifying-real-vs-fake-emeralds-panna-guide",
    content: "Natural emeralds almost always possess inclusions known poetically as 'jardin' (garden). Completely clear, flawless emeralds sold cheaply are synthetic glass. Examine under 10x magnification: natural emeralds showcase two-phase fluid inclusions and uneven color zoning. Always insist on a certified gemological test report verifying natural origin.",
    contentHindi: "प्राकृतिक पन्ना रत्न में सूक्ष्म जाली या रेशे (इनक्लूजन) अवश्य होते हैं। बिल्कुल साफ और कांच जैसा दिखने वाला पन्ना अक्सर सिंथेटिक होता है। १०x मैग्नीफाइंग लेंस से जांच करें और हमेशा लैब सर्टिफिकेट की मांग करें।",
    excerpt: "A practical buyer's checklist to distinguish between authentic Zambian/Colombian emeralds and glass imitations.",
    excerptHindi: "असली पन्ना और कांच के नकली पत्थरों के बीच अंतर पहचानने के व्यावहारिक तरीके।",
    coverImage: "https://images.unsplash.com/photo-1767131545090-e13ae86c8e13?auto=format&fit=crop&w=800&q=80",
    published: true,
    publishedAt: new Date("2026-09-02")
  },
  {
    title: "Pyrite vs. Citrine: Which Mineral Best Accelerates Wealth & Abundance?",
    titleHindi: "पाइराइट या सुनेला: धन आकर्षण के लिए कौन सा क्रिस्टल अधिक प्रभावी है?",
    slug: "pyrite-vs-citrine-which-crystal-attracts-wealth-faster",
    content: "While both Pyrite and Citrine are renowned wealth stones, their vibrational frequencies differ. Pyrite acts like a metallic shield that fuels decisive business action, aggressive expansion, and physical money retention. Citrine, aligned with Jupiter, promotes abundance through optimism, joyful investments, and career growth. Combining both in your workspace creates a harmonious balance of ambition and fortune.",
    contentHindi: "पाइराइट जहां ठोस कार्ययोजना और धन की बचत में मदद करता है, वहीं सुनेला आशावाद और नए अवसरों का विस्तार करता है। दोनों को एक साथ कार्यस्थल पर रखना अत्यंत शुभ माना गया है।",
    excerpt: "A deep dive into the metaphysical properties of Pyrite and Citrine to help you choose the right prosperity crystal.",
    excerptHindi: "पाइराइट और सुनेला क्रिस्टल की ऊर्जा और उनके वित्तीय लाभों की तुलनात्मक समीक्षा।",
    coverImage: "https://images.unsplash.com/photo-1760651691839-d089c1d9ff54?auto=format&fit=crop&w=800&q=80",
    published: true,
    publishedAt: new Date("2026-10-05")
  }
];

async function cleanAndReseed() {
  console.log('🧹 [CLEANUP] Starting Data Cleaning and Curated Reseed...\n');

  // 1. Delete all OrderItems & Orders (clearing out 513 stress-test bot orders)
  console.log('1️⃣  Cleaning test orders and order items...');
  const deletedItems = await prisma.orderItem.deleteMany({});
  const deletedOrders = await prisma.order.deleteMany({});
  console.log(`   Deleted ${deletedItems.count} order items and ${deletedOrders.count} orders.`);

  // 2. Delete unwanted placeholder products (those not in our curated slug list)
  console.log('\n2️⃣  Cleaning old placeholder products...');
  const curatedSlugs = curatedProducts.map(p => p.slug);
  const deletedOldProducts = await prisma.product.deleteMany({
    where: { slug: { notIn: curatedSlugs } }
  });
  console.log(`   Deleted ${deletedOldProducts.count} unwanted products.`);

  // 3. Upsert the 11 Curated Products
  console.log(`\n3️⃣  Upserting ${curatedProducts.length} Curated Showcase Products...`);
  const createdProducts = [];
  for (const prod of curatedProducts) {
    const p = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod
    });
    createdProducts.push(p);
    console.log(`   ✓ ${p.name} (${p.category}) - ₹${p.price}`);
  }

  // 4. Clean and Upsert the 3 Curated Blogs
  console.log(`\n4️⃣  Upserting ${curatedBlogs.length} High-Quality Blogs...`);
  const curatedBlogSlugs = curatedBlogs.map(b => b.slug);
  await prisma.blog.deleteMany({
    where: { slug: { notIn: curatedBlogSlugs } }
  });
  for (const b of curatedBlogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b
    });
    console.log(`   ✓ ${b.title}`);
  }

  // 5. Create 5 realistic, clean demo orders linked to real products
  console.log('\n5️⃣  Creating 5 realistic showcase orders for Admin Dashboard...');
  const sampleOrders = [
    {
      customerName: "Priyanka Mehta",
      customerEmail: "priyanka.mehta@gmail.com",
      customerPhone: "9819023456",
      address: "B-12, Green Acres, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      status: "delivered",
      items: [
        { productId: createdProducts[0].id, quantity: 1, price: createdProducts[0].price } // Sapphire
      ]
    },
    {
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@example.com",
      customerPhone: "9828012345",
      address: "Flat 402, Royal Palms, Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      status: "shipped",
      items: [
        { productId: createdProducts[2].id, quantity: 1, price: createdProducts[2].price } // Emerald
      ]
    },
    {
      customerName: "Sunil Joshi",
      customerEmail: "sunil.joshi@rediffmail.com",
      customerPhone: "9414034567",
      address: "House 24, Civil Lines",
      city: "Jodhpur",
      state: "Rajasthan",
      pincode: "342001",
      status: "confirmed",
      items: [
        { productId: createdProducts[6].id, quantity: 1, price: createdProducts[6].price }, // Pyrite
        { productId: createdProducts[5].id, quantity: 1, price: createdProducts[5].price }  // Citrine
      ]
    },
    {
      customerName: "Sneha Reddy",
      customerEmail: "sneha.reddy@gmail.com",
      customerPhone: "9989045678",
      address: "Plot 88, Jubilee Hills, Road No 36",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      status: "pending",
      items: [
        { productId: createdProducts[8].id, quantity: 1, price: createdProducts[8].price } // Rose Gold Ring
      ]
    },
    {
      customerName: "Rahul Khatwani",
      customerEmail: "its.rahulkhatwani@gmail.com",
      customerPhone: "9828016063",
      address: "Raj Ratnam Jewels, M.I. Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      status: "delivered",
      items: [
        { productId: createdProducts[3].id, quantity: 1, price: createdProducts[3].price } // Basra Pearl
      ]
    }
  ];

  for (const o of sampleOrders) {
    const totalAmount = o.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await prisma.order.create({
      data: {
        customerName: o.customerName,
        customerEmail: o.customerEmail.toLowerCase(),
        customerPhone: o.customerPhone,
        address: o.address,
        city: o.city,
        state: o.state,
        pincode: o.pincode,
        totalAmount,
        status: o.status,
        items: {
          create: o.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
  }
  console.log(`   ✓ Created ${sampleOrders.length} realistic orders.`);

  console.log('\n✨ [COMPLETE] Data cleaning finished successfully! Catalog and Admin Dashboard are pristine.');
}

cleanAndReseed()
  .catch(err => {
    console.error('❌ Data cleaning failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma['$disconnect']();
  });

