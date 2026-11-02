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

const products = [
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

const blogs = [
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

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "Jaipur, Rajasthan",
    content: "I ordered the Ceylon Blue Sapphire ring. The finish in 925 silver is remarkable and the gemstone has a mesmerizing deep blue hue. Received authentic lab certificate. Highly trustworthy service!",
    rating: 5
  },
  {
    name: "Pooja Kulkarni",
    location: "Pune, Maharashtra",
    content: "The Zambian Emerald (Panna) brought immediate mental clarity for my competitive exam preparation. Beautiful packaging and fast delivery to Pune.",
    rating: 5
  },
  {
    name: "Amitabh Banerjee",
    location: "Kolkata, West Bengal",
    content: "Bought the Pyrite cluster and Amethyst tumbled stones. Authentic items with sacred energy. My workspace feels noticeably calmer and more focused.",
    rating: 5
  },
  {
    name: "Meenakshi Sundaram",
    location: "Chennai, Tamil Nadu",
    content: "The natural Pearl necklace is delicate, elegant, and very soothing. Prompt WhatsApp support answered all my astrological queries with patience.",
    rating: 4
  },
  {
    name: "Vikas Aggarwal",
    location: "Delhi NCR",
    content: "Ordered the Royal Rose Gold gemstone ring. True to pictures, perfectly sized, and delivered within 3 days. Very satisfied with Raj Ratnam's craftsmanship.",
    rating: 5
  }
];

const contacts = [
  {
    name: "Siddharth Verma",
    email: "siddharth.verma91@gmail.com",
    phone: "9876543210",
    message: "Namaste, I want to know which finger is best for wearing a 5 Rati Yellow Sapphire (Pukhraj) and whether silver or brass is recommended for my horoscope."
  },
  {
    name: "Ananya Saxena",
    email: "ananya.saxena@outlook.com",
    phone: "9823456789",
    message: "Do you provide custom ring resizing in silver for the Ceylon Blue Sapphire? My ring size is 14 Indian standard."
  },
  {
    name: "Deepak Mehra",
    email: "deepak.mehra@yahoo.in",
    phone: "9911223344",
    message: "I am interested in bulk ordering units of the Pyrite cluster for an upcoming family puja. Can you offer bulk packaging?"
  },
  {
    name: "Ritu Singhania",
    email: "ritu.singhania@gmail.com",
    phone: "9845112233",
    message: "Can you confirm if the Zambian Emerald comes with a government lab certificate? Please send certificate sample on WhatsApp."
  }
];

async function main() {
  console.log('🚀 Starting Raj Ratnam Database Seed...\n');

  // 1. Seed Products
  console.log(`📦 Upserting ${products.length} Curated Products...`);
  const createdProducts = [];
  for (const prod of products) {
    const p = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod
    });
    createdProducts.push(p);
  }
  console.log(`✅ Products seeded successfully! (${createdProducts.length} items)\n`);

  // 2. Seed Blogs
  console.log(`📝 Upserting ${blogs.length} Blogs...`);
  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog
    });
  }
  console.log(`✅ Blogs seeded successfully!\n`);

  // 3. Seed Testimonials
  console.log(`🌟 Seeding Testimonials...`);
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`✅ ${testimonials.length} Testimonials created!`);
  } else {
    console.log(`ℹ️  Testimonials already present (${existingTestimonials} rows), skipping.`);
  }

  // 4. Seed Contacts
  console.log(`\n📬 Seeding Contact Inquiries...`);
  const existingContacts = await prisma.contact.count();
  if (existingContacts === 0) {
    for (const c of contacts) {
      await prisma.contact.create({ data: c });
    }
    console.log(`✅ ${contacts.length} Contact inquiries created!`);
  } else {
    console.log(`ℹ️  Contact inquiries already present (${existingContacts} rows), skipping.`);
  }

  console.log('\n✨ Database Seeding Completed Successfully! All records are live in Supabase PostgreSQL.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma['$disconnect']();
  });
