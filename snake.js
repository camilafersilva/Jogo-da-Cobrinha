const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const size = 30;
const snake = [
    { x: 270, y: 240 },


];

let direction, loopId
const randomNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}
const randomPosition = () => {
    const number = randomNumber(0, 570);
    return Math.round(number / 30) * 30
}
const food = { x: randomPosition(), y: randomPosition(), color: "red" }
const drawFood = () => {
    const { x, y, color } = food
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "blue"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })

}

const moveSnake = () => {
    if (!direction) {
        return
    }
    const head = snake[snake.length - 1];
    snake.shift();
    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }
    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }
    if (direction == "down") {
        snake.push({ x: head.x, y: head.y - size })
    }
    if (direction == "up") {
        snake.push({ x: head.x, y: head.y + size })
    }
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#eeee";
    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()

    }



}

const checkEat = () => {
    const head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        let x = randomPosition()
        let y = randomPosition()
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }
        food.x = x
        food.y = y


    }
}
const checkCollision = () => {
    const head = snake[snake.length - 1]
    const neck=snake.length - 2
    const canvasLimit = canvas.width - size
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const selfColision = snake.find((position, index) => {
        return head.x == position.x && head.y == position.y && index<neck
    })
    if (wallCollision || selfColision) {
        gameOver()

    }
  
}
const gameOver=()=>{
    direction=undefined
}
const game = () => {
    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600);
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();
    loopId = setInterval(() => {
        game()
    }, 300)}

game();
document.addEventListener('keydown', ({ key }) => {
    if (key == 'ArrowRight' && direction != "left") {
        direction = "right"
    }
    if (key == 'ArrowLeft' && direction != "right") {
        direction = "left"
    }
    if (key == 'ArrowDown' && direction != "down") {
        direction = "up"
    }
    if (key == 'ArrowUp' && direction != "up") {
        direction = "down"
    }
})