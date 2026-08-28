# Mathis — Landing page

Landing page marketing de Mathis, la plateforme fiscale des bailleurs sociaux.
Construite avec Next.js 16 (App Router), TypeScript et Tailwind CSS v4, à partir
du dossier de conception (`Mathis_Landing_Page_MASTER.docx`) et de la maquette
Figma « Mathis BS ».

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** — tokens de design (couleurs, rayons, typographies) définis dans `app/globals.css`
- **lucide-react** pour les icônes
- Polices **Outfit** (titres / corps) et **Roboto** (interface), chargées via `next/font/google`

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Structure

```
app/
  layout.tsx          métadonnées SEO, polices, JSON-LD
  page.tsx             assemble les 14 sections de la page
  globals.css          tokens du design system Mathis (Tailwind v4 @theme)
  api/contact/route.ts  endpoint du formulaire de contact (section CTA finale)
  icon.tsx, apple-icon.tsx, opengraph-image.tsx   favicon et image de partage générés
  robots.ts, sitemap.ts

components/
  ui/                  primitives (Button, Badge, TextField, Accordion, Reveal…)
  sections/            les 14 sections de la landing page (Header → Footer)

lib/
  content.ts           tout le copywriting français (source unique de vérité)
  utils.ts
```

## Déployer sur Vercel

Le projet est un Next.js standard, déployable sans configuration particulière :

1. Pousser ce dépôt sur GitHub (déjà fait sur la branche courante).
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt GitHub `landing-page-mathis-bs`.
3. Vercel détecte automatiquement Next.js (build command `next build`, output `.next`) — aucun réglage à changer.
4. (Optionnel) Renseigner la variable d'environnement `CONTACT_WEBHOOK_URL` si vous voulez que le formulaire final transfère les leads vers un webhook (CRM, Zapier, Slack…). Sans cette variable, les soumissions sont simplement journalisées côté serveur et le formulaire fonctionne normalement (confirmation affichée à l'utilisateur).
5. Déployer.

Alternative en ligne de commande (nécessite d'être connecté à votre compte Vercel) :

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Variables d'environnement

| Variable | Requise | Description |
| --- | --- | --- |
| `CONTACT_WEBHOOK_URL` | non | URL appelée en POST avec les données du formulaire de démo (nom, email, organisme, téléphone). Si absente, le lead est seulement loggé côté serveur. |

## Notes de conception

- **Contenu** : toutes les sections, le copywriting et les règles éditoriales (un seul CTA principal, aucun chiffre inventé, témoignage non attribué tant qu'il n'est pas validé, etc.) suivent le dossier de conception fourni.
- **Tokens** : couleurs, typographies et échelle de rayons proviennent du Figma « Interfaces Mathis BS ». Les titres utilisent **Outfit** (et non « Lack », qui n'apparaît pas dans le fichier Figma fourni — à confirmer avec l'équipe design si une police display dédiée existe séparément).
- **Accessibilité** : contraste AA vérifié (audit automatisé `axe-core`, 0 violation), navigation clavier sur les onglets/accordéons/FAQ, `prefers-reduced-motion` respecté, focus visible partout. Le orange de marque (#F97316) est conservé à l'identique sur les CTA ; le texte des boutons est en `--ink` plutôt qu'en blanc pour atteindre un contraste ~6:1 (le blanc sur cet orange ne dépasse pas ~2.8:1).
- **Responsive** : accordéon vertical sous 768px pour la section Plateforme (ticket M-01), menu mobile pour le header.
- **V1 vs backlog** : les pistes explicitement hors périmètre v1 dans le dossier (simulateur de ROI, auto-play des onglets, mockup à hotspots, témoignage attribué, chiffres de preuve chiffrés) n'ont pas été implémentées, conformément au document.
