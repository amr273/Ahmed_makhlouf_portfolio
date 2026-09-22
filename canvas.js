const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createStars();
}

function createStars() {
  stars = [];

  const numberOfStars = Math.floor((canvas.width * canvas.height) / 10000);

  for (let i = 0; i < numberOfStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      radius: Math.random() * 1.2 + 0.2,

      // سرعة النجوم
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,

      opacity: Math.random() * 0.6 + 0.2,

      opacityDirection: Math.random() > 0.5 ? 1 : -1,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    /* رسم النجمة */

    ctx.beginPath();

    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;

    ctx.fill();

    /* تحريك النجمة */

    star.x += star.speedX;
    star.y += star.speedY;

    /* اللمعان */

    star.opacity += 0.002 * star.opacityDirection;

    if (star.opacity >= 0.8) {
      star.opacityDirection = -1;
    }

    if (star.opacity <= 0.15) {
      star.opacityDirection = 1;
    }

    /* إعادة النجمة للشاشة */

    if (star.x < 0) {
      star.x = canvas.width;
    }

    if (star.x > canvas.width) {
      star.x = 0;
    }

    if (star.y < 0) {
      star.y = canvas.height;
    }

    if (star.y > canvas.height) {
      star.y = 0;
    }
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();

/* ====================== */