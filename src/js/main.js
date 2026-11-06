// A24 Films - Main JavaScript
// Handles navigation, film switching, dissolve effect, and trailer lightbox

// ============================================
// NAVIGATION DROPDOWN
// ============================================
function initNavDropdown() {
  const nav = document.querySelector('.nav');
  const dropdownToggle = nav.querySelector('[data-dropdown-toggle]');
  const dropdown = nav.querySelector('.nav-dropdown');
  const navCenter = nav.querySelector('.nav-center');
  const navCenterList = nav.querySelector('.nav-center__list');
  const pageBg = nav.querySelector('.page-bg');
  const navBg = nav.querySelector('.nav-bg');
  const dropdownIcon = dropdownToggle.querySelector('.nav-link__dropdown-icon');

  let isOpen = false;

  function openDropdown() {
    isOpen = true;
    nav.classList.add('nav-open');
    dropdown.style.height = 'var(--nav-open-height)';
    dropdown.style.opacity = '1';
    dropdown.style.visibility = 'visible';
    dropdown.style.pointerEvents = 'auto';
    navBg.style.height = 'var(--nav-open-height)';
    navBg.style.width = 'var(--nav-dock-open-width)';
    navCenter.style.opacity = '0';
    navCenter.style.visibility = 'hidden';
    navCenter.style.transform = 'translateY(1em)';
    pageBg.style.opacity = '1';
    dropdownIcon.style.transform = 'rotate(180deg)';
    dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    isOpen = false;
    nav.classList.remove('nav-open');
    dropdown.style.height = '0';
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'hidden';
    dropdown.style.pointerEvents = 'none';
    navBg.style.height = 'var(--nav-dock-height)';
    navBg.style.width = 'var(--nav-dock-width, 100%)';
    navCenter.style.opacity = '1';
    navCenter.style.visibility = 'visible';
    navCenter.style.transform = 'none';
    pageBg.style.opacity = '0';
    dropdownIcon.style.transform = 'rotate(0deg)';
    dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (isOpen && !nav.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDropdown();
    }
  });

  // Dropdown link hover effects
  const dropdownLinks = dropdown.querySelectorAll('.nav-dropdown__link');
  dropdownLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.color = 'var(--nav-active-text)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.color = '';
    });
  });
}

