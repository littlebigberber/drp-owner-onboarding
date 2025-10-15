# DRP Owner Onboarding (Static Site)

This is a **GitHub Pages–ready** static site with four funnels and a mini calculator. You can upload these files directly to a GitHub repo and enable Pages.

## What’s included
- **Four funnels**: Cohost (Furnished/Unfurnished), Lease-to-Us (Furnished/Unfurnished)
- **Site-wide acceptance box** + detailed acceptance table page
- **Co-host pricing**: 22% standard, **25% for flagged ops**, with **2,500 MAD floor**
- **Mini calculator** using **Neighborhood × Category baseline JSON** and ops flags
- **Tailwind via CDN** (no build step needed)

## Quick start (GitHub Pages)
1. Create a new GitHub repo (public is easiest).
2. In the repo, click **Add file → Upload files** and upload the **contents of `/site`** (not the parent folder).
3. Go to **Settings → Pages → Branch: `main`, Folder: `/ (root)` → Save**.
4. Your site will be live at `https://<your_user>.github.io/<repo>/`.

## Local preview
Just open `index.html` in your browser. (No server needed.)

## Customize
- **Pricing** and **fee floor** in `/site/assets/config.js`
- **Neighborhood × Category baselines** in `/site/data/baselines.json`
- Acceptance copy in `/site/assets/acceptance.js`
