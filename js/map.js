class Map {
    constructor(container, mapID, lat, lng, ajaxLink) {
        this.container = $(container);
        this.mapID = mapID;
        this.latView = lat;
        this.lngView = lng;
        this.ajaxLink = ajaxLink;
        this.map = L.map(this.mapID).setView([this.latView, this.lngView], 16);
        this.titlelayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 14,
            maxZoom: 17
        });
        this.greenMarker = L.icon({
            iconUrl: '../img/marker_green.png',
            iconSize: [30, 38],
            iconAnchor: [12, 41],
            popupAnchor: [3.5, -30],
        });

        this.orangeMarker = L.icon({
            iconUrl: '../img/marker_orange.png',
            iconSize: [30, 38],
            iconAnchor: [12, 41],
            popupAnchor: [3.5, -30],
        });

        this.redMarker = L.icon({
            iconUrl: '../img/marker_red.png',
            iconSize: [30, 38],
            iconAnchor: [12, 41],
            popupAnchor: [3.5, -30],
        });
        this.rename = /......./
        this.titlelayer.addTo(this.map);
        this.initAjax();
    }

    initAjax() {
        $.getJSON(this.ajaxLink, (result) => {
            this.loadMarker(result);
        })
    }

    loadMarker(stations) {
        stations.forEach(station => {
            let initMarker = this.greenMarker;
            if (station.available_bikes < 10) {
                initMarker = this.orangeMarker;
                if (station.available_bikes === 0) {
                    initMarker = this.redMarker;
                }
            }

            let marker = L.marker([station.position.lat, station.position.lng], {
                icon: initMarker
            }).addTo(this.map);

            marker.bindPopup(station.name.replace(this.rename, ""));
            marker.on('mouseover', (e) => {
                marker.openPopup();
            });
            marker.on('mouseout', (e) => {
                marker.closePopup();
            });

            marker.addTo(this.map).on('click', (e) => {
                this.markerClic(station);
            });
        });
    }

    markerClic(station) {
        $("#name_station").text(station.name);
        $("#adresse_station").text(station.address);
        $("#nb_stands_station").text(station.bike_stands);
        $("#nb_available_station").text(station.available_bikes);
        this.bonusCB(station);
        $("#infos_stations").show(500);
        if (station.available_bikes === 0) {
            $("#btn_resa").hide();
            $("#error").show();
        } else{
            $("#btn_resa").show();
            $("#error").hide();
        }
    };

    bonusCB(station) {
        if (station.bonus) {
            $('#icon_bonus').css('opacity', '1');
        } else {
            $('#icon_bonus').css('opacity', '0.1');
        }
        if (station.banking) {
            $('#icon_cb').css('opacity', '1');
        } else {
            $('#icon_cb').css('opacity', '0.1');
        }
    };
}