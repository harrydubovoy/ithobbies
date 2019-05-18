document.addEventListener('DOMContentLoaded', function () {

    // upload image
    {
        const input = $('.js-upload-input');
        const file = $('.js-upload-file');

        input.on('change', function () {
            const fileName = this.files[0].name;
            file.text(fileName);
        })

    }

    // flash messages
    const flashMessage = (type, message) => {
        const prevMessage = $('.uk-alert');
        const flashMessage = $('.js-flash-message');
        const html = `
            <div uk-alert class="uk-alert-${type}">
                <p>${message}</p>
            </div>
        `;
        if(prevMessage) {
            prevMessage.remove();
        }
        flashMessage.html(html);
    };

    // Action delete
    const actionAJAX = (method, url, data, afterDone) => {
        $.ajax({
            method,
            url: `/admin/${url}`,
            data
        })
        .done(response => {
            flashMessage('success', afterDone.message);
            afterDone.action;
            console.log(response);
        })
        .fail( error => {
            flashMessage('error', `Error ${error}`);
            console.log(error);
        });
    };


    const categoryEdit = $('.js-button-edit');
    categoryEdit.on('click', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        const container = $(this).closest('.js-container');
        const name = container.find('input[name="name"]').val();
        const slug = container.find('input[name="slug"]').val();

        actionAJAX(
            'PUT',
            'edit-category',
            { id, name, slug },
            {
                message: 'Category edited'
            }
        );
    });


    const categoryDelete = $('.js-button-delete');
    categoryDelete.on('click', function (e) {
        e.preventDefault();
        const container = $(this).closest('.js-container');
        const id = $(this).data('id');

        actionAJAX(
            'DELETE',
            'remove-category',
            { id },
            {
                action: container.remove(),
                message: 'Category deleted'
            }
        )
    });


    const postDelete = $('.js-delete-post');
    postDelete.on('click', function (e) {
        e.preventDefault();
        const container = $(this).closest('.js-container');
        const id = $(this).data('id');

        actionAJAX(
            'DELETE',
            'remove-post',
            { id },
            {
                action: container.remove(),
                message: 'Post deleted'
            }
        )
    });


    const commentApproved = $('.js-comment-approved');
    commentApproved.on('click', function () {
        const container = $(this).closest('.js-container');
        const postId = container.data('post-id');
        const commentId = container.data('comment-id');

        actionAJAX(
            'PUT',
            'comment-approve',
            { postId, commentId },
            {
                action: $(this).remove(),
                message: 'Comment approved'
            }
        )
    });


    const commentRemove = $('.js-comment-remove');
    commentRemove.on('click', function () {
        const container = $(this).closest('.js-container');
        const postId = container.data('post-id');
        const commentId = container.data('comment-id');

        actionAJAX(
            'DELETE',
            'comment-remove',
            { postId, commentId },
            {
                action: container.remove(),
                message: 'Comment deleted'
            }
        )
    });


    console.log('dom loaded')
});