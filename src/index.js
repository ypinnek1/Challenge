require('normalize.css/normalize.css');
require('./styles/index.scss');


window.addEventListener("DOMContentLoaded", function() {


    var registerUser = (function () {

        // List of users in the company
        var users = {
            'Happy': 0,
            'Dopey': 0,
            'Grumpy': 0,
            'Sneezy': 0,
            'Bashful': 0,
            'Sleepy': 0,
            'Doc': 0,
            'Snow': 0
        };

        var myName;

        // Attaching event listener to the Submit button
        var submitBtn = document.querySelector('.submit--user__name');
        submitBtn.addEventListener('click', valSubmitted);
    
        // Storing the name of the registered user. Updated the local storage with the users list. 
        // Removing registration option after submit is successful. Enabling 'Coffee' & 'Lunch' buttons.
        function valSubmitted() {
            myName = document.querySelector('.input--user__name').value;
            updateLocalStorage();
            removeRegistrationOption();
            enableBtn();
        }

        function enableBtn() {
            var btn = document.querySelector('.btn');
            btn.style.display = 'block';
        }

        function removeRegistrationOption() {
            var registration = document.querySelector('.register--user');
            registration.parentElement.removeChild(registration);
        }

        function updateLocalStorage () {
            localStorage.setItem('usersTable', JSON.stringify(users));
            displayUsers();
            addRegisteredUser();
        };

        function displayUsers () {
            // DOM manipulations to show the list of users
            var heading = document.querySelector('h2');
            heading.textContent = 'Users in the Company';
            var div = document.createElement('div');
            div.classList.add('list');
            var ul = document.createElement('ul');
            ul.classList.add('list--users');
            div.appendChild(ul);
            document.querySelector('.register').appendChild(div);
            div.insertAdjacentElement('beforebegin', heading);
            for(let val in users) {
                var li = document.createElement('li');
                li.classList.add('list__user');
                li.textContent = val;
                ul.appendChild(li);
            }
        }

        function addRegisteredUser () {
            var li = document.createElement('li');
            li.classList.add('list__user');
            li.textContent = myName+' (You)';
            document.querySelector('.list--users').appendChild(li);
        }

        return {
            init: function () {
                coffeePartner();
                lunchPartner();
            }
        }

    }());

    // Find a Coffee partner
    var coffeePartner = function() {
        var coffeeBtn = document.querySelector('.coffee--btn');
        coffeeBtn.addEventListener('click', findPartner);
        myCoffeeModal();

        // Match new partner for coffee
        function findPartner() {
            var users = JSON.parse(localStorage.getItem("usersTable"));
            var values = Object.values(users);
            var keys = Object.keys(users);
            var minVal = Math.min(...values);
            for(let key in users) {
                if((users[keys[keys.length - 1]] === 1 ) || (users[key] > 1)) {
                    document.querySelector('.modal-text').textContent = "You've already connected with everyone! Try lunch instead.";
                    break;
                }
                else if(users[key] === minVal && users[key] < 2) {
                    users[key]++;
                    document.querySelector('.modal-text').textContent = `Get coffee with ${key}`;
                    break;
                }      
            }
            localStorage.setItem('usersTable', JSON.stringify(users));
        }
    };

    // Find a lunch group
    var lunchPartner = function() {
        // Attach Event Listener
        var lunchBtn = document.querySelector('.lunch--btn');
        lunchBtn.addEventListener('click', findPartner);
        //Open Modal
        myLunchModal();

        // Find the correct set of partners
        function findPartner() {
            // Get users list from local storage
            var users = JSON.parse(localStorage.getItem("usersTable"));
            var values = Object.values(users);
            var minVal = Math.min(...values);
            var keys = Object.keys(users);
            var group = [];
            
            for(let key in users) {
                if(users[key] === minVal && group.length < 5) {
                    group.push(key)
                    users[key]++;
                }
            }
        
            // Similar to Circular Linked List
            if(group.length < 3) {
                group.push(keys[0]);
                group.push(keys[1]);
                users[keys[0]]++;
                users[keys[1]]++;
            }

            document.querySelector('.modal-text').textContent = `Go to Lunch with ${group}`;
            // Set the local storage with updated users table
            localStorage.setItem('usersTable', JSON.stringify(users));
        }
    };

    function commonModal(btn) {
        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    var myCoffeeModal = function () {
        // Get the button that opens the modal
        var btn = document.querySelector('.coffee--btn');
        commonModal(btn);
    };

    var myLunchModal = function () {
        // Get the button that opens the modal
        var btn = document.querySelector('.lunch--btn');
        commonModal(btn);
    };

    // Start Point
    registerUser.init();

});