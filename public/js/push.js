var webPush = require('web-push');
 
const vapidKeys = {
    "publicKey": "BJaovh7rSY1I-Fl6pFJhz2ittRW8H1DP2_vVG84YU5BuRNBvWEusn71CZ84krEsPHBU4FarASTJFL91HzPYp5yM",
    "privateKey": "yzeplQUt240Yzbz-OwBrPBU4HNNCBmO99JrClSLxSfk"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cS9fIO2qKCc:APA91bHZDPK4MCKuObfHrQ2FF3OTKI_ZCRAZRG2B5B-EpIzFjYhXFGaMNt_TOMpUIlOryvAFcmyGPqzAXEk6SoE3crr2SFF-T5vjbMRRQgL65DBy9SLmOLaBU53QfYX7o_PYR0R8kOAL",
    "keys": {
        "p256dh": "BJA9dQ5lDzI9rZGZbSmbPFhDldXqVOVqDAUQucKt+0Q4Q41+gyOb84ZgSgKNjGs5mYT0dFd+A2PBE77Y5e0z8+s=",
        "auth": "bYfqfp6Vrm3uhFdPr7uGfg=="
    }
};
var payload = 'Taruh Payload disini kak :)';

var options = {
    gcmAPIKey: '40289537783',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);