import {
    _decorator, Component, Node, systemEvent, SystemEvent, EventKeyBoard, macro,
    Collider, RigidBody2D, BoxCollider2D, Contact2DType, IPhysics2DContact,
    UIOpacity, Vec3, Label, EventTouch
} from "cc"
import {Snake} from "./Snake"
import {Apple} from "./Apple"

const {ccclass, property} = _decorator


@ccclass("GameController")
export class GameController extends Component {

    @property
    speed = 10

    @property({type: Node})
    snakeNode: Node = null

    @property({type: Label})
    scoreLabel: Label = null

    private direction = 0 // 1 - left; 2 - top; 3 - right; 4 - bottom
    private newDirection = 0 // 1 - left; 2 - top; 3 - right; 4 - bottom
    private snakeCollider: BoxCollider2D = null
    private Snake: Snake = null
    private score: number = 0

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this)

        systemEvent.on(Node.EventType.TOUCH_MOVE, (event: EventTouch) => this.onMoveHandler(event), this)
    }

    start() {
        this.snakeCollider = this.snakeNode.getComponent(BoxCollider2D)
        this.Snake = this.snakeNode.getComponent("Snake")

        if (this.snakeCollider) {
            this.snakeCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onMoveHandler(event) {
        const EPS = 1

        const delta = event.getDelta()
        const isXBigger = Math.abs(delta.x) > Math.abs(delta.y)

        if (delta.x > EPS && isXBigger) {
            this.newDirection = 3 // right
        } else if (delta.x < -EPS && isXBigger) {
            this.newDirection = 1 // left
        } else if (delta.y > EPS && !isXBigger) {
            this.newDirection = 2 // up
        } else if (delta.y < -EPS && !isXBigger) {
            this.newDirection = 4 // down
        }
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        // Столкновение с яблоком
        if (otherCollider.node.name == "apple") {
            const apple = otherCollider.node.getComponent("Apple")
            apple.catch()

            this.score += 1
            this.scoreLabel.string = `Score: ${this.score}`
        }

        // Столкновение с стеной
        if (otherCollider.node.name == "wall_left" ||
            otherCollider.node.name == "wall_top" ||
            otherCollider.node.name == "wall_right" ||
            otherCollider.node.name == "wall_bottom") {
            console.log("Столкновение со стеной!")
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

    update(deltaTime: number) {
        if (this.newDirection === this.direction) return

        const x = this.snakeNode.position.x
        const y = this.snakeNode.position.y

        if (this.Snake.isCenterCell(x, y)) {
            this.direction = this.newDirection
            this.Snake.alignSnake(x, y)
            this.Snake.changeVelocity(this.speed, this.direction)
        }

    }
}

