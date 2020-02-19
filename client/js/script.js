// login
$("#form-login").submit(function(e){
    let email = $('#form-email').val();
    let password = $('#form-password').val();

    $.ajax({
        method: "POST",
        url: `${config.BASE_URL}/api/users/login`,
        data: { email, password }
    })
    .done(function( data ) {
        console.log(data);
        Swal.fire({
            icon: 'success',
            title: 'Login Success!',
            showConfirmButton: false,
            timer: 1500
        });
    })
    .fail(function(err) {
        let message = err.responseJSON.message
        Swal.fire({
            icon: 'error',
            title: 'Ops, login failed!',
            showConfirmButton: false,
            text: message,
            timer: 1500
        });
    });
    e.preventDefault();
});