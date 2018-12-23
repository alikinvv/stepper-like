var mousePos = 0;
var currentPos = 0;
var position = 0;
var draggable = false;
var countAnimePlus = anime.timeline(), countAnimeMinus = anime.timeline();
var offset = 130;
var direction;
var dur = 2000;
var count = parseInt($('.count').text());
var countAnime, blockAnime;
var pause = false;

anime({
    targets: '.circle',
    scale: 0,
    duration: 0
})

$(document).on('mousedown', '.stepper', function () {
    currentPos = mousePos;

    draggable = true;
    if (pause) {
        blockAnime.pause();
        countAnime.pause();
    }

    if (direction == 'plus') {
        countAnimePlus.pause();
    }

    if (direction == 'minus') {
        countAnimeMinus.pause();        
    }
})  

$(document).on("mousemove", function (event) {
    mousePos = event.pageY;

    if (draggable) {
        position = mousePos - currentPos;
        $('.stepper').css('transform', 'translateY(' + position / 2 + 'px)');
        $('.count').css('transform', 'translateX(' + Math.abs(position / 5) + 'px)');
    }

    if (position <= (offset * -1) && draggable) {
        if ($('.wrap.like').length === 0) {
            count++;
            plus();               
        }
        
        if (pause) {
            countAnime.pause();
        }
        center();        
    }

    if (position >= offset && draggable) {
        if ($('.wrap').hasClass('like')) {        
            count--;
            minus();
        }

        if (pause) {
            countAnime.pause();
        }
        center(); 
    }
});

$(document).on("mouseup", function (event) {
    if (draggable) {
        center();
    }
});


function center() {
    draggable = false;
    pause = true;
    blockAnime = anime({
        targets: '.stepper',
        duration: dur,
        translateY: 0,
    });

    countAnime = anime({
        targets: '.count',
        duration: dur,
        translateX: 0,
    })
}

function plus() {
    direction = 'plus';
    countAnimePlus = anime.timeline();    

    $('.circle').removeClass('white').addClass('pink');

    countAnimePlus.add({
        targets: '.circle',
        scale: 1,
        duration: 200, 
        easing: 'linear',
        complete: function () {
            $('.wrap').addClass('like');
        }
    })
    .add({
        targets: '.stepper svg',
        scale: 0,
        duration: 0, 
        complete: function () {
            anime({
                targets: '.stepper svg',
                scale: 1,
                duration: 700,
            })
        }
    })

    anime({
        targets: '.count',
        right: 0,
        duration: 300,
        easing: 'linear',
        complete: function () {
            $('.count').text(count);

            anime({
                targets: '.count',
                right: -71,
                duration: 300,
                easing: 'easeOutBack'
            })  
        }
    })
}

function minus() {
    direction = 'minus';
    countAnimeMinus = anime.timeline();

    $('.wrap').removeClass('like');

    countAnimeMinus.add({
        targets: '.circle',
        scale: 0,
        duration: 200,
        easing: 'linear'
    })
    .add({
        targets: '.stepper svg',
        scale: 0,
        duration: 0,
        complete: function () {
            anime({
                targets: '.stepper svg',
                scale: 1,
                duration: 700,
            })
        }
    })

    anime({
        targets: '.count',
        right: 0,
        duration: 300,
        easing: 'linear',
        complete: function () {
            $('.count').text(count);

            anime({
                targets: '.count',
                right: -71,
                duration: 300,
                easing: 'easeOutBack'
            })
        }
    })
}