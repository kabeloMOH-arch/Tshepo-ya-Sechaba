document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    panel.hidden = !panel.hidden;
  });
});
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = document.getElementById('lb-img');
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.hidden = false;
    });
  });
  // click anywhere on the dark background, or press Escape, to close
  lightbox.addEventListener('click', () => lightbox.hidden = true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.hidden = true; });
}
const programmes = [
  { title: "Health Checks", category: "Health", text: "Screening for the elderly." },
  { title: "Bingo Night",   category: "Social", text: "Fridays at 18:00." }
];

const listEl = document.getElementById('programme-list');
if (listEl) {
  const searchEl = document.getElementById('search');
  const catEl = document.getElementById('category');

  function render() {
    const q = searchEl.value.toLowerCase();
    listEl.innerHTML = '';
    programmes
      .filter(p => (catEl.value === 'all' || p.category === catEl.value) &&
                   (p.title + p.text).toLowerCase().includes(q))
      .forEach(p => {
        const card = document.createElement('article');
        card.innerHTML = `<h3>${p.title}</h3><p>${p.text}</p>`;
        listEl.appendChild(card);
      });
  }
  searchEl.addEventListener('input', render);
  catEl.addEventListener('change', render);
  render();
}
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', e => {
    e.preventDefault();                       // stop the page reloading
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.replace(/[\s-]/g, '');
    const type  = document.getElementById('EnquiryType').value;
    const errors = [];

    if (name.length < 2) errors.push('Enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Enter a valid email.');
    if (!/^(0\d{9}|\+27\d{9})$/.test(phone)) errors.push('Enter a valid SA phone number.');
    if (!type) errors.push('Choose volunteering or sponsorship.');

    const errBox = document.getElementById('enquiry-error');
    const out = document.getElementById('enquiry-response');
    if (errors.length) { errBox.textContent = errors.join(' '); out.textContent = ''; return; }

    errBox.textContent = '';
    out.textContent = type === 'volunteer'
      ? `Thanks ${name}! Volunteering is free. Orientation is the first Saturday of each month.`
      : `Thanks ${name}! Sponsorship starts at R500 per month. We'll email ${email} with options.`;
    enquiryForm.reset();
  });
}
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const RECIPIENT = 'tsodawnpark@gmail.com';
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const phone = document.getElementById('cphone').value.replace(/[\s-]/g, '');
    const type  = document.getElementById('ctype').value;
    const msg   = document.getElementById('cmessage').value.trim();
    const errors = [];

    if (name.length < 2) errors.push('Enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Enter a valid email.');
    if (!/^(0\d{9}|\+27\d{9})$/.test(phone)) errors.push('Enter a valid SA phone number.');
    if (!type) errors.push('Choose a message type.');
    if (msg.length < 10) errors.push('Message must be at least 10 characters.');

    const errBox = document.getElementById('contact-error');
    if (errors.length) { errBox.textContent = errors.join(' '); return; }
    errBox.textContent = '';

    // Build the email and open the user's mail app
    const subject = encodeURIComponent(`[${type}] Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${msg}`);
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  });
}
if (document.getElementById('map')) {
  const map = L.map('map').setView([-26.325, 28.225], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([-26.2967, 28.2478]).addTo(map).bindPopup('Dawn Park Outreach Centre');
  L.marker([-26.3543, 28.2000]).addTo(map).bindPopup('Vosloorus Outreach Point');
}