// Admin panel

const url = "/api/admin";


// Вкладка User table admin panel с информацией о пользователях и кнопками редактирования и удаления
showUsers()

function showUsers() {
    $('#AllUsers').empty()
    fetch("api/admin")
        .then(response => response.json())
        .then(user => {
            user.forEach(user => {
                let userRoles = []
                user.roles.forEach(role => userRoles.push(role.name.toString().replace("ROLE_", "")))
                const users = `$(
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${userRoles}</td>
                        <td> <button type="button" class="btn btn-info" data-toggle="modal"
                            data-target="#edit" onclick="editModal(${user.id})">Edit</button>
                        </td>
                        <td><button type="button" class="btn btn-danger" data-toggle="modal"
                            data-target="#delete" onclick="deleteModal(${user.id})">Delete</button>
                        </td>
                    </tr>)`;
                $('#AllUsers').append(users)
            })
        })
}

// Вкладка New User - форма добавления новых пользователей
addNewUser()

function addNewUser() {
    let newUser = document.forms["addNewUser"];
    newUser.addEventListener("submit", (event) => {
        event.preventDefault();
        let roles = [];
        for (let i = 0; i < newUser.roles.options.length; i++) {
            if (newUser.roles.options[i].selected) roles.push({
                id: newUser.roles.options[i].value,
                name: newUser.roles.options[i].text
            });
        }
        fetch("api/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newUser.name.value,
                surname: newUser.surname.value,
                age: newUser.age.value,
                username: newUser.username.value,
                email: newUser.email.value,
                password: newUser.password.value,
                roles: roles
            })
        }).then(() => {
            newUser.reset();
            $('#usersTable').click();
            showUsers();
        });
    });
}

// Модальное окно редактирования пользователей

let edit = document.forms["edit"];

async function editModal(id) {
    $('#editModal').modal('show');
    let user = await fetch("api/admin/" + id)
        .then(response => response.json());
    edit.id.value = user.id;
    edit.name.value = user.name;
    edit.surname.value = user.surname;
    edit.age.value = user.age;
    edit.username.value = user.username;
    edit.email.value = user.email;
    edit.password.value = user.password;
    edit.roles.value = user.roles;
}

editUser();

function editUser() {
    edit.addEventListener("submit", (event) => {
        event.preventDefault();
        let roles = [];
        for (let i = 0; i < edit.roles.options.length; i++) {
            if (edit.roles.options[i].selected) roles.push({
                id: edit.roles.options[i].value,
                name: "ROLE_" + edit.roles.options[i].text
            });
        }
        fetch("api/admin/" + edit.id.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: edit.id.value,
                name: edit.name.value,
                surname: edit.surname.value,
                age: edit.age.value,
                username: edit.username.value,
                email: edit.email.value,
                password: edit.password.value,
                roles: roles
            })
        }).then(() => {
            $('#closeEdit').click();
            showUsers()
        });
    });
}

// Модальное окно удаления пользователей
let deleteUserForm = document.forms["delete"];

async function deleteModal(id) {
    $('#deleteModal').modal('show');
    let user = await fetch("api/admin/" + id)
        .then(response => response.json());
    deleteUserForm.id.value = user.id;
    deleteUserForm.name.value = user.name;
    deleteUserForm.surname.value = user.surname;
    deleteUserForm.age.value = user.age;
    deleteUserForm.username.value = user.username;
    deleteUserForm.email.value = user.email;
    deleteUserForm.roles.value = user.roles;
}

deleteUser();

function deleteUser() {
    deleteUserForm.addEventListener("submit", (event) => {
        event.preventDefault();
        fetch("api/admin/" + deleteUserForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            $('#closeDelete').click();
            showUsers()
        });
    });
}