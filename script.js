// Initialize QR Code
const qrcode = new QRCode(document.getElementById("qrcode"));
let currentQRData = "";

// DOM Elements
const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const toggleAdvancedBtn = document.getElementById("toggle-advanced");
const advancedOptions = document.getElementById("advanced-options");
const qrType = document.getElementById("qr-type");
const wifiOptions = document.getElementById("wifi-options");
const wifiSsid = document.getElementById("wifi-ssid");
const wifiPassword = document.getElementById("wifi-password");
const wifiEncryption = document.getElementById("wifi-encryption");
const qrColor = document.getElementById("qr-color");
const bgColor = document.getElementById("bg-color");
const qrSize = document.getElementById("qr-size");
const sizeValue = document.getElementById("size-value");
const logoUpload = document.getElementById("logo-upload");
const downloadPng = document.getElementById("download-png");
const downloadSvg = document.getElementById("download-svg");
const downloadJpg = document.getElementById("download-jpg");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Toggle Advanced Options
toggleAdvancedBtn.addEventListener("click", () => {
    advancedOptions.classList.toggle("hidden");
    toggleAdvancedBtn.textContent = advancedOptions.classList.contains("hidden") 
        ? "⚙️ Advanced Options" 
        : "▲ Hide Options";
});

// Toggle Wi-Fi Options based on QR Type
qrType.addEventListener("change", () => {
    wifiOptions.classList.toggle("hidden", qrType.value !== "wifi");
});

// Update Size Label
qrSize.addEventListener("input", () => {
    sizeValue.textContent = qrSize.value;
});

// Generate QR Code
function generateQR() {
    const text = qrInput.value.trim();
    if (!text) {
        alert("Please enter text or URL!");
        return;
    }

    let qrData = text;

    // Handle Wi-Fi QR
    if (qrType.value === "wifi") {
        const ssid = wifiSsid.value.trim();
        const password = wifiPassword.value.trim();
        const encryption = wifiEncryption.value;
        
        if (!ssid) {
            alert("Please enter Wi-Fi SSID!");
            return;
        }

        qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    }

    // Handle Contact QR (vCard)
    if (qrType.value === "contact") {
        // Example vCard (customize as needed)
        qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD`;
    }

    currentQRData = qrData;

    // Generate QR with custom colors
    qrcode.makeCode(qrData);
    applyCustomStyles();
}

// Apply Custom Colors & Size
function applyCustomStyles() {
    const qrElement = document.querySelector("#qrcode canvas");
    if (qrElement) {
        qrElement.style.backgroundColor = bgColor.value;
        qrElement.style.padding = "10px";
        qrElement.style.borderRadius = "8px";
    }
}

// Download QR Code
function downloadQR(format) {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) {
        alert("Generate a QR code first!");
        return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL(`image/${format}`);
    link.download = `qrcode.${format}`;
    link.click();
}

// Event Listeners
generateBtn.addEventListener("click", generateQR);
qrInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") generateQR();
});

downloadPng.addEventListener("click", () => downloadQR("png"));
downloadSvg.addEventListener("click", () => downloadQR("svg")); // Note: SVG requires additional library
downloadJpg.addEventListener("click", () => downloadQR("jpeg"));

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.setAttribute("data-theme", 
        document.body.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
});

// Initial QR Code
qrcode.makeCode("Scan me! 😊");