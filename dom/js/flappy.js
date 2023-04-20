function newElement(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barrier(reverse = false) {
    this.element = newElement('div', 'barrier')

    const border = newElement('div', 'border')
    const body = newElement('div', 'body')
    this.element.appendChild(reverse ? body : border)
    this.element.appendChild(reverse ? border : body)

    this.setHeight = height => body.style.height = `${height}px`
}

// const b = new Barrier(true)
// b.setHeight(100)
// document.querySelector('[wm-flappy]').appendChild(b.element);    

function BarriersPair(heigth, gap, x) {
    this.element = newElement('div', 'barriers-pair')

    this.superior = new Barrier(true)
    this.inferior = new Barrier(false)

    this.element.appendChild(this.superior.element)
    this.element.appendChild(this.inferior.element)

    this.defineGap = () => {
        const heigthSuperior = Math.random() * (heigth - gap)
        const heigthInferior = heigth - gap - heigthSuperior
        this.superior.setHeight(heigthSuperior)
        this.inferior.setHeight(heigthInferior)
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0])
    this.setX = (x) => this.element.style.left = `${x}px`
    this.getWidth = () => this.element.clientWidth

    this.defineGap()
    this.setX(x)
}

function Barriers(heigth, width, gap, space, notifyScore) {
    this.pairs = [
        new BarriersPair(heigth, gap, width),
        new BarriersPair(heigth, gap, width + space),
        new BarriersPair(heigth, gap, width + space * 2),
        new BarriersPair(heigth, gap, width + space * 3),
    ]

    const displacement = 3
    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement)

            /** When element to pass div limit, put again in the beginning  */
            if (pair.getX() < -pair.getWidth()) {
                pair.setX(pair.getX() + space * this.pairs.length)
                pair.defineGap()
            }

            const middle = width / 2
            const passedMiddle = pair.getX() + displacement >= middle && pair.getX() < middle
            if (passedMiddle) notifyScore()
        })
    }
}

function Bird(heightGame) {
    let flying = false;

    this.element = newElement('img', 'bird');
    this.element.src = 'imgs/passaro.png';

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = y => this.element.style.bottom = `${y}px`

    window.onkeydown = e => flying = true;
    window.onkeyup = e => flying = false;

    this.animate = () => {
        const newY = this.getY() + (flying ? 8 : -5);
        const maxHeight = heightGame - this.element.clientHeight;

        if (newY <= 0) {
            this.setY(0);
        } else if (newY >= maxHeight) {
            this.setY(maxHeight);
        } else {
            this.setY(newY);
        }
    }

    this.setY(heightGame / 2);
}

function Progress() {    
    this.element = newElement('span', 'progress')
    this.updateScore = score => {        
        this.element.innerHTML = score;
    }
    this.getScore = () => this.element.getInnerHTML();
    this.updateScore(0);
}

function Record() {
    
    this.element = newElement('span', 'record');
    this.updateRecord = r => {
        localStorage.setItem('data', JSON.stringify({ "record": r }));
        this.element.innerHTML = this.getCurrentlyRecord();
    }    
    this.getCurrentlyRecord = () => JSON.parse(localStorage.getItem('data')).record;
    this.updateRecord(!!this.getCurrentlyRecord() ? this.getCurrentlyRecord() : 0);
}

function isOverlapped(elementA, elementB) {

    const a = elementA.getBoundingClientRect();
    const b = elementB.getBoundingClientRect();

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

    return horizontal && vertical;
}

function hasCollided(bird, barriers) {
    let collided = false;

    barriers.pairs.forEach(barriersPair => {
        if (!collided) {
            const top = barriersPair.superior.element
            const bottom = barriersPair.inferior.element
            collided = isOverlapped(bird.element, top) || isOverlapped(bird.element, bottom)
        }
    })

    return collided
}

function FlappyBird() {
    let score = 0

    const gameFrame = document.querySelector('[wm-flappy]');
    const height = gameFrame.clientHeight;
    const width = gameFrame.clientWidth;

    const progress = new Progress();
    const record = new Record();
    const barriers = new Barriers(height, width, 200, 400, () => progress.updateScore(++score));
    const bird = new Bird(height);

    gameFrame.appendChild(progress.element)
    gameFrame.appendChild(record.element)
    gameFrame.appendChild(bird.element)
    barriers.pairs.forEach(pair => gameFrame.appendChild(pair.element))

    this.start = () => {
        const timer = setInterval(() => {
            barriers.animate()
            bird.animate()
            if (hasCollided(bird, barriers)) {
                if (progress.getScore() > record.getCurrentlyRecord()) {
                    record.updateRecord(progress.getScore());
                }
                clearInterval(timer)
            }

        }, 20)
    }
}



new FlappyBird().start()