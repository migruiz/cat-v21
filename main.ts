input.onButtonPressed(Button.A, function () {
    remoteControlled = true
})
input.onButtonPressed(Button.B, function () {
    remoteControlled = false
})
radio.onReceivedString(function (receivedString) {
    controlCommand = receivedString
    if (controlCommand == "LIGHTSON") {
        lightsOnFromControl = true
    } else if (controlCommand == "LIGHTSOFF") {
        lightsOnFromControl = false
    } else if (controlCommand == "TAILON") {
        tailOnFromControl = true
    } else if (controlCommand == "TAILOFF") {
        tailOnFromControl = false
    }
})
function moveFromControl() {
    if (controlCommand == "STOP") {
        cat.move(catImp.MoveAction.Stop)
    } else if (controlCommand == "FORWARD") {
        cat.move(catImp.MoveAction.Forward)
    } else if (controlCommand == "BACKWARDS") {
        cat.move(catImp.MoveAction.Backwards)
    } else if (controlCommand == "LEFT") {
        cat.move(catImp.MoveAction.Left)
    } else if (controlCommand == "RIGHT") {
        cat.move(catImp.MoveAction.Right)
    } else if (controlCommand == "CIRCLE") {
        cat.move(catImp.MoveAction.Circle)
    }
}
let location = 0
let tailOnFromControl = false
let lightsOnFromControl = false
let controlCommand = ""
let remoteControlled = false
remoteControlled = false
radio.setGroup(1)
basic.forever(function () {
    if (remoteControlled) {
        moveFromControl()
        return;
    }
    if (location == 1) {
        cat.move(catImp.MoveAction.ForwardSlow)
        cat.move(catImp.MoveAction.ForwardSlow)
        cat.move(catImp.MoveAction.LeftSlow)
    } else if (location == 2) {
        cat.move(catImp.MoveAction.ForwardSlow)
        cat.move(catImp.MoveAction.ForwardSlow)
    } else if (location == 3) {
        cat.move(catImp.MoveAction.ForwardSlow)
        cat.move(catImp.MoveAction.ForwardSlow)
        cat.move(catImp.MoveAction.RightSlow)
    } else if (location == 4) {
        cat.move(catImp.MoveAction.LeftSlow)
        cat.move(catImp.MoveAction.ForwardSlow)
    } else if (location == 5) {
        cat.move(catImp.MoveAction.ForwardSlow)
    } else if (location == 6) {
        cat.move(catImp.MoveAction.RightSlow)
        cat.move(catImp.MoveAction.ForwardSlow)
    } else if (location == 7) {
        cat.move(catImp.MoveAction.LeftSlow)
    } else if (location == 9) {
        cat.move(catImp.MoveAction.RightSlow)
    } else if (location == 8) {
        cat.move(catImp.MoveAction.Stop)
    }
})
basic.forever(function () {
    if (cat.pressingMouth() || (!remoteControlled && location == 8) || (remoteControlled && lightsOnFromControl)) {
        cat.showRainbow()
        cat.rotateLights()
        basic.pause(400)
    } else {
        cat.turnOffCollar()
    }
})
basic.forever(function () {
    if (cat.pressingRightEar() || (remoteControlled && tailOnFromControl) || (!remoteControlled && location == 8)) {
        cat.moveTail()
    } else {
        cat.stopTail()
    }
})
basic.forever(function () {
    if (remoteControlled) {
        basic.showString("R")
    }
    else {
        if (location == 8) {
            basic.showIcon(IconNames.Heart)
            basic.showIcon(IconNames.SmallHeart)
        } else if (location > 0 && location < 8) {
            basic.showIcon(IconNames.Diamond)
            basic.showIcon(IconNames.SmallDiamond)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    }
})
basic.forever(function () {
    location = cat.objectLocation()
})
basic.forever(function () {
    if (cat.pressingLeftEar() || (!remoteControlled && location == 8)) {
        cat.purr()
    } else {
        cat.stopPurr()
    }
})
