$(document).ready(() => {

    autosize($('textarea'));

    // menu
    const showMenu = () => {
        $("html, body").css({ 'overflow': 'hidden', 'height': '100%' });
        $('.js-header').addClass('header__active');
        $('.js-categories').addClass('categories_active');
    };
    const hideMenu = () => {
        setTimeout(() => {
            $("html, body").css({ 'overflow': 'visible', 'height': 'auto' })
        }, 200);
        $('.js-header').removeClass('header_active');
        $('.js-categories').removeClass('categories_active');
    };

    $('.js-menu').on('click', function() {
        $(this).toggleClass('menu_active');
        $(this).hasClass('menu_active') ? showMenu() : hideMenu();
        return false;
    });

    $('.js-search').on('click', function () {
        $('.js-header__search').toggleClass('header__search_active');
        return false;
    });


    const authorName = $('.js-comment__item');
    const commentBody = $('.js-comment-body');

    authorName.on('click', function() {
        const nameForReply = $(this).data('name');
        commentBody.text(`${nameForReply}, `);
        commentBody.next().addClass('active');
    });



    const modalSuccessShow = (text) => {
        const modalSuccess = $('#modalSuccess');
        modalSuccess.modal('show');
        const textSucces = modalSuccess.find('.js-modal-success-text');
        textSucces.html(text);
    };

    const modalErrorShow = () => {
        const modalError = $('#modalError');
        modalError.modal('show');
        const textError = modalError.find('.js-modal-error-text');
        textError.html('Что-то пошло не так :( <br/> Попробуйте еще раз или позже');
    };

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }




    // Comment Form

    const commentForm = $('.js-comment-form');
    commentForm.on('submit', function(e) {
        e.preventDefault();

        const form = $(this);
        const id = form.data('id');
        const name = form.find('.js-comment-name');
        const email = form.find('.js-comment-email');
        const body = form.find('.js-comment-body');
        const resultMessage = form.find('.js-result-message');
        const isValid = [];
        let canSend = null;
        let data = {};

        if(name.val() === '') {
            name.addClass('invalid');
            resultMessage.text('Поле обязательное');
            isValid.push(false);
        } else {
            name.removeClass('invalid');
            isValid.push(true);
        }

        if(body.val() === '') {
            body.addClass('invalid');
            resultMessage.text('Поле обязательное');
            isValid.push(false);
        } else {
            body.removeClass('invalid');
            isValid.push(true);
        }

        if(email.val() === '') {
            email.addClass('invalid');
            resultMessage.text('Поле обязательное');
            isValid.push(false);
        } else if (email.val() !== '' && !validateEmail(email.val())) {
            email.addClass('invalid');
            resultMessage.text('Не верный Email');
            isValid.push(false);
        } else {
            email.removeClass('invalid');
            isValid.push(true);
        }

        canSend = isValid.every(valid => valid);

        if(canSend) {
            data = {
                id,
                author: name.val(),
                email: email.val(),
                text: body.val()
            };

            resultMessage.text('');
            name.val('').next().removeClass('active');
            email.val('').next().removeClass('active');
            body.val('').next().removeClass('active');
            autosize.update(body);

            $.ajax({
                method: 'POST',
                url: `/add-comment`,
                data
            })
            .done(response => {
                modalSuccessShow('Спасибо! <br/> Ваш коментарий отправлен на модерацию');
                console.log(response);
            })
            .fail( error => {
                modalErrorShow();
                console.log(error);
            });
        }
    });



    // Contact Form

    const modalContactForm = $('#modalContactForm');
    const contactForm = $('.js-contact-form');
    contactForm.on('submit', function(e) {
        e.preventDefault();

        const form = $(this);
        const name = form.find('.js-contact-name');
        const email = form.find('.js-contact-email');
        const message = form.find('.js-contact-message');
        const resultMessage = form.find('.js-result-message');
        const isValid = [];
        let canSend = null;
        let data = {};

        if(name.val() === '') {
            name.addClass('invalid');
            resultMessage.text('Поле обязательное');
            isValid.push(false);
        } else {
            name.removeClass('invalid');
            isValid.push(true);
        }

        if(message.val() === '') {
            message.addClass('invalid');
            resultMessage.text('Поле обязательное');
            isValid.push(false);
        } else {
            message.removeClass('invalid');
            isValid.push(true);
        }

        if(email.val() === '') {
            email.addClass('invalid');
            resultMessage.text('Поле обязательное');
            isValid.push(false);
        } else if (email.val() !== '' && !validateEmail(email.val())) {
            email.addClass('invalid');
            resultMessage.text('Не верный Email');
            isValid.push(false);
        } else {
            email.removeClass('invalid');
            isValid.push(true);
        }

        canSend = isValid.every(valid => valid);

        if(canSend) {
            data = {
                name: name.val(),
                email: email.val(),
                message: message.val()
            };

            resultMessage.text('');
            name.val('').next().removeClass('active');
            email.val('').next().removeClass('active');
            message.val('').next().removeClass('active');

            $.ajax({
                method: 'POST',
                url: `/send-mail`,
                data
            })
            .done(response => {
                modalContactForm.modal('hide');
                modalSuccessShow('Спасибо за Ваше сообщение! <br/> В ближаййшее время мы с Вами свяжемся');
                console.log(response);
            })
            .fail( error => {
                modalErrorShow();
                console.log(error);
            });
        }
    });


});