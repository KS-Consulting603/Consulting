# Kiefer Stoller — Accounting & Business Consulting

Personal consulting website for [Kiefer Stoller](mailto:stollerk@gmail.com), Manchester, NH.

Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies — deploys directly to GitHub Pages.

## Structure

```
/
├── index.html              # Main single-page site
├── css/
│   └── styles.css          # All styles (CSS variables, responsive)
├── js/
│   └── main.js             # Nav, scroll reveal, mobile menu, form
├── assets/
│   └── Kiefer_Stoller_Logo.png
└── README.md
```

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Save — site will be live at `https://<your-username>.github.io/<repo-name>/`

For a custom domain (e.g. `kieferstoller.com`):
- Add a `CNAME` file to the repo root containing just your domain name
- Point your domain's DNS to GitHub Pages per [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Contact Form

The form uses a `mailto:` link — no backend or third-party service required. On submit it opens the visitor's email client with the message pre-filled and sends to `stollerk@gmail.com`.

If you later want a real form backend (submissions without requiring the visitor to have an email client), [Formspree](https://formspree.io) has a free tier and requires only a small change to the form's `action` attribute and method.

## Customization

All brand colors and fonts are CSS variables at the top of `styles.css`:

```css
:root {
  --navy:  #0D1B2A;
  --gold:  #C9A84C;
  --cream: #F8F5EE;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Manrope', system-ui, sans-serif;
}
```

## License

Personal use. All rights reserved.