// ============================================
// FILM DATA & SWITCHING
// ============================================
const FILMS_DATA = [
  {
    slug: 'backrooms',
    title: 'Backrooms',
    directors: ['Kane Parsons'],
    year: '2026',
    starring: ['Chiwetel Ejiofor', 'Renate Reinsve'],
    discArtUrl: 'src/images/backrooms.webp',
    discArtAlt: 'Backrooms disc artwork',
    detailUrl: '/production/backrooms',
    reviews: [
      { publication: 'The Playlist', testimonial: 'Something Far More Haunting', stars: 5 },
      { publication: 'The Daily Beast', testimonial: 'Casts A Surrealistic Spell', stars: 4.5 }
    ]
  },
  {
    slug: 'the-invite',
    title: 'The Invite',
    directors: ['Olivia Wilde'],
    year: '2026',
    starring: ['Seth Rogen', 'Olivia Wilde', 'Penélope Cruz', 'Edward Norton'],
    discArtUrl: 'src/images/the-invite.webp',
    discArtAlt: 'The Invite disc artwork',
    detailUrl: '/production/the-invite',
    reviews: [
      { publication: 'The Times', testimonial: 'Award-Worthy, Dazzling Sex Comedy', stars: 5 },
      { publication: 'Los Angeles Times', testimonial: 'Wincing Laughs Of Recognition', stars: 4.5 }
    ]
  },
  {
    slug: 'tony',
    title: 'Tony',
    directors: ['Matt Johnson'],
    year: '2026',
    starring: ['Dominic Sessa', 'Emilia Jones', 'Leo Woodall', 'Antonio Banderas', 'Stavros Halkias'],
    discArtUrl: 'src/images/tony.webp',
    discArtAlt: 'Tony disc artwork',
    detailUrl: '/production/tony',
    reviews: [
      { publication: 'Consequence', testimonial: 'Power Of The Unexpected', stars: 4.5 },
      { publication: 'The Globe and Mail', testimonial: 'Rich One-Perfect-Summer Cinema', stars: 4.5 }
    ]
  },
  {
    slug: 'marty-supreme',
    title: 'Marty Supreme',
    directors: ['Josh Safdie'],
    year: '2025',
    starring: ['Timothée Chalamet', 'Gwyneth Paltrow', "Kevin O'Leary", 'Odessa A\'zion', 'Abel Ferrara'],
    discArtUrl: 'src/images/marty-supreme.webp',
    discArtAlt: 'Marty Supreme disc artwork',
    detailUrl: '/production/marty-supreme',
    reviews: [
      { publication: 'Variety', testimonial: "One Of Year's Masterpieces", stars: 5 },
      { publication: 'Slashfilm', testimonial: "Chalamet's Best Career Performance", stars: 5 }
    ]
  },
  {
    slug: 'the-smashing-machine',
    title: 'The Smashing Machine',
    directors: ['Benny Safdie'],
    year: '2025',
    starring: ['Dwayne Johnson', 'Emily Blunt'],
    discArtUrl: 'src/images/the-smashing-machine.webp',
    discArtAlt: 'The Smashing Machine disc artwork',
    detailUrl: '/production/the-smashing-machine',
    reviews: [
      { publication: 'Variety', testimonial: 'Subtler And More Moving', stars: 4.5 },
      { publication: 'Austin Chronicle', testimonial: 'A Surprisingly Gentle Giant', stars: 4.5 }
    ]
  },
  {
    slug: 'the-brutalist',
    title: 'The Brutalist',
    directors: ['Brady Corbet'],
    year: '2024',
    starring: ['Adrien Brody', 'Felicity Jones', 'Guy Pearce', 'Joe Alwyn', 'Raffey Cassidy'],
    discArtUrl: 'src/images/the-brutalist.webp',
    discArtAlt: 'The Brutalist disc artwork',
    detailUrl: '/production/the-brutalist',
    reviews: [
      { publication: 'The Guardian', testimonial: 'Thrilling Directness And Storytelling Force', stars: 5 },
      { publication: 'Rolling Stone', testimonial: 'Storytelling Chops, Nerve And Verve', stars: 5 }
    ]
  },
  {
    slug: 'the-zone-of-interest',
    title: 'The Zone of Interest',
    directors: ['Jonathan Glazer'],
    year: '2023',
    starring: ['Sandra Hüller', 'Christian Friedel'],
    discArtUrl: 'src/images/the-zone-of-interest.webp',
    discArtAlt: 'The Zone of Interest disc artwork',
    detailUrl: '/production/the-zone-of-interest',
    reviews: [
      { publication: 'Variety', testimonial: 'Chilling And Profound', stars: 5 },
      { publication: 'Time', testimonial: 'Devastating In The Quietest Way', stars: 5 }
    ]
  },
  {
    slug: 'everything-everywhere-all-at-once',
    title: 'Everything Everywhere All at Once',
    directors: ['Daniel Kwan', 'Daniel Scheinert'],
    year: '2022',
    starring: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan', 'Jenny Slate', 'Harry Shum Jr.'],
    discArtUrl: 'src/images/everything-everywhere-all-at-once.webp',
    discArtAlt: 'Everything Everywhere All at Once disc artwork',
    detailUrl: '/production/everything-everywhere-all-at-once',
    reviews: [
      { publication: 'The New York Times', testimonial: 'Galaxy-Brain Head Trip', stars: 5 },
      { publication: 'IndieWire', testimonial: 'An Orgiastic Work Of Slaphappy Genius', stars: 5 }
    ]
  },
  {
    slug: 'uncut-gems',
    title: 'Uncut Gems',
    directors: ['Josh Safdie', 'Benny Safdie'],
    year: '2019',
    starring: ['Adam Sandler', 'Lakeith Stanfield', 'Julia Fox', 'Kevin Garnett', 'Idina Menzel'],
    discArtUrl: 'src/images/uncut-gems.webp',
    discArtAlt: 'Uncut Gems disc artwork',
    detailUrl: '/production/uncut-gems',
    reviews: [
      { publication: 'Variety', testimonial: 'Locked Inside The Pinwheeling Brain', stars: 5 },
      { publication: 'RogerEbert.com', testimonial: 'Delusion Feeds Addiction', stars: 5 }
    ]
  },
  {
    slug: 'hereditary',
    title: 'Hereditary',
    directors: ['Ari Aster'],
    year: '2018',
    starring: ['Toni Collette', 'Alex Wolff', 'Milly Shapiro', 'Ann Dowd', 'Gabriel Byrne'],
    discArtUrl: 'src/images/hereditary.webp',
    discArtAlt: 'Hereditary disc artwork',
    detailUrl: '/production/hereditary',
    reviews: [
      { publication: 'The Guardian', testimonial: 'A Brilliant Machine For Scaring Us', stars: 5 },
      { publication: 'RogerEbert.com', testimonial: 'Creepy Beyond Belief', stars: 5 }
    ]
  },
  {
    slug: 'lady-bird',
    title: 'Lady Bird',
    directors: ['Greta Gerwig'],
    year: '2017',
    starring: ['Saoirse Ronan', 'Laurie Metcalf', 'Tracy Letts', 'Lucas Hedges', 'Timothée Chalamet'],
    discArtUrl: 'src/images/lady-bird.webp',
    discArtAlt: 'Lady Bird disc artwork',
    detailUrl: '/production/lady-bird',
    reviews: [
      { publication: 'The New York Times', testimonial: 'Never Quite Like This', stars: 5 },
      { publication: 'Los Angeles Times', testimonial: 'As Warm As It Is Smart', stars: 5 }
    ]
  },
  {
    slug: 'ex-machina',
    title: 'Ex Machina',
    directors: ['Alex Garland'],
    year: '2015',
    starring: ['Oscar Isaac', 'Domhnall Gleeson', 'Alicia Vikander'],
    discArtUrl: 'src/images/ex-machina.webp',
    discArtAlt: 'Ex Machina disc artwork',
    detailUrl: '/production/ex-machina',
    reviews: [
      { publication: 'RogerEbert.com', testimonial: 'A Rare And Welcome Exception', stars: 5 },
      { publication: 'Los Angeles Times', testimonial: 'Shrewdly Imagined And Persuasively Made', stars: 5 }
    ]
  }
];

