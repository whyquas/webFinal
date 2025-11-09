
// ========== Task 1: Form Validation (contact.html) ==========
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form[action='#']");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const msg = document.getElementById("msg");

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      // clear previous error messages
      contactForm.querySelectorAll(".error").forEach(el => el.remove());

      // helper function to show errors
      const showError = (input, message) => {
        valid = false;
        input.style.borderColor = "red";
        const err = document.createElement("small");
        err.classList.add("error");
        err.style.color = "red";
        err.textContent = message;
        input.insertAdjacentElement("afterend", err);
      };

      // validation logic
      if (name.value.trim() === "") showError(name, "Name is required");
      if (email.value.trim() === "") showError(email, "Email is required");
      else if (!emailPattern.test(email.value))
        showError(email, "Invalid email format");
      if (msg.value.trim() === "") showError(msg, "Message is required");

      if (valid) {
        alert("Thank you for contacting us!");
        contactForm.reset();
        [name, email, msg].forEach((el) => (el.style.borderColor = ""));
      }
    });
  }

  // ========== Task 2: Accordion (faq.html) ==========
  const faqDetails = document.querySelectorAll("details");
  if (faqDetails.length) {
    faqDetails.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          faqDetails.forEach((other) => {
            if (other !== item) other.removeAttribute("open");
          });
        }
      });
    });
  }

  // ========== Task 3: Popup Form (index.html) ==========
 // ========== Task 3: Popup Form (index.html, improved design + validation) ==========
