# spring
Barebones spring animation, based heavily  on [Rachel Smith's post](https://codepen.io/rachsmith/post/hack-physics-and-javascript-part-3-springs-and-some-other-things), with some inspiration from [Wobble](https://github.com/skevy/wobble) and [boing.js](https://gist.github.com/gordonbrander/3ca226b7e9b79ca03f5c). This package uses ES6+ syntax, including class properties, you might want to run it through Babel first depending on your target browsers.


1. `npm install @huth/spring`
2. Animate:

```js
  import Spring from "@huth/spring"
  
  let spring = new Spring({ 
      stiffness: 300,
      damping: 70,
      mass: 10,
      delta: .01
  })

  spring.set(100) 
  spring.current // will now get the current value (in a RAF e.g.)
```

- `spring.set(value, fastForward = false)` updates the target value, optionally teleporting it
- `spring.current` returns the current value, use in your own animation loops etc 
- `spring.stiffness = 300` updates the `stiffness` property
- `spring.damping = 70` updates the `damping` property
- `spring.mass = 10` updates the `mass` property
- `spring.delta = .01` updates the `delta` property; if `target - current` is less than this than the spring is considered to have reach its target and will stop animating -- depending on the size of the values you are animating you might want to scale this up or down
- `spring.running` returns `true` if not at rest  (do not update this manually)
- `spring.velocity` returns current velocity  (do not update this manually)
- `spring.acceleration` returns current acceleration  (do not update this manually)
- `spring.target` returns current target value (do not update this manually)
- `spring.stop()` kills the animation loop 
- `spring.start()` starts the animation loop if it is not already running -- you do not need to call this unless you have already stopped the animation manually