// heavly based on https://codepen.io/rachsmith/post/hack-physics-and-javascript-part-3-springs-and-some-other-things
// and inspired by https://github.com/skevy/wobble and https://gist.github.com/gordonbrander/3ca226b7e9b79ca03f5c
export default class Spring { 
    target = 0
    current = 0
    stiffness = 0
    damping = 0
    mass = 0
    running = false
    velocity = 0
    acceleration = 0
    rid

    constructor({
        from = 0,
        to,
        stiffness = 300,
        damping = 70,
        mass = 10
    }) {
        this.target = to
        this.current = from
        this.stiffness = stiffness
        this.damping = damping
        this.mass = mass

        this.step()
    } 

    get() {
        return this.current
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
        cancelAnimationFrame(this.rid)
    }
    start() {
        this.step()
    }
    step() {
        if (!this.isAtTarget()) {
            this.running = true
            this.advance()

            this.rid = requestAnimationFrame(() => this.step())
        } else {
            this.current = this.target
            this.running = false
        }
    }
    advance() {
        const t = 1 / 30 // hhmmm, faster?

        // spring & damper from k (stiffness) and b (damping constant)
        const spring = -this.stiffness * (this.current - this.target)
        const damper = -this.damping * this.velocity

        this.acceleration = (spring + damper) / this.mass
        this.velocity += this.acceleration * t
        this.current += this.velocity * t
    }
    isAtTarget() {
        return Math.abs(this.target - this.current) < .01 && Math.abs(this.velocity) <= .001
    }
}