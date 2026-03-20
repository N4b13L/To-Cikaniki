let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide++;
      if (currentSlide < slides.length) {
        const next = slides[currentSlide];
        next.classList.add('active');
        playSlideTyping(next);
      }
    }

    function showEnding() {
      slides[currentSlide].classList.remove('active');
      const ending = document.getElementById('ending');
      ending.classList.add('active');
      playSlideTyping(ending);
    }

function startExperience() {
  const music = document.getElementById('bg-music');

  if (music) {
    music.play().catch(err => console.log("Audio error:", err));
  }

  nextSlide();
}
music.volume = 0.5;

// 🎭 buka tirai + start music
window.onload = () => {
  setTimeout(() => {
    document.querySelector('.left').classList.add('open-left');
    document.querySelector('.right').classList.add('open-right');
  }, 1000);
  // mulai typing slide pertama
    playSlideTyping(slides[0]);
};
window.onload = () => {
  setTimeout(() => {
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');

    if (left && right) {
      left.classList.add('open-left');
      right.classList.add('open-right');
    }
  }, 1000);

  playSlideTyping(slides[0]);
};

function typeElement(element, text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    element.innerHTML = "";

    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        resolve();
      }
    }

    typing();
  });
}
async function playSlideTyping(slide) {
  const elements = slide.querySelectorAll('.typing');

  for (let el of elements) {
    const text = el.getAttribute('data-text');

    await typeElement(el, text, 40);

    // jeda antar kalimat (DRAMA 😏)
    await new Promise(r => setTimeout(r, 700));
  }
}

const canvas = document.getElementById("sakura");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petals = [];

const sakuraImg = new Image();
sakuraImg.src = "sakura.png";

class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.rotation = Math.random() * Math.PI;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += 0.01;

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.drawImage(
      sakuraImg,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );

    this.opacity = Math.random() * 0.5 + 0.5;
ctx.globalAlpha = this.opacity;

    ctx.restore();
  }
}

function initPetals() {
  for (let i = 0; i < 50; i++) {
    petals.push(new Petal());
  }
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animatePetals);
}

initPetals();
animatePetals();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document
  .getElementById("three-container")
  .appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.SphereGeometry(2, 32, 32);

const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;

const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const starTexture = textureLoader.load("star.png");

const starMaterial = new THREE.PointsMaterial({
  map: starTexture,
  transparent: true,
  alphaTest: 0.5,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  size: 1.2
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 5;

function animateThree() {
  requestAnimationFrame(animateThree);

  // bintang pelan bergerak
  stars.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

animateThree();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

//bintang tambahan untuk efek lebih meriah
const sizes = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );

  sizes.push(Math.random() * 1.5 + 0.5);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

starGeometry.setAttribute(
  "size",
  new THREE.Float32BufferAttribute(sizes, 1)
);

const time = Date.now() * 0.002;

stars.material.size = 1 + Math.sin(time) * 0.3;

// dekat
stars.scale.set(1, 1, 1);

// jauh
const starsFar = stars.clone();
starsFar.scale.set(2, 2, 2);
scene.add(starsFar);

const colors = [];

for (let i = 0; i < starCount; i++) {
  colors.push(
    Math.random(),
    Math.random(),
    Math.random()
  );
}

starGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colors, 3)
);

starMaterial.vertexColors = true;
