
function animate()
{
  requestAnimationFrame(animate);
  CANVAS_CONTEXT.clearRect(0, 0, CANVAS_CONTEXT.width, CANVAS_CONTEXT.height);
  particles.forEach(particle => {
    particle.update();
  });
}

function init()
{
  particles = [];

  for(let i = 0; i < 4; i++)
  {
    let x = Math.random() * CANVAS.width;
    let y = Math.random() * CANVAS.height;
    const RADIUS = 100;
    const COLOR = "blue";

    if(i !== 0)
    {
      for(let j = 0; j < particles.length; j++)
      {
        if(get_distance(x, y, particles[j].x, particles[j].y) - RADIUS * 2 < 0)
        {
          x = Math.random() * CANVAS.width;
          y = Math.random() * CANVAS.height;

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
