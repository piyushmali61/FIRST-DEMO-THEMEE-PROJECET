# 🎓 SSBT College Departmental System & Student Mobile Portal

> **Branch:** [`PIYUSH-UI-STUFF`](https://github.com/swarupsonar2006-gif/departmental-system/tree/PIYUSH-UI-STUFF) · **Maintainer:** Piyush Mali  
> **Repository:** [swarupsonar2006-gif/departmental-system](https://github.com/swarupsonar2006-gif/departmental-system)

---

## 📱 Mobile Quick Links (Tap to Open / Download)

Direct, working mobile links tested for Android phones and all mobile browsers:

| Action | One-Tap Mobile Direct Link | Description |
|:---|:---|:---|
| 🌐 **Live Web Portal** | **[👉 Open SSBT Mobile Web Portal (Live)](https://piyushmali61.github.io/FIRST-DEMO-THEMEE-PROJECET/)** | Interactive responsive portal with timetable, attendance, digital ID & 10 themes |
| 📥 **Direct APK Download** | **[👉 Download Android App APK (13.1 MB)](https://piyushmali61.github.io/FIRST-DEMO-THEMEE-PROJECET/apk/ssbt-college-app.apk)** | Direct 1-tap download (Works on any mobile browser without login) |
| ⚡ **GitHub CDN Mirror** | **[👉 Raw CDN Download Link](https://raw.githubusercontent.com/piyushmali61/FIRST-DEMO-THEMEE-PROJECET/main/apk/ssbt-college-app.apk)** | High-speed global GitHub raw content delivery mirror |
| 📦 **In-Repo File** | **[👉 Browse `apk/ssbt-college-app.apk`](apk/ssbt-college-app.apk)** | Binary package stored inside this repository branch |

---

## 📲 Easy 3-Step Phone Installation Guide

1. **Download:** Tap **[Download Android App APK](https://piyushmali61.github.io/FIRST-DEMO-THEMEE-PROJECET/apk/ssbt-college-app.apk)** on your phone.
2. **Chrome / Browser Prompt:** If your phone displays *"File might be harmful"* (standard Android warning for APKs outside Google Play), tap **"Download anyway"**.
3. **Allow & Install:** Open your phone's notification bar or `Downloads` folder, tap `ssbt-college-app.apk`. If prompted:
   - Tap **Settings** &rarr; toggle **ON** *"Allow from this source"* (Install unknown apps).
   - Go back and tap **Install**.
4. **Launch:** Tap **Open** to access SSBT College timetable, attendance, and student notices!

---

## 💻 Web Portal & UI System

This branch provides the complete, mobile-first responsive web portal for SSBT students and faculty, featuring an interactive intro animation, digital student ID, timetable, subject attendance, circulars, and a 10-theme color engine.

### 🌐 Live Demo & Web App Files
- **`index.html`** — Primary student portal interface with integrated mobile app download links and installation guide.
- **`SSBT COET.html`** — Enhanced theme edition.
- **`style.css`** & **`app.js`** — UI styling system and event handlers.
- **`logo.jpg`** — Official SSBT emblem asset.

### 🎨 10 Curated Theme Palettes (Sampled from Official SSBT Logo)
1. **SSBT (Default Light):** Olive Ring (`#74762F`) · Soft (`#F1F2E3`) · Ink (`#171717`)
2. **Flame (Vibrant Orange Light):** Flame Orange (`#B8611F`) · Soft (`#FBEFE4`)
3. **Brick (Deep Crimson Red Light):** Brick Red (`#AE4625`) · Soft (`#F8ECE7`)
4. **Ink (Charcoal Minimal Light):** Deep Ink (`#171717`) · Soft (`#F0F0EE`)
5. **Night (Olive & Gold Dark Mode):** Background (`#121211`) · Accent (`#C4C66C`) · Gold (`#D8C847`)
6. **Ember (Flame Dark Mode):** Background (`#121211`) · Accent (`#E8955A`) · Flame (`#E08A4E`)
7. **Sapphire & Amber:** Navy (`#063A5D`) · Ocean Blue (`#2364A0`) · Amber (`#FEB913`)
8. **Crimson Rose:** Ruby Crimson (`#C4214A`) · Blush Pink (`#FCEEF1`)
9. **College Classic:** Olive Gold (`#807E12`) · Parchment (`#F7F7C9`)
10. **Bronze & Sand:** Deep Bronze (`#5E532B`) · Warm Sand (`#EDE6D6`)

---

## 🛠️ Project Architecture

```
departmental-system/ (branch: PIYUSH-UI-STUFF)
├── apk/
│   └── ssbt-college-app.apk           # Compiled release Android application (13.1 MB)
├── index.html                         # Student Mobile Portal UI with APK download links
├── SSBT COET.html                     # Alternate portal template
├── style.css                          # Design tokens & styles
├── app.js                             # Client logic, theme engine & modals
├── logo.jpg                           # Official SSBT logo
├── ssbt-college-app/                  # Full-stack departmental application source
│   ├── android/                       # Kotlin + Jetpack Compose Android app
│   ├── api/                           # Node + TypeScript + Express + Prisma REST API
│   └── docs/                          # Architecture & developer guides
└── README.md                          # Project documentation
```

---

## 🔨 Building the Android App from Source

To build a fresh APK yourself using the Gradle wrapper:

```bash
cd ssbt-college-app/android
./gradlew assembleDebug
```

The compiled APK will be generated at:
`ssbt-college-app/android/app/build/outputs/apk/debug/app-debug.apk`

---

## 👥 Departmental System Team
- **Swarup Sonar** — Repository Owner & Architecture Lead
- **Piyush Mali** — UI / UX Design & Web Portal Engine (`PIYUSH-UI-STUFF`)
- **Pratik Khobragade** — Android Jetpack Compose Screens (`Pratik_workspace`)
- **Aayush Chaudhari** — Backend Services, APIs & Tests (`AAYUSH-WORK-BRANCH`)