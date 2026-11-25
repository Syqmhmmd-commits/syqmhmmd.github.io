document.addEventListener('DOMContentLoaded', () => {
  
  // Fungsi Pencegah XSS
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // 1. Terminal Typing Effect (Hormati Reduced Motion)
  const phrases = [
    "make -j$(nproc) ARCH=arm64",
    "llvm-objdump -d vmlinux | grep probe",
    "git commit -m 'fix: dead code elimination'",
    "echo 'System Ready.'"
  ];
  
  const typedEl = document.getElementById('typed-cmd');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    typedEl.textContent = "echo 'System Ready.'";
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 30 : 70;
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }
      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
  }

  // 2. Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3. AUTO-FETCH GITHUB REPOSITORIES + FALLBACK
  async function fetchGithubRepos() {
    const container = document.getElementById('github-repos');
    const CACHE_KEY = 'gh_repos_data';
    const CACHE_TTL = 1000 * 60 * 60; // 1 jam

    // Cek Cache
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, time } = JSON.parse(cached);
        if (Date.now() - time < CACHE_TTL) {
          renderRepos(data);
          return;
        }
      }
    } catch (e) {
      console.warn('LocalStorage blocked or unavailable.');
    }

    // Fetch dengan Timeout (AbortController)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 detik timeout

    try {
      const res = await fetch('https://api.github.com/users/Syqmhmmd-commits/repos?sort=updated&per_page=6', { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('API Rate Limit');
      const repos = await res.json();
      
      // Simpan ke Cache
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: repos, time: Date.now() }));
      } catch (e) {
        console.warn('Failed to save to cache (Storage full/blocked).');
      }
      
      renderRepos(repos);
    } catch (error) {
      console.warn('GitHub API Failed or Timeout. Using static fallback data.');
      renderFallbackRepos(); 
    }
  }

  function renderRepos(repos) {
    const container = document.getElementById('github-repos');
    container.innerHTML = ''; 

    if (repos.length === 0) {
      container.innerHTML = `<div class="log-line">[!] No repositories found.</div>`;
      return;
    }

    repos.forEach(repo => {
      // Sanitasi data dari API (Mencegah XSS)
      const repoName = escapeHTML(repo.name.replace(/-/g, ' '));
      const lang = escapeHTML(repo.language || 'Unknown');
      const desc = escapeHTML(repo.description || 'No description provided.');
      const htmlUrl = escapeHTML(repo.html_url);
      const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      const html = `
        <a href="${htmlUrl}" target="_blank" rel="noopener noreferrer" class="proj-item">
          <div class="proj-header">
            <h3>${repoName}</h3>
            <span class="tag">${repo.archived ? 'ARCHIVED' : 'ACTIVE'}</span>
          </div>
          <p>${desc}</p>
          <div class="proj-meta">${lang} • Updated ${updated} • ⭐ ${repo.stargazers_count}</div>
        </a>
      `;
      container.insertAdjacentHTML('beforeend', html);
    });
  }

  // Fallback Data (Bebas dari tanggal/star hardcode agar tidak basi)
  function renderFallbackRepos() {
    const container = document.getElementById('github-repos');
    const fallbackHTML = `
      <div class="log-line" style="color: var(--accent); margin-bottom: 12px;">[!] API Limit Reached. Showing cached snapshot.</div>
      <a href="https://github.com/Syqmhmmd-commits/Source-rosemary-MT6785" target="_blank" rel="noopener noreferrer" class="proj-item">
        <div class="proj-header">
          <h3>Source rosemary MT6785</h3>
          <span class="tag">ACTIVE</span>
        </div>
        <p>Mainline kernel source for Redmi Note 10S (MT6785). Includes GPU OC up to 950MHz, HMP tweaks, and the BQ2597x Clang DCE fix.</p>
        <div class="proj-meta">C • Kernel Source</div>
      </a>
      <a href="https://github.com/Syqmhmmd-commits/StormTerror-Rosemary-BBRv3" target="_blank" rel="noopener noreferrer" class="proj-item">
        <div class="proj-header">
          <h3>StormTerror Rosemary BBRv3</h3>
          <span class="tag">ACTIVE</span>
        </div>
        <p>Performance-focused kernel build. Pre-compiled release with BBRv3 TCP congestion control.</p>
        <div class="proj-meta">C • Kernel Release</div>
      </a>
      <a href="https://github.com/Syqmhmmd-commits/4.19-android-Rosemary-bbr3" target="_blank" rel="noopener noreferrer" class="proj-item">
        <div class="proj-header">
          <h3>4.19 android Rosemary bbr3</h3>
          <span class="tag">ACTIVE</span>
        </div>
        <p>Source code repository for StormTerror Kernel. Backported BBRv3 from latest upstream.</p>
        <div class="proj-meta">C • Kernel Source</div>
      </a>
      <a href="https://github.com/Syqmhmmd-commits/Kronos-Rosemary-Kernel" target="_blank" rel="noopener noreferrer" class="proj-item">
        <div class="proj-header">
          <h3>Kronos Rosemary Kernel</h3>
          <span class="tag">ACTIVE</span>
        </div>
        <p>Feature-rich kernel (Linux 4.19.325). Supports I/O schedulers, KernelSU-Next, and fast charging.</p>
        <div class="proj-meta">C • Custom Kernel</div>
      </a>
    `;
    container.innerHTML = fallbackHTML;
  }

  fetchGithubRepos();
});