let currentFilmIndex = 0;

function initFilmSwitching() {
  const hero = document.querySelector('.hero');
  const experienceInfo = hero.querySelector('.experience_info');
  const testimonialWrap = hero.querySelector('.testimonial_wrap');
  const experienceCanvas = hero.querySelector('.experience-canvas');
  const filmItems = hero.querySelectorAll('[data-film-item]');
  const navDropdownLinks = document.querySelectorAll('[data-film-scroll]');

  function updateFilmDisplay(film, index) {
    currentFilmIndex = index;

    // Update experience_info
    const titleEl = experienceInfo.querySelector('[data-film-target="title"]');
    const primaryCreditEl = experienceInfo.querySelector('[data-film-target="primary-credit"]');
    const yearEl = experienceInfo.querySelector('[data-film-target="year"]');
    const starringEl = experienceInfo.querySelector('[data-film-target="starring"]');

    if (titleEl) titleEl.textContent = film.title;
    if (primaryCreditEl) primaryCreditEl.textContent = film.directors.join(', ');
    if (yearEl) yearEl.textContent = film.year;
    if (starringEl) starringEl.innerHTML = film.starring.join('<br>');

    // Update testimonials
    const testimonials = testimonialWrap.querySelectorAll('[data-review-target-item]');
    film.reviews.forEach((review, i) => {
      if (testimonials[i]) {
        const starsEl = testimonials[i].querySelector('[data-film-target="review-stars"]');
        const pubEl = testimonials[i].querySelector('[data-film-target="review-publication"]');
        const testEl = testimonials[i].querySelector('[data-film-target="review-testimonial"]');

        if (starsEl) {
          starsEl.innerHTML = '';
          for (let s = 0; s < 5; s++) {
            const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            star.setAttribute('width', '100%');
            star.setAttribute('viewBox', '0 0 11 10');
            star.setAttribute('fill', 'none');
            star.classList.add('star');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M5.24862 0L6.68508 3.53591L10.4972 3.81215L7.62431 6.29834L8.50829 10L5.24862 8.01105L1.98895 10L2.87293 6.29834L0 3.81215L3.81215 3.53591L5.24862 0Z');
            path.setAttribute('fill', s < Math.floor(review.stars) ? 'currentColor' : 'currentColor');
            path.setAttribute('fill-opacity', s < review.stars ? '1' : (review.stars % 1 >= 0.5 && s === Math.floor(review.stars) ? '0.5' : '1'));
            star.appendChild(path);
            starsEl.appendChild(star);
          }
        }
        if (pubEl) pubEl.textContent = review.publication;
        if (testEl) testEl.textContent = review.testimonial;
      }
    });

    // Update active states
    filmItems.forEach((item, i) => {
      item.classList.toggle('w--current', i === index);
    });
    navDropdownLinks.forEach((link, i) => {
      link.classList.toggle('w--current', i === index);
    });

    // Trigger dissolve effect
    triggerDissolve(film.discArtUrl);
  }

  // Click handlers for dropdown links
  navDropdownLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      updateFilmDisplay(FILMS_DATA[index], index);
      // Close dropdown
      const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
      if (dropdownToggle) dropdownToggle.click();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentFilmIndex + 1) % FILMS_DATA.length;
      updateFilmDisplay(FILMS_DATA[nextIndex], nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentFilmIndex - 1 + FILMS_DATA.length) % FILMS_DATA.length;
      updateFilmDisplay(FILMS_DATA[prevIndex], prevIndex);
    }
  });

  // Initialize with first film
  updateFilmDisplay(FILMS_DATA[0], 0);
}

