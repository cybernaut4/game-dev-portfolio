// === Animated Background (ported from React) ===
(function() {
  const canvas = document.createElement('canvas');
  canvas.className = 'fixed inset-0 pointer-events-none';
  canvas.style.zIndex = 1;
  document.body.appendChild(canvas);
  let animationRef, time = 0, scrollY = 0;
  let fireflies = [], shapes = [], spheres = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  // Linear interpolation
  function lerp(start, end, factor) { return start + (end - start) * factor; }

  // Fireflies
  if (fireflies.length === 0) {
    for (let i = 0; i < 30; i++) {
      fireflies.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        prevX: Math.random() * canvas.width,
        prevY: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        depth: 0.3 + Math.random() * 0.7,
        size: 0.5 + Math.random() * 2,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // Shapes
  if (shapes.length === 0) {
    shapes = [
      { baseX: canvas.width * 0.2, baseY: canvas.height * 0.3, x: canvas.width * 0.2, y: canvas.height * 0.3, prevX: canvas.width * 0.2, prevY: canvas.height * 0.3, size: 30, parallaxFactor: 0.1, shape: 'cube' },
      { baseX: canvas.width * 0.8, baseY: canvas.height * 0.7, x: canvas.width * 0.8, y: canvas.height * 0.7, prevX: canvas.width * 0.8, prevY: canvas.height * 0.7, size: 25, parallaxFactor: 0.2, shape: 'tetrahedron' },
      { baseX: canvas.width * 0.7, baseY: canvas.height * 0.2, x: canvas.width * 0.7, y: canvas.height * 0.2, prevX: canvas.width * 0.7, prevY: canvas.height * 0.2, size: 35, parallaxFactor: 0.05, shape: 'octahedron' },
      { baseX: canvas.width * 0.1, baseY: canvas.height * 0.8, x: canvas.width * 0.1, y: canvas.height * 0.8, prevX: canvas.width * 0.1, prevY: canvas.height * 0.8, size: 20, parallaxFactor: 0.15, shape: 'cube' },
    ];
  }

  // Spheres
  if (spheres.length === 0) {
    spheres = [
      { baseX: canvas.width * 0.1, baseY: canvas.height * 0.6, x: canvas.width * 0.1, y: canvas.height * 0.6, prevX: canvas.width * 0.1, prevY: canvas.height * 0.6, radius: 40, parallaxFactor: 0.08, rotation: 0 },
      { baseX: canvas.width * 0.9, baseY: canvas.height * 0.4, x: canvas.width * 0.9, y: canvas.height * 0.4, prevX: canvas.width * 0.9, prevY: canvas.height * 0.4, radius: 35, parallaxFactor: 0.08, rotation: 0 },
    ];
  }

  function animate() {
    time += 0.01;
    const ctx = canvas.getContext('2d');
    const lerpFactor = 0.025;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sine waves
    function drawWaveWithParallax(amplitude, frequency, phase, parallaxFactor, opacity) {
      ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin((x - time * 100) * frequency) * amplitude + Math.sin(time * 2) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    drawWaveWithParallax(50, 0.01, 0, 0.1, 0.2);
    drawWaveWithParallax(40, 0.008, Math.PI / 4, 0.15, 0.15);
    drawWaveWithParallax(30, 0.012, Math.PI / 2, 0.05, 0.1);

    // 3D shapes
    function draw3DShape(x, y, size, rotationX, rotationY, rotationZ, shape) {
      function cos(a) { return Math.cos(a); }
      function sin(a) { return Math.sin(a); }
      function rotateX(point) { return [point[0], point[1] * cos(rotationX) - point[2] * sin(rotationX), point[1] * sin(rotationX) + point[2] * cos(rotationX)]; }
      function rotateY(point) { return [point[0] * cos(rotationY) + point[2] * sin(rotationY), point[1], -point[0] * sin(rotationY) + point[2] * cos(rotationY)]; }
      function rotateZ(point) { return [point[0] * cos(rotationZ) - point[1] * sin(rotationZ), point[0] * sin(rotationZ) + point[1] * cos(rotationZ), point[2]]; }
      let vertices, edges;
      if (shape === 'cube') {
        vertices = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
        edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
      } else if (shape === 'tetrahedron') {
        vertices = [[0,1,0],[-1,-1,1],[1,-1,1],[0,-1,-1]];
        edges = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
      } else {
        vertices = [[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];
        edges = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]];
      }
      const projected = vertices.map(vertex => {
        let rotated = rotateX([...vertex]);
        rotated = rotateY(rotated);
        rotated = rotateZ(rotated);
        return [x + rotated[0] * size, y + rotated[1] * size, rotated[2]];
      });
      edges.forEach(([start, end], edgeIndex) => {
        const scanPhase = (time * 3 + edgeIndex * 0.5) % (Math.PI * 2);
        const scanIntensity = (Math.sin(scanPhase) + 1) * 0.5;
        const opacity = 0.1 + scanIntensity * 0.3;
        ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = 1 + scanIntensity * 2;
        ctx.shadowColor = `rgba(239, 68, 68, ${scanIntensity * 0.8})`;
        ctx.shadowBlur = scanIntensity * 15;
        ctx.beginPath();
        ctx.moveTo(projected[start][0], projected[start][1]);
        ctx.lineTo(projected[end][0], projected[end][1]);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
    }
    shapes.forEach((shape, index) => {
      shape.prevX = shape.x;
      shape.prevY = shape.y;
      const targetY = shape.baseY - scrollY * shape.parallaxFactor;
      shape.x = lerp(shape.prevX, shape.baseX, lerpFactor);
      shape.y = lerp(shape.prevY, targetY, lerpFactor);
      const rotations = [
        [time * 0.5, time * 0.7, time * 0.3],
        [-time * 0.6, time * 0.4, -time * 0.8],
        [time * 0.3, -time * 0.9, time * 0.6],
        [time * 0.8, time * 0.2, -time * 0.4],
      ];
      draw3DShape(shape.x, shape.y, shape.size, ...rotations[index], shape.shape);
    });
    // Spheres
    function drawWireframeSphere(x, y, radius, rotation) {
      for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += Math.PI / 6) {
        const scanPhase = (time * 2 + lat * 2) % (Math.PI * 2);
        const scanIntensity = (Math.sin(scanPhase) + 1) * 0.5;
        const opacity = 0.1 + scanIntensity * 0.2;
        ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = 1 + scanIntensity;
        ctx.shadowColor = `rgba(239, 68, 68, ${scanIntensity * 0.6})`;
        ctx.shadowBlur = scanIntensity * 10;
        ctx.beginPath();
        for (let lon = 0; lon <= Math.PI * 2; lon += 0.1) {
          const sphereX = x + radius * Math.cos(lat) * Math.cos(lon + rotation);
          const sphereY = y + radius * Math.sin(lat);
          if (lon === 0) ctx.moveTo(sphereX, sphereY);
          else ctx.lineTo(sphereX, sphereY);
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 6) {
        const scanPhase = (time * 2.5 + lon * 3) % (Math.PI * 2);
        const scanIntensity = (Math.sin(scanPhase) + 1) * 0.5;
        const opacity = 0.1 + scanIntensity * 0.2;
        ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = 1 + scanIntensity;
        ctx.shadowColor = `rgba(239, 68, 68, ${scanIntensity * 0.6})`;
        ctx.shadowBlur = scanIntensity * 10;
        ctx.beginPath();
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.1) {
          const sphereX = x + radius * Math.cos(lat) * Math.cos(lon + rotation);
          const sphereY = y + radius * Math.sin(lat);
          if (lat === -Math.PI / 2) ctx.moveTo(sphereX, sphereY);
          else ctx.lineTo(sphereX, sphereY);
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }
    spheres.forEach((sphere, index) => {
      sphere.prevX = sphere.x;
      sphere.prevY = sphere.y;
      const targetY = sphere.baseY - scrollY * sphere.parallaxFactor;
      sphere.x = lerp(sphere.prevX, sphere.baseX, lerpFactor);
      sphere.y = lerp(sphere.prevY, targetY, lerpFactor);
      sphere.rotation = index === 0 ? time * 0.4 : -time * 0.6;
      drawWireframeSphere(sphere.x, sphere.y, sphere.radius, sphere.rotation);
    });
    // Fireflies
    fireflies.forEach(firefly => {
      firefly.prevX = firefly.x;
      firefly.prevY = firefly.y;
      const targetX = firefly.baseX + Math.sin(time * firefly.speed + firefly.phase) * 50;
      const targetY = firefly.baseY + Math.cos(time * firefly.speed * 0.7 + firefly.phase) * 30;
      const parallaxOffsetY = -scrollY * firefly.depth * 0.5;
      const finalTargetY = targetY + parallaxOffsetY;
      firefly.x = lerp(firefly.prevX, targetX, lerpFactor);
      firefly.y = lerp(firefly.prevY, finalTargetY, lerpFactor);
      const wrappedX = ((firefly.x % (canvas.width + 200)) + canvas.width + 200) % (canvas.width + 200);
      const wrappedY = ((firefly.y % (canvas.height + 200)) + canvas.height + 200) % (canvas.height + 200);
      const size = firefly.size * (2 - firefly.depth);
      const opacity = (2 - firefly.depth) * 0.4;
      const pulseIntensity = (Math.sin(time * 2 + firefly.phase) + 1) * 0.5;
      ctx.shadowColor = firefly.depth < 0.6 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = size * 3 * (1 + pulseIntensity);
      ctx.fillStyle = firefly.depth < 0.6 ? `rgba(239, 68, 68, ${opacity + pulseIntensity * 0.3})` : `rgba(255, 255, 255, ${opacity + pulseIntensity * 0.2})`;
      ctx.beginPath();
      ctx.arc(wrappedX, wrappedY, size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    animationRef = requestAnimationFrame(animate);
  }
  animate();
})();

// === Interactive Features ===
function revealEmail() {
  var container = document.getElementById('email-container');
  if (container) {
    container.innerHTML = '<p class="text-gray-400 text-sm">hello@arklite.dev</p>';
  }
}

// Project card hover video reveal (for Gattlebrounds)
document.addEventListener('DOMContentLoaded', function() {
  var gattleCard = document.querySelector('.project-card .project-video');
  if (gattleCard) {
    var parent = gattleCard.closest('.project-card');
    if (parent) {
      parent.addEventListener('mouseenter', function() {
        gattleCard.play();
      });
      parent.addEventListener('mouseleave', function() {
        gattleCard.pause();
        gattleCard.currentTime = 0;
      });
    }
  }
}); 