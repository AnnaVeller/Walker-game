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
                this.direction = 1 // left
                break
            case 38:
                this.direction = 2 // up
                break
            case 39:
                this.direction = 3 // right
                break
            case 40:
                this.direction = 4 // down
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
}

