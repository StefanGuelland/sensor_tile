const functions = require('firebase-functions');
const admin = require('firebase-admin');

const moment = require('moment');

admin.initializeApp();

exports.lora = functions.https.onRequest((request, response) => {
    let serial = request.body.hardware_serial;

    const dateTime = request.body.metadata.time;
    const data = request.body.payload_fields;

    const dataRef = admin.database().ref("nodes/" + serial + "/data");
    const nodeDataPromise = dataRef.set(data);

    const timeRef = admin.database().ref("nodes/" + serial + "/lastUpdate");
    const nodeTimePromise = timeRef.set(dateTime);

    response.end();

    const logObject = {
        time: dateTime,
        data: data
    };

    const date = moment(dateTime).format('YYYY-MM-DD');
    const time = moment(dateTime).format('HH-mm-ss-SSS');
    const logRef = admin.database().ref("logs/" + serial + "/" + date + "/" + time);
    const logPromise = logRef.set(logObject);

    return Promise.all([
        nodeDataPromise,
        nodeTimePromise,
        logPromise
    ]);
});
