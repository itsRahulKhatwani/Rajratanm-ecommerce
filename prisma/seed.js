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
  // Precious Gemstones (Priced ₹1,499 - ₹7,999)
  {
    name: "Natural Ceylon Blue Sapphire (Neelam)",
    nameHindi: "प्राकृतिक सीलोन नीलम रत्न",
    slug: "natural-ceylon-blue-sapphire-neelam",
    category: "precious",
    price: 4999,
    description: "Authentic deep-blue Ceylon sapphire known to bring mental clarity, discipline, and fast-acting astrological blessings of Lord Saturn (Shani Dev). Lab tested and energized with Vedic mantras.",
    descriptionHindi: "शनि देव के विशेष आशीर्वाद और त्वरित प्रभाव के लिए प्रसिद्ध गहरा नीला सीलोन नीलम। मानसिक स्पष्टता और व्यापार में सफलता हेतु उत्तम।",
    origin: "Ceylon (Sri Lanka)",
    chakra: "Ajna (Third Eye Chakra)",
    healingProps: "Brings mental focus, shields against negative aura, and accelerates career breakthroughs.",
    weight: "4.25 Rati (3.85 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
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
    description: "Vibrant pigeon-blood red ruby representing the Sun (Surya Dev). Enhances leadership qualities, self-confidence, vital energy, and fatherly blessings.",
    descriptionHindi: "सूर्य देव का प्रतिनिधित्व करने वाला सुंदर लाल माणिक्य रत्न। नेतृत्व क्षमता, आत्मविश्वास और यश-कीर्ति में वृद्धि करता है।",
    origin: "Burma (Myanmar)",
    chakra: "Manipura (Solar Plexus Chakra)",
    healingProps: "Boosts vitality, heart chakra energy, professional authority, and public recognition.",
    weight: "5.15 Rati (4.68 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
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
    description: "Lustrous green natural Zambian emerald governed by Mercury (Budh Dev). Highly recommended for students, accountants, traders, and public speakers.",
    descriptionHindi: "बुध ग्रह का कारक सुंदर हरा पन्ना रत्न। शिक्षा, व्यापार, संवाद कला और बौद्धिक क्षमता को निखारने के लिए सर्वश्रेष्ठ।",
    origin: "Zambia",
    chakra: "Anahata (Heart Chakra)",
    healingProps: "Sharpens intellect, calms the nervous system, and enhances commercial success.",
    weight: "4.75 Rati (4.31 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Natural Yellow Sapphire (Pukhraj)",
    nameHindi: "प्राकृतिक पीला पुखराज रत्न",
    slug: "natural-yellow-sapphire-pukhraj",
    category: "precious",
    price: 6200,
    description: "Golden radiant yellow sapphire ruled by Jupiter (Brihaspati). Promotes divine wisdom, marital harmony, prosperity, and higher knowledge.",
    descriptionHindi: "देवगुरु बृहस्पति का प्रिय पीला पुखराज। ज्ञान, वैवाहिक सुख, संतान प्राप्ति और धन समृद्धि के लिए अत्यंत लाभकारी।",
    origin: "Ceylon (Sri Lanka)",
    chakra: "Manipura (Solar Plexus Chakra)",
    healingProps: "Attracts financial fortune, spiritual enlightenment, and domestic peace.",
    weight: "5.50 Rati (5.00 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Natural Basra Pearl (Saccha Moti)",
    nameHindi: "प्राकृतिक सच्चा मोती रत्न",
    slug: "natural-basra-pearl-moti",
    category: "precious",
    price: 2800,
    description: "Silky smooth natural pearl governed by the Moon (Chandra). Calms anger, balances emotional turbulence, and promotes sound sleep.",
    descriptionHindi: "चंद्रमा का शुभ रत्न सच्चा मोती। मानसिक शांति, तनाव मुक्ति और अनिद्रा की समस्या को दूर करने में अत्यंत सहायक।",
    origin: "South Sea",
    chakra: "Swadhisthana (Sacral Chakra)",
    healingProps: "Relieves anxiety, balances feminine energies, and clears emotional blockages.",
    weight: "6.25 Rati (5.68 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Natural Italian Red Coral (Moonga)",
    nameHindi: "प्राकृतिक इटालियन लाल मूँगा",
    slug: "natural-italian-red-coral-moonga",
    category: "precious",
    price: 3200,
    description: "Triangular certified Italian red coral ruled by Mars (Mangal). Ignites physical courage, removes lethargy, and shields against Manglik dosha.",
    descriptionHindi: "मंगल ग्रह का शक्तिशाली लाल मूँगा। साहस, ऊर्जा, रक्त शुद्धि और मांगलिक दोष शांति के लिए उत्तम रत्न।",
    origin: "Mediterranean (Italy)",
    chakra: "Muladhara (Root Chakra)",
    healingProps: "Overcomes fear, strengthens bone and blood health, and fuels determination.",
    weight: "5.80 Rati (5.27 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },

  // Semi-Precious Gemstones (Priced ₹999 - ₹3,499)
  {
    name: "Ceylon Hessonite Garnet (Gomed)",
    nameHindi: "सीलोन गोमेद रत्न (हनी कलर)",
    slug: "ceylon-hessonite-garnet-gomed",
    category: "semi-precious",
    price: 2499,
    description: "Honey-colored transparent Ceylon Hessonite associated with Rahu. Calms sudden anxieties, stabilizes sudden life turbulence, and clears confusion.",
    descriptionHindi: "राहु ग्रह का शक्तिशाली गोमेद रत्न। भ्रम, अज्ञात भय और अचानक आने वाली बाधाओं से मुक्ति दिलाता है।",
    origin: "Ceylon (Sri Lanka)",
    chakra: "Muladhara (Root Chakra)",
    healingProps: "Clears mental cloudiness, stabilizes speculation and political progress.",
    weight: "6.10 Rati (5.54 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Chrysoberyl Cat's Eye (Lehsuniya)",
    nameHindi: "कैट्स आई लहसुनिया रत्न",
    slug: "chrysoberyl-cats-eye-lehsuniya",
    category: "semi-precious",
    price: 2899,
    description: "Sharp chatoyant ray Cat's Eye representing Ketu. Shields from evil eye (buri nazar), secret enemies, and sudden financial losses.",
    descriptionHindi: "केतु ग्रह का प्रिय लहसुनिया रत्न। बुरी नजर, गुप्त शत्रुओं और आर्थिक अस्थिरता से सुरक्षा प्रदान करता है।",
    origin: "Orissa (India)",
    chakra: "Sahasrara (Crown Chakra)",
    healingProps: "Develops intuition, protects against psychic attack, and attracts hidden wealth.",
    weight: "4.90 Rati (4.45 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Natural Nishapuri Turquoise (Firoza)",
    nameHindi: "प्राकृतिक निशापुरी फिरोजा रत्न",
    slug: "natural-nishapuri-turquoise-firoza",
    category: "semi-precious",
    price: 1999,
    description: "Sky-blue natural turquoise with delicate matrix patterns. A talisman for travelers, artists, friendship, and Jupiter-Venus harmony.",
    descriptionHindi: "आसमानी नीले रंग का पवित्र फिरोजा रत्न। यात्रा सुरक्षा, वैवाहिक सामंजस्य और सकारात्मक ऊर्जा का प्रतीक।",
    origin: "Iran (Nishapur)",
    chakra: "Vishuddha (Throat Chakra)",
    healingProps: "Fosters peaceful expression, shields against accidents, and promotes emotional balance.",
    weight: "7.50 Rati (6.81 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "African Deep Purple Amethyst (Katela)",
    nameHindi: "अफ्रीकन जामुनी कटैला रत्न (नीलम उपरल)",
    slug: "african-deep-purple-amethyst-katela",
    category: "semi-precious",
    price: 1499,
    description: "Sublime violet African amethyst used as a potent substitute for Blue Sapphire. Induces deep meditation, restful sleep, and sobriety.",
    descriptionHindi: "शनि ग्रह का लोकप्रिय उपरत्न कटैला। ध्यान, एकाग्रता, मानसिक शांति और व्यसन मुक्ति में सहायक।",
    origin: "Africa",
    chakra: "Crown / Third Eye",
    healingProps: "Purifies negative thought loops and relaxes tired neurological states.",
    weight: "6.75 Rati (6.13 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Golden Brazilian Citrine (Sunela)",
    nameHindi: "ब्राज़ीलियन सुनहरा सुनेला रत्न",
    slug: "golden-brazilian-citrine-sunela",
    category: "semi-precious",
    price: 1250,
    description: "Sparkling golden citrine crystal—the merchant's stone. Uplifts self-worth, optimism, and steady business cash flow.",
    descriptionHindi: "व्यापार में धन वृद्धि और सकारात्मक सोच के लिए प्रसिद्ध सुनहरा सुनेला रत्न (पुखराज उपरत्न)।",
    origin: "Brazil",
    chakra: "Solar Plexus",
    healingProps: "Manifests abundance and clears stagnant digestive fire.",
    weight: "5.40 Rati (4.91 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Natural Blue Topaz (Neela Topaz)",
    nameHindi: "प्राकृतिक नीला पुखराज / टोपाज़",
    slug: "natural-blue-topaz",
    category: "semi-precious",
    price: 1650,
    description: "Crystal-clear sky blue topaz. Inspires lucid communication, artistic creativity, and soothing calm across emotional centers.",
    descriptionHindi: "शांति और स्पष्ट संवाद का सुंदर रत्न। कलात्मक प्रतिभा और मानसिक तनाव को शांत करने के लिए आदर्श।",
    origin: "Brazil",
    chakra: "Throat Chakra",
    healingProps: "Soothes vocal cords and aligns logical thinking with heartfelt expression.",
    weight: "5.00 Rati (4.54 Carats)",
    imageUrls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },

  // Crystals & Rudraksha (Priced ₹500 - ₹2,499)
  {
    name: "5-Mukhi Indonesian Rudraksha Mala (108 Beads)",
    nameHindi: "५ मुखी रुद्राक्ष माला (१०८ दाने)",
    slug: "5-mukhi-indonesian-rudraksha-mala",
    category: "crystal",
    price: 799,
    description: "Sacred 5 Mukhi Rudraksha chanting and wearing mala energized at Haridwar. Promotes peace of mind, normalizes blood pressure, and invokes Lord Shiva's grace.",
    descriptionHindi: "१०८ मनकों वाली पवित्र ५ मुखी रुद्राक्ष माला। जप और धारण दोनों के लिए अत्यंत शुभ, मानसिक शांति प्रदायक।",
    origin: "Indonesia",
    chakra: "Throat Chakra (Vishuddha)",
    healingProps: "Regulates heart rhythm, relieves daily fatigue, and boosts spiritual attunement.",
    weight: "25 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "7-Mukhi Nepali Rudraksha Bead (Mahalakshmi)",
    nameHindi: "७ मुखी नेपाली रुद्राक्ष दाना",
    slug: "7-mukhi-nepali-rudraksha-bead",
    category: "crystal",
    price: 1850,
    description: "Large natural Nepali 7 Mukhi bead blessed by Goddess Mahalakshmi. Removes financial blockages, poverty consciousness, and Saturnian delays.",
    descriptionHindi: "मां महालक्ष्मी का आशीर्वाद प्राप्त ७ मुखी नेपाली रुद्राक्ष। आर्थिक समृद्धि और शनि शांति हेतु सर्वश्रेष्ठ।",
    origin: "Nepal",
    chakra: "Heart Chakra (Anahata)",
    healingProps: "Draws sustained commercial luck and resolves legacy monetary setbacks.",
    weight: "3.2 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Raw Natural Pyrite 'Fool's Gold' Cluster",
    nameHindi: "प्राकृतिक पाइराइट धन आकर्षण क्रिस्टल",
    slug: "raw-natural-pyrite-crystal-cluster",
    category: "crystal",
    price: 899,
    description: "Glistening metallic raw Pyrite cluster known worldwide as the ultimate money magnet. Ideal for work desks, cash boxes, and reception counters.",
    descriptionHindi: "धन और समृद्धि को आकर्षित करने वाला प्राकृतिक पाइराइट स्टोन। व्यापार स्थल व तिजोरी में रखने हेतु उत्तम।",
    origin: "Peru",
    chakra: "Solar Plexus",
    healingProps: "Ignites ambition, guards against corporate envy, and attracts prosperous endeavors.",
    weight: "150 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Black Tourmaline Raw Healing Stone",
    nameHindi: "काला टूमलाइन सुरक्षा स्टोन",
    slug: "black-tourmaline-raw-stone",
    category: "crystal",
    price: 599,
    description: "Potent grounding crystal that deflects electromagnetic radiation (EMF), negative human intentions, and energetic drainage.",
    descriptionHindi: "नकारात्मक ऊर्जा और बुरी नजर से सुरक्षा प्रदान करने वाला शक्तिशाली काला टूमलाइन क्रिस्टल।",
    origin: "Brazil",
    chakra: "Root Chakra",
    healingProps: "Cleanses personal electromagnetic field and grounds hyperactive mental chatter.",
    weight: "100 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Rose Quartz Unconditional Love Wand",
    nameHindi: "रोज़ क्वार्ट्ज़ प्रेम एवं शांति क्रिस्टल",
    slug: "rose-quartz-healing-wand",
    category: "crystal",
    price: 650,
    description: "Soft pink crystalline quartz radiating pure compassionate warmth. Restores gentleness to strained relationships and promotes self-love.",
    descriptionHindi: "पारिवारिक प्रेम, दांपत्य मधुरता और हृदय शांति के लिए गुलाबी रोज़ क्वार्ट्ज़ क्रिस्टल।",
    origin: "Madagascar",
    chakra: "Heart Chakra",
    healingProps: "Softens emotional grief, fosters empathy, and supports peaceful sleep.",
    weight: "80 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Clear Quartz Crystal Pyramid (Sfatik)",
    nameHindi: "स्फटिक पारदर्शी पिरामिड",
    slug: "clear-quartz-crystal-pyramid-sfatik",
    category: "crystal",
    price: 750,
    description: "Vastu-enhancing pure crystalline Quartz pyramid. Amplifies cosmic energies and dispels negative stagnant vibrations in homes and offices.",
    descriptionHindi: "घर और कार्यस्थल की ऊर्जा को शुद्ध करने वाला प्राकृतिक स्फटिक पिरामिड। एकाग्रता व सकारात्मकता बढ़ाता है।",
    origin: "Himalayas",
    chakra: "Crown Chakra",
    healingProps: "Acts as a master harmonic amplifier for prayer, mantra, and thought intent.",
    weight: "95 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },

  // Astrological Jewelry (Priced ₹1,299 - ₹7,499)
  {
    name: "Panchdhatu Astrological Navratna Ring",
    nameHindi: "पंचधातु नवरत्न अंगूठी",
    slug: "panchdhatu-astrological-navratna-ring",
    category: "jewelry",
    price: 3499,
    description: "Traditional 9-gemstone Vedic balance ring crafted in auspicious Panchdhatu alloy. Harmonizes all 9 planets in your birth chart.",
    descriptionHindi: "सभी ९ ग्रहों को संतुलित करने वाली पारंपरिक पंचधातु नवरत्न अंगूठी। जीवन में सर्वांगीण सुख और संतुलन हेतु।",
    origin: "Jaipur (India)",
    chakra: "All 7 Chakras",
    healingProps: "Counters malefic planetary transits while amplifying benefics simultaneously.",
    weight: "7.8 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Pure 925 Silver Blue Sapphire Ring",
    nameHindi: "चांदी में जड़ित नीलम अंगूठी (९२५ हॉलमार्क)",
    slug: "pure-925-silver-blue-sapphire-ring",
    category: "jewelry",
    price: 6999,
    description: "Hallmarked 925 sterling silver ring bezel-set with an oval brilliant blue sapphire. Open back design allowing direct light contact with skin.",
    descriptionHindi: "९२५ हॉलमार्क शुद्ध चांदी में जड़ित सुंदर नीलम अंगूठी। बैक-ओपन डिज़ाइन ताकि रत्न का स्पर्श त्वचा से रहे।",
    origin: "Jaipur (India)",
    chakra: "Ajna (Third Eye)",
    healingProps: "Transfers steady planetary energies smoothly across meridians.",
    weight: "5.6 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: true
  },
  {
    name: "Pure 925 Silver Emerald (Panna) Ring",
    nameHindi: "शुद्ध चांदी पन्ना अंगूठी (९२५ हॉलमार्क)",
    slug: "pure-925-silver-emerald-panna-ring",
    category: "jewelry",
    price: 5800,
    description: "Classic signet ring handcrafted in certified sterling silver with an octagonal natural green emerald. Ready for Wednesday morning wear.",
    descriptionHindi: "बुधवार को धारण करने योग्य चांदी में बनी आकर्षक पन्ना अंगूठी। व्यापार और अध्ययन में सफलता प्रदायक।",
    origin: "Jaipur (India)",
    chakra: "Heart Chakra",
    healingProps: "Strengthens memory retention, speech eloquence, and commercial negotiation.",
    weight: "5.2 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Solid Brass Gold-Plated Shree Yantra Locket",
    nameHindi: "स्वर्ण लेपित श्री यंत्र लॉकेट",
    slug: "brass-gold-plated-shree-yantra-locket",
    category: "jewelry",
    price: 1199,
    description: "Micro-etched 3D cosmic Shree Yantra pendant sealed in gold-polished casing. Invokes prosperity, cosmic alignment, and protective grace.",
    descriptionHindi: "बारीक नक्काशी से बना पवित्र श्री यंत्र लॉकेट। धन, ऐश्वर्य और सकारात्मक ऊर्जा का निरंतर प्रवाह बनाए रखता है।",
    origin: "Varanasi (India)",
    chakra: "Heart & Crown",
    healingProps: "Shields against negative external influences and creates an auspicious field.",
    weight: "8.5 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Pure Silver Snake Ring (Sarpa Dosha Nivarana)",
    nameHindi: "शुद्ध चांदी कालसर्प दोष निवारण सर्प अंगूठी",
    slug: "pure-silver-snake-ring-sarpa-dosha",
    category: "jewelry",
    price: 1450,
    description: "Spiral coiled serpent ring cast in solid sterling silver. Specifically recommended for Rahu-Ketu pacification and Kaal Sarp Dosha remedies.",
    descriptionHindi: "कालसर्प और राहु-केतु दोष निवारण हेतु शास्त्रोक्त विधि से बनी शुद्ध चांदी की सर्प अंगूठी।",
    origin: "Ujjain (India)",
    chakra: "Root Chakra",
    healingProps: "Grounds psychological restlessness and mitigates recurring ominous dreams.",
    weight: "4.8 grams",
    imageUrls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    featured: false
  },
  {
    name: "Natural Pearl & Silver Delicate Pendant",
    nameHindi: "सच्चा मोती चांदी पेंडेंट",
    slug: "natural-pearl-silver-pendant",
    category: "jewelry",
    price: 2100,
    description: "Luminous white natural pearl suspended on sterling silver bail. Elegant, minimalistic, and deeply soothing for high-stress daily lifestyles.",
    descriptionHindi: "सौम्य और मनमोहक सच्चा मोती पेंडेंट। दैनिक जीवन के तनाव को दूर कर मन को शांति प्रदान करता है।",
    origin: "South Sea",
    chakra: "Sacral Chakra",
    healingProps: "Cools internal fiery temperament and promotes graceful communication.",
    weight: "3.9 grams",
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
    titleHindi: "नीलम रत्न धारण करने की सही विधि, मंत्र और सावधानियां",
    slug: "how-to-wear-blue-sapphire-neelam-rules-mantras",
    content: "Blue Sapphire (Neelam) is governed by Lord Saturn and is revered in Vedic astrology for its lightning-fast results. Before wearing, always test the stone for 3 days by tying it in a blue cloth on your right arm. Ideal metal is silver or panchdhatu, worn on the middle finger on a Saturday during Shukla Paksha. Chant the mantra 'Om Sham Shanaishcharaya Namah' 108 times before putting it on.",
    contentHindi: "नीलम शनिदेव का सबसे प्रभावशाली रत्न माना जाता है। इसे धारण करने से पूर्व ३ दिनों तक परीक्षण करना आवश्यक होता है। शुक्ल पक्ष के शनिवार को मध्यमा अंगुली में चांदी अथवा पंचधातु में 'ॐ शं शनैश्चराय नमः' मंत्र के १०८ बार जप के उपरांत इसे धारण करना चाहिए।",
    excerpt: "Learn the proper Vedic procedure to energize, test, and wear natural Blue Sapphire for optimum career and financial breakthroughs.",
    excerptHindi: "नीलम रत्न को धारण करने से पहले परीक्षण, शुद्धिकरण और सही मंत्र विधि की संपूर्ण जानकारी।",
    coverImage: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80",
    published: true,
    publishedAt: new Date("2026-08-15")
  },
  {
    title: "Identifying Real vs. Fake Emeralds (Panna): A Buyer's Practical Guide",
    titleHindi: "असली और नकली पन्ना रत्न की पहचान कैसे करें: आसान गाइड",
    slug: "identifying-real-vs-fake-emeralds-panna-guide",
    content: "Natural emeralds almost always possess inclusions known poetically as 'jardin' (garden). Completely clear, flawless emeralds sold cheaply are synthetic glass. Examine under 10x magnification: natural emeralds showcase two-phase fluid inclusions and uneven color zoning. Always insist on a certified gemological test report verifying natural origin.",
    contentHindi: "प्राकृतिक पन्ना रत्न में सूक्ष्म जाली या रेशे (इनक्लूजन) अवश्य होते हैं। बिल्कुल साफ और कांच जैसा दिखने वाला पन्ना अक्सर सिंथेटिक होता है। १०x मैग्नीफाइंग लेंस से जांच करें और हमेशा लैब सर्टिफिकेट की मांग करें।",
    excerpt: "A practical buyer's checklist to distinguish between authentic Zambian/Colombian emeralds and glass imitations.",
    excerptHindi: "असली पन्ना और कांच के नकली पत्थरों के बीच अंतर पहचानने के व्यावहारिक तरीके।",
    coverImage: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80",
    published: true,
    publishedAt: new Date("2026-09-02")
  },
  {
    title: "The Navratna Ring: Meaning, Sequence, and Planetary Balance",
    titleHindi: "नवरत्न अंगूठी का महत्व, सही क्रम और ज्योतिषीय लाभ",
    slug: "the-navratna-ring-meaning-sequence-planetary-balance",
    content: "The Navratna arrangement places the Sun's Ruby in the exact center, surrounded clockwise by Diamond (Venus), Pearl (Moon), Red Coral (Mars), Hessonite (Rahu), Blue Sapphire (Saturn), Cat's Eye (Ketu), Yellow Sapphire (Jupiter), and Emerald (Mercury). Wearing a balanced Navratna creates a protective energetic armor shielding the wearer from adverse planetary dasha periods.",
    contentHindi: "नवरत्न में सूर्य के प्रतीक माणिक्य को केंद्र में रखा जाता है और शेष आठ ग्रहों के रत्न उसके चारों ओर स्थापित होते हैं। यह अंगूठी नवग्रहों को शांत कर जीवन में समग्र संतुलन लाती है।",
    excerpt: "Discover how the sacred nine-gemstone talisman works to neutralize planetary doshas and attract harmonious health and prosperity.",
    excerptHindi: "जानिए कैसे नवरत्न अंगूठी नवग्रहों के दुष्प्रभावों को कम कर जीवन में सुख-समृद्धि लाती है।",
    coverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    published: true,
    publishedAt: new Date("2026-09-20")
  },
  {
    title: "Pyrite vs. Citrine: Which Crystal Attracts Wealth Faster?",
    titleHindi: "पाइराइट या सुनेला: धन आकर्षण के लिए कौन सा क्रिस्टल अधिक प्रभावी है?",
    slug: "pyrite-vs-citrine-which-crystal-attracts-wealth-faster",
    content: "While both Pyrite and Citrine are renowned wealth stones, their vibrational frequencies differ. Pyrite acts like a metallic shield that fuels decisive business action, aggressive expansion, and physical money retention. Citrine, aligned with Jupiter, promotes abundance through optimism, joyful investments, and career growth. Combining both in your workspace creates a harmonious balance of ambition and fortune.",
    contentHindi: "पाइराइट जहां ठोस कार्ययोजना और धन की बचत में मदद करता है, वहीं सुनेला आशावाद और नए अवसरों का विस्तार करता है। दोनों को एक साथ कार्यस्थल पर रखना अत्यंत शुभ माना गया है।",
    excerpt: "A deep dive into the metaphysical properties of Pyrite and Citrine to help you choose the right prosperity crystal.",
    excerptHindi: "पाइराइट और सुनेला क्रिस्टल की ऊर्जा और उनके वित्तीय लाभों की तुलनात्मक समीक्षा।",
    coverImage: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80",
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
    content: "Bought the Pyrite cluster and 5-Mukhi Rudraksha mala. Authentic items with sacred energy. My workspace feels noticeably calmer and more focused.",
    rating: 5
  },
  {
    name: "Meenakshi Sundaram",
    location: "Chennai, Tamil Nadu",
    content: "The natural Pearl pendant is delicate, elegant, and very soothing. Prompt WhatsApp support answered all my astrological queries with patience.",
    rating: 4
  },
  {
    name: "Vikas Aggarwal",
    location: "Delhi NCR",
    content: "Ordered the Panchdhatu Navratna ring. True to pictures, perfectly sized, and delivered within 3 days. Very satisfied with Raj Ratnam's craftsmanship.",
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
    message: "I am interested in bulk ordering 10 units of the 5-Mukhi Indonesian Rudraksha Mala for an upcoming family puja. Can you offer bulk packaging?"
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
  console.log(`📦 Upserting ${products.length} Products...`);
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

  // 5. Seed Orders (with OrderItems linked to created products)
  console.log(`\n🛒 Seeding Sample Orders...`);
  const existingOrders = await prisma.order.count();
  if (existingOrders === 0 && createdProducts.length >= 4) {
    const sampleOrders = [
      {
        customerName: "Rahul Sharma",
        customerEmail: "rahul.sharma@example.com",
        customerPhone: "9828012345",
        address: "Flat 402, Royal Palms, Vaishali Nagar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302021",
        status: "delivered",
        items: [
          { productId: createdProducts[0].id, quantity: 1, price: createdProducts[0].price },
          { productId: createdProducts[12].id, quantity: 1, price: createdProducts[12].price }
        ]
      },
      {
        customerName: "Priyanka Mehta",
        customerEmail: "priyanka.mehta@gmail.com",
        customerPhone: "9819023456",
        address: "B-12, Green Acres, Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400053",
        status: "shipped",
        items: [
          { productId: createdProducts[2].id, quantity: 1, price: createdProducts[2].price }
        ]
      },
      {
        customerName: "Sunil Joshi",
        customerEmail: "sunil.joshi@rediffmail.com",
        customerPhone: "9414034567",
        address: "House 24, Civil Lines, Near Circuit House",
        city: "Jodhpur",
        state: "Rajasthan",
        pincode: "342001",
        status: "confirmed",
        items: [
          { productId: createdProducts[6].id, quantity: 2, price: createdProducts[6].price },
          { productId: createdProducts[14].id, quantity: 1, price: createdProducts[14].price }
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
          { productId: createdProducts[18].id, quantity: 1, price: createdProducts[18].price }
        ]
      },
      {
        customerName: "its.rahulkhatwani@gmail.com",
        customerEmail: "its.rahulkhatwani@gmail.com",
        customerPhone: "9828016063",
        address: "Raj Ratnam Jewels, M.I. Road",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        status: "delivered",
        items: [
          { productId: createdProducts[0].id, quantity: 1, price: createdProducts[0].price },
          { productId: createdProducts[1].id, quantity: 1, price: createdProducts[1].price }
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
    console.log(`✅ ${sampleOrders.length} Sample orders created!`);
  } else {
    console.log(`ℹ️  Orders already present (${existingOrders} rows), skipping.`);
  }

  console.log('\n✨ Database Seeding Completed Successfully! All records are live in Supabase PostgreSQL.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
