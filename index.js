// based on https://codepen.io/rachsmith/post/hack-physics-and-javascript-part-3-springs-and-some-other-things
// and inspired by https://github.com/skevy/wobble and https://gist.github.com/gordonbrander/3ca226b7e9b79ca03f5c
// and https://burakkanber.com/blog/physics-in-javascript-car-suspension-part-1-spring-mass-damper/
export default class Spring {
    target = 0
    current = 0
    stiffness = 0
    damping = 0
    mass = 0
    delta = 0
    running = false
    velocity = 0
    acceleration = 0
    lastFrameTime
    rafId

    constructor({
        stiffness = 300,
        damping = 70,
        mass = 10,
        delta = .01
    } = {}) {
        this.stiffness = stiffness
        this.damping = damping
        this.delta = delta
        this.mass = mass

        this.step()
    }
 
    set(value, fastForward = false) {
        this.target = value

        if (fastForward) {
            this.current = value
        } else if (!this.running) {
            this.step()
        }
    }
    stop() {
        cancelAnimationFrame(this.rafId)
    }
    start() {
        this.step()
    }
    step() {
        if (!this.isAtTarget()) {
            let delta = this.lastFrameTime ? Math.min(Math.max((Date.now() - this.lastFrameTime) / 1000, 1 / 120), 1 / 30) : 1 / 60

            this.running = true
            this.advance(delta)
            this.lastFrameTime = Date.now()

            this.rafId = requestAnimationFrame(() => this.step())
        } else {
            this.current = this.target
            this.running = false
        }
    }
    advance(delta) {
        // spring & damper from k (stiffness) and b (damping constant)
        const stiffness = -this.stiffness * (this.current - this.target)
        const damper = -this.damping * this.velocity

        this.acceleration = (stiffness + damper) / this.mass
        this.velocity += this.acceleration * delta
        this.current += this.velocity * delta 
    }
    isAtTarget() {
        return Math.abs(this.target - this.current) < this.delta && Math.abs(this.velocity) <= this.delta
    }
}