$(document).ready(function () {
    let sliderbike = new Slider('#slider ul', '#slider ul li', 1000);
    let modalebike = new Modale('#close_pres', '#close_info', '#close_canvas');
    let mapbike = new Map('#content_map', 'map', 45.764043, 4.835659, 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=22eff1a05f35d5d034aebd363aa7b0ffba0bc0da');
    let canvasbike = new Canvas('#canvas', '#btn_clear');
    let bookingbike = new Booking('#canvas', '#lname', '#fname', '#chbox');
});