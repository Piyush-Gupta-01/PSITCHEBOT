const validUsers = [
    { name: "Naitik", id: "2432888" },
    { name: "Kartik Bajpei", id: "2431204" },
    { name: "Karan Gupta", id: "2433079" },
    { name: "Nainasi Kushwaha", id: "2432090" }
];

function login() {
    const name = document.getElementById('student-name').value.trim();
    const id = document.getElementById('student-id').value.trim();
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "";

    const user = validUsers.find(user => user.name.toLowerCase() === name.toLowerCase() && user.id === id);

    if (user) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        document.getElementById('greeting-message').innerText = `Hello, ${user.name}! How can I assist you today?`;
    } else {
        errorMessage.textContent = "Invalid name or student ID. Please try again.";
    }
}

function loginAsGuest() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
    document.getElementById("greeting-message").innerText = "Welcome, Guest! How can I assist you today?";
}

async function fetchStudentData(id) {
    try {
        const response = await fetch(`http://localhost:8000/student/${id}`);
        if (!response.ok) {
            throw new Error('Student not found');
        }
        const data = await response.json();
        return `Student Info: Name: ${data.StudentName}, ID: ${data.UniversityRollNo}, Program: ${data.Branch}`;
    } catch (error) {
        return `Error fetching student data: ${error.message}`;
    }
}

async function fetchFacultyData(section) {
    console.log("Fetching faculty data for section:", section);
    try {
        const trimmedSection = section.trim();
        const response = await fetch(`http://localhost:8000/faculty/${trimmedSection}`);
        if (!response.ok) {
            throw new Error('Section not found');
        }
        const data = await response.json();
        console.log("Fetched Faculty Data:", data);
        return `Faculty Info for ${section}: Name: ${data.facultyName}, Department: ${data.department}`;
    } catch (error) {
        console.error('Error fetching faculty data:', error);
        return `Error fetching faculty data: ${error.message}`;
    }
}

const keywords = {
    greeting: ["hi", "hello", "hey", "howdy", "good morning", "good evening"],
    help: ["help", "assist", "support"],
    psitalk: ["psitalk", "about psitalk", "virtual assistant", "chatbot"],
    creator: ["who created you", "developer", "who made you", "made by"],
    gratitude: ["thank you", "thanks", "appreciate", "grateful"],
    goodbye: ["goodbye", "bye", "farewell", "see you", "take care"],
    courses: ["courses offered", "what courses", "programs available", "course list", "degree programs"],
    facilities: ["facilities available", "campus facilities", "what facilities", "amenities"],
    admission: ["apply for admission", "admission process", "how to apply", "admission requirements"],
    psit: ["what is psit", "about psit", "PSIT overview"],
    hostel: ["hostel facilities", "hostel rules", "accommodation", "hostel life"],
    library: ["library rules", "library timings", "library resources", "library facilities"],
    training: ["training programs", "corporate training", "skills development", "workshops"],
    conduct: ["code of conduct", "student rules", "behavioral rules"],
    attendance: ["attendance policy", "attendance requirements", "attendance rules"],
    covid: ["covid protocol", "covid guidelines", "covid measures", "safety protocol"],
    faculty: ["faculty", "professors", "instructors", "teaching staff"],
    events: ["events", "campus events", "cultural activities", "sports events", "student events"],
    placements: ["placement", "placement cell", "career opportunities", "job placements"],
    studentLife: ["student life", "hostel life", "student activities", "clubs", "societies", "extracurricular"],
    alumni: ["alumni", "alumni network", "alumni association"],
    libraryResources: ["library resources", "library facilities", "books available", "research materials"],
    scholarships: ["scholarships", "financial aid", "scholarship programs", "scholarship opportunities"],
    research: ["research opportunities", "research facilities", "research programs"],
    internships: ["internships", "internship opportunities", "internship programs", "summer internships"],
    departments: ["departments", "academic departments", "branches", "B.Tech departments", "M.Tech departments"],
    clubs: ["clubs", "societies", "student clubs", "cultural clubs", "sports clubs"],
    studentSupport: ["student support", "counseling", "mental health", "career counseling"],
    industryCollaborations: ["industry collaborations", "industry tie-ups", "industry partnerships", "corporate collaborations"],
    campusLocations: [
        "library location", "where is the library", "find the library", "library map",
        "sports facilities", "where is the sports ground", "where are the sports facilities",
        "cafeteria location", "where is the cafeteria", "find the cafeteria",
        "hostel location", "where are the hostels", "hostel map", "hostel directions",
        "computer labs", "where are the computer labs", "find the computer labs",
        "main building", "where is the main building", "find the main building",
        "parking area", "where is the parking", "find the parking", "campus parking",
        "auditorium", "where is the auditorium", "auditorium location", "find the auditorium",
        "administration block", "where is the administration block", "find the admin block"
    ]
};

