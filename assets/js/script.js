document.addEventListener("DOMContentLoaded", () => {
    const labReportBtn = document.getElementById("labReportBtn");
    const coverPageBtn = document.getElementById("coverPageBtn");
    const labReportFields = document.getElementById("labReportFields");
    const coverPageFields = document.getElementById("coverPageFields");
    const resetBtn = document.getElementById("resetBtn");
    const scrollToTopBtn = document.getElementById("scrollToTop");

    // Template Selection Logic
    const templateCards = document.querySelectorAll('.template-card');
    const selectedTemplateInput = document.getElementById('selectedTemplate');

    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            templateCards.forEach(c => {
                c.classList.remove('border-orange-500', 'bg-orange-50', 'dark:bg-slate-700');
                c.classList.add('border-gray-200', 'dark:border-slate-600');
            });
            card.classList.remove('border-gray-200', 'dark:border-slate-600');
            card.classList.add('border-orange-500', 'bg-orange-50', 'dark:bg-slate-700');
            selectedTemplateInput.value = card.getAttribute('data-template');
        });
    });

    // --- SCROLL TO TOP LOGIC ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Submission Mode Logic
    const btnIndividual = document.getElementById("btnIndividual");
    const btnGroup = document.getElementById("btnGroup");
    const individualFields = document.getElementById("individualFields");
    const groupFields = document.getElementById("groupFields");
    const groupMembersContainer = document.getElementById("groupMembersContainer");
    const addMemberBtn = document.getElementById("addMemberBtn");

    let isLabReport = true;
    let isGroupMode = false;

    // --- Submission Mode Toggle ---
    const switchSubmissionMode = (mode) => {
        isGroupMode = mode === 'group';
        if (isGroupMode) {
            btnGroup.classList.add("bg-white", "dark:bg-slate-600", "text-orange-600", "dark:text-white", "shadow-sm");
            btnGroup.classList.remove("text-gray-500", "dark:text-gray-400");

            btnIndividual.classList.remove("bg-white", "dark:bg-slate-600", "text-orange-600", "dark:text-white", "shadow-sm");
            btnIndividual.classList.add("text-gray-500", "dark:text-gray-400");

            groupFields.classList.remove("hidden");
            individualFields.classList.add("hidden");

            if (groupMembersContainer.children.length === 0) addGroupMember();
        } else {
            btnIndividual.classList.add("bg-white", "dark:bg-slate-600", "text-orange-600", "dark:text-white", "shadow-sm");
            btnIndividual.classList.remove("text-gray-500", "dark:text-gray-400");

            btnGroup.classList.remove("bg-white", "dark:bg-slate-600", "text-orange-600", "dark:text-white", "shadow-sm");
            btnGroup.classList.add("text-gray-500", "dark:text-gray-400");

            individualFields.classList.remove("hidden");
            groupFields.classList.add("hidden");
        }
    }

    btnIndividual.addEventListener("click", () => switchSubmissionMode('individual'));
    btnGroup.addEventListener("click", () => switchSubmissionMode('group'));

    // --- Dynamic Group Members ---
    const addGroupMember = (name = "", id = "") => {
        // Validation for existing rows
        const existingRows = document.querySelectorAll(".group-row");
        if (existingRows.length > 0) {
            const lastRow = existingRows[existingRows.length - 1];
            const lastName = lastRow.querySelector(".group-name").value.trim();
            const lastId = lastRow.querySelector(".group-id").value.trim();

            if (!lastName || !lastId) {
                document.getElementById('alertMessage').textContent = "Please fill in the current group member's details first.";
                document.getElementById('alertModal').classList.remove('hidden');
                lastRow.classList.add('animate-pulse', 'border-red-500');
                setTimeout(() => lastRow.classList.remove('animate-pulse', 'border-red-500'), 500);
                return;
            }
        }

        const div = document.createElement("div");
        div.className = "flex gap-4 items-start animate-fade-in group-row";
        div.innerHTML = `
        <div class="flex-1">
            <input type="text" placeholder="Student Name" value="${name}" class="group-name w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-white outline-none text-sm">
        </div>
        <div class="flex-1">
            <input type="text" placeholder="Ex: 1212230002" value="${id}" class="group-id w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-white outline-none text-sm">
        </div>
        <button type="button" class="remove-member p-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
      `;

        div.querySelector(".remove-member").addEventListener("click", () => {
            div.remove();
            updateDeleteButtons();
        });

        groupMembersContainer.appendChild(div);
        updateDeleteButtons();
    };

    const updateDeleteButtons = () => {
        const rows = document.querySelectorAll(".group-row");
        rows.forEach(row => {
            const btn = row.querySelector(".remove-member");
            if (rows.length === 1) {
                btn.classList.add("hidden");
            } else {
                btn.classList.remove("hidden");
            }
        });
    };

    addMemberBtn.addEventListener("click", () => addGroupMember());


    // --- DARK MODE LOGIC ---
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const html = document.documentElement;

    if (localStorage.getItem('theme') === 'light') {
        html.classList.remove('dark');
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (sunIcon) sunIcon.classList.add('hidden');
    } else {
        // Default to dark
        html.classList.add('dark');
        if (moonIcon) moonIcon.classList.add('hidden');
        if (sunIcon) sunIcon.classList.remove('hidden');
        // Ensure we save the default preference if not present, though not strictly necessary if we treat null as dark
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            } else {
                localStorage.setItem('theme', 'light');
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            }
        });
    }

    const setTodayDates = () => {
        const today = new Date().toISOString().split('T')[0];
        const subDate = document.getElementById('submissionDate');
        const assignDate = document.getElementById('assignmentSubmissionDate');
        if (subDate) subDate.value = today;
        if (assignDate) assignDate.value = today;
    }
    setTodayDates();

    // --- Local Storage ---
    const loadSavedData = () => {
        const fields = ['studentName', 'studentId', 'departmentStudent', 'courseName', 'courseCode', 'courseSection', 'teacherName', 'designation', 'departmentTeacher'];
        fields.forEach(id => {
            const element = document.getElementById(id);
            const saved = localStorage.getItem(id);
            if (saved && element) element.value = saved;
        });
    };
    loadSavedData();

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('confirmModal').classList.remove('hidden');
        });
    }

    document.getElementById('confirmResetBtn').addEventListener('click', () => {
        // Clear specific fields from LocalStorage
        const fields = ['studentName', 'studentId', 'departmentStudent', 'courseName', 'courseCode', 'courseSection', 'teacherName', 'designation', 'departmentTeacher'];
        fields.forEach(id => localStorage.removeItem(id));

        document.getElementById('documentForm').reset();
        groupMembersContainer.innerHTML = "";
        if (isGroupMode) addGroupMember();
        setTodayDates();
        document.getElementById('confirmModal').classList.add('hidden');
    });

    const switchTab = (mode) => {
        isLabReport = mode === 'lab';

        if (isLabReport) {
            labReportBtn.classList.add("bg-orange-600", "text-white");
            labReportBtn.classList.remove("bg-gray-50", "dark:bg-slate-700", "text-gray-500", "dark:text-gray-400", "hover:bg-gray-100", "dark:hover:bg-slate-600");

            coverPageBtn.classList.add("bg-gray-50", "dark:bg-slate-700", "text-gray-500", "dark:text-gray-400", "hover:bg-gray-100", "dark:hover:bg-slate-600");
            coverPageBtn.classList.remove("bg-orange-600", "text-white");

            labReportFields.classList.remove("hidden");
            coverPageFields.classList.add("hidden");
        } else {
            coverPageBtn.classList.add("bg-orange-600", "text-white");
            coverPageBtn.classList.remove("bg-gray-50", "dark:bg-slate-700", "text-gray-500", "dark:text-gray-400", "hover:bg-gray-100", "dark:hover:bg-slate-600");

            labReportBtn.classList.add("bg-gray-50", "dark:bg-slate-700", "text-gray-500", "dark:text-gray-400", "hover:bg-gray-100", "dark:hover:bg-slate-600");
            labReportBtn.classList.remove("bg-orange-600", "text-white");

            coverPageFields.classList.remove("hidden");
            labReportFields.classList.add("hidden");
        }
    };

    labReportBtn.addEventListener("click", () => switchTab('lab'));
    coverPageBtn.addEventListener("click", () => switchTab('assignment'));

    const generateBtn = document.getElementById("generateBtn");
    const previewModal = document.getElementById("previewModal");
    const closeModal = document.getElementById("closeModal");
    const documentPreview = document.getElementById("documentPreview");
    const downloadPdf = document.getElementById("downloadPdf");
    const downloadDoc = document.getElementById("downloadDoc");

    generateBtn.addEventListener("click", () => {
        let students = [];
        const departmentStudent = document.getElementById("departmentStudent").value;
        // Get Theme Color
        let themeColor = '#f97316'; // Default UIU Orange

        let isValid = true;
        let firstInvalid = null;

        if (isGroupMode) {
            const rows = document.querySelectorAll(".group-row");
            rows.forEach(row => {
                const nameInput = row.querySelector(".group-name");
                const idInput = row.querySelector(".group-id");

                if (!nameInput.value.trim()) {
                    nameInput.classList.add('border-red-500');
                    isValid = false;
                    if (!firstInvalid) firstInvalid = nameInput;
                } else {
                    nameInput.classList.remove('border-red-500');
                }

                if (!idInput.value.trim()) {
                    idInput.classList.add('border-red-500');
                    isValid = false;
                    if (!firstInvalid) firstInvalid = idInput;
                } else {
                    idInput.classList.remove('border-red-500');
                }

                if (nameInput.value && idInput.value) {
                    students.push({ name: nameInput.value, id: idInput.value });
                }
            });
            if (students.length === 0) isValid = false;
        } else {
            const nameInput = document.getElementById("studentName");
            const idInput = document.getElementById("studentId");

            if (!nameInput.value.trim()) {
                nameInput.classList.add('border-red-500');
                isValid = false;
                if (!firstInvalid) firstInvalid = nameInput;
            } else {
                nameInput.classList.remove('border-red-500');
            }

            if (!idInput.value.trim()) {
                idInput.classList.add('border-red-500');
                isValid = false;
                if (!firstInvalid) firstInvalid = idInput;
            } else {
                idInput.classList.remove('border-red-500');
            }

            if (nameInput.value && idInput.value) {
                students.push({ name: nameInput.value, id: idInput.value });
            }
        }

        const courseName = document.getElementById("courseName").value;
        const courseCode = document.getElementById("courseCode").value;
        const courseSection = document.getElementById("courseSection").value;
        const teacherName = document.getElementById("teacherName").value;
        const designation = document.getElementById("designation").value;
        const departmentTeacher = document.getElementById("departmentTeacher").value;

        const validateField = (id) => {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                el.classList.add('border-red-500');
                if (!firstInvalid) firstInvalid = el;
                return false;
            }
            el.classList.remove('border-red-500');
            return true;
        };

        if (!validateField('courseCode')) isValid = false;
        if (!validateField('courseName')) isValid = false;
        if (!validateField('teacherName')) isValid = false;
        if (!validateField('designation')) isValid = false;

        if (!isValid) {
            if (firstInvalid) firstInvalid.focus();
            if (firstInvalid) {
                firstInvalid.parentElement.classList.add('animate-pulse');
                setTimeout(() => firstInvalid.parentElement.classList.remove('animate-pulse'), 500);
            }
            return;
        }

        if (!isGroupMode) {
            const dataToSave = { studentName: students[0].name, studentId: students[0].id, departmentStudent, courseName, courseCode, courseSection, teacherName, designation, departmentTeacher };
            Object.entries(dataToSave).forEach(([key, val]) => localStorage.setItem(key, val));
        }

        const selectedTemplate = document.getElementById('selectedTemplate').value;
        const doctype = isLabReport ? "LAB REPORT" : "ASSIGNMENT";
        let specificContentArray = [];

        if (courseCode) specificContentArray.push(`<li>Course Code: ${courseCode}</li>`);
        if (courseSection) specificContentArray.push(`<li>Course Section: ${courseSection}</li>`);

        if (isLabReport) {
            const title = document.getElementById("labReportTitle").value;
            const no = document.getElementById("labReportNo").value;
            const dateStr = document.getElementById("submissionDate").value;
            const date = dateStr ? new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

            if (title) specificContentArray.push(`<li>Experiment Name: ${title}</li>`);
            if (no) specificContentArray.push(`<li>Experiment No: ${no}</li>`);
            if (date) specificContentArray.push(`<li>Date of Submission: ${date}</li>`);

        } else {
            const title = document.getElementById("assignmentTitle").value;
            const no = document.getElementById("assignmentNo").value;
            const dateStr = document.getElementById("assignmentSubmissionDate").value;
            const date = dateStr ? new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

            if (title) specificContentArray.push(`<li>Assignment Title: ${title}</li>`);
            if (no) specificContentArray.push(`<li>Assignment No: ${no}</li>`);
            if (date) specificContentArray.push(`<li>Date of Submission: ${date}</li>`);
        }

        const specificContent = specificContentArray.join("");

        let studentListHTML = "";
        students.forEach((s, index) => {
            // Removed margin-bottom for the last item to fix gap
            const marginBottom = index === students.length - 1 ? "0px" : "10px";
            studentListHTML += `
            <div style="margin-bottom: ${marginBottom};">
                <div style="font-weight: bold; font-size: 16px; margin: 0; line-height: 1.3;">${s.name}</div>
                <div style="margin: 0; line-height: 1.3;">Student ID: ${s.id}</div>
            </div>
        `;
        });

        let documentHTML = "";

        if (selectedTemplate === 'modern') {
            documentHTML = `
            <div style="background-color: ${themeColor}; padding: 40px; text-align: center; margin: -25mm -25mm 30px -25mm; color: white;">
                <h1 style="font-size: 28px; font-weight: bold; margin: 0;">UNITED INTERNATIONAL UNIVERSITY</h1>
            </div>
            
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="font-size: 36px; font-weight: bold; color: ${themeColor}; border-bottom: 3px solid ${themeColor}; display: inline-block; padding-bottom: 10px;">${doctype}</div>
            </div>

            <div style="text-align: center; margin-bottom: 40px; padding: 20px; background-color: #fff7ed; border-radius: 10px; border: 1px solid ${themeColor}20;">
                <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #333;">${courseName}</h2>
                <ul style="list-style: none; padding: 0; margin: 0; text-align: left; display: inline-block;">
                    ${specificContent}
                </ul>
            </div>

            <div style="display: flex; justify-content: space-between; gap: 20px; align-items: flex-start;">
                <div style="flex: 1; background: #fff; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                    <h3 style="color: ${themeColor}; font-weight: bold; font-size: 18px; border-bottom: 2px solid ${themeColor}; padding-bottom: 10px; margin-bottom: 15px; margin-top: 0;">Submitted By</h3>
                    ${studentListHTML}
                    <div style="margin-top: 0; font-weight: 500; margin-bottom: 0;">${departmentStudent}</div>
                    <div style="margin-top: 0;">United International University</div>
                </div>
                <div style="flex: 1; background: #fff; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                    <h3 style="color: ${themeColor}; font-weight: bold; font-size: 18px; border-bottom: 2px solid ${themeColor}; padding-bottom: 10px; margin-bottom: 15px; margin-top: 0;">Submitted To</h3>
                    <div style="font-weight: bold; font-size: 16px; margin-top: 0;">${teacherName}</div>
                    <div>${designation}</div>
                    <div>${departmentTeacher}</div>
                    <div>United International University</div>
                </div>
            </div>
        `;
        } else if (selectedTemplate === 'minimal') {
            documentHTML = `
            <div style="border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 40px;">
                <img src="${logoBase64}" alt="UIU Logo" style="height: 60px; width: auto;">
            </div>

            <div style="margin-bottom: 60px; text-align: left;">
                <div style="font-size: 48px; font-weight: 900; color: #333; line-height: 1;">${doctype}</div>
                <div style="font-size: 24px; margin-top: 10px; color: #666;">${courseName}</div>
            </div>

            <div style="margin-bottom: 50px; text-align: left;">
                ${specificContent.replace(/<li>(.*?)<\/li>/g, `
                <div style="margin-bottom: 8px; font-size: 16px; color: #333;">$1</div>
                `)}
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: auto; align-items: flex-start;">
                <div style="width: 45%;">
                    <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 15px; margin-top: 0;">Student Details</div>
                    ${studentListHTML}
                    <div style="margin-top: 0;">${departmentStudent}</div>
                    <div>United International University</div>
                </div>
                <div style="width: 45%;">
                    <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 15px; margin-top: 0;">Faculty Details</div>
                    <div style="font-weight: bold; font-size: 16px; margin-top: 0;">${teacherName}</div>
                    <div>${designation}</div>
                    <div>${departmentTeacher}</div>
                    <div>United International University</div>
                </div>
            </div>
        `;
        } else if (selectedTemplate === 'professional') {
            documentHTML = `
            <div style="border: 2px solid ${themeColor}; padding: 30px; height: 100%; box-sizing: border-box; position: relative;">
                <div style="text-align: center; border-bottom: 2px solid ${themeColor}; padding-bottom: 20px; margin-bottom: 30px;">
                    <img src="${logoBase64}" alt="UIU Logo" style="height: 80px; width: auto;">
                </div>

                <div style="text-align: center; margin-bottom: 50px;">
                    <div style="font-size: 32px; font-weight: 800; color: ${themeColor}; text-transform: uppercase; margin-bottom: 10px;">${doctype}</div>
                    <div style="font-size: 20px; color: #555; font-weight: 600;">${courseName}</div>
                </div>

                <div style="background-color: ${themeColor}10; padding: 25px; border-radius: 8px; margin-bottom: 50px;">
                     <ul style="list-style: none; padding: 0; margin: 0; text-align: center;">
                        ${specificContent.replace(/<li>/g, `<li style="margin-bottom: 8px; font-size: 16px; font-weight: 500;">`)}
                    </ul>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: auto; padding-top: 15px; border-top: 1px solid #ddd;">
                    <div style="text-align: left; width: 48%;">
                        <div style="color: ${themeColor}; font-weight: bold; margin-bottom: 10px; font-size: 18px; text-transform: uppercase;">Submitted By</div>
                         ${studentListHTML}
                        <div style="margin-top: 5px;">${departmentStudent}</div>
                    </div>
                    <div style="text-align: right; width: 48%;">
                        <div style="color: ${themeColor}; font-weight: bold; margin-bottom: 10px; font-size: 18px; text-transform: uppercase;">Submitted To</div>
                        <div style="font-weight: bold; font-size: 16px;">${teacherName}</div>
                        <div>${designation}</div>
                        <div>${departmentTeacher}</div>
                    </div>
                </div>
            </div>
        `;
        } else if (selectedTemplate === 'creative') {
            // Clean Professional Academic Design
            documentHTML = `
            <div style="padding: 60px 50px; font-family: 'Urbanist', sans-serif; height: 100%; box-sizing: border-box;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <img src="${logoBase64}" alt="UIU Logo" style="height: 90px; margin-bottom: 20px;">
                    <div style="font-size: 12px; color: #888; letter-spacing: 3px; text-transform: uppercase;">Department of ${departmentStudent.replace('Department of ', '').replace('Dept. of ', '')}</div>
                </div>

                <!-- Title Block -->
                <div style="text-align: center; margin-bottom: 50px;">
                    <div style="font-size: 42px; font-weight: 900; color: #111; margin-bottom: 15px;">${doctype}</div>
                    <div style="width: 60px; height: 4px; background: ${themeColor}; margin: 0 auto 20px;"></div>
                    <div style="font-size: 22px; color: #333; font-weight: 600;">${courseName}</div>
                </div>

                <!-- Course Details -->
                <div style="border: 1px solid #e0e0e0; padding: 25px; margin-bottom: 40px;">
                    ${specificContent.replace(/<li>(.*?)<\/li>/g, `
                    <div style="font-size: 15px; color: #444; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">$1</div>
                    `)}
                </div>

                <!-- Submission Info -->
                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 45%;">
                        <div style="font-size: 11px; color: ${themeColor}; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 2px solid ${themeColor}; padding-bottom: 8px; display: inline-block;">Submitted By</div>
                        ${studentListHTML}
                        <div style="font-size: 13px; color: #666; margin-top: 5px;">${departmentStudent}</div>
                    </div>
                    <div style="width: 45%; text-align: right;">
                        <div style="font-size: 11px; color: ${themeColor}; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 2px solid ${themeColor}; padding-bottom: 8px; display: inline-block;">Submitted To</div>
                        <div style="font-weight: bold; font-size: 16px; color: #222;">${teacherName}</div>
                        <div style="color: #555;">${designation}</div>
                        <div style="font-size: 13px; color: #666;">${departmentTeacher}</div>
                    </div>
                </div>
            </div>
        `;
        } else if (selectedTemplate === 'elegant') {
            // Elegant Template - Academic focused with refined typography
            const elegantColor = '#f97316'; // Orange (changed from emerald)
            documentHTML = `
            <div style="border: 3px double ${elegantColor}; padding: 40px; height: 100%; box-sizing: border-box; position: relative;">
                <!-- Decorative Corner Elements -->
                <div style="position: absolute; top: 15px; left: 15px; width: 30px; height: 30px; border-top: 2px solid ${elegantColor}; border-left: 2px solid ${elegantColor};"></div>
                <div style="position: absolute; top: 15px; right: 15px; width: 30px; height: 30px; border-top: 2px solid ${elegantColor}; border-right: 2px solid ${elegantColor};"></div>
                <div style="position: absolute; bottom: 15px; left: 15px; width: 30px; height: 30px; border-bottom: 2px solid ${elegantColor}; border-left: 2px solid ${elegantColor};"></div>
                <div style="position: absolute; bottom: 15px; right: 15px; width: 30px; height: 30px; border-bottom: 2px solid ${elegantColor}; border-right: 2px solid ${elegantColor};"></div>

                <!-- Header -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="${logoBase64}" alt="UIU Logo" style="height: 80px; margin-bottom: 15px;">
                </div>

                <!-- Document Type -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="font-size: 36px; font-weight: 800; color: #1f2937; letter-spacing: 2px; margin-bottom: 15px;">${doctype}</div>
                    <div style="width: 80px; height: 3px; background: linear-gradient(90deg, transparent, ${elegantColor}, transparent); margin: 0 auto;"></div>
                </div>

                <!-- Course Info -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="font-size: 22px; font-weight: 700; color: #374151; margin-bottom: 20px;">${courseName}</div>
                    <div style="background: linear-gradient(135deg, ${elegantColor}10, ${elegantColor}05); border: 1px solid ${elegantColor}30; border-radius: 10px; padding: 20px; display: inline-block;">
                        ${specificContent.replace(/<li>/g, `<div style="margin-bottom: 8px; font-size: 15px; color: #4b5563;">`).replace(/<\/li>/g, '</div>')}
                    </div>
                </div>

                <!-- Submission Details -->
                <div style="display: flex; justify-content: space-between; margin-top: auto; padding-top: 30px; border-top: 1px solid ${elegantColor}40;">
                    <div style="width: 45%;">
                        <div style="font-size: 12px; color: ${elegantColor}; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid ${elegantColor}; display: inline-block;">Submitted By</div>
                        ${studentListHTML}
                        <div style="font-size: 13px; color: #6b7280; margin-top: 8px;">${departmentStudent}</div>
                    </div>
                    <div style="width: 45%; text-align: right;">
                        <div style="font-size: 12px; color: ${elegantColor}; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid ${elegantColor}; display: inline-block;">Submitted To</div>
                        <div style="font-weight: bold; font-size: 16px; color: #1f2937;">${teacherName}</div>
                        <div style="color: #4b5563;">${designation}</div>
                        <div style="font-size: 13px; color: #6b7280;">${departmentTeacher}</div>
                    </div>
                </div>
            </div>
        `;
        } else {
            // Classic Template
            documentHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <img src="${logoBase64}" alt="UIU Logo" style="width: 100%; max-width: 350px; height: auto; display: block; margin: 0 auto;">
            </div>

            <div style="text-align: center; margin-bottom: 3rem;">
                <div class="document-title" style="color: ${themeColor} !important;">${doctype}</div>
            </div>

            <div style="margin-bottom: 4rem;">
                <p class="course-title" style="text-align: center;">${courseName}</p>
            </div>
            
            <div class="info-list" style="margin-bottom: 4rem; text-align: center;">
                <ul style="list-style: none; padding: 0; margin: 0; display: inline-block; text-align: left;">
                    ${specificContent}
                </ul>
            </div>

            <table class="submission-table">
                <thead>
                    <tr>
                        <td style="width: 50%; color: ${themeColor} !important;">Submitted By:</td>
                        <td style="width: 50%; color: ${themeColor} !important;">Submitted To:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="submission-cell">
                            ${studentListHTML}
                            <div style="margin-top: 0; line-height: 1.3;">${departmentStudent}</div>
                            <div style="line-height: 1.3;">United International University</div>
                        </td>
                        <td class="submission-cell">
                            <div style="font-weight: bold; font-size: 16px; margin: 0; line-height: 1.3;">${teacherName}</div>
                            <div style="margin: 0; line-height: 1.3;">${designation}</div>
                            <div style="margin: 0; line-height: 1.3;">${departmentTeacher}</div>
                            <div style="line-height: 1.3;">United International University</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        }

        documentPreview.innerHTML = documentHTML;
        previewModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => previewModal.classList.add("hidden"));
    previewModal.addEventListener("click", (e) => {
        if (e.target === previewModal) previewModal.classList.add("hidden");
    });

    downloadPdf.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        const elementToPrint = documentPreview.cloneNode(true);
        // Explicitly set width to desktop scale to prevent responsive shifts
        elementToPrint.style.width = '794px'; // ~210mm at 96dpi
        elementToPrint.style.minHeight = '1123px'; // ~297mm at 96dpi
        elementToPrint.style.padding = '25mm';
        elementToPrint.style.backgroundColor = 'white';
        elementToPrint.style.color = 'black';
        elementToPrint.style.fontFamily = 'Urbanist, sans-serif';
        elementToPrint.style.boxSizing = 'border-box';
        elementToPrint.style.transform = 'none'; // reset any transforms

        const listNode = elementToPrint.querySelector('ul');
        if (listNode) {
            listNode.style.padding = '0';
            listNode.style.margin = '0';
        }

        // Generate PDF using manual html2canvas + addImage for robustness
        document.body.appendChild(elementToPrint);

        // Use html2canvas to capture the element
        html2canvas(elementToPrint, {
            scale: 2, // High resolution
            useCORS: true,
            scrollY: 0,
            backgroundColor: '#ffffff',
            windowWidth: 1200 // Force desktop width
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            const filename = isLabReport ? "UIU-Lab-Report.pdf" : "UIU-Assignment.pdf";
            pdf.save(filename);

            document.body.removeChild(elementToPrint);
        }).catch(err => {
            console.error("PDF Generation Error:", err);
            alert("An error occurred while generating the PDF. Please try again.");
            document.body.removeChild(elementToPrint);
        });
    });
    downloadDoc.addEventListener("click", () => {
        const filename = isLabReport ? "UIU-Lab-Report.doc" : "UIU-Assignment.doc";

        const htmlContent = `
          <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
          <head><meta charset='utf-8'><title>Cover Page</title>
          <style>
            body { font-family: 'Urbanist', sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            td { vertical-align: top; padding: 5px; }
            ul { padding: 0; margin: 0; list-style: none; } 
            li { margin-bottom: 10px; }
          </style>
          </head><body>${documentPreview.innerHTML}</body></html>
        `;

        const blob = new Blob([htmlContent], { type: "application/msword" });
        window.saveAs(blob, filename);
    });
});