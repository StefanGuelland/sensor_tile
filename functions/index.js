const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.lora = functions.https.onRequest((request, response) => {
    let serial = request.body.hardware_serial;

    let nodeObject = {};
    nodeObject["data"]  = request.body.payload_fields;
    nodeObject["lastUpdate"] = request.body.metadata.time;

    const usersRef = admin.database().ref("nodes/" + serial);

    response.end();

    return usersRef.set(nodeObject);
});
