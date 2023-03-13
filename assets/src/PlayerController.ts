import {_decorator, Component, Node, systemEvent, SystemEvent, EventKeyBoard, macro, RigidBody2D} from 'cc';

const {ccclass, property} = _decorator;


@ccclass('PlayerController')
export class PlayerController extends Component {

    @property
    speed = 10;
    direction = 0; // 1 - left; 2 - top; 3 - right; 4 - bottom

    @property({type: RigidBody2D})
    rigidBody: RigidBody2D = null;

    timeCounter = 0;

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this)
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this)
    }

    start() {

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
        // const dt = 0.5 // sec
        //
        // this.timeCounter += deltaTime
        //
        // if (this.timeCounter < dt) return
        //
        // this.timeCounter -= dt
        //
        // const nowX = this.rigidBody.node.position.x
        // const nowY = this.rigidBody.node.position.y
        // let newX = nowX
        // let newY = nowY
        //
        // if (this.direction === 1) {
        //     newX = nowX - this.speed
        // }
        // if (this.direction === 2) {
        //     newY = nowY + this.speed
        // }
        // if (this.direction === 3) {
        //     newX = nowX + this.speed
        // }
        // if (this.direction === 4) {
        //     newY = nowY - this.speed
        // }
        //
        // console.log(nowX, nowY, this.speed, newX, newY)
        // this.rigidBody.node.setPosition(newX, newY)

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

        // console.log(this.rigidBody.linearVelocity, velocityY, velocityX)
    }
}

