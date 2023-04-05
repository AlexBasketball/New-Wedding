document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper ('.swiper', {
        direction: 'horizontal', 
        slidesPerView: 2,
        spaceBetween: 30,

        navigation: {
            nextEl: '.swiper-custom-next',
            prevEl: '.swiper-custom-prev',
          },

    })

    const inviteBtn = document.querySelector('.invite-block__btn');
    const inviteModal = document.querySelector('.invite-modal');
    const inviteCloseBtn = document.querySelector('.invite-modal__close');
    const inviteModalWindow = document.querySelector('.invite-modal__window');

    inviteBtn.addEventListener('click', () => {
        inviteModal.classList.remove('hidden');

        inviteCloseBtn.addEventListener('click', () => {
            inviteModal.classList.add('hidden');
        })
    })

    inviteModalWindow.addEventListener('click', function(e) {
        e.stopPropagation();
    })

    inviteModal.addEventListener('click', () => {
        inviteModal.classList.add('hidden');
    })

    const modalNav = document.querySelector('.modal-nav');
    const modalNavWindow = document.querySelector('.modal-nav__window');
    const modalNavCloseBtn = document.querySelector('.modal-nav__close');
    const headerBtn = document.querySelector('.header-btn');
    const modalNavLink = document.querySelectorAll('.modal-nav__link');

    headerBtn.addEventListener('click', () => {
        modalNav.classList.remove('hidden');

        modalNavCloseBtn.addEventListener('click', () => {
            modalNav.classList.add('hidden');
        })
    })

    modalNavWindow.addEventListener('click', function(e) {
        e.stopPropagation();
    })

    modalNav.addEventListener('click', () => {
        modalNav.classList.add('hidden');
    })

    modalNavLink.forEach(function(item) {
        item.addEventListener('click', () => {
            modalNav.classList.add('hidden');
        })
    })

    ymaps.ready(init);
    function init(){
        let myMap = new ymaps.Map("map", {
            center: [56.01701956872286,37.127936500000004],
            zoom: 15
        });

        let myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point", 
                coordinates: [56.01701956872286,37.127936500000004] 
            }
        });

        myMap.geoObjects.add(myGeoObject);
    }




    const validation = new JustValidate('.form');

    validation
    .addField('.invite-modal__name', [
        {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите 3 и более символов',
        },
        {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Введите менее 30 символов',
        },
        {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя!'
        }
    ])

    .onSuccess((event) => {
        console.log('Validation passes and form submitted', event);

        let formData = new FormData(event.target);

        console.log(...formData);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            console.log('Отправлено');
            }
        }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        event.target.reset();
    });
});