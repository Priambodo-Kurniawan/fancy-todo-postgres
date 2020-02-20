// login
let pathName = window.location.pathname;
let page = {
    '/': {
        name: 'login',
        path: '/login',
        api: `${config.BASE_URL}/api/users/login`,
        label: 'Login',
        wrapper: '#login-container'
    },
    '/login': {
        name: 'login',
        path: '/login',
        api: `${config.BASE_URL}/api/users/login`,
        label: 'Login',
        wrapper: '#login-container'
    },
    '/register': {
        name: 'register',
        path: '/register',
        api: `${config.BASE_URL}/api/users/signup`,
        label: 'Register',
        wrapper: '#register-container'
    },
    '/todo': {
        name: 'todo',
        path: '/todo',
        wrapper: '#todo-container'
    }
}

function initPage () {
    pathName = window.location.pathname;
    $('.container-component').hide();
    $(`${page[pathName].wrapper}`).fadeIn( "slow" ); 
    console.log('hai')
}

function setToken (token) {
    localStorage.setItem('token', token);
}

function loginRegister () {
    let email = $(`#form-email-${page[pathName].name}`).val();
    let password = $(`#form-password-${page[pathName].name}`).val();

    $.ajax({
        method: "POST",
        url: `${page[pathName].api}`,
        data: { email, password }
    })
    .done(function( data ) {
        history.pushState(page, page['/todo'].name, page['/todo'].path);
        Swal.fire({
            icon: 'success',
            title: `${page[pathName].label} success!`,
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            // change path
            page.data = data;
            initPage();
        });

        // set to localstorage
        setToken(data.token);
    })
    .fail(function(err) {
        let message = err.responseJSON.message || err.responseJSON.error;
        console.log(message);
        Swal.fire({
            icon: 'error',
            title: `Ops, ${page[pathName].label} failed!`,
            showConfirmButton: false,
            text: message,
            timer: 1500
        });
    });
}

$("#form-login, #form-register").submit(function(e){
    loginRegister();
    e.preventDefault();
});


// handle component to show based on url
initPage();

// back / forward init
window.addEventListener("popstate", function(e) {
    initPage();
});