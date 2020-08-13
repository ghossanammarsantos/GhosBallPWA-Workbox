var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMFozaGfkTMiYJw6DeuiqKr1C8QIu5aQtnwseBb1ug2vEEFUyTseGnLgfzCyebsbhzEkXIQaDtH1zPPTQYwLiOs",
   "privateKey": "HTB8jpz1E-tlakx6GyQwOXEwyuIclTtynTVoRtFQrfs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "ps://fcm.googleapis.com/fcm/send/ew2o96cIzcI:APA91bEoMjsJzOTG8uqD_eP8TQp1llc6j2K4nu72FgxPULEVUwhSiHaAuFrphpI1xlYtlXO80U7R05287KmO33_1pHwDVkKzh8A31F0VSbm40j7qUrGHWZ5TfDmmT4lg7Lwep9rr5NOp",
   "keys": {
       "p256dh": "BHB3XlLV1uUnFH3pIF5chyWywSMK+gZtYbtoWvmeQOK4/FYecleEbI3w/1F+1VgHBWVTH/WppGER8KChkcFDJeU=",
       "auth": "KBgaWBBrKJUafhLVCtfeSQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '342981349235',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);