function getInput() {
    console.log('The Get Repos app has started');
 // This will need to take user search data and pass it into our api function once a user hits 'submit'
    $('.submit-button').click(function(event) {
        event.preventDefault();
        $('.results-box').empty();

        username = $('#username-field').val().toLowerCase();
        pullRepos();
    })
}

function pullRepos() {
    console.log('The pullRepos function has ran');
 // This will call the API and get Json results from the API 
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(responseJson =>
            displayRepos(responseJson))
            .catch(e => alert('OOPS'));
}

function displayRepos(responseJson) {
    console.log('The displayRepos function has ran');
    console.log(responseJson);
 // This will display the results in the DOM and the console. It will also display an error.
    if (responseJson.message === "Not Found") {
        $('.results-box').html(`
            <h3>Whoops! Looks like there's no user with that name. Please enter a valid username and try again</h3>
        `);
    } else {
        $('.results-box').append(`
                <h3 class="user-title">GitHub User ${username}'s Repositories:</h3>`);
        for (let i = 0; i < responseJson.length; i++) {
                $('.results-box').append(`<ul class="repository-details">
                    <li><span class="result-name">${responseJson[i].name.toUpperCase()}</span></li>
                    <li>${responseJson[i].description}</li>
                    <li><span class="result-link">Link:</span> <a href="${responseJson[i].html_url}">View on GitHub</a></li>
                </ul>
            `);
        }
    }
}

function runApp() {
    getInput();
}

$(runApp);