# SSBT COET — Departmental System & Student Portal

Official student portal and departmental web application for the **Department of Computer Engineering, SSBT's College of Engineering & Technology, Bambhori, Jalgaon**.

> **Direct Web Clone of:** [`e:\CS DEPARTMENT PROJECT\departmental-system\ssbt-college-app`](../departmental-system/ssbt-college-app/)  
> **Tech Stack:** Vanilla HTML5, CSS3 Custom Properties (Design System Tokens), Modular ES6+ JavaScript, Jetpack Compose Material 3 Design Matching.

---

## 📱 1-Tap Android App Download

Get the official **SSBT College Android App** directly on your device:

👉 **[Download SSBT College App APK (Direct Root)](ssbt-college-app.apk)** · **[Download via apk/ folder](apk/ssbt-college-app.apk)**  
👉 **[Live Web Demo & Portal](https://piyushmali61.github.io/FIRST-DEMO-THEMEE-PROJECET/)**

- **Version**: 2.4.0 (Build 38)
- **Minimum Android**: Android 8.0 (API 26) or higher
- **Target Android**: Android 16 (API 36)
- **Tech Stack**: 100% Jetpack Compose, Material 3, Kotlin Coroutines, Navigation Compose

---

## 🌐 Web Application Portal Features

Open [`index.html`](index.html) or [`SSBT COET.html`](SSBT%20COET.html) directly in any modern browser:

### 1. 🚀 Startup Intro Animation (`SplashScreen.kt` Replica)
- **Orbit Stage (210px)**: Orbiting satellite on dashed circle with smooth 45° gradient flame trail.
- **Floating Squircle Tile (140px, r=34px)**: Vertical bobbing and celebratory pop animation on completion.
- **CapMark Vector Drawing**: Stroke-by-stroke SVG drawing of the graduation cap board, base, and tassel knot.
- **Dynamic Greeting**: Time-aware greeting (*Good Morning / Good Afternoon / Good Evening*) with pulsing gold dot.
- **5-Bar Progress Segments**: Step-by-step progress simulation (*Initializing* → *Fetching courses* → *Syncing timetable* → *Loading attendance* → *Updating results* → *Almost there* → *Ready*) with traveling sheen sweep and completion wave effect.
- **Skip & Replay**: Instant skip button and repeatable on-demand replay from the header or menu.

### 2. 🎨 10-Theme Dynamic Switcher (`ThemeSlider.kt` & `Color.kt`)
- Inline expandable slider strip below the header with live swatches:
  - **SSBT** (Light · Olive `#74762F`)
  - **Flame** (Light · Orange `#B8611F`)
  - **Brick** (Light · Red `#AE4625`)
  - **Ink** (Light · Deep Ink `#171717`)
  - **Night** (Dark · Olive Dark `#C4C66C`, Bg `#121211`)
  - **Ember** (Dark · Flame Dark `#E8955A`, Bg `#121211`)
  - **Sapphire** (Light · Ocean Blue `#2364A0`)
  - **Rose** (Light · Ruby Crimson `#C4214A`)
  - **Classic** (Light · Parchment Olive `#807E12`)
  - **Bronze** (Light · Deep Bronze `#5E532B`)
- **"Match device" mode**: Automatically synchronizes with system dark/light preferences.
- Theme choice persisted in `localStorage`.

### 3. 📊 Full Attendance Register Screen (`attendance.kt` Replica)
- **Student Excel Attributes Card**:
  - Live Register values: Roll No `42`, PRN `72112345H`, Div `A`, Batch `B2`.
  - Student: *Piyush Pradeep Mali*, *B.Tech Computer Engineering · Semester VI*.
- **Overall Attendance Hero Card**:
  - Animated SVG circular gauge showing **85.0% Present** (175 / 206 sessions).
  - Status pill: **CRITERIA MET** (Eligible for End-Sem Exam).
  - Calculated safety buffer: *Can safely miss up to 27 sessions*.
  - 4 Key Metrics: Conducted (206), Attended (175), Absent (31), Required (75% Univ. Norm).
- **Session Breakdown**:
  - Theory: 85.5% (159 / 186)
  - Practical: 93.3% (28 / 30)
- **Subject-wise Attendance with Filter Pills**:
  - Filters: `All (7)`, `Theory (5)`, `Practical (2)`, `Critical (<75%)`.
  - All 7 department subjects (CS601 Compiler Design, CS602 Data Science & AI, CS603 Software Engineering, CS604 Cloud Computing, CS605 Cyber Security, CS606L Web Tech Lab, CS607L AI Lab).
  - Dynamic safety margin formula (*"Can safely miss X classes"* / *"Must attend next Y classes"*).
- **Academic Regulations Card**: KBCNMU 75% attendance ordinance & medical leave rules.
- **Excel View Modal**: Full tabular spreadsheet grid with CSV export and printing support.

### 4. 🗂️ Interactive Modals & Slide-in Drawer (`MenuDrawer.kt`)
- **Slide-in Drawer**: Smooth slide from left with backdrop scrim, college emblem, Bambhori address, and shortcuts.
- **Notes Modal**: Lecture PDFs, units, and study material downloads.
- **Results Modal**: Semester-wise SGPA (Sem V: 8.78, Sem IV: 8.61, Sem III: 8.52) and CGPA 8.65 card.
- **Timetable Modal**: Weekly lecture timetable and lab sessions.
- **Syllabus Modal**: Unit-by-unit syllabus breakdown for Semester VI.
- **Faculty Directory Modal**: Computer Engineering department faculty contacts & emails.
- **Notifications Modal**: College circulars & alerts with badges.

---

## 🛠️ Opening the Android Project in Android Studio

1. Open **Android Studio**.
2. Select **Open an Existing Project**.
3. Choose the directory:
   ```
   e:\CS DEPARTMENT PROJECT\departmental-system\ssbt-college-app\android
   ```
4. Allow Gradle to sync dependencies automatically.
5. Select an emulator or device and run (`Shift + F10`).

To build from terminal:
```bash
cd "e:\CS DEPARTMENT PROJECT\departmental-system\ssbt-college-app\android"
./gradlew assembleDebug
```

---

## 📂 Repository Structure

```
├── .gitignore
├── .nojekyll
├── README.md
├── index.html                        # Master web application portal
├── SSBT COET.html                    # Mirror web portal
├── style.css                         # CSS design system (tokens, themes, animations)
├── app.js                            # Application logic & interactive state
├── ssbt_emblem.png                   # High-resolution college emblem
├── logo.png                          # College emblem asset
├── logo.jpg                          # College emblem asset
├── ssbt-college-app.apk              # Prebuilt Android APK (~13.6 MB)
└── apk/
    └── ssbt-college-app.apk
```