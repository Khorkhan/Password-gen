(function () {
  'use strict';

  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const translations = {
    th: {
      title: 'Password Generator & Strength Checker',
      subtitle: 'สร้างรหัสผ่านที่แข็งแกร่งและตรวจสอบความปลอดภัย',
      generateTitle: '🔐 สร้างรหัสผ่าน',
      generatedPlaceholder: 'รหัสผ่านจะแสดงที่นี่',
      copyTitle: 'คัดลอก',
      lengthLabel: 'ความยาว:',
      uppercaseLabel: 'ตัวอักษรใหญ่ (A-Z)',
      lowercaseLabel: 'ตัวอักษรเล็ก (a-z)',
      numbersLabel: 'ตัวเลข (0-9)',
      symbolsLabel: 'สัญลักษณ์ (!@#$...)',
      generateBtn: 'สร้างรหัสผ่านใหม่',
      selectOneOption: 'เลือกอย่างน้อย 1 ตัวเลือก',
      checkerTitle: '🛡️ ตรวจสอบความแข็งแกร่ง',
      checkerDesc: 'พิมพ์รหัสผ่านของคุณเองด้านล่าง (หรือวางจากช่องสร้างรหัสผ่าน) ระบบจะแสดงระดับความแข็งแกร่งและคำแนะนำ',
      checkPlaceholder: 'พิมพ์หรือวางรหัสผ่านที่นี่',
      confirmPlaceholder: 'ยืนยันรหัสผ่าน (พิมพ์ซ้ำเพื่อตรวจสอบ)',
      toggleVisibility: 'แสดง/ซ่อน',
      matchOk: '✓ รหัสผ่านตรงกัน',
      matchFail: '✗ รหัสผ่านไม่ตรงกัน กรุณาพิมพ์ให้ตรงกับช่องแรก',
      strengthWeak: 'อ่อนแอ',
      strengthFair: 'ปานกลาง',
      strengthGood: 'ดี',
      strengthStrong: 'แข็งแกร่ง',
      feedbackLen8: 'ความยาวอย่างน้อย 8 ตัวอักษร',
      feedbackLen8Hint: 'ควรมีอย่างน้อย 8 ตัวอักษร',
      feedbackLen12: 'ความยาว 12 ตัวอักษรขึ้นไป',
      feedbackLen16: 'ความยาว 16 ตัวอักษรขึ้นไป',
      feedbackMixedCase: 'มีทั้งตัวเล็กและตัวใหญ่',
      feedbackMixedCaseHint: 'ควรมีทั้งตัวเล็กและตัวใหญ่',
      feedbackNumber: 'มีตัวเลข',
      feedbackNumberHint: 'ควรมีตัวเลข',
      feedbackSymbol: 'มีสัญลักษณ์',
      feedbackSymbolHint: 'ควรมีสัญลักษณ์ (!@#$...)',
      footerTip: 'ใช้รหัสผ่านที่ยาวและหลากหลายเพื่อความปลอดภัยที่ดีขึ้น',
    },
    en: {
      title: 'Password Generator & Strength Checker',
      subtitle: 'Create strong passwords and check their security',
      generateTitle: '🔐 Generate Password',
      generatedPlaceholder: 'Password will appear here',
      copyTitle: 'Copy',
      lengthLabel: 'Length:',
      uppercaseLabel: 'Uppercase (A-Z)',
      lowercaseLabel: 'Lowercase (a-z)',
      numbersLabel: 'Numbers (0-9)',
      symbolsLabel: 'Symbols (!@#$...)',
      generateBtn: 'Generate New Password',
      selectOneOption: 'Select at least one option',
      checkerTitle: '🛡️ Check Strength',
      checkerDesc: 'Type or paste your password below to see its strength and get tips.',
      checkPlaceholder: 'Type or paste password here',
      confirmPlaceholder: 'Confirm password (type again to verify)',
      toggleVisibility: 'Show / Hide',
      matchOk: '✓ Passwords match',
      matchFail: '✗ Passwords do not match. Please type the same as above.',
      strengthWeak: 'Weak',
      strengthFair: 'Fair',
      strengthGood: 'Good',
      strengthStrong: 'Strong',
      feedbackLen8: 'At least 8 characters',
      feedbackLen8Hint: 'Should have at least 8 characters',
      feedbackLen12: '12+ characters',
      feedbackLen16: '16+ characters',
      feedbackMixedCase: 'Has upper and lower case',
      feedbackMixedCaseHint: 'Should have upper and lower case',
      feedbackNumber: 'Has numbers',
      feedbackNumberHint: 'Should have numbers',
      feedbackSymbol: 'Has symbols',
      feedbackSymbolHint: 'Should have symbols (!@#$...)',
      footerTip: 'Use long and varied passwords for better security.',
    },
  };

  let currentLang = (function () {
    try {
      const saved = localStorage.getItem('pwgen-lang');
      return saved === 'en' ? 'en' : 'th';
    } catch (e) {
      return 'th';
    }
  })();

  function tr(key) {
    return translations[currentLang][key] || key;
  }

  function setLang(lang) {
    if (lang !== 'th' && lang !== 'en') return;
    currentLang = lang;
    try {
      localStorage.setItem('pwgen-lang', lang);
    } catch (e) {}
    document.documentElement.lang = lang === 'th' ? 'th' : 'en';
    document.title = tr('title');
    applyTranslations();
    if (elements.langTh) {
      elements.langTh.classList.toggle('active', lang === 'th');
      elements.langTh.setAttribute('aria-pressed', lang === 'th');
    }
    if (elements.langEn) {
      elements.langEn.classList.toggle('active', lang === 'en');
      elements.langEn.setAttribute('aria-pressed', lang === 'en');
    }
    updateDynamicMessages();
  }

  function applyTranslations() {
    const L = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (L[key]) el.textContent = L[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (L[key]) el.placeholder = L[key];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      if (L[key]) el.title = L[key];
    });
  }

  function updateDynamicMessages() {
    if (elements.generatedPassword && !elements.generatedPassword.value) {
      elements.generatedPassword.placeholder = tr('generatedPlaceholder');
    }
    if (elements.checkPassword && elements.checkPassword.value) {
      checkStrength(elements.checkPassword.value);
    }
    if (elements.confirmPassword && elements.confirmPassword.value) {
      checkMatch();
    }
  }

  const elements = {
    generatedPassword: document.getElementById('generated-password'),
    copyBtn: document.getElementById('copy-btn'),
    length: document.getElementById('length'),
    lengthValue: document.getElementById('length-value'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
    generateBtn: document.getElementById('generate-btn'),
    langTh: document.getElementById('lang-th'),
    langEn: document.getElementById('lang-en'),
    checkPassword: document.getElementById('check-password'),
    confirmPassword: document.getElementById('confirm-password'),
    toggleVisibility: document.getElementById('toggle-visibility'),
    toggleConfirmVisibility: document.getElementById('toggle-confirm-visibility'),
    matchMessage: document.getElementById('match-message'),
    strengthBar: document.getElementById('strength-bar'),
    strengthLabel: document.getElementById('strength-label'),
    feedbackList: document.getElementById('feedback-list'),
  };

  function getCharacterSet() {
    let set = '';
    if (elements.uppercase.checked) set += UPPERCASE;
    if (elements.lowercase.checked) set += LOWERCASE;
    if (elements.numbers.checked) set += NUMBERS;
    if (elements.symbols.checked) set += SYMBOLS;
    return set;
  }

  function generatePassword() {
    const len = parseInt(elements.length.value, 10);
    const set = getCharacterSet();
    if (!set) {
      elements.generatedPassword.value = '';
      elements.generatedPassword.placeholder = tr('selectOneOption');
      return;
    }
    let result = '';
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    for (let i = 0; i < len; i++) {
      result += set[arr[i] % set.length];
    }
    elements.generatedPassword.value = result;
    elements.generatedPassword.placeholder = tr('generatedPlaceholder');
    updateStrengthChecker(result);
  }

  function updateStrengthChecker(value) {
    if (!elements.checkPassword) return;
    elements.checkPassword.value = value;
    elements.checkPassword.type = 'password';
    if (elements.confirmPassword) {
      elements.confirmPassword.value = '';
      elements.confirmPassword.type = 'password';
      updateMatchMessage('', '');
    }
    checkStrength(value);
  }

  function updateMatchMessage(text, state) {
    const el = elements.matchMessage;
    if (!el) return;
    el.textContent = text;
    el.className = 'match-message' + (state ? ' ' + state : '');
  }

  function checkMatch() {
    const pw = elements.checkPassword.value;
    const confirm = elements.confirmPassword.value;
    if (!confirm) {
      updateMatchMessage('', '');
      return;
    }
    if (pw === confirm) {
      updateMatchMessage(tr('matchOk'), 'match');
    } else {
      updateMatchMessage(tr('matchFail'), 'mismatch');
    }
  }

  function copyToClipboard() {
    const pw = elements.generatedPassword.value;
    if (!pw) return;
    navigator.clipboard.writeText(pw).then(() => {
      const btn = elements.copyBtn;
      const prev = btn.querySelector('.icon').textContent;
      btn.querySelector('.icon').textContent = '✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.querySelector('.icon').textContent = prev;
        btn.disabled = false;
      }, 1500);
    });
  }

  function checkStrength(password) {
    const bar = elements.strengthBar;
    const label = elements.strengthLabel;
    const list = elements.feedbackList;

    bar.className = 'strength-bar';
    label.className = 'strength-label';
    label.textContent = '—';
    list.innerHTML = '';

    if (!password) {
      return;
    }

    let score = 0;
    const feedback = [];

    if (password.length >= 8) {
      score += 1;
      feedback.push({ text: tr('feedbackLen8'), valid: true });
    } else {
      feedback.push({ text: tr('feedbackLen8Hint'), valid: false });
    }
    if (password.length >= 12) {
      score += 1;
      feedback.push({ text: tr('feedbackLen12'), valid: true });
    }
    if (password.length >= 16) {
      score += 1;
      feedback.push({ text: tr('feedbackLen16'), valid: true });
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
      feedback.push({ text: tr('feedbackMixedCase'), valid: true });
    } else {
      feedback.push({ text: tr('feedbackMixedCaseHint'), valid: false });
    }
    if (/\d/.test(password)) {
      score += 1;
      feedback.push({ text: tr('feedbackNumber'), valid: true });
    } else {
      feedback.push({ text: tr('feedbackNumberHint'), valid: false });
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
      feedback.push({ text: tr('feedbackSymbol'), valid: true });
    } else {
      feedback.push({ text: tr('feedbackSymbolHint'), valid: false });
    }

    const level = score <= 2 ? 'weak' : score <= 4 ? 'fair' : score <= 5 ? 'good' : 'strong';
    const labels = {
      weak: tr('strengthWeak'),
      fair: tr('strengthFair'),
      good: tr('strengthGood'),
      strong: tr('strengthStrong'),
    };

    bar.classList.add(level);
    label.classList.add(level);
    label.textContent = labels[level];

    feedback.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.text;
      if (item.valid) li.classList.add('valid');
      list.appendChild(li);
    });
  }

  function toggleVisibility() {
    const input = elements.checkPassword;
    const icon = elements.toggleVisibility.querySelector('.icon');
    if (input.type === 'password') {
      input.type = 'text';
      icon.textContent = '🙈';
    } else {
      input.type = 'password';
      icon.textContent = '👁️';
    }
  }

  function toggleConfirmVisibility() {
    const input = elements.confirmPassword;
    const icon = elements.toggleConfirmVisibility.querySelector('.icon');
    if (input.type === 'password') {
      input.type = 'text';
      icon.textContent = '🙈';
    } else {
      input.type = 'password';
      icon.textContent = '👁️';
    }
  }

  elements.length.addEventListener('input', () => {
    elements.lengthValue.textContent = elements.length.value;
  });

  elements.generateBtn.addEventListener('click', generatePassword);
  elements.copyBtn.addEventListener('click', copyToClipboard);

  elements.checkPassword.addEventListener('input', () => {
    checkStrength(elements.checkPassword.value);
    checkMatch();
  });

  elements.checkPassword.addEventListener('paste', () => {
    setTimeout(() => {
      checkStrength(elements.checkPassword.value);
      checkMatch();
    }, 0);
  });

  elements.confirmPassword.addEventListener('input', checkMatch);
  elements.confirmPassword.addEventListener('paste', () => setTimeout(checkMatch, 0));

  elements.toggleVisibility.addEventListener('click', toggleVisibility);
  elements.toggleConfirmVisibility.addEventListener('click', toggleConfirmVisibility);

  if (elements.langTh) {
    elements.langTh.addEventListener('click', function () {
      setLang('th');
      elements.langTh.classList.add('active');
      elements.langTh.setAttribute('aria-pressed', 'true');
      if (elements.langEn) {
        elements.langEn.classList.remove('active');
        elements.langEn.setAttribute('aria-pressed', 'false');
      }
    });
  }
  if (elements.langEn) {
    elements.langEn.addEventListener('click', function () {
      setLang('en');
      elements.langEn.classList.add('active');
      elements.langEn.setAttribute('aria-pressed', 'true');
      if (elements.langTh) {
        elements.langTh.classList.remove('active');
        elements.langTh.setAttribute('aria-pressed', 'false');
      }
    });
  }

  setLang(currentLang);

  elements.lengthValue.textContent = elements.length.value;
  generatePassword();
})();
