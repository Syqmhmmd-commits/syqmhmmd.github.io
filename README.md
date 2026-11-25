<div align="center">

# ⚙️ Portfolio

**Personal portfolio website — Syauqii Dzakiir Muhammad**

[![Live](https://img.shields.io/badge/live-syqmhmmd--commits.github.io-ffb000?style=flat-square)](https://syqmhmmd-commits.github.io/syqmhmmd.github.io/)
[![GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-blue?style=flat-square)](https://pages.github.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

**Live Demo →** [syqmhmmd-commits.github.io/syqmhmmd.github.io](https://syqmhmmd-commits.github.io/syqmhmmd.github.io/)

</div>

---

## 📖 Tentang

Portfolio pribadi yang menampilkan siapa saya, apa yang saya kerjakan, dan project-project open source saya. Fokus di **Low-Level System Engineering**, **Kernel Development** untuk perangkat Android (Redmi Note 10S / MT6785), serta **Compiler Debugging**.

## ✨ Fitur

- 📟 **Bare-Metal Terminal Vibe** — Tema monokrom gelap dengan aksen Amber (seperti monitor CRT jadul). Tanpa *cursor glow* atau animasi *smooth* yang berlebihan.
- ⌨️ **Raw Typing Animation** — Animasi ketikan kaku di *hero section*.
- 🔄 **Auto-Sync GitHub Repositories** — Mengambil data repo langsung dari GitHub API dengan *Timeout* (5 detik) dan sistem *Cache* (1 jam).
- 🛡️ **Offline Fallback** — Jika API GitHub limit atau diblokir, website otomatis menampilkan data *snapshot* tanpa *error*.
- 🔒 **XSS Protection** — Semua data dari GitHub API disanitasi menggunakan fungsi `escapeHTML()` sebelum dimasukkan ke DOM.
- ♿ **Accessibility (a11y) First** — Kontras warna lolos standar WCAG, mendukung navigasi keyboard (`:focus-visible`), *Skip to Content link*, dan `prefers-reduced-motion`.
- 📱 **Fully Responsive** — Enak dilihat di HP (360px) maupun desktop.

## 🛠️ Tech Stack

- **HTML5** — Struktur semantik & Meta Tags (SEO/Open Graph).
- **CSS3** — Styling (Custom properties, Grid, Flexbox). Sudut tajam (tanpa `border-radius`).
- **Vanilla JavaScript** — Interaksi (Fetch API, AbortController, DOM Sanitization, localStorage).
- **GitHub Pages** — Hosting.

Tanpa framework, tanpa *build step*. Cuma 3 file (HTML, CSS, JS).
