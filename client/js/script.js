// login
let pathName = window.location.pathname;
let userData = {};
let token = localStorage.getItem('token');
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
};

function initPage () {
    pathName = window.location.pathname;
    $('.container-component').hide();
    $(`${page[pathName].wrapper}`).fadeIn( "slow" );

    if (pathName == '/todo') {
        getTodo();
    }
};

function setToken (token) {
    localStorage.setItem('token', token);
};

function loginRegister () {
    let email = $(`#form-email-${page[pathName].name}`).val();
    let password = $(`#form-password-${page[pathName].name}`).val();

    $.ajax({
        method: "POST",
        url: `${page[pathName].api}`,
        data: { email, password }
    })
    .done(function( data ) {
        page.data = data;
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
        getTodo();
    })
    .fail(function(err) {
        let message = err.responseJSON.message || err.responseJSON.error;
        Swal.fire({
            icon: 'error',
            title: `Ops, ${page[pathName].label} failed!`,
            showConfirmButton: false,
            text: message,
            timer: 1500
        });
    });
};

function getTodo () {
    let idUser = history.state.data.user.id;
    
    $.ajax({
        method: "GET",
        url: `${config.BASE_URL}/api/users/${idUser}`,
        headers: {
            token: token
        }
    })
    .then(function(data) {
        let listTodo = data.user.todos;
        listTodo.forEach(function(todo) {
            let template = `
            <li class="uk-margin">
                <div>
                    <label>
                        <input id="list-todo-${todo.id}" style="margin-right: 5px;" class="uk-checkbox check-item" type="checkbox"> 
                        <span>${todo.title}</span>
                    </label>
                </div>
                <div class="uk-text-meta" style="margin-left: 25px">${todo.description}</div>
            </li>`

            $('#list-todo').append(template);
        });
    })
    .fail(function(err) {
        let message = err.responseJSON.message || err.responseJSON.error;
        Swal.fire({
            icon: 'error',
            title: `Ops, ${page[pathName].label} failed!`,
            showConfirmButton: false,
            text: message,
            timer: 1500
        });
    });
}

function editStatus(idTodo, status) {
    $.ajax({
        method: "PUT",
        url: `${config.BASE_URL}/api/todos/${idTodo}`,
        data: { id_status: status },
        headers: {
            token: token
        }
    })
    .then(function(data) {
        console.log(data);
        alert('oke')
    })
    .fail(function(err) {
        let message = err.responseJSON.message || err.responseJSON.error;
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

// listen to checkbox when checked
$('body').on('change', '.check-item', function() {
    let idTodo = $(this).attr('id').split('-')[2];

    if(this.checked) {
        var returnVal = false;
        Swal.fire({
            title: 'Are you sure?',
            text: "Mark as done this task",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure!'
        }).then((result) => {
            if (result.hasOwnProperty('value')) {
                editStatus(idTodo, config.TODO_STATUS_DONE);
                returnVal = true;    
            }
            $(this).prop("checked", returnVal);
        })
    }      
});

// handle component to show based on url
initPage();

// back / forward init
window.addEventListener("popstate", function(e) {
    initPage();
});