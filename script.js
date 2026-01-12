// ================================
// CRACKSHASH MOD - Main JavaScript
// ================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ================================
// Mobile Navigation Toggle
// ================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ================================
// Hacking Loading Overlay System
// ================================
const hackingOverlay = document.getElementById('hacking-overlay');
let overlayTimeout;

function showHackingOverlay(targetUrl) {
    hackingOverlay.classList.add('active');
    
    // Animate terminal output
    const terminalLines = document.querySelectorAll('.terminal-output p');
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'terminalType 0.3s ease-in';
        }, index * 400);
    });

    // Redirect after animation completes
    overlayTimeout = setTimeout(() => {
        window.open(targetUrl, '_blank');
        hackingOverlay.classList.remove('active');
    }, 2500);
}

// Attach hacking overlay to all external links
document.querySelectorAll('[data-external="true"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        showHackingOverlay(targetUrl);
    });
});

// ================================
// Matrix Rain Background Effect
// ================================
const matrixCanvas = document.getElementById('matrix-canvas');
const ctx = matrixCanvas.getContext('2d');

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 6, 8, 0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    ctx.fillStyle = '#00ff7b';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize matrix canvas on window resize
window.addEventListener('resize', () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
});

// ================================
// 3D Background with Three.js
// ================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Create particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x00ff7b,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create grid
const gridSize = 50;
const gridDivisions = 50;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00ff7b, 0x00d4ff);
gridHelper.position.y = -10;
gridHelper.material.opacity = 0.2;
gridHelper.material.transparent = true;
scene.add(gridHelper);

// Create wireframe sphere
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(15, 5, -10);
scene.add(sphere);

// Create wireframe torus
const torusGeometry = new THREE.TorusGeometry(4, 1, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0xb100ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-15, -5, -10);
scene.add(torus);

// Animation variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Mouse move event for parallax effect
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Smooth camera movement
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particles
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0003;

    // Rotate sphere and torus
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    
    torus.rotation.x += 0.008;
    torus.rotation.y += 0.012;

    // Pulse grid
    const time = Date.now() * 0.001;
    gridHelper.position.y = -10 + Math.sin(time) * 0.5;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================================
// Smooth Scroll for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or external link
        if (href === '#' || this.hasAttribute('data-external')) {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Navbar Background on Scroll
// ================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(11, 15, 20, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 123, 0.1)';
    } else {
        navbar.style.background = 'rgba(11, 15, 20, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ================================
// Typing Effect for Hero Subtitle
// ================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ================================
// Add Cyber Glitch Effect to Random Elements
// ================================
function addRandomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    if (glitchElements.length > 0) {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 100);
    }
}

// Trigger random glitch every 5 seconds
setInterval(addRandomGlitch, 5000);

// ================================
// Performance Optimization
// ================================

// Lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Disable 3D background on mobile for performance
if (window.innerWidth < 768) {
    renderer.setPixelRatio(1);
    particlesMaterial.size = 0.2;
}

// ================================
// Console Easter Egg
// ================================
console.log('%c⚠️ WARNING: HACKER ZONE ⚠️', 'color: #00ff7b; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00ff7b;');
console.log('%cWelcome to CrackShash Mod', 'color: #00d4ff; font-size: 16px;');
console.log('%cCyber Security • Ethical Hacking • DevSecOps', 'color: #8a9ba8; font-size: 14px;');
console.log('%c\nIf you\'re reading this, you\'re already a hacker at heart! 🎯', 'color: #00ff7b; font-size: 12px;');

// ================================
// Prevent Context Menu (Optional)
// Uncomment if you want to add extra "hacker" feel
// ================================
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('%c⚠️ Nice try, hacker! But right-click is disabled here. 😎', 'color: #00ff7b; font-size: 14px;');
});
*/

// ================================
// Loading Complete
// ================================
window.addEventListener('load', () => {
    console.log('%c✓ All systems loaded successfully', 'color: #00ff7b; font-size: 12px;');
    document.body.classList.add('loaded');
});
