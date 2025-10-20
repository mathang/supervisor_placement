import { initRouter } from './router.js';

const emailStepForm = document.getElementById('email-step');
const codeStepForm = document.getElementById('code-step');
const loginStatus = document.getElementById('loginStatus');
const loginSection = document.getElementById('login-section');
const portalContent = document.getElementById('portal-content');
const emergencyContact = document.getElementById('emergencyContact');
const resendLink = document.getElementById('resendLink');
const rememberDevice = document.getElementById('rememberDevice');
const chatWidget = document.getElementById('chatWidget');
const appElement = document.getElementById('app');
const announcerElement = document.getElementById('route-announcer');

const router = initRouter({
    appElement,
    announcerElement,
    defaultRoute: '#/dashboard',
    baseTitle: 'Clinical Supervisor Portal',
});

let storedEmail = '';
let routerStarted = false;

function extractNameFromEmail(email) {
    if (!email) {
        return '';
    }

    const [localPart] = email.split('@');
    if (!localPart) {
        return '';
    }

    return localPart
        .split(/[._-]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function showCodeStep() {
    emailStepForm.classList.add('hidden');
    codeStepForm.classList.remove('hidden');
    const codeInput = document.getElementById('codeInput');
    codeInput.focus();
}

function showPortal() {
    loginSection.classList.add('hidden');
    portalContent.classList.remove('hidden');
    emergencyContact.style.display = 'block';

    if (!routerStarted) {
        routerStarted = true;
        router.start();
    } else {
        router.refresh();
    }
}

emailStepForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(emailStepForm);
    const email = (formData.get('email') || '').toString().trim();

    if (!email) {
        loginStatus.textContent = 'Please enter your university email address.';
        return;
    }

    storedEmail = email;
    loginStatus.textContent = `A demo code has been sent to ${email}. Enter 123456 to continue.`;
    showCodeStep();
});

codeStepForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(codeStepForm);
    const code = (formData.get('code') || '').toString().trim();

    if (code !== '123456') {
        loginStatus.textContent = 'That code was not recognized. Please try again.';
        codeStepForm.reset();
        document.getElementById('codeInput').focus();
        return;
    }

    const preferredName = extractNameFromEmail(storedEmail) || 'Supervisor';
    router.setContext({ supervisorName: preferredName });
    loginStatus.textContent = rememberDevice.checked
        ? 'Device trusted for 30 days. Loading your portal now...'
        : 'Login successful. Loading your portal now...';

    showPortal();

    import('./pages/students.js').catch((error) => {
        console.warn('Preloading students page failed:', error);
    });
});

resendLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (!storedEmail) {
        loginStatus.textContent = 'Enter your email address first and we will send a code right away.';
        return;
    }

    loginStatus.textContent = `A new demo code has been sent to ${storedEmail}.`;
});

chatWidget.addEventListener('click', () => {
    window.open('https://example.com/assistant', '_blank', 'noopener');
});

chatWidget.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        chatWidget.click();
    }
});

window.addEventListener('load', () => {
    const initialHash = window.location.hash;
    if (initialHash && !portalContent.classList.contains('hidden')) {
        router.start();
        router.navigate(initialHash);
    }
});
