function swiper(){
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    effect: 'fade',
    simulateTouch: false,
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            simulateTouch: true,
        },
        992: {
            simulateTouch: true,
        }
    }

});

    $('.prev').on('click', function() {
        setTimeout(function() {
            swiper.slidePrev()
        }, 1700)
    })

    
    $('.next').on('click', function() {
        setTimeout(function() {
            swiper.slideNext()
        }, 1700)
    })

    $('.arrows').on('click', function() {
        $('.reveal').addClass('active')
        TweenMax.to(".box-title", .8, {
            x: 100,
            opacity: 0,
            ease: Power2.easeInOut,
            delay: 0,
        })
    })

    swiper.on('slideChangeTransitionEnd', function(){
        $('.reveal').removeClass('active')
        TweenMax.to(".box-title", .1, {
            x: 0,
            opacity: 1,
            ease: Power2.easeInOut,
            delay: 0,
        })

    })
}

swiper()

function transitionAnimation(){
    gsap.to(".loader-overlay.one", {
        duration: 1,
        scaleX: 1,
        transformOrigin: "left",
        ease: "power1.inOut"
    });
    gsap.to(".loader-overlay.one", {
        duration: 1,
        scaleX: 0,
        transformOrigin: "right",
        ease: "power1.inOut",
        delay: 2
    });

    gsap.to(".loader-overlay.two", {
        duration: 1.4,
        scaleX: 1,
        transformOrigin: "left",
        ease: "power1.inOut"
    });
    gsap.to(".loader-overlay.two", {
        duration: 1.4,
        scaleX: 0,
        transformOrigin: "right",
        ease: "power1.inOut",
        delay: 1.6
    });
}

function contentInAnimation() {
    var tl = gsap.timeline();
    tl.from(".box-left", {
        duration: 1,
        translateY: 100,
        opacity: 0,
    });

    tl.from(".box-right", {
        duration: 1,
        translateY: 100,
        opacity: 0,
    },
    "-=.1"
    );

    tl.to(".box-img .img-cover", {
        clipPath: "polygon(0 0, 100% 0, 100%  100%, 0% 100%)",
        opacity: 1,
        ease: 'Circ.easeInOut'
    },
    "-=1.2"
    );

    tl.to(".images .img-cover", {
        clipPath: "polygon(0 0, 100% 0, 100%  100%, 0% 100%)",
        opacity: 1,
        ease: 'Circ.easeInOut'
    },
    "-=.5"
    );
}

function contentOutAnimation() {
    var tl = gsap.timeline();
    tl.from(".box-left", {
        duration: 1,
        translateY: 100,
        opacity: 0,
    });

    tl.from(".box-right", {
        duration: 1,
        translateY: 100,
        opacity: 0,
    },
    "-=.1"
    );

    tl.to(".box-img .img-cover", {
        clipPath: "polygon(0 0, 100% 0, 100%  100%, 0% 100%)",
        opacity: 1,
        ease: 'Circ.easeInOut'
    },
    "-=1.2"
    );

    tl.to(".images .img-cover", {
        clipPath: "polygon(0 0, 100% 0, 100%  100%, 0% 100%)",
        opacity: 1,
        ease: 'Circ.easeInOut'
    },
    "-=.5"
    );
}


barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning');        
});

barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning');
    swiper()
   
});

barba.hooks.enter(() => {
    window.scrollTo(0, 0);
});

function delay(n) {

    n = n || 4000; //4000 is default time set
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}


$(function(){

// BARBA SETUP
barba.init({
    sync: true,

    transitions: [{
      
     async leave(data) {
        // create your stunning leave animation here
        const done = this.async();

        contentOutAnimation();

        setTimeout(function(){
            transitionAnimation();
        }, 2000);

        await delay(3000); // 3000 = 3 sec
        done();
      },
     async enter(data) {
        // create your amazing enter animation here
        contentInAnimation();
      }
    }]
  });

});










$('body').on('click', '.hamburger', function(){
    $(this).toggleClass('is-active')
   
})

$('body').on('click', '.hamburger', function(){
    var tlmenu = new TimelineMax({
        paused: true,
        delay: -1,
    })

    tlmenu.staggerFromTo(
        ".nav",
        .7,
        {left: '-100%', display: 'none', ease: Circ.easeInOut},
        {left: '0%', display: 'block', ease: Circ.easeInOut},
        0.1
    )

    tlmenu.staggerFromTo(
        ".nav .menu",
        .8,
        {x: -50, opacity: 0, ease: Circ.easeInOut},
        {x: 0, opacity: 1, ease: Circ.easeInOut},
        0.1
    )

    if($(this).hasClass('is-active')){
        tlmenu.play(0)
    }else{
        tlmenu.reverse(-0.5)
    }

})

$('body').on('click', '.nav .menu li a', function(){
    $('.nav').fadeOut(1200)
    $('.hamburger').removeClass('is-active')
})