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
    $(`${page[pathName].wrapper}`).fadeIn( 'slow' );

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
        method: 'POST',
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
        method: 'GET',
        url: `${config.BASE_URL}/api/users/${idUser}`,
        headers: {
            token: token
        }
    })
    .then(function(data) {
        // reset container
        // $('#checked-todo, #list-todo').html('');
        let listTodo = data.user.todos;
        history.state.data.todos = listTodo;

        listTodo.forEach(function(todo) {
            let template = `
            <li class='uk-margin'>
                <div>
                    <div class="uk-grid-collapse" uk-grid>
                        <div class="uk-width-expand">
                            <label>
                                <input 
                                    id='list-todo-${todo.id}' 
                                    style='margin-right: 5px;' 
                                    class='uk-checkbox check-item' 
                                    type='checkbox'
                                    ${todo.id_status == config.TODO_STATUS_DONE ? 'checked' : ''}> 
                                <span>${todo.title}</span>
                                <span class="uk-text-meta uk-text-small uk-float-right">${moment(todo.due_date).format('DD / MMM')}</span>
                            </label>
                        </div>
                        <div class="uk-width-auto">
                            <ul uk-nav class='uk-nav-default uk-padding-remove uk-margin-small-left'>
                                <li>
                                    <a href='javascript:void(0)' onclick='showMenuTodo(${todo.id})'>
                                        <span class='uk-margin-small-right uk-icon uk-float-right' uk-icon='icon: more-vertical; ratio: 0.8;'></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class='uk-text-meta' style='margin-left: 25px'>${todo.description}</div>
            </li>`

            if (todo.id_status == config.TODO_STATUS_DONE) {
                $('#checked-todo').append(template);
            } else {
                $('#list-todo').append(template);
            }
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
    let idUser = history.state.data.user.id;
    $.ajax({
        method: 'PUT',
        url: `${config.BASE_URL}/api/todos/${idTodo}`,
        data: { id_status: status, user_id: idUser },
        headers: {
            token: token
        }
    })
    .then(function(data) {
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
}

function showMenuTodo (idTodo) {
    UIkit.modal('#modal-menu-todo').show();
    $('#id-todo-selected').val(idTodo);
}

function addEditTodo (type) {
    let formatedDate = '';
    $('#title-menu').text(type == 'edit' ? 'Edit' : 'Add');
    let selectedTodo = {
        id: '',
        title: '',
        description: '',
        due_date: ''
    }

    if (type == 'edit') {
        let idTodo = $('#id-todo-selected').val();
        let dataTodo = history.state.data.todos;
        selectedTodo = dataTodo.filter(function(todo) {
            return todo['id'] == idTodo
        })[0];
        formatedDate = moment(selectedTodo.due_date).format('YYYY-MM-DD H:mm');
    }

    //  init datepicker
    $('#form-todo-due').flatpickr({
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: formatedDate
    });
    
    if (type == 'edit') {
        $('#form-todo-id').val(selectedTodo.id);
        $('#form-todo-title').val(selectedTodo.title);
        $('#form-todo-desc').val(selectedTodo.description);
        $('#form-todo-due').val(formatedDate);
    }

    UIkit.modal('#modal-add-todo').show();
}

function addEditTodoCommit () {
    let idUser = history.state.data.user.id;
    let idTodo = $('#form-todo-id').val();
    let apiUrl = idTodo ? `${config.BASE_URL}/api/todos/${idTodo}` : `${config.BASE_URL}/api/todos/${idUser}/create`;
    let method = idTodo ? 'PUT' : 'POST';
    let obj = {
        title: $('#form-todo-title').val(),
        description: $('#form-todo-desc').val(),
        due_date: $('#form-todo-due').val(),
        user_id: idUser
    }

    $.ajax({
        method: method,
        url: apiUrl,
        data: obj,
        headers: {
            token: token
        }
    })
    .then(function(data) {
        getTodo();
        UIkit.modal('#modal-add-todo').hide();
    })
    .fail(function(err) {
        let message = err.responseJSON.error.message || err.responseJSON.error;
        Swal.fire({
            icon: 'error',
            title: `Ops, update failed!`,
            showConfirmButton: false,
            text: message,
            timer: 1500
        });
    });
}

function showStatusNotification (message) {
    UIkit.notification({
        message: `<span uk-icon='icon: check'></span> ${message}`,
        status: 'primary',
        pos: 'top-right',
        timeout: 5000
    });
}

function deleteTodo () {
    let idTodo = $('#id-todo-selected').val();
    let idUser = history.state.data.user.id;
    Swal.fire({
        title: 'Are you sure?',
        text: 'Delete this todo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        if (result.hasOwnProperty('value')) {
            $.ajax({
                method: 'DELETE',
                url: `${config.BASE_URL}/api/todos/${idTodo}`,
                data: { user_id: idUser },
                headers: {
                    token: token
                }
            })
            .then(function(data) {
                UIkit.modal('#modal-menu-todo').hide();
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
        }
    })
}

$('#form-login, #form-register').submit(function(e){
    loginRegister();
    e.preventDefault();
});

$('#form-add-edit-todo').submit(function(e) {
    addEditTodoCommit();
    e.preventDefault();
})

// listen to checkbox when checked
$('body').on('change', '.check-item', function() {
    let idTodo = $(this).attr('id').split('-')[2];
    let returnVal = $(this).is(':checked');
    let message = {
        'done': 'Mark as done this task',
        'back': 'Back to Todo List'
    }

    Swal.fire({
        title: 'Are you sure?',
        text: returnVal ? message.done : message.back,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure!'
    }).then((result) => {
        if (result.hasOwnProperty('value')) {
            editStatus(idTodo, returnVal ? config.TODO_STATUS_DONE : config.TODO_STATUS_ACTIVE);
            returnVal = true;    
        }
        $(this).prop('checked', !returnVal);
    })
});

// handle component to show based on url
initPage();

// back / forward init
window.addEventListener('popstate', function(e) {
    initPage();
});