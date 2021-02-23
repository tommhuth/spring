# spring
Barebones spring animation, based heavily  on [Rachel Smith's post](https://codepen.io/rachsmith/post/hack-physics-and-javascript-part-3-springs-and-some-other-things), with some inspiration from [Wobble](https://github.com/skevy/wobble) and [boing.js](https://gist.github.com/gordonbrander/3ca226b7e9b79ca03f5c). This package uses ES6+ syntax, including class properties, you might want to run it through Babel first depending on your target browsers.


1. `npm install @huth/spring`
2. Animate!

```js
  import Spring from "@huth/spring"
  
  let spring = new Spring({
      from: 0,
      to: 200,
      stiffness: 300,
      damping: 70,
      mass: 10 
  })
  
  // spring.get() will now get the current value at any time 
```

- `spring.get()` returns the current value, use in your own animation loops etc 
- `spring.set(value, fastForward = false)` updates the target value, optionally teleporting it
- `spring.stop()` kills the animation loop 
- `spring.start()` starts the animation loop if it is not already running -- you do not need to call this unless you have already stopped the animation manually
- `spring.mass = 100` updates `mass` property
- `spring.stiffness = 2000` updates `stiffness` property
- `spring.damping = 10` updates `damping` property
- `spring.running` returns `true` if animation is currently active (not at rest)