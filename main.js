
function animate()
{
  requestAnimationFrame(animate);
  CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  particles.forEach(particle => {
    particle.update(particles);
  });
}

function init()
{
  particles = [];

  for(let i = 0; i < 150; i++)
  {
    const RADIUS = 15;
    let x = random_int(RADIUS, CANVAS.width - RADIUS);
    let y = random_int(RADIUS, CANVAS.height - RADIUS);
    const COLOR = random_color(COLORS);

    if(i !== 0)
    {
      for(let j = 0; j < particles.length; j++)
      {
        if(get_distance(x, y, particles[j].x, particles[j].y) - RADIUS * 2 < 0)
        {
          x = random_int(RADIUS, CANVAS.width - RADIUS);
          y = random_int(RADIUS, CANVAS.height - RADIUS);

          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, RADIUS, COLOR));
  }
}

let particles;

init();
animate();
