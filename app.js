/**
 * SSBT COET — Departmental System & Student Portal
 * Complete JavaScript Engine powering the Web App Clone
 * Synced with: SplashScreen.kt · HomeScreen.kt · ThemeSlider.kt · attendance.kt · MenuDrawer.kt
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Data Store (SampleHome & SampleAttendanceData replica)
  // ---------------------------------------------------------------------------
  const studentData = {
    name: "Piyush Pradeep Mali",
    displayName: "Piyush Mali",
    initials: "PM",
    rollNo: "42",
    prn: "72112345H",
    branch: "B.Tech Computer Engineering",
    programme: "B.Tech Computer Engg · T.Y. (Sem VI)",
    semester: "Semester VI · Third Year",
    academicYear: "2025-26",
    division: "Division A",
    batch: "Batch B2",
    department: "Department of Computer Engineering",
    lastUpdated: "22 Oct 2026 (Live Register)",
    attendanceRate: 85.0,
    cgpa: "8.65",
    credits: "124"
  };

  const attendanceSubjects = [
    {
      code: "CS601",
      name: "Compiler Design",
      type: "Theory",
      typeShort: "TH",
      faculty: "Prof. M. V. Rawandale",
      conducted: 42,
      attended: 38
    },
    {
      code: "CS602",
      name: "Data Science & Artificial Intelligence",
      type: "Theory",
      typeShort: "TH",
      faculty: "Prof. S. R. Suralkar",
      conducted: 40,
      attended: 35
    },
    {
      code: "CS603",
      name: "Software Engineering & Project Mgmt",
      type: "Theory",
      typeShort: "TH",
      faculty: "Prof. A. T. Bhole",
      conducted: 38,
      attended: 33
    },
    {
      code: "CS604",
      name: "Cloud Computing & DevOps",
      type: "Theory",
      typeShort: "TH",
      faculty: "Prof. D. U. Adokar",
      conducted: 36,
      attended: 29
    },
    {
      code: "CS605",
      name: "Cyber Security & Information Assurance",
      type: "Theory",
      typeShort: "TH",
      faculty: "Prof. P. H. Zope",
      conducted: 34,
      attended: 24
    },
    {
      code: "CS606L",
      name: "Web Technology Laboratory",
      type: "Practical",
      typeShort: "PR",
      faculty: "Prof. N. K. Patil",
      conducted: 16,
      attended: 15
    },
    {
      code: "CS607L",
      name: "Data Science & AI Laboratory",
      type: "Practical",
      typeShort: "PR",
      faculty: "Prof. S. R. Suralkar",
      conducted: 14,
      attended: 13
    }
  ];

  const themesConfig = [
    { key: "ssbt", label: "SSBT", mode: "Light", isDark: false, bg: "#F7F7F5", surface: "#FFFFFF", accent: "#74762F", line: "#E8E8E3" },
    { key: "flame", label: "Flame", mode: "Light", isDark: false, bg: "#F7F7F5", surface: "#FFFFFF", accent: "#B8611F", line: "#E8E8E3" },
    { key: "brick", label: "Brick", mode: "Light", isDark: false, bg: "#F7F7F5", surface: "#FFFFFF", accent: "#AE4625", line: "#E8E8E3" },
    { key: "ink", label: "Ink", mode: "Light", isDark: false, bg: "#F7F7F5", surface: "#FFFFFF", accent: "#171717", line: "#E8E8E3" },
    { key: "night", label: "Night", mode: "Dark", isDark: true, bg: "#121211", surface: "#1B1B19", accent: "#C4C66C", line: "#2B2B28" },
    { key: "ember", label: "Ember", mode: "Dark", isDark: true, bg: "#121211", surface: "#1B1B19", accent: "#E8955A", line: "#2B2B28" },
    { key: "sapphire", label: "Sapphire", mode: "Light", isDark: false, bg: "#F4F6F9", surface: "#FFFFFF", accent: "#2364A0", line: "#DEE6EE" },
    { key: "rose", label: "Rose", mode: "Light", isDark: false, bg: "#FAF5F6", surface: "#FFFFFF", accent: "#C4214A", line: "#F1E2E5" },
    { key: "classic", label: "Classic", mode: "Light", isDark: false, bg: "#F7F7F5", surface: "#FFFFFF", accent: "#807E12", line: "#E8E8E3" },
    { key: "bronze", label: "Bronze", mode: "Light", isDark: false, bg: "#F7F7F5", surface: "#FFFFFF", accent: "#5E532B", line: "#E8E8E3" }
  ];

  // ---------------------------------------------------------------------------
  // 2. Greeting Helper (greetingForNow in Greeting.kt)
  // ---------------------------------------------------------------------------
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }

  function updateGreetings() {
    const greetingText = getGreeting().toUpperCase();
    const elemSplash = document.getElementById("splashGreetingText");
    const elemProfile = document.getElementById("profileGreetingText");
    if (elemSplash) elemSplash.textContent = greetingText;
    if (elemProfile) elemProfile.textContent = greetingText;
  }

  // ---------------------------------------------------------------------------
  // 3. Splash Screen Logic (rememberSplashProgress replica)
  // ---------------------------------------------------------------------------
  const splashSteps = [
    { threshold: 0, label: "INITIALIZING" },
    { threshold: 18, label: "FETCHING COURSES" },
    { threshold: 40, label: "SYNCING TIMETABLE" },
    { threshold: 62, label: "LOADING ATTENDANCE" },
    { threshold: 82, label: "UPDATING RESULTS" },
    { threshold: 96, label: "ALMOST THERE" },
    { threshold: 100, label: "READY" }
  ];

  let splashProgress = 0;
  let splashTimer = null;
  let splashDone = false;

  function runSplashProgress(onComplete) {
    splashProgress = 0;
    splashDone = false;
    const overlay = document.getElementById("splashOverlay");
    const content = document.getElementById("splashContent");
    const tile = document.getElementById("splashTile");
    const statusLbl = document.getElementById("splashStatusLabel");
    const percentLbl = document.getElementById("splashPercentLabel");
    const segments = [
      document.getElementById("splashSeg0"),
      document.getElementById("splashSeg1"),
      document.getElementById("splashSeg2"),
      document.getElementById("splashSeg3"),
      document.getElementById("splashSeg4")
    ];

    if (overlay) {
      overlay.classList.remove("hidden");
    }
    if (content) {
      content.classList.remove("complete");
    }
    if (tile) {
      tile.classList.remove("pop");
    }

    if (splashTimer) clearInterval(splashTimer);

    splashTimer = setInterval(() => {
      if (splashProgress < 100) {
        // Increment mimicking Random.nextFloat() * (100 - raw) * 0.12f
        const inc = Math.max(1.4, Math.random() * (100 - splashProgress) * 0.14);
        splashProgress = Math.min(100, splashProgress + inc);
        const intVal = Math.floor(splashProgress);

        if (percentLbl) percentLbl.textContent = `${intVal}%`;

        // Update status text
        let curStatus = "INITIALIZING";
        for (let i = splashSteps.length - 1; i >= 0; i--) {
          if (intVal >= splashSteps[i].threshold) {
            curStatus = splashSteps[i].label;
            break;
          }
        }
        if (statusLbl && statusLbl.textContent !== curStatus) {
          statusLbl.style.opacity = '0';
          setTimeout(() => {
            statusLbl.textContent = curStatus;
            statusLbl.style.opacity = '1';
          }, 120);
        }

        // Fill 5 segments
        segments.forEach((seg, idx) => {
          if (!seg) return;
          const fill = seg.querySelector(".splash-segment-fill");
          const local = Math.max(0, Math.min(1, (splashProgress - idx * 20) / 20));
          if (fill) fill.style.width = `${local * 100}%`;
          if (local > 0 && local < 1) {
            seg.classList.add("active");
          } else {
            seg.classList.remove("active");
          }
        });

      } else {
        clearInterval(splashTimer);
        splashTimer = null;
        if (percentLbl) percentLbl.textContent = "100%";
        if (statusLbl) statusLbl.textContent = "READY";
        if (content) content.classList.add("complete");
        if (tile) tile.classList.add("pop");

        // Wave effect across segments
        segments.forEach((seg, idx) => {
          if (!seg) return;
          seg.classList.remove("active");
          setTimeout(() => {
            seg.classList.add("wave-lift");
          }, idx * 60);
        });

        setTimeout(() => {
          finishSplash(onComplete);
        }, 950);
      }
    }, 110);
  }

  function finishSplash(callback) {
    if (splashDone) return;
    splashDone = true;
    if (splashTimer) clearInterval(splashTimer);
    const overlay = document.getElementById("splashOverlay");
    if (overlay) {
      overlay.classList.add("hidden");
    }
    if (typeof callback === "function") {
      callback();
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Multi-Theme Engine (Theme.kt & ThemeSlider.kt)
  // ---------------------------------------------------------------------------
  let currentThemeKey = localStorage.getItem("ssbt_theme_preference") || "ssbt";

  function applyTheme(themeKey, persist = true) {
    currentThemeKey = themeKey;
    if (themeKey === "device") {
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute("data-theme", isSystemDark ? "night" : "ssbt");
      if (persist) localStorage.removeItem("ssbt_theme_preference");
    } else {
      document.documentElement.setAttribute("data-theme", themeKey);
      if (persist) localStorage.setItem("ssbt_theme_preference", themeKey);
    }
    renderThemeChips();
  }

  function renderThemeChips() {
    const container = document.getElementById("themeChipsScroll");
    if (!container) return;
    container.innerHTML = "";

    const activeTheme = currentThemeKey === "device"
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "night" : "ssbt")
      : currentThemeKey;

    themesConfig.forEach(th => {
      const chip = document.createElement("div");
      chip.className = `theme-chip ${th.key === activeTheme ? 'selected' : ''}`;
      chip.setAttribute("data-key", th.key);

      chip.innerHTML = `
        <div class="theme-mini-swatch" style="background: ${th.bg};">
          <div class="theme-mini-row" style="background: ${th.surface};">
            <div class="theme-mini-dot" style="background: ${th.accent};"></div>
            <div class="theme-mini-bar" style="background: ${th.line};"></div>
          </div>
          <div class="theme-mini-sub-bar" style="background: ${th.accent};"></div>
        </div>
        <div class="theme-chip-label">${th.label}</div>
        <div class="theme-chip-mode">${th.mode}</div>
        ${th.key === activeTheme ? '<div class="theme-chip-check">✓</div>' : ''}
      `;

      chip.addEventListener("click", () => {
        applyTheme(th.key);
      });

      container.appendChild(chip);
    });
  }

  function toggleThemeSlider(open) {
    const strip = document.getElementById("themeSliderStrip");
    const btn = document.getElementById("headerThemeBtn");
    if (!strip) return;
    const isOpen = open !== undefined ? open : !strip.classList.contains("open");
    if (isOpen) {
      strip.classList.add("open");
      if (btn) btn.classList.add("active");
    } else {
      strip.classList.remove("open");
      if (btn) btn.classList.remove("active");
    }
  }

  // ---------------------------------------------------------------------------
  // 5. Navigation & Screen View Controller
  // ---------------------------------------------------------------------------
  function showScreen(screenId) {
    const homeView = document.getElementById("homeScreenView");
    const attendanceView = document.getElementById("attendanceScreenView");
    const otherTabsContainer = document.getElementById("otherTabsContainer");

    // Close any open drawer or slider
    toggleMenuDrawer(false);
    toggleThemeSlider(false);

    if (screenId === "attendance") {
      if (homeView) homeView.style.display = "none";
      if (otherTabsContainer) otherTabsContainer.classList.remove("active");
      if (attendanceView) {
        attendanceView.classList.add("active");
        attendanceView.scrollTop = 0;
      }
      window.location.hash = "attendance";
      updateNavIndicator(null); // not one of bottom 5
    } else {
      if (attendanceView) attendanceView.classList.remove("active");
      if (homeView) homeView.style.display = "flex";
      if (otherTabsContainer) otherTabsContainer.classList.remove("active");
      window.location.hash = "home";
      updateNavIndicator("home");
    }
  }

  function switchTab(tabKey) {
    const homeView = document.getElementById("homeScreenView");
    const attendanceView = document.getElementById("attendanceScreenView");
    const otherTabs = document.getElementById("otherTabsContainer");
    const tabTitle = document.getElementById("otherTabTitle");
    const tabBody = document.getElementById("otherTabBody");

    if (attendanceView) attendanceView.classList.remove("active");

    if (tabKey === "home") {
      if (homeView) homeView.style.display = "flex";
      if (otherTabs) otherTabs.classList.remove("active");
    } else if (tabKey === "profile") {
      // Direct shortcut to Attendance / Student Profile
      showScreen("attendance");
      return;
    } else {
      if (homeView) homeView.style.display = "none";
      if (otherTabs) {
        otherTabs.classList.add("active");
        renderTabContent(tabKey, tabTitle, tabBody);
      }
    }
    updateNavIndicator(tabKey);
  }

  function updateNavIndicator(tabKey) {
    const tabs = ["home", "courses", "events", "calendar", "profile"];
    const buttons = document.querySelectorAll(".nav-tab-btn");
    const indicator = document.getElementById("navIndicator");

    buttons.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabKey) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });

    if (!indicator || !tabKey) {
      if (indicator) indicator.style.display = "none";
      return;
    }

    indicator.style.display = "block";
    const index = tabs.indexOf(tabKey);
    if (index >= 0) {
      const widthPct = 100 / tabs.length;
      indicator.style.width = `22px`;
      indicator.style.left = `calc(${index * widthPct + widthPct / 2}% - 11px)`;
    }
  }

  function renderTabContent(tabKey, titleElem, bodyElem) {
    if (!titleElem || !bodyElem) return;

    if (tabKey === "courses") {
      titleElem.textContent = "Courses & Syllabus";
      bodyElem.innerHTML = `
        <div class="ssbt-card" style="padding: 18px;">
          <div class="eyebrow" style="margin-bottom: 6px;">DEPARTMENT OF COMPUTER ENGG</div>
          <div style="font-size: 16px; font-weight: 600; color: var(--ink);">Semester VI Course Modules</div>
          <p style="font-size: 12px; color: var(--muted); margin-top: 4px;">Curriculum affiliated with KBC North Maharashtra University, Jalgaon</p>
          <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 10px;">
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">CS601 · Compiler Design</div>
                <div class="modal-list-sub">Theory · 4 Credits · Prof. M. V. Rawandale</div>
              </div>
              <button class="modal-download-btn" onclick="window.appOpenModal('notesModal')">Syllabus</button>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">CS602 · Data Science & Artificial Intelligence</div>
                <div class="modal-list-sub">Theory · 4 Credits · Prof. S. R. Suralkar</div>
              </div>
              <button class="modal-download-btn" onclick="window.appOpenModal('notesModal')">Syllabus</button>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">CS603 · Software Engineering & Project Mgmt</div>
                <div class="modal-list-sub">Theory · 3 Credits · Prof. A. T. Bhole</div>
              </div>
              <button class="modal-download-btn" onclick="window.appOpenModal('notesModal')">Syllabus</button>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">CS606L · Web Technology Laboratory</div>
                <div class="modal-list-sub">Practical · 2 Credits · Prof. N. K. Patil</div>
              </div>
              <button class="modal-download-btn" onclick="window.appOpenModal('notesModal')">Lab Manual</button>
            </div>
          </div>
        </div>
      `;
    } else if (tabKey === "events") {
      titleElem.textContent = "Campus Events & Circulars";
      bodyElem.innerHTML = `
        <div class="ssbt-card" style="padding: 18px;">
          <div class="eyebrow" style="margin-bottom: 6px;">UPCOMING ACTIVITIES</div>
          <div style="font-size: 16px; font-weight: 600; color: var(--ink);">Technical & Cultural Calendar 2025-26</div>
          <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 10px;">
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">Technical Symposium 2026</div>
                <div class="modal-list-sub">22 Oct 2026 · Main Auditorium · 10:00 AM</div>
              </div>
              <span class="pill-badge">Registered</span>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">Mid-Semester Examinations</div>
                <div class="modal-list-sub">28 Oct - 04 Nov 2026 · Academic Complex</div>
              </div>
              <span class="pill-badge" style="background: var(--red-soft); color: var(--red);">Exam</span>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">Annual Cultural Gathering "Milestone"</div>
                <div class="modal-list-sub">12-14 Nov 2026 · Open Air Theatre</div>
              </div>
              <span class="pill-badge">Upcoming</span>
            </div>
          </div>
        </div>
      `;
    } else if (tabKey === "calendar") {
      titleElem.textContent = "Academic Schedule";
      bodyElem.innerHTML = `
        <div class="ssbt-card" style="padding: 18px;">
          <div class="eyebrow" style="margin-bottom: 6px;">TERM SCHEDULE · 2025-26</div>
          <div style="font-size: 16px; font-weight: 600; color: var(--ink);">Even Semester Milestones</div>
          <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 10px;">
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">Commencement of Classes</div>
                <div class="modal-list-sub">Term II commenced on 05 January 2026</div>
              </div>
              <span class="pill-badge">Done</span>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">First Attendance Review & Defaulters List</div>
                <div class="modal-list-sub">Compiled on 22 October 2026</div>
              </div>
              <span class="pill-badge">Active</span>
            </div>
            <div class="modal-list-item">
              <div>
                <div class="modal-list-title">Submission & End-Semester Examinations</div>
                <div class="modal-list-sub">Tentative start: 15 December 2026</div>
              </div>
              <span class="pill-badge">Scheduled</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  // ---------------------------------------------------------------------------
  // 6. Slide-in Navigation Drawer (MenuDrawer.kt)
  // ---------------------------------------------------------------------------
  function toggleMenuDrawer(open) {
    const backdrop = document.getElementById("drawerBackdrop");
    if (!backdrop) return;
    const isOpen = open !== undefined ? open : !backdrop.classList.contains("open");
    if (isOpen) {
      backdrop.classList.add("open");
    } else {
      backdrop.classList.remove("open");
    }
  }

  // ---------------------------------------------------------------------------
  // 7. Modals Manager
  // ---------------------------------------------------------------------------
  function openModal(modalId) {
    const overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.classList.add("open");
    }
  }

  function closeModal(modalId) {
    if (modalId) {
      const overlay = document.getElementById(modalId);
      if (overlay) overlay.classList.remove("open");
    } else {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
    }
  }

  // Export functions globally so inline HTML onclick handlers can trigger them
  window.appOpenModal = openModal;
  window.appCloseModal = closeModal;
  window.appShowScreen = showScreen;

  // ---------------------------------------------------------------------------
  // 8. Attendance Register Rendering & Excel Export
  // ---------------------------------------------------------------------------
  let currentSubjectFilter = "all";

  function renderAttendanceCards(filter = "all") {
    currentSubjectFilter = filter;
    const container = document.getElementById("subjectCardsContainer");
    if (!container) return;
    container.innerHTML = "";

    let list = attendanceSubjects;
    if (filter === "theory") list = attendanceSubjects.filter(s => s.type === "Theory");
    if (filter === "practical") list = attendanceSubjects.filter(s => s.type === "Practical");
    if (filter === "critical") list = attendanceSubjects.filter(s => (s.attended / s.conducted * 100) < 75);

    list.forEach(sub => {
      const pct = (sub.attended / sub.conducted * 100).toFixed(1);
      const isCritical = pct < 75;

      // Calculate margin info matching attendance.kt
      let marginText = "";
      if (pct >= 75) {
        const canMiss = Math.floor((sub.attended / 0.75) - sub.conducted);
        marginText = canMiss > 0 ? `Can safely miss ${canMiss} class${canMiss > 1 ? 'es' : ''}` : "On the 75% boundary threshold";
      } else {
        const needed = Math.ceil((0.75 * sub.conducted - sub.attended) / 0.25);
        marginText = `Must attend next ${needed} class${needed > 1 ? 'es' : ''} to reach 75%`;
      }

      const card = document.createElement("div");
      card.className = "ssbt-card subject-card";
      card.innerHTML = `
        <div class="subject-top-row">
          <div class="subject-code-type">
            <span class="subject-code">${sub.code}</span>
            <span class="subject-type-badge">${sub.type}</span>
          </div>
          <div class="subject-percent-badge ${isCritical ? 'critical' : ''}">${pct}%</div>
        </div>
        <div class="subject-name">${sub.name}</div>
        <div class="subject-faculty">${sub.faculty}</div>
        
        <div class="bar-track" style="margin-top: 4px;">
          <div class="bar-fill ${isCritical ? 'gold' : ''}" style="width: ${pct}%; ${isCritical ? 'background: var(--red);' : ''}"></div>
        </div>

        <div class="subject-counts-row">
          <span>Attended: <strong>${sub.attended}</strong> / ${sub.conducted} sessions</span>
          <span style="color: ${isCritical ? 'var(--red)' : 'var(--olive)'}; font-weight: 600;">
            ${isCritical ? 'Shortage (<75%)' : 'On Track'}
          </span>
        </div>

        <div class="subject-margin-pill ${isCritical ? 'critical' : ''}">
          ${marginText}
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderExcelTable() {
    const tbody = document.getElementById("excelTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    attendanceSubjects.forEach((sub, idx) => {
      const pct = (sub.attended / sub.conducted * 100).toFixed(1);
      const status = pct >= 75 ? "Regular" : "Defaulter";
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${sub.code}</strong></td>
        <td>${sub.name}</td>
        <td>${sub.type}</td>
        <td>${sub.faculty}</td>
        <td>${sub.conducted}</td>
        <td>${sub.attended}</td>
        <td>${sub.conducted - sub.attended}</td>
        <td><strong>${pct}%</strong></td>
        <td style="color: ${pct >= 75 ? 'var(--olive)' : 'var(--red)'}; font-weight: 600;">${status}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function downloadCSV() {
    let csv = "Sr No,Subject Code,Subject Name,Type,Faculty,Conducted,Attended,Absent,Percentage,Status\n";
    attendanceSubjects.forEach((sub, idx) => {
      const pct = (sub.attended / sub.conducted * 100).toFixed(1);
      const status = pct >= 75 ? "Regular" : "Defaulter";
      csv += `"${idx + 1}","${sub.code}","${sub.name}","${sub.type}","${sub.faculty}",${sub.conducted},${sub.attended},${sub.conducted - sub.attended},"${pct}%","${status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `SSBT_COET_Attendance_Register_${studentData.rollNo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ---------------------------------------------------------------------------
  // 9. Event Listeners Initialization
  // ---------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    updateGreetings();
    applyTheme(currentThemeKey, false);

    // Initial Progress run
    runSplashProgress();

    // Skip Intro
    const skipBtn = document.getElementById("splashSkipBtn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => finishSplash());
    }

    // Replay Intro Buttons
    const replayButtons = document.querySelectorAll(".replay-splash-trigger");
    replayButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        toggleMenuDrawer(false);
        runSplashProgress();
      });
    });

    // Theme Slider Toggle Button
    const headerThemeBtn = document.getElementById("headerThemeBtn");
    if (headerThemeBtn) {
      headerThemeBtn.addEventListener("click", () => toggleThemeSlider());
    }

    // Match Device Button in Theme Slider
    const matchDeviceBtn = document.getElementById("matchDeviceBtn");
    if (matchDeviceBtn) {
      matchDeviceBtn.addEventListener("click", () => applyTheme("device"));
    }

    // Drawer Toggle
    const menuBtn = document.getElementById("headerMenuBtn");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => toggleMenuDrawer(true));
    }
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", (e) => {
        if (e.target === drawerBackdrop) toggleMenuDrawer(false);
      });
    }

    // Notifications Button
    const notifBtn = document.getElementById("headerNotifBtn");
    if (notifBtn) {
      notifBtn.addEventListener("click", () => openModal("notifModal"));
    }

    // Bottom Navigation Buttons
    const navButtons = document.querySelectorAll(".nav-tab-btn");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        switchTab(tab);
      });
    });

    // Quick Access Grid Action Clicks
    const tileAttendance = document.getElementById("tileAttendance");
    if (tileAttendance) {
      tileAttendance.addEventListener("click", () => showScreen("attendance"));
    }
    const tileNotes = document.getElementById("tileNotes");
    if (tileNotes) {
      tileNotes.addEventListener("click", () => openModal("notesModal"));
    }
    const tileResults = document.getElementById("tileResults");
    if (tileResults) {
      tileResults.addEventListener("click", () => openModal("resultsModal"));
    }
    const tileTimetable = document.getElementById("tileTimetable");
    if (tileTimetable) {
      tileTimetable.addEventListener("click", () => openModal("timetableModal"));
    }
    const tileSyllabus = document.getElementById("tileSyllabus");
    if (tileSyllabus) {
      tileSyllabus.addEventListener("click", () => openModal("syllabusModal"));
    }
    const tileFaculty = document.getElementById("tileFaculty");
    if (tileFaculty) {
      tileFaculty.addEventListener("click", () => openModal("facultyModal"));
    }

    // Attendance Screen Back Button
    const attendanceBackBtn = document.getElementById("attendanceBackBtn");
    if (attendanceBackBtn) {
      attendanceBackBtn.addEventListener("click", () => showScreen("home"));
    }

    // Attendance Filter Pills
    const filterButtons = document.querySelectorAll(".filter-pill-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        renderAttendanceCards(filter);
      });
    });

    // Excel View Modal Button
    const excelViewBtn = document.getElementById("excelViewBtn");
    if (excelViewBtn) {
      excelViewBtn.addEventListener("click", () => {
        renderExcelTable();
        openModal("excelModal");
      });
    }

    // Download CSV Button
    const downloadCsvBtn = document.getElementById("downloadCsvBtn");
    if (downloadCsvBtn) {
      downloadCsvBtn.addEventListener("click", downloadCSV);
    }

    // Close Modals on Scrim Click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("open");
      });
    });

    // Desktop Layout Toggle (Wide vs Phone)
    const toggleLayoutBtn = document.getElementById("toggleLayoutBtn");
    if (toggleLayoutBtn) {
      toggleLayoutBtn.addEventListener("click", () => {
        document.body.classList.toggle("wide-mode");
        const isWide = document.body.classList.contains("wide-mode");
        toggleLayoutBtn.innerHTML = isWide
          ? `<span>📱</span><span>Phone Frame</span>`
          : `<span>💻</span><span>Wide View</span>`;
      });
    }

    // Render initial attendance cards
    renderAttendanceCards();

    // Check URL hash for direct links (e.g. #attendance)
    if (window.location.hash === "#attendance") {
      showScreen("attendance");
    }
  });

})();
