/**
 * Select canvas element
 * @type {HTMLCanvasElement}
 */
  const canvas = document.querySelector("canvas")
/**
 * Setting Canvas' context
 * @type {CanvasRenderingContext2D}
 */
  const context = canvas.getContext('2d');
/**
 * Canvas's size fits window
 * @type {number}
 */
  canvas.width = innerWidth
  canvas.height = innerHeight
  const gravity =  1.5
/**
 * Checking if right || right key is pressed
 * @type {{left: {pressed: boolean}, right: {pressed: boolean}}}
 */
  const keys = {
  right : {
    pressed : false
  },
  left : {
    pressed : false
  }
}


/**
 * PLATFORM CLASS
 */
class Platform {
  #color

  constructor(positionX, positionY, width, height, color) {
    this.position = {
      x: positionX,
      y: positionY
    };
    /**
     * Adding velocity : For animation. triggers the x, y position
     * @type {{x: number, y: number}}
     */
    this.velocity = {
      x: 0,
      y: 0
    };
    this.width = width;
    this.height = height;
    this.#color = color
  }

  /**
   * rendering the canvas' object on window using its positions and width, height
   */
  draw() {
    context.fillStyle = this.#color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}


/**
 * PLAYER CLASS
 */
class Player {
  #color
  #initialPosition = {
    x: 10,
    y : canvas.height / 2
  }

  constructor(width, height, color) {
    this.position = {
      x: this.#initialPosition.x,
      y: this.#initialPosition.y
    };

    /**
     * Adding velocity : For animation. triggers the x, y position
     * @type {{x: number, y: number}}
     */
    this.velocity = {
      x: 0,
      y: 0
    };

    this.width = width;
    this.height = height;
    this.#color = color
  }

  /**
   * rendering the canvas' object on window using its positions and width, height
   */
  draw() {
    context.fillStyle = this.#color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  /**
   * Updating the positions (x, y) values from the velocity
   * We first draw the result then update to the new value.
   * The gravity add a factor of acceleration
   * The condition checks if the objects reaches the bottom of the screen
   * We add a condition for looping over x-axis when we reach the screen
   */
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    /**
     * Prevent the object from falling bellow portview
     */
    if ((this.position.y + this.velocity.y + this.height ) <= canvas.height)
      this.velocity.y += gravity
    else  this.velocity.y = 0
    /**
     * Making a loop from left to right when object going out of the portview
     */
    if ((this.position.x + this.velocity.x) > canvas.width )
      this.position.x = this.#initialPosition.x
    else if ((this.position.x + this.velocity.x + this.width) < this.#initialPosition.x )
      this.position.x = canvas.width - (this.width + this.#initialPosition.x)
  }
}


/**
 * @type {Player}
 */
  const player = new Player(30, 30, "red")
/**
 * @type {Platform}
 */
  const platform = new Platform(150, canvas.height - 200, canvas.width/2, 20, 'green')
  const platform2 = new Platform(canvas.width - 250, 250, canvas.width/3, 20, 'blue')

/**
 * Callback function to loop over the rendering object and updated value
 * clearRect clears previous canvas => clears the previous prints
 */
function animate() {



  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height)
  player.update();
  platform.draw();
  platform2.draw();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else player.velocity.x = 0;

  if ((player.position.y + player.height <= platform.position.y
    && player.position.y + player.height + player.velocity.y >= platform.position.y
    && player.position.x + player.width >= platform.position.x
    && player.position.x + player.width <= platform.position.x + platform.width)
    || (player.position.y + player.height <= platform2.position.y
    && player.position.y + player.height + player.velocity.y >= platform2.position.y
    && player.position.x + player.width >= platform2.position.x
    && player.position.x + player.width <= platform2.position.x + platform2.width)){
    player.velocity.y = 0
  }
}

  animate()

/**
   * Listening to Keyboard User
   * We can pass (event) as argument to listen to all keyboard event
   * We can pass ({keyCode}) to listen to keys only and get the keyCode
   * Listen when a key is PRESSED
   * Keys A: left, W : up (jump), S: down, D : right
   */
  addEventListener('keydown', ({keyCode}) => {
    switch (keyCode){
      case 65 :
        // console.log('A pressed : left');
        keys.left.pressed = true
        break;
      case 83 :
        // console.log('S pressed : down');
        // player.velocity.y -= -5
        break;
      case 68 :
        // console.log('D pressed : right');
        keys.right.pressed = true
        break;
      case 87 :
        // console.log('W pressed : up');
        player.velocity.y -= 30
        break;
    }
  })

/**
   * Listening to Keyboard User
   * We can pass (event) as argument to listen to all keyboard event
   * We can pass ({keyCode}) to listen to keys only and get the keyCode
   * Listen when a key is RELEASED
   * Keys A: left, W : up (jump), S: down, D : right
   */
  addEventListener('keyup', ({keyCode}) => {
  switch (keyCode){
    case 65 :
      // console.log('A released : left');
      keys.left.pressed = false
      break;
    case 83 :
      // console.log('S released : down');
      break;
    case 68 :
      // console.log('D released : right');
      keys.right.pressed = false
      break;
    case 87 :
      // console.log('W released : up');
      player.velocity.y -= 2
      break;
  }
})
a
