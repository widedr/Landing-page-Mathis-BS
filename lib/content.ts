export const nav = [
  { label: "Plateforme", href: "#plateforme" },
  { label: "Solutions", href: "#solution" },
  { label: "Pour qui", href: "#pour-qui" },
  { label: "Ressources", href: "#faq" },
];

export const ctaLabel = "Demander une démo";

export const hero = {
  eyebrow: "Plateforme fiscale SaaS",
  title: "Pilotez toute la fiscalité de votre patrimoine immobilier depuis une seule plateforme.",
  subtitle:
    "Mathis centralise vos données fiscales et patrimoniales, automatise vos obligations déclaratives, identifie les dégrèvements auxquels votre patrimoine est éligible, et vous permet de suivre vos réclamations.",
  primaryCta: ctaLabel,
  secondaryCta: "Voir comment ça marche",
  trust: "25 ans d'expertise fiscale dédiée au logement social",
  kpis: [
    { value: "128", label: "Lots" },
    { value: "42 300 m²", label: "Surface bâtie" },
    { value: "186 400 €", label: "Taxe foncière" },
  ],
  visualCaption: "Exemple sur données de démonstration",
  floatingBadge: "Dégrèvement détecté",
};

export const trustBar = {
  fallback:
    "Conçu avec des experts fiscaux du logement social, pour piloter tout votre patrimoine fiscal depuis un seul endroit.",
};

export const problem = {
  eyebrow: "Le problème",
  title: "Votre fiscalité locale ne devrait pas tenir dans 15 fichiers Excel.",
  intro:
    "Multiplicité des taxes, avis dispersés, dégrèvements traités au coup par coup : la gestion fiscale d'un patrimoine social repose encore, dans la plupart des organisations, sur des fichiers manuels et des process qui ne se parlent pas entre eux.",
  columns: { before: "Avant Mathis", after: "Avec Mathis" },
  rows: [
    {
      axis: "Centralisation",
      before: "Avis fonciers dispersés dans des dizaines de fichiers Excel",
      after: "Une donnée fiscale et patrimoniale centralisée",
    },
    {
      axis: "Automatisation",
      before: "Données difficiles à fiabiliser et à croiser",
      after: "Des processus automatisés, de la collecte à la déclaration",
    },
    {
      axis: "Détection",
      before: "Dégrèvements traités au coup par coup, souvent trop tard",
      after: "Des opportunités de dégrèvement détectées avant échéance",
    },
    {
      axis: "Déclarations",
      before: "Déclarations GMBI, H2, DIS saisies manuellement",
      after: "Des déclarations générées automatiquement",
    },
    {
      axis: "Pilotage",
      before: "Peu de visibilité consolidée sur le patrimoine fiscal",
      after: "Une fiscalité pilotée, pas subie",
    },
    {
      axis: "Comptabilisation",
      before: "Écritures comptables et refacturations gérées manuellement",
      after: "Une comptabilisation automatisée, de la taxe à l'écriture",
    },
    {
      axis: "Simulation",
      before: "Aucune projection fiscale disponible avant décision",
      after: "Des simulations et projections budgétaires pluriannuelles",
    },
  ],
  radarCaption:
    "Comparaison qualitative et illustrative — pas une mesure chiffrée réelle.",
};

export const solution = {
  eyebrow: "Notre méthode",
  title: "Une méthode en 4 temps pour reprendre la main sur votre fiscalité",
  pillars: [
    {
      number: "01",
      icon: "layers",
      title: "Centraliser",
      description: "Toutes vos données fiscales et patrimoniales au même endroit.",
    },
    {
      number: "02",
      icon: "sparkles",
      title: "Automatiser",
      description: "Moins de saisie, moins d'Excel, moins d'erreurs.",
    },
    {
      number: "03",
      icon: "chart",
      title: "Optimiser",
      description:
        "Identifiez les dégrèvements et opportunités fiscales auxquels votre patrimoine est éligible.",
    },
    {
      number: "04",
      icon: "dashboard",
      title: "Piloter",
      description: "Transformez vos données fiscales en décisions.",
    },
  ],
  credibility:
    "Cette méthode s'appuie sur 25 ans d'expertise fiscale dédiée au logement social, et sur une connaissance directe des centres fiscaux locaux, partout en France.",
  badges: ["Conçu pour les exigences du secteur des bailleurs sociaux / logement social"],
};

