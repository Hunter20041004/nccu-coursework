let role = ""
let alarmActive = false
let externalButtonWasPressed = false

radio.setGroup(23)
radio.setTransmitPower(7)

// External mechanical button on micro:bit B:
// P0 ---- button ---- GND
// Pull-up keeps P0 at 1 when the button is released.
// Pressing the button connects P0 to GND, so P0 becomes 0.
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)

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

// Read the real external push button connected with crocodile clips.
// Send STOP only once for each physical press.
basic.forever(function () {
    let externalButtonPressed = pins.digitalReadPin(DigitalPin.P0) == 0

    if (role == "B" && externalButtonPressed && !externalButtonWasPressed) {
        externalButtonWasPressed = true
        radio.sendString("STOP")
        basic.showIcon(IconNames.Yes)
    }

    if (!externalButtonPressed) {
        externalButtonWasPressed = false
    }

    basic.pause(20)
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
