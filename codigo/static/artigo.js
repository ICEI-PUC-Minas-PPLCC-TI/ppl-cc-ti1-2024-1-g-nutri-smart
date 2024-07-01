
document.addEventListener('DOMContentLoaded', function() {

    var buttons = document.querySelectorAll('.card-body .btn');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {

            event.preventDefault();
            var blankPageUrl = this.getAttribute('href');

            window.location.href = blankPageUrl;
        });
    });
});
