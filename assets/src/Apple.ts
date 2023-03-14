import {_decorator, Component, Node, UIOpacity, CCInteger} from 'cc';

const {ccclass, property} = _decorator;

const SIZE = 100;
const LEFT_TOP_CORNER = {x: -350, y: 250};

@ccclass('Apple')
export class Apple extends Component {

    @property({type: CCInteger})
    xCount = 1 // порядок клетки по x

    @property({type: CCInteger})
    yCount = 1 // порядок клетки по y

    start() {
        this.node.setPosition(...this.getPositionByNumber(this.xCount, this.yCount))
    }

    catch() {
        // компонент прозрачности
        // const appleOpacity = this.node.getComponent(UIOpacity)
        // appleOpacity.opacity = 150

        // без этого не работает
        setTimeout(() => {
            this.node.setPosition(...this.getRandomPosition())
        }, 1)
    }

    // [min, max]
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    getRandomPosition() {
        const h = 6
        const w = 8

        let randY, randX

        do {
            randX = this.getRandomInt(0, w - 1)
            randY = this.getRandomInt(0, h - 1)
        } while (randY === this.xCount && randX === this.yCount)

        return this.getPositionByNumber(randX, randY)
    }

    getPositionByNumber(xCount, yCount) {
        const x = xCount * SIZE + LEFT_TOP_CORNER.x
        const y = LEFT_TOP_CORNER.y - yCount * SIZE

        return [x, y]
    }

    update(deltaTime: number) {

    }
}

