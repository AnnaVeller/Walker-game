import {
    _decorator, Component, Node, systemEvent, SystemEvent, EventKeyBoard, macro,
    Collider, RigidBody2D, BoxCollider2D, Contact2DType, IPhysics2DContact,
    UIOpacity, Vec3, Label, EventTouch
} from "cc"

const {ccclass, property} = _decorator


@ccclass("Snake")
export class Snake extends Component {
    private snakeRigidBody: RigidBody2D = null
    private snakeCollider: BoxCollider2D = null

    start(){
        this.snakeCollider = this.node.getComponent(BoxCollider2D)
        this.snakeRigidBody = this.node.getComponent(RigidBody2D)
    }

    isCenterCell(x, y, epsilon = 5) {
        const xCords = [-350, -250, -150, -50, 50, 150, 250, 350]
        const yCords = [250, 150, 50, -50, -150, -250]
        const minDistX = this.getMinDiff(xCords, x)[0]
        const minDistY = this.getMinDiff(yCords, y)[0]

        // console.log(x, y, Math.round(minDistX * 100) / 100, Math.round(minDistY * 100) / 100)

        return minDistX < epsilon && minDistY < epsilon
    }

    changeVelocity(speed: Number, direction: Number) {
        let velocityX = 0
        let velocityY = 0
        if (direction === 1) {
            velocityX = -speed
        }
        if (direction === 2) {
            velocityY = speed
        }
        if (direction === 3) {
            velocityX = speed
        }
        if (direction === 4) {
            velocityY = -speed
        }

        this.snakeRigidBody.linearVelocity = {x: velocityX, y: velocityY}
    }

    // выравнивание змеи
    alignSnake(x, y) {
        const xCords = [-350, -250, -150, -50, 50, 150, 250, 350]
        const yCords = [250, 150, 50, -50, -150, -250]

        const minX = this.getMinDiff(xCords, x)[1]
        const minY = this.getMinDiff(yCords, y)[1]

        this.node.setPosition(minX, minY)
    }

    // возвращает минимальную разницу и само минимальное значение массива
    getMinDiff(array, value) {
        let minDiff = 1000
        let minValue

        for (let i = 0; i < array.length; i++) {
            const delta = Math.abs(array[i] - value)
            if (delta < minDiff) {
                minDiff = delta
                minValue = array[i]
            }
        }

        return [minDiff, minValue]
    }
}

