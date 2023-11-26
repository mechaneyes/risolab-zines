interface PlanetData {
  distanceToSun: number;
  orbitalSpeed: number;
}

let planets: Planet[] = [];

function setup(): void {
  createCanvas(800, 800);
  for (let data of planetsData) {
    planets.push(new Planet(data));
  }
}

function draw(): void {
  background(0);
  translate(width / 2, height / 2);
  for (let planet of planets) {
    planet.update();
    planet.show();
  }
}

class Planet {
  radius: number;
  angle: number;
  speed: number;

  constructor(data: PlanetData) {
    this.radius = data.distanceToSun;
    this.angle = random(TWO_PI);
    this.speed = data.orbitalSpeed;
  }

  update(): void {
    this.angle += this.speed;
  }

  show(): void {
    push();
    rotate(this.angle);
    translate(this.radius, 0);
    ellipse(0, 0, 20, 20);
    pop();
  }
}