export const platform = {
  eyebrow: "La plateforme",
  title: "Une plateforme complète, module par module",
  modules: [
    {
      id: "patrimoine",
      tab: "Patrimoine",
      title: "Une vision à 360° de votre patrimoine fiscal",
      tagline: "Cartographiez, chiffrez et pilotez votre patrimoine en un coup d'œil.",
      bullets: [
        "Cartographie de votre patrimoine",
        "Données fiscales centralisées",
        "KPI en temps réel",
      ],
      visualLabel: "Aperçu du module Patrimoine",
    },
    {
      id: "fiscalite",
      tab: "Fiscalité",
      title: "Toutes vos taxes locales, une seule plateforme",
      tagline: "TFPB, CFE, TEOM, taxe d'aménagement : plus besoin de jongler entre les fichiers.",
      bullets: [
        "Suivi consolidé de toutes vos taxes locales",
        "Détection automatique des dispositifs applicables",
        "Historique complet par bien et par taxe",
      ],
      visualLabel: "Aperçu du module Fiscalité",
    },
    {
      id: "degrevements",
      tab: "Dégrèvements",
      title: "De la détection à l'obtention, sans rien laisser passer",
      tagline: "Un dégrèvement identifié, c'est un dégrèvement récupéré.",
      bullets: [
        "Collecte automatisée des données, sans ressaisie",
        "Contrôle qualité avant chaque dépôt de dossier",
        "Suivi en temps réel : demandé, obtenu, restant à obtenir",
      ],
      visualLabel: "Aperçu du module Dégrèvements",
    },
    {
      id: "simulation",
      tab: "Simulation",
      title: "Anticipez vos taxes de demain",
      tagline: "Projetez votre budget fiscal avant de décider, pas après.",
      bullets: [
        "Projections budgétaires pluriannuelles",
        "Simulations d'impact avant travaux ou acquisitions",
        "Synthèses prêtes pour votre comité de direction",
      ],
      visualLabel: "Aperçu du module Simulation",
    },
    {
      id: "comptabilite",
      tab: "Comptabilité",
      title: "Vos obligations comptables, automatisées",
      tagline: "GMBI, H2, DIS, refacturation : moins de saisie, plus de fiabilité.",
      bullets: [
        "Comptabilisation automatisée",
        "Génération des déclarations GMBI, H2 et DIS",
        "Refacturation des taxes simplifiée",
      ],
      visualLabel: "Aperçu du module Comptabilité",
    },
    {
      id: "reporting",
      tab: "Reporting",
      title: "Des tableaux de bord pensés pour la décision",
      tagline: "La même donnée, partagée entre fiscalité, comptabilité et direction.",
      bullets: [
        "Dashboards consolidés et exportables",
        "Indicateurs sur les dégrèvements obtenus",
        "Une donnée fiable, partagée entre tous les services",
      ],
      visualLabel: "Aperçu du module Reporting",
    },
  ],
  cta: "Voir le module",
};

export const results = {
  eyebrow: "Résultats",
  title: "Des résultats visibles dès les premiers mois",
  intro:
    "Dès le déploiement, Mathis transforme votre gestion fiscale étape après étape — de l'automatisation des tâches à une vision partagée du patrimoine.",
  items: [
    {
      phase: "Semaine 1",
      icon: "wand-sparkles",
      title: "Moins de tâches manuelles",
      detail:
        "La collecte, la saisie et le classement des avis fonciers ne reposent plus sur vos équipes : Mathis les automatise de bout en bout.",
      highlights: ["Collecte automatisée", "Zéro double saisie", "Données cadastrales", "Données ERP"],
    },
    {
      phase: "Premier mois",
      icon: "database-zap",
      title: "Une meilleure fiabilité des données",
      detail:
        "Une seule source de données fiscales et patrimoniales, centralisée et tenue à jour, plutôt que des fichiers dispersés à recouper manuellement.",
      highlights: ["Donnée centralisée", "Contrôle qualité continu"],
    },
    {
      phase: "Premier trimestre",
      icon: "list-checks",
      title: "Une détection plus rapide des opportunités",
      detail:
        "Les dégrèvements potentiels sont identifiés en amont des échéances, au lieu d'être traités au coup par coup et souvent trop tard.",
      highlights: ["Détection avant échéance", "Suivi demandé / obtenu", "Suivi des réclamations"],
    },
    {
      phase: "En continu",
      icon: "map-pin-check",
      title: "Une vision consolidée du patrimoine",
      detail:
        "Fiscalité, comptabilité et direction partagent la même vision du patrimoine, pour des arbitrages pris en connaissance de cause.",
      highlights: ["Tableaux de bord partagés", "Aide à la décision"],
    },
  ],
};

