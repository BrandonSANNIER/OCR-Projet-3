class Slider {
    constructor(ul, li, time) {
        this.ul = $(ul);
        this.li = $(li);
        this.nbSlide = this.li.children().size();
        this.larg = this.li.width();
        this.current = 0;
        this.time = time;
        this.initSettings();
    };

    initSettings() {

        $('.next').on("click", () => {
            this.next();
        });
        $('.prev').on("click", () => {
            this.prev();
        });
        $('.stop').on("click", () => {
            this.stopSlide();
            $('.stop').css('visibility', 'hidden');
            $('.play').css('visibility', 'visible');
        });
        $('.play').on("click", () => {
            this.autoSlide();
            $('.stop').css('visibility', 'visible');
            $('.play').css('visibility', 'hidden');
        });

        this.touch();

    };

    next() {

        this.current++;

        if ((this).current > this.nbSlide - 1) {

            this.current = 0;
            this.ul.animate({
                marginLeft: "0px"
            });

        } else {
            this.ul.animate({
                marginLeft: -this.current * this.larg
            });
        }
    };

    prev() {

        this.current--;

        if (this.current < 0) {

            this.current = this.nbSlide - 1;
        }
        this.ul.animate({
            marginLeft: -this.current * this.larg
        });
    };

    autoSlide() {

        this.timer = setInterval(() => {
            this.next()
        }, 5000);
    };

    stopSlide() {

        window.clearInterval(this.timer);
    };

    touch() {

        $('body').keydown((e) => {
            if (e.which === 39) {
                this.next();
            } else if (e.which === 37) {
                this.prev();
            }
        });
    }
}