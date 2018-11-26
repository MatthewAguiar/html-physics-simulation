class Particle
{
  constructor(x, y, radius, color)
  {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    };
    this.mass = 1;
    this.radius = radius;
    this.color = color;
    this.opacity = 0;
  }

  update(particles)
  {
    this.draw();

    for(let i = 0; i < particles.length; i++)
    {
      if(this === particles[i])
      {
        continue;
      }

      if(get_distance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius + particles[i].radius) < 0)
      {
        this.resolve_collision(particles[i]);
      }
    }

    if(this.x - this.radius <= 0 || this.x + this.radius >= CANVAS.width)
    {
      this.velocity.x = -this.velocity.x;
    }

    if(this.y - this.radius <= 0 || this.y + this.radius >= CANVAS.height)
    {
      this.velocity.y = -this.velocity.y;
    }

    if(get_distance(MOUSE.x, MOUSE.y, this.x, this.y) < 145 && this.opacity < 0.4)
    {
      this.opacity += 0.02;
    }
    else if(this.opacity > 0)
    {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw()
  {
    CANVAS_CONTEXT.beginPath();
    CANVAS_CONTEXT.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    CANVAS_CONTEXT.save();
    CANVAS_CONTEXT.globalAlpha = this.opacity;
    CANVAS_CONTEXT.fillStyle = this.color;
    CANVAS_CONTEXT.fill();
    CANVAS_CONTEXT.restore();
    CANVAS_CONTEXT.strokeStyle = this.color;
    CANVAS_CONTEXT.stroke();
    CANVAS_CONTEXT.closePath();
  }

  rotate(velocity, angle)
  {
    const ROTATED_VELOCITIES = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return ROTATED_VELOCITIES;
  }

  resolve_collision(other)
  {
    // Find difference between x and y components.
    const X_VELOCITY_DIFFERNCE = this.velocity.x - other.velocity.x;
    const Y_VELOCITY_DIFFERNCE = this.velocity.y - other.velocity.y;

    //Find seperate distances. Distance between x and distance between y components.
    const X_DISTANCE = other.x - this.x;
    const Y_DISTANCE = other.y - this.y;

    //Prevent accidental overlap of particles.
    if(X_VELOCITY_DIFFERNCE * X_DISTANCE + Y_VELOCITY_DIFFERNCE * Y_DISTANCE >= 0)
    {
      //Get the angle between the two colliding particles.
      const ANGLE = -Math.atan2(other.y - this.y, other.x - this.x);

      //Store the mass in variable for better readability in collision equation.
      const M1 = this.mass;
      const M2 = other.mass;

      //Velovity.
      const U1 = this.rotate(this.velocity, ANGLE);
      const U2 = this.rotate(other.velocity, ANGLE);

      //Velocity after 1D collision equation.
      const V1 = {
        x: U1.x * (M1 - M2) / (M1 + M2) + U2.x * 2 * M2 / (M1 + M2),
        y: U1.y
      };
      const V2 = {
        x: U2.x * (M1 - M2) / (M1 + M2) + U1.x * 2 * M2 / (M1 + M2),
        y: U2.y
      };

      //Final velocity after rotating axis back to original location.
      const FINAL_VELOCITY_1 = this.rotate(V1, -ANGLE);
      const FINAL_VELOCITY_2 = this.rotate(V2, -ANGLE);

      //Swap particle velocities for realistic bounce effects.
      this.velocity.x = FINAL_VELOCITY_1.x;
      this.velocity.y = FINAL_VELOCITY_1.y;

      other.velocity.x = FINAL_VELOCITY_2.x;
      other.velocity.y = FINAL_VELOCITY_2.y;
    }
  }
}