if (document.querySelector("title")?.textContent.includes("Online Library")) {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div id="popupOverlay" style="
      display:none; position:fixed; top:0; left:0; right:0; bottom:0;
      background:rgba(0,0,0,0.6); justify-content:center; align-items:center;
      backdrop-filter: blur(4px); z-index:1000;">
      <div style="
        background:rgba(255,255,255,0.95);
        box-shadow:0 10px 25px rgba(0,0,0,0.2);
        border-radius:1rem;
        width:340px;
        padding:2rem;
        text-align:center;
        position:relative;
        animation: fadeIn 0.4s ease;">
        <button id="closePopup" style="
          position:absolute; top:8px; right:12px;
          background:none; border:none; font-size:1.2rem; cursor:pointer;">✖</button>
        <h2 style="margin-bottom:1rem; color:#333; font-size:1.5rem;">Subscribe</h2>
        <p style="color:#666; margin-bottom:1.2rem;">Join our newsletter for weekly book updates!</p>
        <input id="subName" type="text" placeholder="Your name" 
          style="width:100%; padding:0.7rem; border:1px solid #ccc; border-radius:8px; margin-bottom:0.7rem;">
        <small id="errName" style="color:red; display:none;">Please enter your name</small>
        <input id="subEmail" type="email" placeholder="Your email" 
          style="width:100%; padding:0.7rem; border:1px solid #ccc; border-radius:8px; margin-bottom:0.7rem;">
        <small id="errEmail" style="color:red; display:none;">Enter a valid email address</small>
        <button id="sendSub" style="
          width:100%; background:linear-gradient(90deg,#4e9af1,#007bff);
          color:white; border:none; padding:0.8rem; border-radius:8px; 
          cursor:pointer; font-weight:600; transition:0.3s;">Subscribe</button>
      </div>
    </div>
    <style>
      @keyframes fadeIn {
        from {opacity:0; transform:scale(0.95);}
        to {opacity:1; transform:scale(1);}
      }
      #sendSub:hover {
        background:linear-gradient(90deg,#66b3ff,#3399ff);
        transform:translateY(-1px);
      }
    </style>
  `;
  document.body.appendChild(popup);

  // Add a "Subscribe" button if not present
  const hero = document.querySelector(".hero");
  if (hero && !hero.querySelector("#popupBtn")) {
    const subBtn = document.createElement("a");
    subBtn.textContent = "Subscribe";
    subBtn.href = "#";
    subBtn.id = "popupBtn";
    subBtn.className = "btn alt sub";
    hero.appendChild(subBtn);
  }

  const popupOverlay = document.getElementById("popupOverlay");
  const popupBtn = document.getElementById("popupBtn");
  const closePopup = document.getElementById("closePopup");

  // Event: open popup
  popupBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    popupOverlay.style.display = "flex";
  });

  // Event: close popup
  closePopup?.addEventListener("click", () => {
    popupOverlay.style.display = "none";
  });

  // Close when clicking outside
  popupOverlay?.addEventListener("click", (e) => {
    if (e.target.id === "popupOverlay") popupOverlay.style.display = "none";
  });

  // ========== Add Form Validation ==========
  const sendBtn = document.getElementById("sendSub");
  sendBtn?.addEventListener("click", () => {
    const name = document.getElementById("subName");
    const email = document.getElementById("subEmail");
    const errName = document.getElementById("errName");
    const errEmail = document.getElementById("errEmail");

    let valid = true;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Reset previous states
    errName.style.display = "none";
    errEmail.style.display = "none";
    name.style.borderColor = "#ccc";
    email.style.borderColor = "#ccc";

    // Validate name
    if (name.value.trim() === "") {
      errName.style.display = "block";
      name.style.borderColor = "red";
      valid = false;
    }

    // Validate email
    if (email.value.trim() === "" || !emailPattern.test(email.value)) {
      errEmail.style.display = "block";
      email.style.borderColor = "red";
      valid = false;
    }

    // Success
    if (valid) {
      alert("✅ Thank you for subscribing!");
      name.value = "";
      email.value = "";
      popupOverlay.style.display = "none";
    }
  });
}

  // ========== Task 4: Change Background Color (membership.html) ==========
  if (document.title.includes("Membership")) {
    const btn = document.createElement("button");
    btn.textContent = "Change Background";
    btn.className = "btn alt";
    btn.style.margin = "1rem 0";
    document.querySelector("main").prepend(btn);

    const colors = ["#fef9e7", "#e8f8f5", "#fbeee6", "#f2f3f4", "#eaf2f8"];
    btn.addEventListener("click", () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = color;
    });
  }



  // ========== Task 5: Display Date and Time (privacy.html) ==========
  if (document.title.includes("Privacy")) {
    const timeBox = document.createElement("p");
    timeBox.className = "muted";
    timeBox.style.marginTop = "1rem";
    document.querySelector("main .card")?.appendChild(timeBox);

    const updateTime = () => {
      const now = new Date();
      const options = { 
        year: "numeric", month: "long", day: "numeric", 
        hour: "2-digit", minute: "2-digit"
      };
      timeBox.textContent = "Current time: " + now.toLocaleString("en-US", options);
    };

    updateTime();
    setInterval(updateTime, 60000);
  }
});




// === Assignment 6: Advanced JavaScript & DOM ===
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // 1) Theme toggle (Day/Night)
  (function injectThemeToggle(){
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";

    // language select (also fulfills switch statement requirement)
    const sel = document.createElement("select");
    sel.className = "lang-select";
    sel.setAttribute("aria-label","Language");
    sel.innerHTML = `<option value="en">EN</option><option value="ru">RU</option><option value="kz">KZ</option>`;
    sel.value = localStorage.getItem("lang") || "en";
    wrap.appendChild(sel);

    const label = document.createElement("label");
    label.className = "theme-toggle";
    label.innerHTML = `<span class="muted" style="font-size:.9rem">Day</span><span class="dot" aria-hidden="true"></span><span class="muted" style="font-size:.9rem">Night</span>`;

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = ".5rem";
    container.appendChild(label);
    container.appendChild(wrap);

    navbar.parentElement.appendChild(container);

    // restore theme (manual Day/Night independent of system)
    const saved = localStorage.getItem("theme");
    if (saved === "night" || saved === "day") {
      html.setAttribute("data-theme", saved);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      html.setAttribute("data-theme", prefersLight ? "day" : "night");
    }

    label.addEventListener("click", ()=>{
      const current = html.getAttribute("data-theme") || "day";
      const next = current === "night" ? "day" : "night";
      html.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      playDing();
    });

    // Language change via switch statement
    const strings = {
      en: { explore:"Explore", company:"Company", contact:"Contact", readMore:"Read more", readLess:"Show less" },
      ru: { explore:"Разделы", company:"Компания", contact:"Контакты", readMore:"Читать далее", readLess:"Свернуть" },
      kz: { explore:"Бөлімдер", company:"Компания", contact:"Байланыс", readMore:"Толығырақ", readLess:"Жасыру" },
    };
    function applyLang(lang){
      switch(lang){
        case "ru":
        case "kz":
        case "en":
          localStorage.setItem("lang", lang);
          const s = strings[lang];
          document.querySelectorAll("footer h3").forEach(h=>{
            if (h.textContent.includes("Explore")||h.textContent.includes("Разделы")||h.textContent.includes("Бөлімдер")) h.textContent = s.explore;
            if (h.textContent.includes("Company")||h.textContent.includes("Компания")) h.textContent = s.company;
            if (h.textContent.includes("Contact")||h.textContent.includes("Контакты")||h.textContent.includes("Байланыс")) h.textContent = s.contact;
          });
          document.querySelectorAll("[data-i18n='readmore']").forEach(b => {
            b.textContent = b.dataset.open==="1" ? s.readLess : s.readMore;
          });
          break;
        default:
          // default English
          localStorage.setItem("lang","en");
      }
    }
    sel.addEventListener("change", (e)=> applyLang(e.target.value));
    applyLang(sel.value);
  })();

  // 2) Keyboard navigation for main nav
  (function navKeyboard(){
    const nav = document.querySelector(".nav-links");
    if (!nav) return;
    const links = Array.from((nav || document.querySelector(".nav-links"))?.querySelectorAll("a") || []);
    links.forEach(a => a.setAttribute("tabindex","0"));
    nav.addEventListener("keydown", (e)=>{
      const i = links.indexOf(document.activeElement);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = links[(i+1+links.length)%links.length]; next?.focus();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = links[(i-1+links.length)%links.length]; prev?.focus();
      }
    });
  })();

  // Utility: play a sound (debounced)
  let ding;
  function playDing(){
    if (!ding) ding = new Audio("sounds/notify.wav");
    try { ding.currentTime = 0; ding.play(); } catch(_){}
  }

  // 3) On book pages: rating stars + read more toggle + borrow button bounce
  (function enhanceBook(){
    // Show rating only on book detail pages
    if (!location.pathname.includes('book-')) return;
    const h1 = document.querySelector("main h1");
    if (!h1) return;
    // rating
    const rating = document.createElement("div");
    rating.className = "rating";
    rating.setAttribute("role","radiogroup");
    rating.setAttribute("aria-label","Rate this book");
    const label = document.createElement("span"); label.className="label"; label.textContent="Rate:";
    rating.appendChild(label);

    const savedKey = "rating:" + (document.title || h1.textContent);
    const saved = Number(localStorage.getItem(savedKey) || 0);

    function starSVG(fill){ 
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.3 6.7 7.4 1.1-5.3 5.2 1.2 7.3L12 18.6 5.4 22.3l1.2-7.3-5.3-5.2 7.4-1.1L12 2z" fill="${fill?'#ffd15c':'#2b3346'}"/></svg>`;
    }
    let current = saved;
    for (let i=1;i<=5;i++){
      const b = document.createElement("button");
      b.className = "star";
      b.setAttribute("role","radio");
      b.setAttribute("aria-checked", String(i===current));
      b.innerHTML = starSVG(i<=saved);
      b.addEventListener("click", ()=>{
        current = i;
        localStorage.setItem(savedKey, String(i));
        Array.from(rating.querySelectorAll(".star")).forEach((el,idx)=>{
          el.innerHTML = starSVG(idx< i);
          el.setAttribute("aria-checked", String((idx+1)===i));
        });
        playDing();
      });
      rating.appendChild(b);
    }
    h1.insertAdjacentElement("afterend", rating);

    // read more toggle for first description paragraph
    const p = document.querySelector("article.card p.muted");
    if (p && p.textContent.length > 140){
      p.classList.add("read-more");
      const btn = document.createElement("button");
      btn.className="read-more-toggle";
      btn.dataset.i18n="readmore";
      btn.textContent = "Read more";
      btn.addEventListener("click", ()=>{
        const open = p.classList.toggle("open");
        btn.dataset.open = open ? "1" : "0";
        // update i18n label
        const lang = localStorage.getItem("lang") || "en";
        const text = {en:["Read more","Show less"],ru:["Читать далее","Свернуть"],kz:["Толығырақ","Жасыру"]}[lang];
        btn.textContent = open ? text[1] : text[0];
      });
      p.insertAdjacentElement("afterend", btn);
    }

    // borrow buttons
    document.querySelectorAll(".btn").forEach(b=>{
      if (b.textContent.toLowerCase().includes("read online") || b.textContent.toLowerCase().includes("download")){
        b.classList.add("bounce");
        b.addEventListener("click", playDing);
      }
    });
  })();

  // 4) Catalog: load more books via fetch + filter (higher-order functions)
  (function catalogEnhance(){
    if (!location.pathname.endsWith("catalog.html")) return;
    const grid = document.querySelector(".catalog");
    if (!grid) return;
    // Add controls
    const controls = document.createElement("div");
    controls.style.display="flex"; controls.style.gap="1rem"; controls.style.alignItems="center"; controls.style.margin="0 0 16px";
    controls.innerHTML = `
      <input id="filter" placeholder="Filter by tag… (e.g., UX)" style="padding:.5rem;border-radius:10px;border:1px solid var(--border);background:var(--soft);color:var(--text)">
      <button class="btn" id="loadMore" type="button">Load more</button>
      <span class="muted" id="count"></span>
    `;
    grid.parentElement.insertBefore(controls, grid);
    const count = controls.querySelector("#count");
    // External API integration: Google Books search
    const apiSection = document.createElement("section");
    apiSection.className = "card";
    apiSection.style.marginTop = "1.5rem";
    apiSection.innerHTML = `
      <h2>Search in Google Books</h2>
      <p class="muted">Find more books using the Google Books API.</p>
      <form id="apiSearchForm" class="api-search-form" style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem;">
        <input id="apiQuery" class="input" placeholder="Search by title or author" required
          style="flex:1 1 200px;min-width:0;">
        <button class="btn" type="submit">Search</button>
      </form>
      <div id="apiResults" class="catalog" style="margin-top:.5rem;"></div>
    `;
    grid.parentElement.appendChild(apiSection);

    const apiForm = apiSection.querySelector("#apiSearchForm");
    const apiQuery = apiSection.querySelector("#apiQuery");
    const apiResults = apiSection.querySelector("#apiResults");

    if (apiForm && apiQuery && apiResults) {
      apiForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const q = apiQuery.value.trim();
        if (!q) return;
        apiResults.innerHTML = "<p class='muted'>Searching Google Books…</p>";
        try {
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=6`);
          const data = await res.json();
          const items = data.items || [];
          if (!items.length) {
            apiResults.innerHTML = "<p class='muted'>No results found.</p>";
            return;
          }
          apiResults.innerHTML = "";
          items.forEach(item => {
            const info = item.volumeInfo || {};
            const article = document.createElement("article");
            article.className = "book";
            const thumb = (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || "https://via.placeholder.com/300x200?text=No+Cover";
            article.innerHTML = `
              <img class="cover" src="${thumb}" alt="${(info.title || "Book") + " cover"}">
              <div class="body">
                <h3>${info.title || "Untitled"}</h3>
                <p class="muted">${(info.authors || []).join(", ") || "Unknown author"}</p>
              </div>
            `;
            apiResults.appendChild(article);
          });
        } catch (err) {
          console.error(err);
          apiResults.innerHTML = "<p class='muted'>Error loading data from Google Books.</p>";
        }
      });
    }


    function card(b){
      const article = document.createElement("article");
      article.className = "book card-pop";
      article.setAttribute("data-tags", b.tags.join(" ").toLowerCase());
      article.innerHTML = `
        <img class="cover" src="${b.cover}" alt="${b.title} cover">
        <div class="body">
          <h2><a href="${b.slug}">${b.title}</a></h2>
          <p class="muted">${b.desc}</p>
          <div class="meta">
            <span class="badge">${b.level}</span>
            <span class="badge">${b.year}</span>
            <span class="badge">${b.format}</span>
          </div>
        </div>
      `;
      return article;
    }

    let loaded = [];
    async function loadMore(){
      const res = await fetch("data/more-books.json");
      const data = await res.json();
      // Use higher-order functions to filter out books we already injected by title
      const incoming = data.filter(b => !loaded.some(x => x.title === b.title));
      incoming.forEach(b => grid.appendChild(card(b)));
      loaded = loaded.concat(incoming);
      playDing();
      updateCount();
    }

    function updateCount(){
      const items = Array.from(grid.querySelectorAll(".book"));
      const visible = items.filter(el => el.style.display !== "none");
      count.textContent = `${visible.length} books`;
    }

    controls.querySelector("#loadMore").addEventListener("click", loadMore);

    // filter by tag using higher-order functions (map/filter)
    
const filterInput = controls.querySelector("#filter");
    const savedFilter = localStorage.getItem("catalogFilter") || "";
    function applyFilter(q){
      const query = q.trim().toLowerCase();
      const items = Array.from(grid.querySelectorAll(".book"));
      items.forEach(el => el.style.display = "");
      if (query){
        items
          .filter(el => !(el.dataset.tags || "").includes(query))
          .forEach(el => el.style.display = "none");
      }
      updateCount();
    }
    if (savedFilter) {
      filterInput.value = savedFilter;
      applyFilter(savedFilter);
    }

    filterInput.addEventListener("input", (e)=>{
      const q = e.target.value;
      localStorage.setItem("catalogFilter", q);
      applyFilter(q);
    });

    updateCount();
  })();

  // 5) Contact form: async "submit" with callback + success message
  (function contactAsync(){
    const form = document.querySelector("form[action='#']");
    if (!form) return;
    const msgBox = document.createElement("div");
    form.appendChild(msgBox);

    function showMessage(ok, text){
      msgBox.textContent = text;
      msgBox.className = ok ? "muted" : "error";
    }

    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const formData = new FormData(form);
      // simulate async POST
      fetch("about:blank", { method:"POST", body: formData })
        .then(()=> new Promise(res=> setTimeout(res,400)))
        .then(()=>{
          // callback: store message locally and show success
          const payload = Object.fromEntries(formData.entries());
          const arr = JSON.parse(localStorage.getItem("contactMessages")||"[]");
          arr.push({ ...payload, at: Date.now() });
          localStorage.setItem("contactMessages", JSON.stringify(arr));
          showMessage(true, "Thanks! Your message was sent.");
          form.reset();
          playDing();
        })
        .catch(()=> showMessage(false,"Something went wrong."));
    });
  })();

  // ========== Task: Account Authentication (account.html) ==========
  (function accountAuth(){
    if (!location.pathname.endsWith("account.html")) return;

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const profileSection = document.getElementById("profileSection");
    const authSection = document.getElementById("authSection");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");
    const profileMembership = document.getElementById("profileMembership");
    const logoutBtn = document.getElementById("logoutBtn");

    function getUsers(){
      try {
        return JSON.parse(localStorage.getItem("users") || "[]");
      } catch {
        return [];
      }
    }
    function saveUsers(users){
      localStorage.setItem("users", JSON.stringify(users));
    }
    function getCurrentUser(){
      const email = localStorage.getItem("currentUser");
      if (!email) return null;
      return getUsers().find(u => u.email === email) || null;
    }
    function setCurrentUser(email){
      if (email) localStorage.setItem("currentUser", email);
      else localStorage.removeItem("currentUser");
    }

    function showProfile(user){
      if (!user || !profileSection || !authSection) return;
      authSection.style.display = "none";
      profileSection.style.display = "";
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
      profilePhone.textContent = user.phone || "—";
      const savedPlan = localStorage.getItem("membershipPlan");
      profileMembership.textContent = user.membership || savedPlan || "Free";
    }

    function showAuth(){
      if (!profileSection || !authSection) return;
      profileSection.style.display = "none";
      authSection.style.display = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-()\s]{7,}$/;

    if (signupForm) {
      signupForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const name = signupForm.fullName;
        const email = signupForm.email;
        const phone = signupForm.phone;
        const password = signupForm.password;
        const confirm = signupForm.confirmPassword;

        let valid = true;

        function setError(el, msg){
          const msgEl = el.nextElementSibling;
          if (msgEl) msgEl.textContent = msg;
          if (msg) {
            el.classList.add("input-error");
            valid = false;
          } else {
            el.classList.remove("input-error");
          }
        }

        setError(name, "");
        setError(email, "");
        setError(phone, "");
        setError(password, "");
        setError(confirm, "");

        if (!name.value.trim()) setError(name, "Name is required");
        if (!email.value.trim()) setError(email, "Email is required");
        else if (!emailPattern.test(email.value.trim())) setError(email, "Invalid email");

        if (!phone.value.trim()) setError(phone, "Phone is required");
        else if (!phonePattern.test(phone.value.trim())) setError(phone, "Invalid phone number");

        if (!password.value.trim()) setError(password, "Password is required");
        else if (password.value.length < 8) setError(password, "At least 8 characters");
        else if (!/[A-Za-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
          setError(password, "Use letters and numbers");
        }

        if (password.value !== confirm.value) {
          setError(confirm, "Passwords do not match");
        }

        if (!valid) return;

        const users = getUsers();
        if (users.some(u => u.email.toLowerCase() === email.value.trim().toLowerCase())) {
          setError(email, "User with this email already exists");
          return;
        }

        const newUser = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          password: password.value,
          membership: "Free"
        };
        users.push(newUser);
        saveUsers(users);
        setCurrentUser(newUser.email);
        signupForm.reset();
        alert("Account created! You are now logged in.");
        showProfile(newUser);
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const email = loginForm.loginEmail;
        const password = loginForm.loginPassword;

        let valid = true;
        function setError(el, msg){
          const msgEl = el.nextElementSibling;
          if (msgEl) msgEl.textContent = msg;
          if (msg) {
            el.classList.add("input-error");
            valid = false;
          } else {
            el.classList.remove("input-error");
          }
        }

        setError(email, "");
        setError(password, "");

        if (!email.value.trim()) setError(email, "Email is required");
        else if (!emailPattern.test(email.value.trim())) setError(email, "Invalid email");

        if (!password.value.trim()) setError(password, "Password is required");

        if (!valid) return;

        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.value.trim().toLowerCase());
        if (!user || user.password !== password.value) {
          setError(password, "Incorrect email or password");
          return;
        }

        setCurrentUser(user.email);
        loginForm.reset();
        alert("Welcome back!");
        showProfile(user);
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        setCurrentUser(null);
        showAuth();
      });
    }

    const existing = getCurrentUser();
    if (existing) {
      showProfile(existing);
    } else {
      showAuth();
    }
  })();

  // ========== Task: Membership buttons (membership.html) ==========
  (function membershipPlans(){
    if (!location.pathname.endsWith("membership.html")) return;

    function getUsers(){
      try {
        return JSON.parse(localStorage.getItem("users") || "[]");
      } catch {
        return [];
      }
    }
    function saveUsers(users){
      localStorage.setItem("users", JSON.stringify(users));
    }
    function getCurrentUser(){
      const email = localStorage.getItem("currentUser");
      if (!email) return null;
      return getUsers().find(u => u.email === email) || null;
    }

    function updateMembershipForCurrent(plan){
      const email = localStorage.getItem("currentUser");
      if (!email) return;
      const users = getUsers();
      const idx = users.findIndex(u => u.email === email);
      if (idx !== -1) {
        users[idx].membership = plan;
        saveUsers(users);
      }
    }

    const freeBtn = document.querySelector("[data-plan='Free']");
    const memberBtn = document.querySelector("[data-plan='Member']");
    const teamBtn = document.querySelector("[data-plan='Team']");

    if (freeBtn) {
      freeBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        localStorage.setItem("membershipPlan", "Free");
        updateMembershipForCurrent("Free");
        alert("You selected the Free plan. It will be shown in your account.");
        window.location.href = "account.html";
      });
    }
    if (memberBtn) {
      memberBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        localStorage.setItem("membershipPlan", "Member");
        updateMembershipForCurrent("Member");
        alert("Thanks for choosing Member plan! (Simulation for this project.)");
        window.location.href = "account.html";
      });
    }
    if (teamBtn) {
      teamBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        localStorage.setItem("membershipPlan", "Team");
        alert("Tell us about your team — we redirected you to the contact form.");
        window.location.href = "contact.html";
      });
    }
  })();

  // ========== Task: Book actions (demo handlers) ==========
  (function bookActions(){
    const readButtons = document.querySelectorAll("[data-action='read-online']");
    const downloadButtons = document.querySelectorAll("[data-action='download-pdf']");
    if (!readButtons.length && !downloadButtons.length) return;

    readButtons.forEach(btn => {
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        alert("In a real app this would open the full book for reading. For this project, it is a demo action.");
      });
    });
    downloadButtons.forEach(btn => {
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        alert("In a real app this would download the PDF. For this project, it is a demo action.");
      });
    });
  })();
});

//  Assignment 7 — jQuery Features
if (typeof $ !== "undefined") {
$(document).ready(function () {
  console.log("Assignment 7 jQuery features active ");


  //  Scroll progress bar (all pages)
  $("body").append(`<div id="scrollProgress" style="
    position:fixed;top:0;left:0;width:0%;height:5px;
    background:#00ff7f;z-index:2000;"></div>`);
  
  $(window).on("scroll", function () {
    const max = $(document).height() - $(window).height();
    const percent = ($(window).scrollTop() / max) * 100;
    $("#scrollProgress").css("width", percent + "%");
  });


  //  FAQ search + highlight
  if ($("title").text().includes("FAQ")) {
    $(".container-narrow").prepend(`
      <input id="faqSearch" class="input"
        placeholder="Search FAQ..."
        style="margin-bottom:1rem;border:2px solid var(--accent)">
    `);

    const savedFaq = localStorage.getItem("faqSearch") || "";
    function applyFaqSearch(value) {
      const val = (value || "").toLowerCase();
      $("details").each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(val));

        const content = $(this).find("p");
        const original = content.text();
        if (!val.trim()) {
          content.html(original);
          return;
        }
        content.html(original.replace(
          new RegExp(val, "gi"),
          m => `<mark style="background:yellow">${m}</mark>`
        ));
      });
    }

    $("#faqSearch").on("keyup", function () {
      const value = $(this).val();
      localStorage.setItem("faqSearch", value);
      applyFaqSearch(value);
    });

    if (savedFaq) {
      $("#faqSearch").val(savedFaq);
      applyFaqSearch(savedFaq);
    }
  }


//  Homepage Stats
//  if ($("title").text().includes("Online Library —")) {
//     $(".hero").after(`
//       <section class="stats" style="text-align:center;margin:3rem 0;">
//         <h2>Library Stats</h2>
//         <div class="grid"
//           style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
//           <div><span class="num" data-target="10000">0</span><p class="muted">Books</p></div>
//           <div><span class="num" data-target="4000">0</span><p class="muted">Members</p></div>
//           <div><span class="num" data-target="25000">0</span><p class="muted">Downloads</p></div>
//         </div>
//       </section>
//     `);

//     function animateNumbers() {
//       $(".num").each(function () {
//         const target = +$(this).data("target");
//         $({ countNum: 1 }).animate(
//           { countNum: target },
//           {
//             duration: 2000,
//             easing: "swing",
//             step: function () {
//               $(this).text(Math.floor(this.countNum));
//             },
//             complete: function () {
//               $(this).text(this.countNum + "+");
//             }
//           }
//         );
//       });
//     }
//     animateNumbers();
//   }


  //  Lazy loading all images
  $("img").each(function () {
    const src = $(this).attr("src");
    $(this).attr("data-src", src);
    $(this).removeAttr("src");
  });

  function lazyLoad() {
    $("img").each(function () {
      const top = $(this).offset().top;
      const h = $(window).height();
      const scroll = $(window).scrollTop();
      if (top < scroll + h + 150) {
        $(this).attr("src", $(this).data("src"));
      }
    });
  }
  $(window).on("scroll", lazyLoad);
  lazyLoad();


  //  Toast notification for book interactions
  $("body").append(`
    <div id="toast"
      style="position:fixed;bottom:2rem;right:2rem;
      padding:.7rem 1rem;background:#27c46b;color:white;
      border-radius:.5rem;display:none;z-index:2000;">
       Successfully copied!
    </div>`);

  function showToast() {
    $("#toast").fadeIn(200).delay(1200).fadeOut(300);
  }

  if (location.pathname.includes("book-")) {
    //  Copy description button with toast
    $("article.card").append(`
      <button id="copyDesc" class="btn ghost"
        style="margin-top:1rem;">Copy Description</button>`);

    $("#copyDesc").on("click", function (e) {
      e.preventDefault();
      const text = $("article.card p.muted:first").text();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
      showToast();
    });
  }


  //  Contact — spinner on submit
  // if ($("title").text().includes("Contact")) {
  //   $("form button.btn").on("click", function () {
  //     const btn = $(this);
  //     btn.prop("disabled", true)
  //       .html(`<span class="spinner-border spinner-border-sm"></span> Loading...`);
    
  //     setTimeout(() => {
  //       btn.prop("disabled", false).text("Send");
  //     }, 1500);
  //   });
  // }
});
}

