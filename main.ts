let role = ""
let alarmActive = false

radio.setGroup(23)
radio.setTransmitPower(7)
basic.showString("?")

input.onButtonPressed(Button.A, function () {
    role = "A"
    alarmActive = false
    basic.showString("A")
})

input.onButtonPressed(Button.B, function () {
    role = "B"
    alarmActive = false
    basic.showString("B")
})

input.onGesture(Gesture.Shake, function () {
    if (role == "A" && !alarmActive) {
        alarmActive = true
        basic.showIcon(IconNames.Skull)
        radio.sendString("ALERT")
    }
})

input.onPinPressed(TouchPin.P0, function () {
    if (role == "B") {
        radio.sendString("STOP")
        basic.showIcon(IconNames.Yes)
    }
})

radio.onReceivedString(function (receivedString) {
    if (role == "B" && receivedString == "ALERT") {
        alarmActive = true
        basic.showIcon(IconNames.Angry)
    } else if (role == "A" && receivedString == "STOP") {
        alarmActive = false
        basic.showIcon(IconNames.Yes)
        radio.sendString("OK")
    } else if (role == "B" && receivedString == "OK") {
        alarmActive = false
        basic.showIcon(IconNames.Yes)
    }
})
