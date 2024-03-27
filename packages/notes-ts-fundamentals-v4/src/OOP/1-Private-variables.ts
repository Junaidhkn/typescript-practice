// Base class representing a generic shape
export class Shape {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  // Method to describe the shape
  describe(): void {
    console.log(`This is a shape at position (${this.x}, ${this.y}).`)
  }
}

// Derived class representing a circle
class Circle extends Shape {
  radius: number

  constructor(x: number, y: number, radius: number) {
    super(x, y) // Call the constructor of the superclass (Shape)
    this.radius = radius
  }

  // Method to calculate area of the circle
  area(): number {
    return Math.PI * this.radius ** 2
  }
}

const smallCircle = new Circle(5, 5, 2)
console.log(smallCircle.area())

class Player {
  private health: number
  private speed: number

  setHealth(health: number) {
    if (health < 0) {
      console.log('You cannot set the health below zero!!!')
      return
    }
    this.health = health
  }
  getHealth() {
    return this.health
  }

  setSpeed(speed: number) {
    this.speed = speed
  }
  getSpeed() {
    return this.speed
  }
}

const mario = new Player()

mario.setHealth(10)

mario.getHealth()