// ============================================
// DISSOLVE CANVAS EFFECT
// ============================================
let dissolveRenderer = null;
let dissolveScene = null;
let dissolveCamera = null;
let dissolveMaterial = null;
let dissolveMesh = null;
let dissolveTime = 0;
let dissolveTargetImage = null;
let dissolveCurrentImage = null;
let dissolveProgress = 0;
let dissolveAnimating = false;
let threeModule = null;

async function loadThreeJS() {
  if (threeModule) return threeModule;
  try {
    threeModule = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    return threeModule;
  } catch (e) {
    console.error('Failed to load Three.js:', e);
    return null;
  }
}

function initDissolveCanvas() {
  const canvasContainer = document.querySelector('[data-disc-canvas]');
  if (!canvasContainer) return;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvasContainer.appendChild(canvas);

  // Initialize Three.js scene
  loadThreeJS().then(THREE => {
    if (!THREE) return;

    const width = canvasContainer.offsetWidth;
    const height = canvasContainer.offsetHeight;

    dissolveRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    dissolveRenderer.setSize(width, height);
    dissolveRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    dissolveScene = new THREE.Scene();
    dissolveCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Dissolve shader material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uNextTexture;
      uniform float uProgress;
      uniform float uTime;
      uniform float uScale;
      uniform float uWarp;
      uniform float uDetail;
      uniform float uMinBlob;
      uniform float uSmooth;
      uniform float uGrid;
      uniform float uSpread;
      uniform float uArc;
      uniform float uMorph;
      varying vec2 vUv;

      float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(rand(i), rand(i + vec2(1.0, 0.0)), f.x),
                   mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        float progress = uProgress;

        // Dissolve noise pattern
        float n = fbm(uv * uScale + uTime * 0.1);
        n = smoothstep(uMinBlob / 100.0, uMinBlob / 100.0 + uSmooth / 100.0, n);

        // Warp
        vec2 warpUv = uv + vec2(sin(uv.y * uWarp * 10.0 + uTime), cos(uv.x * uWarp * 10.0 + uTime)) * uSpread / 1000.0;

        // Cell pattern
        float cells = floor(uv.x * uGrid) + floor(uv.y * uGrid) * uGrid;
        float cellRand = rand(vec2(cells, cells * 17.0));
        float cellProgress = progress + cellRand * uArc;

        // Morph between textures
        vec4 currentColor = texture2D(uTexture, warpUv);
        vec4 nextColor = texture2D(uNextTexture, warpUv);

        // Dissolve mask
        float mask = smoothstep(0.0, 1.0, cellProgress - n * uDetail);

        vec3 color = mix(currentColor.rgb, nextColor.rgb, mask);
        float alpha = mix(currentColor.a, nextColor.a, mask);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    dissolveMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: null },
        uNextTexture: { value: null },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uScale: { value: 230 },
        uWarp: { value: 1.25 },
        uDetail: { value: 0.16 },
        uMinBlob: { value: 45 },
        uSmooth: { value: 1 },
        uGrid: { value: 16 },
        uSpread: { value: 4.5 },
        uArc: { value: 0.3 },
        uMorph: { value: 0.35 }
      },
      transparent: true
    });

    dissolveMesh = new THREE.Mesh(geometry, dissolveMaterial);
    dissolveScene.add(dissolveMesh);

    // Load initial texture
    loadTexture(FILMS_DATA[0].discArtUrl).then(texture => {
      if (dissolveMaterial) {
        dissolveMaterial.uniforms.uTexture.value = texture;
        dissolveCurrentImage = texture;
      }
      animateDissolve();
    });

    // Handle resize
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (dissolveRenderer) {
          dissolveRenderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(canvasContainer);
  });
}

