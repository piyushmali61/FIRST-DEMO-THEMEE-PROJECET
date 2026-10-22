# SSBT COET — Departmental System & Student Portal

Official student portal and mobile application for the **Department of Computer Engineering, SSBT's College of Engineering & Technology, Bambhori, Jalgaon**.

---

## 📱 1-Tap Android App Download

Get the official **SSBT College Android App** directly on your device:

👉 **[Download SSBT College App APK (v2.4.0, ~13.6 MB)](apk/ssbt-college-app.apk)**

- **Version**: 2.4.0 (Build 38)
- **Minimum Android**: Android 8.0 (API 26) or higher
- **Target Android**: Android 16 (API 36)
- **Tech Stack**: 100% Jetpack Compose, Material 3, Kotlin Coroutines, Navigation Compose

---

## 🌐 Web Application Portal (Interactive Preview)

Open [`index.html`](index.html) or [`SSBT COET.html`](SSBT%20COET.html) directly in Google Chrome or any modern browser:

- **Startup Intro Animation (`SplashScreen.kt` Replica)**:
  - Orbiting satellite on dotted dashed ring with gradient flame trail.
  - Floating graduation cap tile with smooth stroke-by-stroke SVG drawing.
  - Real-time dynamic greeting (*Good Morning / Afternoon / Evening*).
  - 5-bar progress segments filling from *Initializing* to *Ready*.
  - Celebratory tile pop and fluid fade-in transition into the dashboard.
  - **"Replay intro"** button to restart the animation at any time.
- **Header & 10-Theme Inline Slider**:
  - SSBT emblem inside circular olive ring.
  - 6 Emblem Palettes: `SSBT`, `Flame`, `Brick`, `Ink`, `Night`, `Ember`.
  - 4 Academic Palettes: `Sapphire`, `Rose`, `Classic`, `Bronze`.
  - *Match device* system dark/light synchronization.
- **Slide-in Navigation Drawer (`MenuDrawer.kt`)**:
  - Quick links to Notes, Attendance, Results, Time Table, Syllabus, Faculty Contacts, Theme Switch, and APK Download.
- **Student Profile & Quick Access**:
  - Live academic statistics (Attendance 87.4%, CGPA 8.62, Backlogs 0).
  - Interactive modals for subject notes, lecture schedule, and exam results.

---

## 🛠️ Opening the Android Project in Android Studio

1. Launch **Android Studio**.
2. Select **Open an Existing Project**.
3. Choose the directory:
   ```
   ssbt-college-app/android
   ```
4. Allow Gradle to sync dependencies automatically.
5. Select an emulator or connected device and click **Run (Shift + F10)**.

To build the release/debug APK from the terminal:
```bash
cd ssbt-college-app/android
./gradlew assembleDebug
```
The compiled APK will be generated at:
```
ssbt-college-app/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📂 Repository Structure

```
├── .gitignore
├── README.md
├── apk/
│   └── ssbt-college-app.apk          # Prebuilt Android APK (~13.6 MB)
├── index.html                        # Web application portal
├── SSBT COET.html                    # Mirror web portal
├── logo.png                          # Transparent squircle/circular college emblem
├── logo.jpg                          # College emblem asset
└── ssbt-college-app/
    ├── README.md
    ├── android/                      # Native Android Jetpack Compose app
    │   ├── app/
    │   │   ├── build.gradle.kts
    │   │   └── src/main/java/edu/ssbt/collegeapp/
    │   │       ├── MainActivity.kt
    │   │       ├── core/design/      # Color.kt, Theme.kt, Type.kt, Motion.kt
    │   │       └── feature/
    │   │           ├── splash/       # SplashScreen.kt (Intro animation)
    │   │           └── home/         # HomeScreen.kt, MenuDrawer.kt, ThemeSlider.kt
    │   └── build.gradle.kts
    └── api/                          # Backend services (Node.js & Prisma)
```