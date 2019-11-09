export const userService = {
    login,
    logout
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': "*"},
        body: JSON.stringify({email: email,password: password })
    };

    return fetch(`http://localhost:4000/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                 // store user details and basic auth credentials in local storage 
                 // to keep user logged in between page refreshes
                console.log(user)
                //user.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('email', user.email);
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}