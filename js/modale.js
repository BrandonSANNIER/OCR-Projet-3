class Modale {
    constructor(closePres, closeInfo, closeCanvas) {
        this.closePres = $(closePres);
        this.closeInfo = $(closeInfo);
        this.closeCanvas = $(closeCanvas);
        this.initSettings();
    }

    initSettings() {
        this.closePres.on('click', (e) => {
            $("#pres_map").remove();
        });
        this.closeInfo.on('click', (e) => {
            $('#infos_stations').hide(500);
        });
        this.closeCanvas.on('click', (e) => {
            $(".canvas_content").hide(500);
        });
        this.menu()
    }

    menu() {
        $("#ico_menu").on('click', (e) => {
            $(".menu").toggle();
        });
    }
}