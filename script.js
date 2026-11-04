// ======================================
// ADMIN: CREATE PERSONAL INVITATION LINK
// ======================================

let invitationLink = "";

function makeInvitation() {
    const input = document.getElementById("guestName");

    if (!input) return;

    const name = input.value.trim();

    if (!name) {
        alert("कृपया मेहमान का नाम लिखें।");
        return;
    }

    const url = new URL("index.html", window.location.href);

    url.search = "";
    url.searchParams.set("to", name);

    invitationLink = url.href;

    const result = document.getElementById("result");
    const link = document.getElementById("generatedLink");

    if (result && link) {
        link.textContent = invitationLink;
        result.style.display = "block";
    }
}


// ======================================
// COPY INVITATION LINK
// ======================================

function copyInvitationLink() {
    if (!invitationLink) {
        alert("पहले लिंक तैयार करें।");
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(invitationLink)
            .then(() => alert("लिंक कॉपी हो गया!"))
            .catch(() => prompt("लिंक कॉपी करें:", invitationLink));
    } else {
        prompt("लिंक कॉपी करें:", invitationLink);
    }
}


// ======================================
// WHATSAPP SHARE
// ======================================

function shareOnWhatsApp() {
    if (!invitationLink) {
        alert("पहले लिंक तैयार करें।");
        return;
    }

    const input = document.getElementById("guestName");
    const name = input ? input.value.trim() : "";

    const message =
        "श्रीमान " + name + " जी,\n" +
        "सियाग परिवार आपको सपरिवार सादर निमंत्रित करता है।\n\n" +
        "शुभ विवाह निमंत्रण देखने के लिए लिंक खोलें:\n" +
        invitationLink;

    const whatsappURL =
        "https://wa.me/?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}


// ======================================
// SAFE GUEST NAME
// ======================================

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character];
    });
}


// ======================================
// SHOW PERSONAL NAME ON HOMEPAGE
// ======================================

window.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get("to");

    const greeting = document.getElementById("personalGreeting");

    if (guestName && greeting) {
        greeting.innerHTML =
            "श्रीमान " + escapeHTML(guestName) + " जी,<br>" +
            "सियाग परिवार आपको सपरिवार सादर निमंत्रित करता है।<br>" +
            "शुभ विवाह के इस पावन अवसर पर आपकी उपस्थिति सादर प्रार्थनीय है। ❤️";
    }
});


// ======================================
// WEDDING COUNTDOWN
// ======================================

const weddingDate = new Date(
    "2026-11-24T17:00:00+05:30"
).getTime();

function updateCountdown() {
    const timer = document.getElementById("timer");

    if (!timer) return;

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        timer.innerHTML = "शुभ विवाह का समय आ गया है! ❤️";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    timer.innerHTML =
        days + " दिन : " +
        hours + " घंटे : " +
        minutes + " मिनट : " +
        seconds + " सेकंड";
}

updateCountdown();
setInterval(updateCountdown, 1000);