class Booking {
	constructor(canvas, formName, formFirstName, checkbox) {
		this.formName = $(formName);
		this.formFirstName = $(formFirstName);
		this.checkbox = $(checkbox);
		this.canvas = canvas;
		this.initSettings();
	};

	initSettings() {
		$("#btn_resa").on('click', (e) => {
			if (this.formName.val() != "" && this.formFirstName.val() != "" && this.checkbox.get(0).checked) {
				$(".canvas_content").show(500);
				localStorage.setItem("name", this.formName.val());
				localStorage.setItem("firstname", this.formFirstName.val());
				sessionStorage.stationName = $('#name_station').text();
				sessionStorage.stationAdresse = $('#adresse_station').text();
				console.log(`${sessionStorage.stationAdresse} ${sessionStorage.stationName}`);
			}
		});
		$("#btn_valid").on('click', (e) => {
			$(".slot_content").show(500);
			$(".notif_booking_complete").show(500);
			$(".canvas_content").hide(500);
			$('#slname').text(localStorage.getItem("name"));
			$('#sfname').text(localStorage.getItem("firstname"));
			$('#booking_name').text(sessionStorage.getItem("stationName"));
			$('#booking_adresse').text(sessionStorage.getItem("stationAdresse"));
			this.timerStart();
		});
		$('#slname').text(localStorage.getItem("name"));
		$('#sfname').text(localStorage.getItem("firstname"));
		$('#lname').val(localStorage.getItem("name"));
		$('#fname').val(localStorage.getItem("firstname"));
		$('#booking_name').text(sessionStorage.getItem("stationName"));
		$('#booking_adresse').text(sessionStorage.getItem("stationAdresse"));
		$(".notif_booking").on('click', (e) => {
			$(".notif_booking_complete").toggle(500);
		});
		sessionStorage.getItem("timer");
		if (sessionStorage.getItem("timer") != null) {
			var timerPars = parseInt(sessionStorage.getItem("timer"));
			this.timerStart(timerPars);
		}
	}
	timerStart(timerPars) {
		var min = 20,
			sec = 0;
		var tmp = (min * 60 + sec) * 10;
		if (timerPars != undefined) {
			tmp = timerPars;
		}

		this.timer = setInterval(() => {
			min = Math.floor(tmp / 600);
			sec = Math.floor((tmp - min * 600) / 10);
			tmp--;
			sessionStorage.setItem("timer", tmp);
			$('#timer').text(min + ':' + sec);
			if (min < 0) {
				clearInterval(this.timer);
				sessionStorage.clear();
			};
		}, 100);

		$("#cancel_booking").on('click', (e) => {
			clearInterval(this.timer);
			sessionStorage.clear();
			$(".slot_content").hide();
			$(".notif_booking_complete").hide();
		});
	}
};