async function loadTexture(url) {
  const THREE = await loadThreeJS();
  if (!THREE) return null;
  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(url, (texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      resolve(texture);
    }, undefined, (err) => {
      console.error('Failed to load texture:', url, err);
      resolve(null);
    });
  });
}

function triggerDissolve(imageUrl) {
  if (dissolveAnimating) return;
  dissolveAnimating = true;
  dissolveProgress = 0;

  loadTexture(imageUrl).then(texture => {
    if (!dissolveMaterial || !texture) {
      dissolveAnimating = false;
      return;
    }

    dissolveMaterial.uniforms.uNextTexture.value = texture;
    dissolveTargetImage = texture;

    // Animate progress
    const duration = 1500; // ms
    const startTime = performance.now();

    function animateProgress(currentTime) {
      const elapsed = currentTime - startTime;
      dissolveProgress = Math.min(elapsed / duration, 1);
      dissolveMaterial.uniforms.uProgress.value = dissolveProgress;

      if (dissolveProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        // Swap textures
        dissolveMaterial.uniforms.uTexture.value = dissolveTargetImage;
        dissolveMaterial.uniforms.uNextTexture.value = null;
        dissolveCurrentImage = dissolveTargetImage;
        dissolveAnimating = false;
      }
    }

    requestAnimationFrame(animateProgress);
  });
}

function animateDissolve() {
  if (!dissolveRenderer || !dissolveScene || !dissolveCamera) return;

  dissolveTime += 0.016;
  if (dissolveMaterial) {
    dissolveMaterial.uniforms.uTime.value = dissolveTime;
  }

  dissolveRenderer.render(dissolveScene, dissolveCamera);
  requestAnimationFrame(animateDissolve);
}

