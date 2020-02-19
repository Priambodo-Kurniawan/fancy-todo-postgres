// login
let page = {
    login: {
        name: 'login',
        path: '/login'
    },
    register: {
        name: 'register',
        path: '/register'
    },
    todo: {
        name: 'todo',
        path: '/todo'
    }
}

function setToken (token) {
    localStorage.setItem('token', token);
}

$("#form-login").submit(function(e){
    let email = $('#form-email').val();
    let password = $('#form-password').val();

    $.ajax({
        method: "POST",
        url: `${config.BASE_URL}/api/users/login`,
        data: { email, password }
    })
    .done(function( data ) {
        Swal.fire({
            icon: 'success',
            title: 'Login Success!',
            showConfirmButton: false,
            timer: 1500
        });

        // set to localstorage
        setToken(data.token);

        // change path
        page.data = data;
        history.pushState(page, page.todo.name, page.todo.path)
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