export const audience = {
  eyebrow: "Pour Qui",
  title: "Pour qui ?",
  intro:
    "Une plateforme conçue pour chaque métier du logement social. Que vous pilotiez la stratégie financière ou la gestion comptable au quotidien, Mathis s'adapte à vos enjeux opérationnels. Retrouvez en un coup d'œil l'impact direct de la plateforme sur votre périmètre pour transformer vos contraintes métiers en leviers de performance.",
  personas: [
    {
      icon: "user-round-cog",
      title: "Fiscalité",
      description: "Identifiez les opportunités et pilotez vos dégrèvements.",
    },
    {
      icon: "chart",
      title: "Direction financière",
      description: "Projetez votre charge fiscale et pilotez vos arbitrages.",
    },
    {
      icon: "calculator",
      title: "Comptabilité",
      description: "Automatisez vos écritures et déclarations.",
    },
    {
      icon: "building",
      title: "Patrimoine",
      description: "Croisez données patrimoniales et fiscales.",
    },
  ],
  fallback: "Vous ne savez pas quelle équipe est concernée ?",
  fallbackCta: "Découvrir Mathis",
};

export const testimonial = {
  title: "L'impact recherché par nos clients",
  quote:
    "Nous avons considérablement réduit le temps consacré à la collecte et à l'analyse des données fiscales.",
};

export const faq = [
  {
    question: "Mathis s'intègre-t-il à notre système d'information existant ?",
    answer:
      "Oui. Mathis se connecte à vos données patrimoniales et comptables existantes ; nos équipes vous accompagnent sur la connexion lors du déploiement, sans double saisie.",
  },
  {
    question: "Quelles données devons-nous fournir pour démarrer ?",
    answer:
      "Votre matrice cadastrale et vos avis fonciers suffisent pour activer l'ensemble des fonctionnalités de la plateforme dès le départ.",
  },
  {
    question: "Mathis couvre-t-il toutes nos taxes locales, pas seulement la taxe foncière ?",
    answer:
      "Oui. Au-delà de la TFPB, Mathis centralise le suivi de la CFE, de la TEOM, de la taxe d'aménagement et des autres taxes locales applicables à votre patrimoine.",
  },
  {
    question: "Combien de temps avant de voir les premiers résultats ?",
    answer:
      "Un premier rapport d'audit d'anomalies est produit dans le mois suivant le déploiement, avec identification des dégrèvements potentiels.",
  },
  {
    question: "Nos données sont-elles en sécurité ?",
    answer:
      "Oui, l'hébergement est sécurisé en France et conforme au RGPD, avec un contrôle d'accès strict par utilisateur et par rôle.",
  },
  {
    question: "Quel accompagnement humain en complément de l'outil ?",
    answer:
      "Un interlocuteur dédié suit votre dossier sur les sujets fiscaux, en complément d'un support réactif pour les questions d'usage au quotidien.",
  },
  {
    question: "Quel est le délai de déploiement ?",
    answer:
      "Comptez environ deux semaines entre la connexion de vos données et la prise en main complète de vos équipes, avec un premier diagnostic dès les 48 premières heures.",
  },
  {
    question: "Peut-on commencer sur une partie du patrimoine seulement ?",
    answer:
      "Oui. Il est possible de déployer Mathis sur un périmètre restreint (une entité, un type de bien) avant d'étendre progressivement à l'ensemble du patrimoine.",
  },
  {
    question: "Mathis remplace-t-il nos outils existants ?",
    answer:
      "Mathis centralise et automatise vos processus fiscaux et comptables ; il se substitue à vos fichiers Excel et outils manuels, tout en s'articulant avec votre système d'information existant.",
  },
  {
    question: "Comment sont récupérées les données fiscales ?",
    answer:
      "Vos avis fonciers et données cadastrales sont intégrés automatiquement dans la plateforme, sans ressaisie manuelle de la part de vos équipes.",
  },
];

export const finalCta = {
  title: "Prêt à reprendre la main sur votre fiscalité locale ?",
  subtitle:
    "Rejoignez les bailleurs sociaux qui ont fait de Mathis le pilote de leur fiscalité locale, de la collecte des avis fonciers à la récupération de vos dégrèvements.",
  reassurance:
    "Vos données restent confidentielles — aucune sollicitation commerciale hors de ce projet.",
  confirmation: "Votre demande a bien été envoyée. Un expert Mathis vous recontacte sous 24h.",
};

export const footer = {
  baseline: "La plateforme fiscale des bailleurs sociaux",
  columns: [
    {
      title: "Plateforme",
      links: [
        "Patrimoine",
        "Fiscalité",
        "Dégrèvements",
        "Simulation",
        "Comptabilité",
        "Reporting",
      ],
    },
    {
      title: "Ressources",
      links: ["Blog", "Guides fiscalité bailleurs sociaux", "FAQ"],
    },
    {
      title: "Entreprise",
      links: ["À propos", "Contact", "Mentions légales", "Politique de confidentialité (RGPD)"],
    },
  ],
};
