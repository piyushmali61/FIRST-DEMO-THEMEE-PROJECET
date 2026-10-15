// ============================================
// SSBT College Mobile App - Interactive Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. Status Bar Clock ----
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const mins = now.getMinutes().toString().padStart(2, '0');
        const timeEl = document.getElementById('statusTime');
        if (timeEl) timeEl.textContent = `${hours}:${mins}`;
    }
    updateTime();
    setInterval(updateTime, 30000);

    // ---- 2. Dynamic Greeting ----
    function setGreeting() {
        const hour = new Date().getHours();
        const greetEl = document.getElementById('greeting');
        if (greetEl) {
            if (hour < 12) {
                greetEl.textContent = 'Good Morning';
            } else if (hour < 17) {
                greetEl.textContent = 'Good Afternoon';
            } else {
                greetEl.textContent = 'Good Evening';
            }
        }
    }
    setGreeting();

    // ---- 3. Side Menu Drawer ----
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuBtn.classList.add('active');
    }

    function closeMenu() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuBtn.classList.remove('active');
    }

    menuBtn.addEventListener('click', () => {
        if (sideMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay.addEventListener('click', closeMenu);

    // Side menu item navigation
    document.querySelectorAll('.side-menu-list li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.side-menu-list li').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetNav = item.dataset.nav;
            const targetAction = item.dataset.action;

            if (targetNav) {
                switchTab(targetNav);
            } else if (targetAction) {
                handleQuickAction('modal-' + targetAction);
            }

            setTimeout(closeMenu, 250);
        });
    });

    // ---- 4. Notification Panel ----
    const notifBtn = document.getElementById('notifBtn');
    const notifPanel = document.getElementById('notifPanel');
    const notifClose = document.getElementById('notifClose');

    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel.classList.toggle('active');
    });

    notifClose.addEventListener('click', () => {
        notifPanel.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
            notifPanel.classList.remove('active');
        }
    });

    document.querySelectorAll('.notif-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('unread');
            const dot = item.querySelector('.notif-dot');
            if (dot) dot.style.display = 'none';
            updateNotifBadge();
        });
    });

    function updateNotifBadge() {
        const unreadCount = document.querySelectorAll('.notif-item.unread').length;
        const badge = document.querySelector('.notif-badge');
        if (badge) {
            if (unreadCount === 0) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'flex';
                badge.textContent = unreadCount;
            }
        }
    }

    // ---- 5. Multi-View Tab Navigation (6 Tabs) ----
    const navItems = document.querySelectorAll('.nav-item');
    const views = {
        home: document.getElementById('viewHome'),
        courses: document.getElementById('viewCourses'),
        events: document.getElementById('viewEvents'),
        calendar: document.getElementById('viewCalendar'),
        profile: document.getElementById('viewProfile'),
        help: document.getElementById('viewHelp')
    };

    function switchTab(tabName) {
        // Update bottom nav
        navItems.forEach(item => {
            if (item.dataset.tab === tabName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update side menu
        document.querySelectorAll('.side-menu-list li').forEach(item => {
            if (item.dataset.nav === tabName) {
                item.classList.add('active');
            } else if (item.dataset.nav) {
                item.classList.remove('active');
            }
        });

        // Switch views
        Object.keys(views).forEach(key => {
            if (views[key]) {
                if (key === tabName) {
                    views[key].classList.add('active');
                } else {
                    views[key].classList.remove('active');
                }
            }
        });

        // Scroll top smoothly
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const tab = item.dataset.tab;
            createRipple(item, e);
            switchTab(tab);
        });
    });

    // See all events button on Home
    const seeAllEventsBtn = document.getElementById('seeAllEventsBtn');
    if (seeAllEventsBtn) {
        seeAllEventsBtn.addEventListener('click', () => switchTab('events'));
    }

    // Avatar click on welcome card opens Profile
    const welcomeAvatarBtn = document.getElementById('welcomeAvatarBtn');
    if (welcomeAvatarBtn) {
        welcomeAvatarBtn.addEventListener('click', () => switchTab('profile'));
    }

    // App bar title area click takes back to Home
    const appBarTitleArea = document.getElementById('appBarTitleArea');
    if (appBarTitleArea) {
        appBarTitleArea.addEventListener('click', () => switchTab('home'));
        appBarTitleArea.style.cursor = 'pointer';
    }

    // ---- 6. Events Category Filter Chips ----
    const filterChips = document.querySelectorAll('.filter-chips .chip');
    const eventCardsLg = document.querySelectorAll('.event-card-lg');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;
            eventCardsLg.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---- 7. Quick Access Modal Sheets ----
    const modalOverlay = document.getElementById('quickModalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    const modalData = {
        'modal-attendance': {
            title: 'Subject Attendance Details',
            html: `
                <p style="margin-bottom: 12px; color: var(--gold); font-weight: 600;">Overall Aggregate: 85.2% (Criteria: 75% Min)</p>
                <table class="modal-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Held</th>
                            <th>Attended</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>CS-601 Data Structures</td><td>40</td><td>36</td><td><strong style="color: #27ae60;">90%</strong></td></tr>
                        <tr><td>CS-602 Operating Systems</td><td>38</td><td>30</td><td><strong style="color: #27ae60;">79%</strong></td></tr>
                        <tr><td>CS-603 DBMS</td><td>36</td><td>33</td><td><strong style="color: #27ae60;">92%</strong></td></tr>
                        <tr><td>CS-604 Networks & Security</td><td>40</td><td>32</td><td><strong style="color: #27ae60;">80%</strong></td></tr>
                        <tr><td>CS-605 AI & Machine Learning</td><td>40</td><td>34</td><td><strong style="color: #27ae60;">85%</strong></td></tr>
                    </tbody>
                </table>
                <div style="margin-top: 14px; text-align: center;">
                    <button class="btn-block-terracotta" onclick="showToast('Attendance report exported to PDF!')">Export Attendance Report</button>
                </div>
            `
        },
        'modal-timetable': {
            title: 'Weekly Lecture Schedule',
            html: `
                <p style="margin-bottom: 10px; font-weight: 600; color: var(--olive-dark);">Classroom: CS Block Room 301</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">09:00 AM - 10:00 AM</strong>
                        <p style="font-size: 0.72rem; color: var(--text-secondary);">Advanced Data Structures & Algorithms • Prof. Sharma</p>
                    </div>
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">10:15 AM - 11:15 AM</strong>
                        <p style="font-size: 0.72rem; color: var(--text-secondary);">Operating Systems • Prof. Patel (Room 205)</p>
                    </div>
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">11:30 AM - 12:30 PM</strong>
                        <p style="font-size: 0.72rem; color: var(--text-secondary);">Computer Networks & Security • Prof. Deshmukh</p>
                    </div>
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">02:00 PM - 04:00 PM</strong>
                        <p style="font-size: 0.72rem; color: var(--text-secondary);">DBMS Hands-on Practical Lab • CS Lab 304</p>
                    </div>
                </div>
                <button class="btn-block-terracotta" style="margin-top: 14px;" onclick="showToast('Class timetable saved to device!')">Download Timetable PDF</button>
            `
        },
        'modal-results': {
            title: 'Semester Grade Sheet',
            html: `
                <div style="background: rgba(254,146,55,0.08); padding: 12px; border-radius: 10px; margin-bottom: 12px; display: flex; justify-content: space-around;">
                    <div><span style="font-size: 0.65rem; color: var(--text-muted);">SEMESTER V SGPA</span><br><strong style="font-size: 1.2rem; color: var(--gold);">8.80</strong></div>
                    <div><span style="font-size: 0.65rem; color: var(--text-muted);">OVERALL CGPA</span><br><strong style="font-size: 1.2rem; color: var(--olive-dark);">8.65</strong></div>
                    <div><span style="font-size: 0.65rem; color: var(--text-muted);">STATUS</span><br><strong style="font-size: 0.9rem; color: #27ae60;">Distinction</strong></div>
                </div>
                <table class="modal-table">
                    <thead>
                        <tr><th>Subject</th><th>Credits</th><th>Grade</th><th>Points</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Theory of Computation</td><td>4</td><td>O</td><td>10</td></tr>
                        <tr><td>Database Management</td><td>4</td><td>A+</td><td>9</td></tr>
                        <tr><td>Computer Networks</td><td>4</td><td>A</td><td>8</td></tr>
                        <tr><td>Software Engineering</td><td>3</td><td>A+</td><td>9</td></tr>
                        <tr><td>DBMS Lab & Mini Project</td><td>2</td><td>O</td><td>10</td></tr>
                    </tbody>
                </table>
                <button class="btn-block-terracotta" style="margin-top: 14px;" onclick="showToast('Official Grade Card downloaded!')">Download Official Grade Card</button>
            `
        },
        'modal-fees': {
            title: 'College Fee Summary',
            html: `
                <div style="background: #f4f8fa; padding: 14px; border-radius: 12px; border: 1px solid rgba(254,146,55,0.15); margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span>Tuition & Development Fee:</span>
                        <strong style="color: #27ae60;">₹81,000 (Paid)</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span>Gymkhana & Library Deposit:</span>
                        <strong style="color: #27ae60;">₹2,500 (Paid)</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span>Winter Exam & Viva Fee:</span>
                        <strong style="color: #e74c3c;">₹2,500 (Due Oct 30)</strong>
                    </div>
                    <hr style="border: none; border-top: 1px dashed rgba(254,146,55,0.2); margin: 8px 0;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                        <strong>Total Outstanding Due:</strong>
                        <strong style="color: var(--gold); font-size: 1rem;">₹2,500</strong>
                    </div>
                </div>
                <button class="btn-block-terracotta" onclick="showToast('Redirecting to SBI Collect Payment Gateway...')">Pay Pending Fees Online</button>
            `
        },
        'modal-library': {
            title: 'Central Library Account',
            html: `
                <p style="margin-bottom: 10px; color: var(--gold); font-weight: 600;">Library Card: SSBT-LIB-2022-42</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="padding: 10px; background: #ffffff; border: 1px solid rgba(254,146,55,0.15); border-radius: 8px;">
                        <strong style="color: var(--olive-dark);">1. Operating System Concepts (Silberschatz)</strong>
                        <p style="font-size: 0.7rem; color: var(--text-secondary); margin: 2px 0 4px;">Acc No: CS-8841 • Issued on: 01 Oct 2026</p>
                        <span style="font-size: 0.65rem; color: #FE9237; font-weight: 700;">Due in 4 days (19 Oct 2026)</span>
                        <button class="btn-outline-sm" style="float: right; padding: 2px 8px; font-size: 0.65rem;" onclick="showToast('Book renewed for 14 days!')">Renew</button>
                    </div>
                    <div style="padding: 10px; background: #ffffff; border: 1px solid rgba(254,146,55,0.15); border-radius: 8px;">
                        <strong style="color: var(--olive-dark);">2. Introduction to Algorithms (CLRS)</strong>
                        <p style="font-size: 0.7rem; color: var(--text-secondary); margin: 2px 0 4px;">Acc No: CS-9402 • Issued on: 08 Oct 2026</p>
                        <span style="font-size: 0.65rem; color: #27ae60; font-weight: 700;">Due in 11 days (26 Oct 2026)</span>
                        <button class="btn-outline-sm" style="float: right; padding: 2px 8px; font-size: 0.65rem;" onclick="showToast('Book renewed for 14 days!')">Renew</button>
                    </div>
                </div>
                <button class="btn-block-terracotta" style="margin-top: 14px;" onclick="showToast('Opening Web-OPAC Book Search...')">Search Library Catalog</button>
            `
        },
        'modal-notices': {
            title: 'Campus Circulars & Notices',
            html: `
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">Winter 2026 Examination Form Submission</strong>
                        <p style="font-size: 0.7rem; color: var(--text-secondary);">Last date to verify subject codes and submit exam forms online is Oct 25, 2026.</p>
                        <button class="btn-outline-sm" style="margin-top: 4px; padding: 2px 8px; font-size: 0.65rem;" onclick="showToast('Exam circular downloaded')">Download Circular</button>
                    </div>
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">Campus Placement Drive - TCS Ninja & Digital</strong>
                        <p style="font-size: 0.7rem; color: var(--text-secondary);">Eligible B.Tech final and pre-final students register on T&P cell portal before Oct 22.</p>
                        <button class="btn-outline-sm" style="margin-top: 4px; padding: 2px 8px; font-size: 0.65rem;" onclick="showToast('Placement guidelines downloaded')">View Eligibility</button>
                    </div>
                    <div style="padding: 10px; background: #f4f8fa; border-radius: 8px; border-left: 3px solid var(--gold);">
                        <strong style="color: var(--olive-dark);">Hostel Gate Timing & Mess Schedule</strong>
                        <p style="font-size: 0.7rem; color: var(--text-secondary);">Revised winter entry timings effective from Nov 01, 2026.</p>
                        <button class="btn-outline-sm" style="margin-top: 4px; padding: 2px 8px; font-size: 0.65rem;" onclick="showToast('Hostel circular downloaded')">Download PDF</button>
                    </div>
                </div>
            `
        },
        'modal-admissions': {
            title: 'SSBT Admissions 2026-27',
            html: `
                <p style="margin-bottom: 12px; line-height: 1.4;">Admissions for First Year B.Tech, Direct Second Year (DSE), M.Tech, and MBA programmes are open via Centralized Admission Process (CAP).</p>
                <div style="background: rgba(254,146,55,0.1); padding: 12px; border-radius: 8px; margin-bottom: 14px;">
                    <p style="font-size: 0.72rem; color: var(--olive-dark);"><strong>DTE College Code:</strong> 5104</p>
                    <p style="font-size: 0.72rem; color: var(--olive-dark);"><strong>Admission Office:</strong> +91 257 2258391 / 92</p>
                </div>
                <button class="btn-block-terracotta" onclick="showToast('Admission prospectus downloaded!')">Download Prospectus 2026-27</button>
            `
        },
        'modal-settings': {
            title: 'App Settings',
            html: `
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(254,146,55,0.1);">
                        <span>Push Notifications</span>
                        <input type="checkbox" checked style="accent-color: var(--gold);">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(254,146,55,0.1);">
                        <span>Offline Mode Cache</span>
                        <input type="checkbox" checked style="accent-color: var(--gold);">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(254,146,55,0.1);">
                        <span>Biometric Fingerprint Login</span>
                        <input type="checkbox" checked style="accent-color: var(--gold);">
                    </div>
                </div>
                <button class="btn-block-terracotta" style="margin-top: 16px;" onclick="showToast('Settings saved successfully!'); closeModal();">Save Preferences</button>
            `
        },
        'modal-logout': {
            title: 'Sign Out',
            html: `
                <p style="margin-bottom: 16px; text-align: center;">Are you sure you want to log out of SSBT Student Portal?</p>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-outline-sm" style="flex: 1; text-align: center;" onclick="closeModal()">Cancel</button>
                    <button class="btn-solid-sm" style="flex: 1; background: #e74c3c; border-color: #e74c3c;" onclick="showToast('Logged out successfully'); closeModal();">Log Out</button>
                </div>
            `
        }
    };

    function openModal(actionKey) {
        const data = modalData[actionKey];
        if (data && modalTitle && modalBody && modalOverlay) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = data.html;
            modalOverlay.classList.add('active');
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    window.closeModal = closeModal;

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    function handleQuickAction(action) {
        if (modalData[action]) {
            openModal(action);
        } else {
            showToast(`Opening ${action.replace('modal-', '')}...`);
        }
    }

    // Dashboard card clicks
    document.querySelectorAll('.dash-card').forEach(card => {
        card.addEventListener('click', function(e) {
            createRipple(this, e);
            const action = this.dataset.action;
            if (action) {
                handleQuickAction(action);
            }
        });
    });

    // Welcome stat item clicks
    const statAttendance = document.getElementById('statAttendance');
    if (statAttendance) statAttendance.addEventListener('click', () => openModal('modal-attendance'));

    const statGpa = document.getElementById('statGpa');
    if (statGpa) statGpa.addEventListener('click', () => openModal('modal-results'));

    const statCredits = document.getElementById('statCredits');
    if (statCredits) statCredits.addEventListener('click', () => openModal('modal-results'));

    // ---- 8. Toast Notification Utility ----
    const toastBubble = document.getElementById('toastBubble');
    let toastTimeout;

    function showToast(message) {
        if (!toastBubble) return;
        toastBubble.textContent = message;
        toastBubble.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastBubble.classList.remove('show');
        }, 2600);
    }
    window.showToast = showToast;

    // Generic button toast bindings (e.g. data-toast)
    document.addEventListener('click', (e) => {
        const toastBtn = e.target.closest('[data-toast]');
        if (toastBtn) {
            const msg = toastBtn.getAttribute('data-toast');
            showToast(msg);
        }

        // Tap to copy helpline
        const copyCard = e.target.closest('[data-copy]');
        if (copyCard) {
            const textToCopy = copyCard.getAttribute('data-copy');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy);
            }
            showToast(`Copied to clipboard: ${textToCopy}`);
        }
    });

    // Support Form submit
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cat = document.getElementById('ticketCategory').value;
            const ticketId = 'TCK-' + Math.floor(100000 + Math.random() * 900000);
            showToast(`Ticket #${ticketId} submitted for ${cat}!`);
            supportForm.reset();
        });
    }

    // ---- 9. Touch Ripple Effect ----
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // ---- 10. Multi-Theme Switcher (Default vs College vs Crimson Rose) ----
    const themeMetadata = {
        default: {
            name: 'Navy & Amber',
            currentIcon: '🎨',
            toast: '🎨 Switched to Default Theme (Navy & Amber)!'
        },
        college: {
            name: 'College Theme',
            currentIcon: '🏛️',
            toast: '🏛️ Switched to College Theme (Olive & Gold)!'
        },
        rose: {
            name: 'Crimson Rose',
            currentIcon: '🌹',
            toast: '🌹 Switched to Crimson Rose Theme (Ruby & Blush)!'
        },
        dark: {
            name: 'Dark Mode',
            currentIcon: '🌙',
            toast: '🌙 Switched to Dark Mode (Obsidian & Gold)!'
        }
    };

    const themeCycle = ['default', 'college', 'rose', 'dark'];

    function applyTheme(themeName, showFeedback = false) {
        if (!themeMetadata[themeName]) themeName = 'default';

        document.documentElement.setAttribute('data-theme', themeName);
        document.body.setAttribute('data-theme', themeName);
        
        const frame = document.querySelector('.mobile-frame');
        if (frame) frame.setAttribute('data-theme', themeName);

        document.body.classList.remove('theme-college', 'theme-rose', 'theme-dark');
        if (themeName === 'college') {
            document.body.classList.add('theme-college');
        } else if (themeName === 'rose') {
            document.body.classList.add('theme-rose');
        } else if (themeName === 'dark') {
            document.body.classList.add('theme-dark');
        }

        try {
            localStorage.setItem('ssbt_app_theme', themeName);
        } catch (err) {
            console.warn('Storage not accessible', err);
        }

        // Synchronize all theme toggle buttons
        document.querySelectorAll('[data-theme-val]').forEach(btn => {
            if (btn.getAttribute('data-theme-val') === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Quick toggle icon in header
        const quickBtn = document.getElementById('themeSwitchQuickBtn');
        if (quickBtn) {
            const currentMeta = themeMetadata[themeName];
            const currentIndex = themeCycle.indexOf(themeName);
            const nextIndex = (currentIndex + 1) % themeCycle.length;
            const nextTheme = themeCycle[nextIndex];
            const nextMeta = themeMetadata[nextTheme];

            quickBtn.innerHTML = currentMeta.currentIcon;
            quickBtn.setAttribute('title', `Current: ${currentMeta.name} (Click for ${nextMeta.name})`);
        }

        if (showFeedback && themeMetadata[themeName]) {
            showToast(themeMetadata[themeName].toast);
        }
    }

    // Expose globally
    window.setAppTheme = applyTheme;

    // Load initial persisted theme
    const savedTheme = (function() {
        try {
            return localStorage.getItem('ssbt_app_theme') || 'default';
        } catch(e) {
            return 'default';
        }
    })();
    applyTheme(savedTheme, false);

    // Event listeners for theme buttons (Side menu & Profile)
    document.addEventListener('click', (e) => {
        const themeBtn = e.target.closest('[data-theme-val]');
        if (themeBtn) {
            const val = themeBtn.getAttribute('data-theme-val');
            applyTheme(val, true);
        }
    });

    // Quick toggle button in header
    const quickThemeBtn = document.getElementById('themeSwitchQuickBtn');
    if (quickThemeBtn) {
        quickThemeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
            const currentIndex = themeCycle.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themeCycle.length;
            applyTheme(themeCycle[nextIndex], true);
        });
    }

    // Escape key closes modals and drawers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            if (notifPanel) notifPanel.classList.remove('active');
            closeModal();
        }
    });

    console.log('%c🎓 SSBT College App Ready with Multi-Theme Engine (Default + College Theme)!', 
        'color: #A19E17; font-size: 14px; font-weight: bold; background: #313007; padding: 8px 16px; border-radius: 8px; border: 1px solid #A19E17;');
});
