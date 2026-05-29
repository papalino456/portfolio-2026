import { performance } from 'node:perf_hooks';

function runBenchmark() {
  const iconPositions = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 200,
    y: Math.random() * 200,
    z: Math.random() * 200,
  }));

  const rotationRef = { current: { x: 1.5, y: 0.5 } };

  const ITERATIONS = 100000;

  // Baseline (unhoisted)
  const startUnhoisted = performance.now();
  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (const icon of iconPositions) {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
    }
  }
  const endUnhoisted = performance.now();

  // Optimized (hoisted)
  const startHoisted = performance.now();
  for (let iter = 0; iter < ITERATIONS; iter++) {
    const cosX = Math.cos(rotationRef.current.x);
    const sinX = Math.sin(rotationRef.current.x);
    const cosY = Math.cos(rotationRef.current.y);
    const sinY = Math.sin(rotationRef.current.y);

    for (const icon of iconPositions) {
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
    }
  }
  const endHoisted = performance.now();

  console.log(`Unhoisted: ${(endUnhoisted - startUnhoisted).toFixed(2)}ms`);
  console.log(`Hoisted: ${(endHoisted - startHoisted).toFixed(2)}ms`);
  console.log(`Improvement: ${(((endUnhoisted - startUnhoisted) - (endHoisted - startHoisted)) / (endUnhoisted - startUnhoisted) * 100).toFixed(2)}%`);
}

runBenchmark();
