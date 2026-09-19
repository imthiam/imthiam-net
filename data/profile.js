// Source unique de vérité pour le contenu du site (FR/EN).
// Consommée par : index.html (rendu principal), js/render.js, js/command-palette.js,
// js/terminal.js et cv.html (CV imprimable). Ne pas dupliquer ce contenu ailleurs.

export const CONFIG = {
  // Disponibilité affichée dans le hero — bascule simple, sans date en dur.
  // Pour la désactiver : available: false (voir identity.badgeUnavailable pour le texte de repli).
  available: true,
  // Confidentialité du stage de fin d'études : ne jamais révéler le nom de l'entreprise
  // tant que cette valeur est à false (voir data.timeline, entrée "internship-2026").
  showCompanyName: false,
};

export const profile = {
  identity: {
    name: 'Mohamed Thiam',
    logoShort: 'M',
    badge: {
      fr: 'Disponible pour collaborations à fort impact',
      en: 'Available for high-impact collaborations',
    },
    badgeUnavailable: {
      fr: 'Actuellement engagé',
      en: 'Currently committed',
    },
    titleLine1: 'Mohamed',
    titleLine2: 'Thiam.',
    tagline: {
      fr: 'Ingénieur Systèmes Embarqués et Autonomes, spécialisé IA embarquée',
      en: 'Embedded & Autonomous Systems Engineer, specialized in embedded AI',
    },
    taglineSuffix: 'CEO · CTO · Builder',
    heroDesc: {
      fr: "Je construis des <em>systèmes intelligents</em> — de l'IA embarquée sur drones et microcontrôleurs aux plateformes full-stack. CEO d'<em>AskiaBot</em>, CTO chez <em>Futuras Tech Solutions</em>. Entre Paris et Dakar.",
      en: "I build <em>intelligent systems</em> — from embedded AI on drones and microcontrollers to full-stack platforms. CEO of <em>AskiaBot</em>, CTO at <em>Futuras Tech Solutions</em>. Between Paris and Dakar.",
    },
    stats: [
      { value: '8', suffix: '', label: { fr: 'Projets livrés', en: 'Projects shipped' } },
      { value: '3', suffix: '', label: { fr: 'Entreprises', en: 'Companies' } },
      { value: '5', suffix: '+', label: { fr: "Ans d'expérience", en: 'Years building' } },
      { value: '4', suffix: '', label: { fr: 'Pays', en: 'Countries' } },
    ],
  },

  links: {
    email: 'imthiam@icloud.com',
    linkedin: 'https://linkedin.com/in/imthiam',
    linkedinLabel: 'linkedin.com/in/imthiam',
    github: 'https://github.com/imthiam',
    githubLabel: 'github.com/imthiam',
    phoneHref: 'tel:+33768108540',
    phoneLabel: '+33 7 68 10 85 40',
  },

  companies: [
    {
      role: 'CEO',
      name: 'AskiaBot',
      link: 'https://www.askiabot.com/en',
      desc: {
        fr: "Plateforme SaaS d'assistants IA personnalisés — no-code, multi-canal (web widget, WhatsApp), gestion de base de connaissances, RAG, analytics temps réel. Plans de €29 à custom enterprise.",
        en: 'SaaS platform for custom AI assistants — no-code, multi-channel (web widget, WhatsApp), knowledge base management, RAG, real-time analytics. Plans from €29 to custom enterprise.',
      },
      tags: ['AI / RAG', 'SaaS', 'WhatsApp Bot', 'No-code'],
      linkLabel: 'askiabot.com →',
    },
    {
      role: { fr: 'Co-fondateur & CTO', en: 'Co-founder & CTO' },
      name: 'Futuras Tech',
      link: 'https://www.futurastech.com/',
      desc: {
        fr: 'Agence tech spécialisée dans le développement d\'applications et sites web sur mesure. Produit phare : DocLinkers, première plateforme de télémédecine au Sénégal — consultations à distance, données médicales sécurisées.',
        en: "Tech firm specializing in custom app and web development. Flagship: DocLinkers, Senegal's first telemedicine platform — remote consultations, secure medical data management.",
      },
      tags: ['HealthTech', 'Télémédecine', 'Afrique', 'Mobile'],
      linkLabel: 'futurastech.com →',
    },
    {
      role: { fr: 'Fondateur', en: 'Founder' },
      name: 'Quinzaine Group',
      link: null,
      desc: {
        fr: "Studio produit derrière plusieurs applications : Shareey (marketplace sénégalaise), ZenPayMe (escrow de paiement pour freelancers), Trac Plus (vision IA temps réel), Arosa'je (AgriTech).",
        en: 'Product studio behind multiple apps: Shareey (Senegalese marketplace), ZenPayMe (freelancer payment escrow), Trac Plus (real-time AI vision), Arosa\'je (AgriTech).',
      },
      tags: ['E-commerce', 'Fintech', 'Computer Vision', 'AgriTech'],
      linkLabel: null,
    },
  ],

  about: {
    heading: {
      fr: 'Ingénieur de formation.<br><em>Bâtisseur</em> par nature.',
      en: 'Engineer by training.<br><em>Builder</em> by nature.',
    },
    paragraphs: [
      {
        fr: "Ingénieur diplômé de l'<strong>ESIEA Paris</strong> (promotion 2026), spécialisation Systèmes Embarqués et Autonomes, avec une mineure en ingénierie d'affaires en dernière année. J'ai découvert la programmation en C en terminale, dans un cours d'informatique : le point de départ de ce parcours. Mon vrai apprentissage s'est fait en construisant des produits réels utilisés par de vraies personnes.",
        en: "Engineering graduate of <strong>ESIEA Paris</strong> (class of 2026), Embedded & Autonomous Systems specialization, with a business engineering minor in the final year. I discovered C programming in my last year of high school, in a computer science class: the starting point of this path. My real education happened building actual products used by real people.",
      },
      {
        fr: "De la navigation autonome de drones à la conception d'IPs UART sur FPGA, en passant par la conversion d'un véhicule électrique autonome et le déploiement de la première plateforme de télémédecine au Sénégal — j'opère à l'intersection de l'<strong>ingénierie embarquée profonde</strong> et de l'<strong>entrepreneuriat produit</strong>.",
        en: "From autonomous drone navigation to FPGA UART IP design, autonomous EV conversion, and deploying Senegal's first telemedicine platform — I operate at the intersection of <strong>deep embedded engineering</strong> and <strong>product entrepreneurship</strong>.",
      },
      {
        fr: 'Parcours international : <strong>France, Sénégal, Finlande, Lituanie</strong>. Cette perspective façonne chaque projet que je mène.',
        en: 'International background: <strong>France, Senegal, Finland, Lithuania</strong>. That perspective shapes every project I lead.',
      },
      {
        fr: 'Je recherche un <strong>CDI</strong> en systèmes embarqués, IA embarquée ou edge/cloud computing. Ouvert aussi aux collaborations et projets clients à fort impact, en particulier en IA, embarqué et tech pour l\'Afrique.',
        en: 'I am looking for a <strong>permanent position</strong> in embedded systems, embedded AI, or edge/cloud computing. Also open to collaborations and high-impact client projects, particularly in AI, embedded systems and tech for Africa.',
      },
      {
        fr: "<strong>Au-delà du code</strong> : je joue au football, je m'intéresse à la fabrication physique et à l'industrie, et j'ai vécu et étudié dans quatre pays : France, Sénégal, Finlande, Lituanie.",
        en: "<strong>Beyond code</strong>: I play football, I'm interested in physical manufacturing and industry, and I've lived and studied in four countries: France, Senegal, Finland, Lithuania.",
      },
    ],
    locations: [
      { fr: 'Paris, France (principal)', en: 'Paris, France (primary)' },
      { fr: 'Dakar, Sénégal (racines familiales, quartier Sacré-Cœur)', en: 'Dakar, Senegal (family roots, Sacré-Cœur neighborhood)' },
      { fr: 'Ouvert à la mobilité internationale', en: 'Open to international relocation' },
    ],
    photo: {
      src: 'https://imthiam.github.io/imthiam-net/mypic.jpg',
      alt: 'Mohamed Thiam',
      badgeTitle: 'IBM AI Developer',
      badgeTitleSuffix: { fr: 'Certifié', en: 'Certified' },
      badgeSub: "TOEIC 880 · ESIEA '26",
    },
  },

  skills: [
    {
      icon: '🔧',
      title: { fr: 'Systèmes Embarqués', en: 'Embedded Systems' },
      pills: [
        { label: 'STM32', featured: true },
        { label: 'ESP32', featured: true },
        { label: 'Raspberry Pi', featured: true },
        { label: 'Arduino', featured: true },
        { label: 'FPGA', featured: true },
        { label: 'VHDL' },
        { label: 'Jetson Orin Nano' },
        { label: 'FreeRTOS' },
        { label: 'Zephyr' },
        { label: 'CAN / UART / SPI' },
        { label: 'IoT / MQTT' },
        { label: 'BLE' },
        { label: 'Simulink' },
      ],
      context: {
        fr: "Utilisé sur : drone d'inventaire, conversion VE autonome, IP UART sur FPGA, lunettes intelligentes.",
        en: 'Used on: inventory drone, autonomous EV conversion, FPGA UART IP, smart glasses.',
      },
    },
    {
      icon: '🚁',
      title: { fr: 'Drones & Autonomie', en: 'Drones & Autonomy' },
      pills: [
        { label: 'ArduPilot', featured: true },
        { label: 'AirSim', featured: true },
        { label: 'Mission Planner', featured: true },
        { label: 'OpenPilot' },
        { label: { fr: 'Navigation autonome', en: 'Autonomous navigation' } },
        { label: { fr: 'Navigation intérieure sans GPS', en: 'Indoor GPS-denied navigation' } },
        { label: { fr: 'Détection de codes-barres', en: 'Barcode detection' } },
      ],
      context: {
        fr: 'Utilisé sur : drone d\'inventaire autonome (stage de fin d\'études).',
        en: 'Used on: autonomous inventory drone (final internship).',
      },
    },
    {
      icon: '🤖',
      title: { fr: 'IA & Vision', en: 'AI & Vision' },
      pills: [
        { label: 'TensorFlow', featured: true },
        { label: 'Computer Vision', featured: true },
        { label: 'CNN / Deep Learning', featured: true },
        { label: 'Edge AI', featured: true },
        { label: 'AI APIs' },
        { label: 'RAG' },
        { label: { fr: "Classification d'images", en: 'Image classification' } },
        { label: { fr: 'Agents IA', en: 'AI agents' } },
        { label: 'Claude Code' },
      ],
      context: {
        fr: 'Utilisé sur : surveillance IA des ruches, Trac Plus, AskiaBot (RAG).',
        en: 'Used on: beehive AI monitoring, Trac Plus, AskiaBot (RAG).',
      },
    },
    {
      icon: '📱',
      title: { fr: 'Mobile & Backend', en: 'Mobile & Backend' },
      pills: [
        { label: 'Flutter', featured: true },
        { label: 'Python', featured: true },
        { label: 'Flask / FastAPI', featured: true },
        { label: 'Next.js' },
        { label: 'TypeScript' },
        { label: 'C / C++' },
        { label: 'Java' },
        { label: 'Firebase' },
        { label: 'REST APIs' },
      ],
      context: {
        fr: 'Utilisé sur : DocLinkers, ZenPayMe, surveillance IA des ruches, Trac Plus.',
        en: 'Used on: DocLinkers, ZenPayMe, beehive AI monitoring, Trac Plus.',
      },
    },
    {
      icon: '☁️',
      title: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' },
      pills: [
        { label: 'Docker', featured: true },
        { label: 'GitLab CI/CD', featured: true },
        { label: 'Portainer', featured: true },
        { label: 'AWS' },
        { label: 'GitHub Actions' },
        { label: 'PostgreSQL' },
        { label: 'Neo4j' },
      ],
      context: {
        fr: 'Utilisé sur : infrastructure CI/CD du projet ruches, AskiaBot.',
        en: 'Used on: beehive project CI/CD infrastructure, AskiaBot.',
      },
    },
    {
      icon: '💼',
      title: { fr: 'Produit & Business', en: 'Product & Business' },
      pills: [
        { label: { fr: "Ingénierie d'affaires", en: 'Business engineering' }, featured: true },
        { label: { fr: 'Pricing & offres', en: 'Pricing & offers' } },
        { label: { fr: 'Prospection B2B', en: 'B2B outreach' } },
        { label: { fr: 'Pilotage startup (OKR)', en: 'Startup management (OKR)' } },
      ],
      context: {
        fr: 'Utilisé sur : AskiaBot, Futuras Tech Solutions, Quinzaine Group.',
        en: 'Used on: AskiaBot, Futuras Tech Solutions, Quinzaine Group.',
      },
    },
    {
      icon: '🌍',
      title: { fr: 'Langues', en: 'Languages' },
      pills: [
        { label: { fr: 'Français (natif)', en: 'French (native)' }, featured: true },
        { label: 'Anglais · TOEIC 880', featured: true },
        { label: { fr: 'Espagnol (B1)', en: 'Spanish (B1)' } },
        { label: { fr: 'Finnois (A1)', en: 'Finnish (A1)' } },
      ],
      context: {
        fr: 'À l\'aise dans les contextes français et sénégalais.',
        en: 'Comfortable in both French and Senegalese contexts.',
      },
    },
  ],

  projects: [
    {
      slug: 'drone-inventaire',
      cat: ['embedded', 'ai'],
      icon: '🚁',
      typeLabel: { fr: 'Drone · IoT', en: 'Drone · IoT' },
      gradient: 'rgba(0,229,160,0.12)',
      title: { fr: "Drone d'inventaire autonome", en: 'Autonomous Inventory Drone' },
      desc: {
        fr: 'Navigation autonome par codes-barres pour inventaire automatisé en entrepôt. Simulation AirSim + ArduPilot Mission Planner, programmation embarquée Python, intégration hardware & architecture système complète.',
        en: 'Autonomous barcode navigation for automated warehouse inventory. AirSim + ArduPilot simulation, embedded Python programming, full hardware integration & system architecture.',
      },
      stack: ['ArduPilot', 'AirSim', 'Python', 'Computer Vision'],
      detail: {
        context: {
          fr: "Stage de fin d'études (mars–septembre 2026) chez un éditeur de logiciels de gestion logistique et d'entrepôt (nom non communiqué). Système de drone d'intérieur autonome pour l'inventaire d'entrepôt, à l'interface de l'embarqué, de la robotique, de l'IA et du logiciel.",
          en: "Final internship (March–September 2026) at a warehouse and logistics management software company (name withheld). Autonomous indoor drone system for warehouse inventory, at the intersection of embedded systems, robotics, AI and software.",
        },
        role: {
          fr: "Navigation et stabilisation en intérieur sans GPS, appairage BLE vers Wi-Fi et configuration réseau, logique d'inventaire et persistance des données, intégration avec le backend et le moteur 3D pour l'exécution des plans de vol, simulation de navigation (AirSim, ArduPilot Mission Planner), détection et lecture de codes-barres en Python.",
          en: "Indoor GPS-denied navigation and stabilization, BLE-to-Wi-Fi pairing and network configuration, inventory logic and data persistence, backend and 3D engine integration for flight plan execution, navigation simulation (AirSim, ArduPilot Mission Planner), Python barcode detection and reading.",
        },
        challenges: {
          fr: "Navigation autonome en intérieur sans signal GPS, en travaillant à l'interface de plusieurs disciplines : embarqué, robotique, IA et logiciel.",
          en: "Autonomous indoor navigation without GPS, working at the intersection of several disciplines: embedded, robotics, AI and software.",
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'conversion-ve-autonome',
      cat: ['embedded', 'ai'],
      icon: '🚗',
      typeLabel: { fr: 'Véhicule Autonome', en: 'Autonomous Vehicle' },
      gradient: 'rgba(240,180,41,0.1)',
      title: { fr: 'Conversion VE autonome (CAP)', en: 'Autonomous EV Conversion (CAP)' },
      desc: {
        fr: 'Refonte complète d\'un véhicule thermique : motorisation électrique, électronique embarquée, capteurs, architecture logicielle autonome (OpenPilot), design intérieur et systèmes de contrôle/communication.',
        en: 'Complete combustion-to-electric conversion: electric drivetrain, embedded electronics, sensors, autonomous software (OpenPilot), interior design, control & communication systems.',
      },
      stack: ['OpenPilot', 'Embedded', 'EV', 'C++'],
      detail: {
        context: {
          fr: 'CAP Projet ESIEA (septembre 2025–janvier 2026) : conversion complète d\'un véhicule thermique en véhicule électrique autonome.',
          en: 'ESIEA CAP Project (September 2025–January 2026): full conversion of a combustion vehicle into an autonomous electric vehicle.',
        },
        role: {
          fr: 'Motorisation électrique, électronique embarquée, capteurs, architecture logicielle autonome (OpenPilot), design intérieur et systèmes de contrôle/communication.',
          en: 'Electric drivetrain, embedded electronics, sensors, autonomous software architecture (OpenPilot), interior design, control and communication systems.',
        },
        challenges: {
          fr: "Intégrer des systèmes de contrôle et de communication autonomes sur un véhicule converti, à l'échelle d'un projet d'équipe.",
          en: 'Integrating autonomous control and communication systems on a converted vehicle, at team-project scale.',
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'doclinkers',
      cat: ['ai', 'mobile', 'product'],
      icon: '🏥',
      typeLabel: 'HealthTech',
      gradient: 'rgba(0,212,255,0.1)',
      title: 'DocLinkers',
      desc: {
        fr: 'Première plateforme de télémédecine au Sénégal — consultations à distance, gestion sécurisée des données médicales, urgences. Produit réel, impact réel en Afrique de l\'Ouest.',
        en: "Senegal's first telemedicine platform — remote consultations, secure medical data, emergency care. Real product, real impact in West Africa.",
      },
      stack: ['Flutter', 'Firebase', 'Python'],
      detail: {
        context: {
          fr: 'Produit phare de Futuras Tech Solutions : première plateforme de télémédecine au Sénégal, consultations à distance et gestion sécurisée des données médicales.',
          en: "Futuras Tech Solutions' flagship product: Senegal's first telemedicine platform, remote consultations and secure medical data management.",
        },
        role: { fr: 'Co-fondateur et CTO, Futuras Tech Solutions.', en: 'Co-founder and CTO, Futuras Tech Solutions.' },
        challenges: {
          fr: 'Sécuriser des données médicales sensibles et couvrir des cas d\'usage d\'urgence dans un contexte de premier déploiement du genre au Sénégal.',
          en: "Securing sensitive medical data and covering emergency-care use cases, as the first deployment of its kind in Senegal.",
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'ruches-ia',
      cat: ['ai', 'embedded'],
      icon: '🐝',
      typeLabel: { fr: 'IA + Embarqué', en: 'AI + Embedded' },
      gradient: 'rgba(0,229,160,0.08)',
      title: { fr: 'IA surveillance des ruches', en: 'Beehive AI Monitoring' },
      desc: {
        fr: 'Modèle CNN + API Flask pour détecter les varroas sur images. App mobile Flutter pour apiculteurs. Application desktop cross-platform. Infrastructure CI/CD Docker/GitLab/Portainer complète.',
        en: 'CNN model + Flask API for varroa detection on images. Flutter mobile app for beekeepers. Cross-platform desktop app. Full Docker/GitLab/Portainer CI/CD infrastructure.',
      },
      stack: ['TensorFlow', 'CNN', 'Flask', 'Flutter', 'Docker'],
      detail: {
        context: {
          fr: 'Stage Ingénieur IA & Fullstack au laboratoire LDR de l\'ESIEA (avril–juillet 2025) : solution complète de surveillance intelligente des ruches.',
          en: "AI & Fullstack Engineering internship at ESIEA's LDR lab (April–July 2025): full intelligent beehive monitoring solution.",
        },
        role: {
          fr: 'Intégration d\'un modèle CNN via API Flask, infrastructure CI/CD (Docker, GitLab, Portainer), application mobile Flutter pour apiculteurs, application desktop cross-platform (Win/Mac/Linux), API REST MySQL live.',
          en: 'CNN model integration via Flask API, CI/CD infrastructure (Docker, GitLab, Portainer), Flutter mobile app for beekeepers, cross-platform desktop app (Win/Mac/Linux), live MySQL REST API.',
        },
        challenges: {
          fr: 'Détecter les varroas sur images et livrer une infrastructure CI/CD complète en parallèle des applications mobile et desktop.',
          en: 'Detecting varroa mites on images while delivering a full CI/CD infrastructure alongside the mobile and desktop apps.',
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'uart-fpga',
      cat: ['embedded'],
      icon: '⚡',
      typeLabel: 'FPGA / VHDL',
      gradient: 'rgba(240,180,41,0.1)',
      title: { fr: 'IP UART sur FPGA', en: 'FPGA UART IP' },
      desc: {
        fr: 'Implémentation VHDL complète d\'une IP UART sur FPGA — liaison série PC/FPGA, contrôle servomoteur, acquisition télémètre ultrason en temps réel. Système combinant communication, contrôle et acquisition.',
        en: 'Full VHDL UART IP on FPGA — serial PC/FPGA comms, servo motor control, real-time ultrasonic sensor acquisition. Combined communication, control and acquisition system.',
      },
      stack: ['VHDL', 'FPGA', 'UART'],
      detail: {
        context: {
          fr: 'Projet ESIEA : implémentation VHDL complète d\'une IP UART sur FPGA.',
          en: 'ESIEA project: full VHDL UART IP implementation on FPGA.',
        },
        role: {
          fr: 'Liaison série PC/FPGA, contrôle servomoteur, acquisition télémètre ultrason en temps réel.',
          en: 'Serial PC/FPGA link, servo motor control, real-time ultrasonic sensor acquisition.',
        },
        challenges: {
          fr: 'Combiner communication série, contrôle et acquisition temps réel dans un seul système FPGA.',
          en: 'Combining serial communication, control and real-time acquisition in a single FPGA system.',
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'zenpayme',
      cat: ['mobile', 'product'],
      icon: '💸',
      typeLabel: 'Fintech',
      gradient: 'rgba(240,180,41,0.08)',
      title: 'ZenPayMe',
      desc: {
        fr: 'Plateforme de paiement escrow sécurisé pour freelancers. Le client paie en escrow, le travail est validé via démo, les fonds sont reversés automatiquement au prestataire.',
        en: 'Secure escrow payment platform for freelancers. Client pays into escrow, work is validated via demo, funds automatically released to the provider.',
      },
      stack: ['Flutter', 'Firebase', 'Payments'],
      detail: {
        context: {
          fr: 'Produit du studio Quinzaine Group : plateforme d\'escrow pour sécuriser les paiements entre clients et freelancers.',
          en: 'Quinzaine Group studio product: escrow platform to secure payments between clients and freelancers.',
        },
        role: { fr: 'Fondateur, Quinzaine Group.', en: 'Founder, Quinzaine Group.' },
        challenges: {
          fr: 'Concevoir un mécanisme d\'escrow où les fonds ne sont reversés qu\'après validation du travail via démo.',
          en: 'Designing an escrow mechanism that only releases funds after the work is validated via a demo.',
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'trac-plus',
      cat: ['ai', 'mobile'],
      icon: '👁️',
      typeLabel: { fr: 'Vision IA', en: 'AI Vision' },
      gradient: 'rgba(0,229,160,0.08)',
      title: 'Trac Plus',
      desc: {
        fr: 'App de vision IA temps réel — détection faciale, reconnaissance d\'objets et de texte, répondeur intelligent, détecteur de tumeur cérébrale (CNN en cours). Live ou sur image.',
        en: 'Real-time AI vision app — facial detection, object & text recognition, intelligent responder, brain tumor detector (CNN in progress). Live or from image.',
      },
      stack: ['Computer Vision', 'Flutter', 'TensorFlow'],
      detail: {
        context: {
          fr: 'Produit du studio Quinzaine Group : application de vision IA temps réel, live ou sur image.',
          en: 'Quinzaine Group studio product: real-time AI vision app, live or from an image.',
        },
        role: { fr: 'Fondateur, Quinzaine Group.', en: 'Founder, Quinzaine Group.' },
        challenges: {
          fr: 'Combiner détection faciale, reconnaissance d\'objets et de texte et un détecteur de tumeur cérébrale (CNN en cours) dans une même application temps réel.',
          en: 'Combining facial detection, object/text recognition and a brain tumor detector (CNN in progress) in a single real-time app.',
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
    {
      slug: 'lunettes-intelligentes',
      cat: ['embedded'],
      icon: '👓',
      typeLabel: { fr: 'Tech assistive', en: 'Assistive Tech' },
      gradient: 'rgba(0,212,255,0.06)',
      title: { fr: 'Lunettes intelligentes', en: 'Smart Glasses' },
      desc: {
        fr: 'Dispositif portable pour malvoyants. Réseau de capteurs détectant les obstacles, alertes via vibrations et signaux audio pour améliorer l\'autonomie quotidienne.',
        en: 'Wearable for visually impaired. Sensor array detecting obstacles, vibration/audio alerts for improved daily autonomy.',
      },
      stack: ['Embedded', 'Sensors', 'Hardware Design'],
      detail: {
        context: {
          fr: 'Dispositif portable pour malvoyants, pensé pour améliorer l\'autonomie quotidienne.',
          en: 'Wearable device for visually impaired users, designed to improve daily autonomy.',
        },
        role: { fr: 'Conception et développement.', en: 'Design and development.' },
        challenges: {
          fr: 'Détecter les obstacles via un réseau de capteurs et restituer l\'information de façon fiable par vibrations et signaux audio.',
          en: 'Detecting obstacles via a sensor array and reliably conveying that information through vibration and audio signals.',
        },
        result: { fr: 'TODO : résultat chiffré à confirmer.', en: 'TODO: measurable outcome to confirm.' },
      },
    },
  ],

  // Catégories utilisées par les filtres de la frise : 'experience' | 'formation' | 'international'.
  // Ordre : du plus récent au plus ancien, comme aujourd'hui affiché.
  timeline: [
    {
      id: 'internship-2026',
      category: 'experience',
      current: true,
      date: { fr: 'Mars–Sept. 2026', en: 'Mar–Sept 2026' },
      role: { fr: 'Stagiaire Ingénieur IoT — Stage de fin d\'études', en: 'IoT Engineering Intern — Final Internship' },
      org: { fr: 'Île-de-France, France', en: 'Île-de-France, France' },
      desc: {
        fr: 'Navigation autonome d\'un drone pour l\'inventaire automatisé par lecture de codes-barres. Développement logiciel & intégration matérielle, simulation de navigation via AirSim et ArduPilot Mission Planner, programmation embarquée Python pour pilotage, détection et lecture de codes-barres. Participation à la conception hardware et à l\'architecture système.',
        en: 'Autonomous drone navigation for automated barcode-based inventory. Software dev & hardware integration, AirSim + ArduPilot navigation simulation, embedded Python for piloting, detection and barcode reading. Participation in hardware design and system architecture.',
      },
      // Confidentialité : ne jamais nommer l'entreprise (voir CONFIG.showCompanyName). Rester au
      // niveau fonctionnel : pas de routes d'API, ports, identifiants, organisation d'équipe, etc.
      tags: ['ArduPilot', 'AirSim', 'Python', 'Drone'],
    },
    {
      id: 'cap-ve',
      category: 'experience',
      date: { fr: 'Sept. 2025–Jan. 2026', en: 'Sept 2025–Jan 2026' },
      role: { fr: 'CAP Projet — Véhicule Électrique Autonome', en: 'CAP Project — Autonomous EV' },
      org: 'ESIEA Paris',
      desc: {
        fr: 'Refonte complète d\'un véhicule thermique en électrique autonome : motorisation électrique, électronique embarquée, capteurs, architecture logicielle autonome (OpenPilot), design intérieur et intégration des systèmes de contrôle/communication.',
        en: 'Full ICE-to-autonomous-electric conversion: electric drivetrain, embedded electronics, sensors, autonomous software architecture (OpenPilot), interior design, control/communication systems integration.',
      },
      tags: ['OpenPilot', 'Embedded', 'EV'],
    },
    {
      id: 'ruches',
      category: 'experience',
      date: { fr: 'Avr–Juil. 2025', en: 'Apr–Jul 2025' },
      role: { fr: 'Stagiaire Ingénieur IA & Fullstack', en: 'AI & Fullstack Engineering Intern' },
      org: 'ESIEA Paris',
      desc: {
        fr: 'Déploiement d\'une solution complète de surveillance intelligente des ruches : intégration d\'un modèle CNN via API Flask, infrastructure CI/CD (Docker, GitLab, Portainer), application mobile Flutter pour apiculteurs, application desktop cross-platform (Win/Mac/Linux), API REST MySQL live.',
        en: 'Full beehive monitoring solution: CNN model via Flask API, CI/CD infrastructure (Docker, GitLab, Portainer), Flutter mobile app for beekeepers, cross-platform desktop app (Win/Mac/Linux), live MySQL REST API.',
      },
      tags: ['CNN', 'Flask', 'Docker', 'Flutter'],
    },
    {
      id: 'centria',
      category: 'international',
      date: { fr: 'Jan.–Juin 2024', en: 'Jan–Jun 2024' },
      role: { fr: 'Semestre d\'échange — Centria UAS', en: 'Exchange Semester — Centria UAS' },
      org: 'Centria UAS · Kokkola, Finlande',
      desc: {
        fr: 'Cinq mois de semestre à l\'étranger en systèmes embarqués. C\'est là que j\'ai découvert l\'IoT et les systèmes embarqués.',
        en: 'Five-month semester abroad in embedded systems. This is where I discovered IoT and embedded systems.',
      },
      tags: [],
    },
    {
      id: 'ktu-bip',
      category: 'international',
      date: { fr: '2024', en: '2024' },
      role: { fr: 'Blended Intensive Program — KTU', en: 'Blended Intensive Program — KTU' },
      org: 'KTU · Kaunas, Lituanie',
      desc: {
        fr: 'Développement d\'un jeu vidéo 3D en équipe internationale pluridisciplinaire.',
        en: '3D video game development with an international, multidisciplinary team.',
      },
      tags: [],
    },
    {
      id: 'esiea',
      category: 'formation',
      date: { fr: '2023–2026', en: '2023–2026' },
      role: { fr: 'Ingénieur Systèmes Embarqués & Autonomes', en: 'Embedded & Autonomous Systems Engineer' },
      org: 'ESIEA Paris',
      desc: {
        fr: 'Formation ingénieur 5 ans. Spécialisation FPGA, RTOS, systèmes autonomes, IA embarquée, avec une mineure en ingénierie d\'affaires en dernière année. Projets majeurs : drone d\'inventaire autonome, conversion VE autonome, IP UART sur FPGA, surveillance IA de ruches.',
        en: '5-year engineering program. Specialization in FPGA, RTOS, autonomous systems, embedded AI, with a business engineering minor in the final year. Major projects: autonomous inventory drone, autonomous EV conversion, FPGA UART IP, AI beehive monitoring.',
      },
      tags: [],
    },
    {
      id: 'estim',
      category: 'experience',
      date: { fr: 'Juil–Oct. 2021', en: 'Jul–Oct 2021' },
      role: { fr: 'Stagiaire Développement Logiciel', en: 'Software Development Intern' },
      org: 'ESTIM SA · Dakar, Sénégal',
      desc: {
        fr: 'Développement d\'un logiciel de gestion administrative et financière pour un projet haute sécurité. Stack : HTML, CSS, JS, PHP, PostgreSQL.',
        en: 'Built administrative & financial management software for a high-security project. Stack: HTML, CSS, JS, PHP, PostgreSQL.',
      },
      tags: [],
    },
    {
      // TODO: établissement exact et dates du Bachelor IA à confirmer.
      id: 'bachelor-ia',
      category: 'formation',
      date: { fr: 'Avant 2023', en: 'Before 2023' },
      role: { fr: 'Bachelor Intelligence Artificielle', en: 'Bachelor in Artificial Intelligence' },
      org: { fr: 'France · titre professionnel CDA', en: 'France · CDA professional title' },
      desc: {
        fr: 'Bachelor en Intelligence Artificielle, avec obtention du titre professionnel CDA (Concepteur Développeur d\'Applications).',
        en: 'Bachelor in Artificial Intelligence, including the CDA professional title (application designer/developer).',
      },
      tags: [],
    },
    {
      id: 'dut-esp',
      category: 'formation',
      date: { fr: 'Avant 2023', en: 'Before 2023' },
      role: { fr: 'DUT Informatique', en: 'DUT in Computer Science' },
      org: 'École Supérieure Polytechnique de Dakar (ESP Dakar)',
      desc: {
        fr: 'Diplôme Universitaire de Technologie en Informatique à l\'ESP Dakar.',
        en: 'University Diploma of Technology in Computer Science at ESP Dakar.',
      },
      tags: [],
    },
    {
      id: 'bac',
      category: 'formation',
      date: { fr: 'Avant 2023', en: 'Before 2023' },
      role: { fr: 'Baccalauréat scientifique', en: 'Scientific Baccalaureate' },
      org: { fr: 'Sénégal', en: 'Senegal' },
      desc: {
        fr: 'J\'ai découvert la programmation en C en terminale, dans un cours d\'informatique : le point de départ de ce parcours.',
        en: 'I discovered C programming in my last year of high school, in a computer science class: the starting point of this path.',
      },
      tags: [],
    },
  ],

  contact: {
    heading: {
      fr: 'Construisons quelque<br><em>chose ensemble.</em>',
      en: "Let's build<br><em>something together.</em>",
    },
    text: {
      fr: "Ouvert aux <strong style='color:var(--text)'>rôles techniques senior</strong>, projets clients à fort impact et partenariats stratégiques — en particulier en IA, systèmes embarqués et tech pour l'Afrique. <strong style='color:var(--text)'>CDI recherché.</strong>",
      en: "Open to <strong style='color:var(--text)'>senior technical roles</strong>, high-impact client projects and strategic partnerships — particularly in AI, embedded systems and tech for Africa. <strong style='color:var(--text)'>Seeking a permanent position.</strong>",
    },
  },

  footer: {
    copy: { fr: '© 2026 · Ingénieur & Entrepreneur · Paris & Dakar', en: '© 2026 · Engineer & Entrepreneur · Paris & Dakar' },
    tagline: {
      fr: 'Codé à la main. HTML, CSS, JS. Zéro dépendance, zéro tracker.',
      en: 'Hand-coded. HTML, CSS, JS. Zero dependencies, zero trackers.',
    },
  },
};
