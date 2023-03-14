import {
    _decorator, Component, Node, systemEvent, SystemEvent, EventKeyBoard, macro,
    Collider, RigidBody2D, BoxCollider2D, Contact2DType, IPhysics2DContact,
    UIOpacity, Vec3, Label
} from 'cc';

const {ccclass, property} = _decorator;


@ccclass('PlayerController')
export class PlayerController extends Component {

    @property
    speed = 10;
    direction = 0; // 1 - left; 2 - top; 3 - right; 4 - bottom
    newDirection = 0; // 1 - left; 2 - top; 3 - right; 4 - bottom

    @property({type: RigidBody2D})
    rigidBody: RigidBody2D = null;

    @property({type: BoxCollider2D})
    collider: BoxCollider2D = null;

    @property({type: Label})
    scoreLabel: Label = null;

    // @property({type: RigidBody2D})
    // apple: RigidBody2D = null;

    private score: number = 0;

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this)
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this)
    }

    start() {
        // можно вот так найти колайдер
        // this.collider = this.node.getComponent(BoxCollider2D);

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.name == "apple<BoxCollider2D>") {
            const apple = otherCollider.node.getComponent("Apple")
            apple.catch()

            this.score += 1
            this.scoreLabel.string = `Score: ${this.score}`
        }
    }

    keyDown(event: EventKeyBoard) {
        switch (event.keyCode) {
            case 37:
                this.newDirection = 1 // left
                break
            case 38:
                this.newDirection = 2 // up
                break
            case 39:
                this.newDirection = 3 // right
                break
            case 40:
                this.newDirection = 4 // down
                break
        }
    }

    keyUp(event: EventKeyBoard) {
        // switch (event.keyCode) {
        //     case 37: // left
        //         this.direction = 0
        //         break
        //     case 38: // up
        //         this.direction = 0
        //         break
        //     case 39: // right
        //         this.direction = 0
        //         break
        //     case 40:  // down
        //         this.direction = 0
        //         break
        // }
    }

    update(deltaTime: number) {
        if (this.newDirection === this.direction) return

        const x = this.rigidBody.node.position.x
        const y = this.rigidBody.node.position.y

        if (this.isCenterCell(x, y)) {
            this.alignSnake(x, y)
            this.changeVelocity()
        }

    }

    isCenterCell(x, y, epsilon = 5) {
        const xCords = [-350, -250, -150, -50, 50, 150, 250, 350]
        const yCords = [250, 150, 50, -50, -150, -250]
        const minDistX = this.getMinDiff(xCords, x)[0]
        const minDistY = this.getMinDiff(yCords, y)[0]

        // console.log(x, y, Math.round(minDistX * 100) / 100, Math.round(minDistY * 100) / 100)

        return minDistX < epsilon && minDistY < epsilon
    }

    changeVelocity() {
        this.direction = this.newDirection

        let velocityX = 0
        let velocityY = 0
        if (this.direction === 1) {
            velocityX = -this.speed
        }
        if (this.direction === 2) {
            velocityY = this.speed
        }
        if (this.direction === 3) {
            velocityX = this.speed
        }
        if (this.direction === 4) {
            velocityY = -this.speed
        }

        this.rigidBody.linearVelocity = {x: velocityX, y: velocityY}
    }

    // выравнивание змеи
    alignSnake(x, y) {
        const xCords = [-350, -250, -150, -50, 50, 150, 250, 350]
        const yCords = [250, 150, 50, -50, -150, -250]

        const minX = this.getMinDiff(xCords, x)[1]
        const minY = this.getMinDiff(yCords, y)[1]

        this.rigidBody.node.setPosition(minX, minY)
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

