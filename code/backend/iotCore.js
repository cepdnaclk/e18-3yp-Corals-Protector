// Dependencies
const awsIot = require("aws-iot-device-sdk");

let device;
function run() {
    device = awsIot.device({
        clientId: 'abi',
        host: 'a1sebe49a1oqq2-ats.iot.ap-northeast-1.amazonaws.com',
        port: 8883,
        keyPath: './cert/dc8751c45d04791c9d6b08a5d8756de92aa4abacd19c51a4a103bda2e13a1dc6-private.pem.key',
        certPath: './cert/dc8751c45d04791c9d6b08a5d8756de92aa4abacd19c51a4a103bda2e13a1dc6-certificate.pem.crt',
        caPath: './cert/AmazonRootCA1.pem',
    });

    // when connected to broker, subscribe to topic
    device.on("connect", function () {
        device.subscribe("/device1/", function (err) {
            if (!err) {
                console.log("MQTT Connected");
            }
        });
    });

    // Set handler for the device, it will get the messages from subscribers topics.
    device.on("message", function (topic, payload) {
        const data = JSON.parse(payload.toString());
        console.log(data)
    });

    device.on("error", function (topic, payload) {
        console.log("Error:", topic, payload.toString());
    });
}



function sendData() {
    const obj = { type: "sync" };
    console.log("STEP - Requesting data from AWS  IoT Core");
    device.publish("/device1/", JSON.stringify(obj));
}

module.exports = { run, sendData };