async function getBotResponse(userInput) {
    console.log("User  Input:", userInput);
    userInput = userInput.toLowerCase();

    for (const [key, words] of Object.entries(keywords)) {
        if (words.some(kw => userInput.includes(kw))) {
            switch (key) {
                case "greeting":
                    return "Hello! How can I assist you today?";
                case "help":
                    return "I'm here to help. Please tell me what you need assistance with.";
                case "psitalk":
                    return "PSITalk is a virtual assistant designed to help students and visitors with information about PSIT.";
                case "creator":
                    return "I was created by the team K2N—Naitik, Nainsi, Karan, and Kartik from BCA 1D—to assist with common queries and offer guidance.";
                case "gratitude":
                    return "You're very welcome! Feel free to ask if you have more questions.";
                case "goodbye":
                    return "Goodbye! Have a wonderful day!";
                case "courses":
                    return "PSIT offers various undergraduate and postgraduate courses such as B.Tech, M.Tech, MBA, BBA, BCA, and Pharmacy programs. Visit our official website for the complete course list.";
                case "facilities":
                    return "PSIT provides a state-of-the-art campus with centralized AC, 24x7 medical facilities, high-speed Wi-Fi, sports grounds, and a digital library. Additionally, there are multiple food courts, cafeterias, and recreational areas.";
                case "admission":
                    return "You can apply for admission through the PSIT website or by contacting the admissions office. Online applications are available, and we update the admission process every year.";
                case "psit":
                    return "PSIT (Pranveer Singh Institute of Technology) is known for its commitment to high-quality education, offering a range of undergraduate, postgraduate, and diploma courses in engineering, management, and sciences.";
                case "hostel":
                    return "PSIT provides separate hostels for boys and girls, offering round-the-clock security, AC dining halls, Wi-Fi, laundry services, and basic amenities for a comfortable stay.";
                case "library":
                    return "The PSIT library offers access to a vast collection of books, journals, and research papers. It is open Monday to Saturday from 9 AM to 7 PM. It also provides online resources and e-books.";
                case "training":
                    return "PSIT offers various training programs in collaboration with industry experts and reputed organizations. These include soft skills, technical workshops, and professional development programs.";
                case "conduct":
                    return "PSIT follows a strict code of conduct to ensure a safe and respectful environment for all students and staff. Students must adhere to academic integrity, attendance rules, and behavioral guidelines.";
                case "attendance":
                    return "PSIT expects students to maintain a minimum of 75% attendance in each course. Failing to do so may result in disciplinary action.";
                case "covid":
                    return "PSIT follows all government guidelines for COVID-19, including social distancing, mask usage, sanitization, and remote learning options where necessary.";
                case "faculty":
                    return "Our highly experienced faculty members are dedicated to providing top-notch education and are always available for guidance and support.";
                case "events":
                    return "PSIT organizes various events throughout the year, including cultural fests, sports events, seminars, and workshops. Stay updated on the official website or student portal.";
                case "placements":
                    return "PSIT has an active placement cell that helps students secure jobs with top companies. You can check placement opportunities through the student portal.";
                case "studentLife":
                    return "PSIT offers a vibrant student life with numerous clubs, societies, and events. There's something for everyone, from sports to cultural activities.";
                default:
                    return "I'm sorry, I didn't quite understand your request. Could you please rephrase?";
            }
        }
    }
 
    const studentIdPattern = /\b\d{7}\b/;
    const sectionPattern = /[A-Za-z0-9\-]+/;

    const studentIdMatch = userInput.match(studentIdPattern);
    const sectionMatch = userInput.match(sectionPattern);
    if (studentIdMatch) {
        const studentId = studentIdMatch[0];
        console.log("Fetching student data for ID:", studentId);
        const studentData = await fetchStudentData(studentId);
        console.log("Student Data:", studentData);
        return studentData;
    }

    if (sectionMatch) {
        const section = sectionMatch[0].trim().toUpperCase();
        console.log("Fetching faculty data for section:", section);
        const facultyData = await fetchFacultyData(section);
        return facultyData;
    }

    return "I'm not sure how to respond to that. Please try asking something like 'Where is the library?' or 'Tell me about the campus facilities.'";
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        displayMessage('user', userInput);
        document.getElementById('user-input').value = '';
      
        const botResponse = await getBotResponse(userInput);
        setTimeout(() => displayMessage('bot', botResponse), 500);
    }
}

function displayMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<div class="bubble">${text}</div>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggleBtn = document.querySelector('.theme-toggle');
    themeToggleBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

function startVoiceCommand() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        const voiceButton = document.getElementById('voice-command');

        recognition.onstart = () => {
            voiceButton.classList.add('recording'); 
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('user-input').value = transcript;
            sendMessage();
        };

        recognition.onerror = (event) => {
            alert('Voice recognition error. Please try again.');
        };

        recognition.onend = () => {
            voiceButton.classList.remove('recording');
        };

        recognition.start();
    } else {
        alert('Speech Recognition is not supported in this browser.');
    }
}