// ============================================
// TRAILER LIGHTBOX
// ============================================
function initTrailerLightbox() {
  const lightbox = document.querySelector('[data-trailer-lightbox]');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('[data-trailer-close]');
  const unmuteBtn = lightbox.querySelector('[data-trailer-unmute]');
  const playPauseBtn = lightbox.querySelector('[data-trailer-control="playpause"]');
  const muteBtn = lightbox.querySelector('[data-trailer-control="mute"]');
  const fullscreenBtn = lightbox.querySelector('[data-trailer-control="fullscreen"]');
  const timeline = lightbox.querySelector('[data-trailer-timeline]');
  const progress = lightbox.querySelector('[data-trailer-progress]');
  const handle = lightbox.querySelector('[data-trailer-handle]');
  const timeEl = lightbox.querySelector('[data-trailer-time]');
  const volumeControl = lightbox.querySelector('[data-trailer-volume]');
  const volumeLevel = lightbox.querySelector('[data-trailer-volume-level]');
  const volumeHandle = lightbox.querySelector('[data-trailer-volume-handle]');
  const iframe = lightbox.querySelector('[data-trailer-iframe]');
  const shield = lightbox.querySelector('[data-trailer-shield]');
  const pausedOverlay = lightbox.querySelector('[data-trailer-paused]');

  let isOpen = false;
  let isPlaying = false;
  let isMuted = true;
  let isFullscreen = false;
  let player = null;
  let videoId = null;

  function openTrailer(videoIdParam) {
    videoId = videoIdParam;
    isOpen = true;
    lightbox.style.opacity = '1';
    lightbox.style.pointerEvents = 'auto';

    // Load YouTube iframe API if needed
    loadYouTubeAPI().then(() => {
      createPlayer();
    });

    document.body.style.overflow = 'hidden';
  }

  function closeTrailer() {
    isOpen = false;
    lightbox.style.opacity = '0';
    lightbox.style.pointerEvents = 'none';

    if (player) {
      player.destroy();
      player = null;
    }

    document.body.style.overflow = '';
  }

  function loadYouTubeAPI() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
        return;
      }

      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (existingScript) {
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
        return;
      }

      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    });
  }

  function createPlayer() {
    const frame = lightbox.querySelector('[data-trailer-frame]');
    if (!frame) return;

    frame.innerHTML = '<div id="trailer-player"></div>';

    player = new YT.Player('trailer-player', {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (e) => {
          e.target.playVideo();
          e.target.mute();
          isPlaying = true;
          isMuted = true;
          updatePlayPauseUI();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            updatePlayPauseUI();
            startProgressTracking();
          } else if (e.data === YT.PlayerState.PAUSED) {
            isPlaying = false;
            updatePlayPauseUI();
          } else if (e.data === YT.PlayerState.ENDED) {
            isPlaying = false;
            updatePlayPauseUI();
            seekTo(0);
          }
        }
      }
    });
  }

  function updatePlayPauseUI() {
    if (playPauseBtn) {
      playPauseBtn.textContent = isPlaying ? 'PAUSE' : 'PLAY';
    }
  }

  function togglePlayPause() {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function toggleMute() {
    if (!player) return;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    isMuted = !isMuted;
    updateVolumeUI();
  }

  function updateVolumeUI() {
    if (muteBtn) {
      muteBtn.textContent = isMuted ? 'SOUND' : 'MUTE';
    }
    if (unmuteBtn) {
      unmuteBtn.style.display = isMuted ? 'block' : 'none';
    }
  }

  function seekTo(seconds) {
    if (player) {
      player.seekTo(seconds, true);
    }
  }

  function startProgressTracking() {
    const updateProgress = () => {
      if (!player || !isPlaying) return;

      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();

      if (duration > 0) {
        const progressRatio = currentTime / duration;
        if (progress) {
          progress.style.transform = `scaleX(${progressRatio})`;
        }
        if (handle) {
          handle.style.transform = `translate(-50%, -50%) scale(1)`;
          handle.style.left = `${progressRatio * 100}%`;
        }
        if (timeEl) {
          timeEl.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        }
      }

      requestAnimationFrame(updateProgress);
    };

    updateProgress();
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      lightbox.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  }

  // Timeline click to seek
  if (timeline) {
    timeline.addEventListener('click', (e) => {
      if (!player) return;
      const rect = timeline.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const duration = player.getDuration();
      seekTo(ratio * duration);
    });
  }

  // Volume control
  let isVolumeOpen = false;
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMute();
    });
  }

  // Event listeners
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeTrailer();
    });
  }

  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMute();
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      togglePlayPause();
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleFullscreen();
    });
  }

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeTrailer();
    }
  });

  // Close on shield click
  if (shield) {
    shield.addEventListener('click', () => closeTrailer());
  }

  // Expose openTrailer globally for film cards
  window.openTrailer = openTrailer;
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavDropdown();
  initFilmSwitching();
  initDissolveCanvas();
  initTrailerLightbox();

  // Add click handlers to film cards for trailer
  const filmItems = document.querySelectorAll('[data-film-item]');
  filmItems.forEach((item, index) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      // In a real implementation, this would open a trailer
      // For now, we'll just log
      console.log('Opening trailer for:', FILMS_DATA[index].title);
    });
  });

  // Add hover effects to film cards
  filmItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.02)';
      item.style.transition = 'transform 0.2s ease';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
    });
  });

  console.log('A24 Films clone initialized');
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden && dissolveAnimating) {
    // Pause dissolve animation when tab is hidden
  }
});

// Resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Trigger resize updates
    if (dissolveRenderer) {
      const container = document.querySelector('[data-disc-canvas]');
      if (container) {
        dissolveRenderer.setSize(container.offsetWidth, container.offsetHeight);
      }
    }
  }, 100);
});