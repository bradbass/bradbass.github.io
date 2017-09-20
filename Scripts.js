function writetext() {
    alert("Hello, World!");
}

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    document.body.appendChild(img);
}

function gpslookup() {
	var messageDiv =
            document.getElementById('message');
        function initLocation() {
            var geolocation = navigator.geolocation;
            if (geolocation) {
                try {
                    navigator.geolocation.getCurrentPosition(
                        successCallback,
                        errorCallback
                    );
                } catch (err) {
                    messageDiv.innerHTML = 'Error';
                }
            } else {
                messageDiv.innerHTML = 'Your browser does not support geolocation.';
            }
        }
        function successCallback(location) {
            message.innerHTML = "<p>Latitude: " +
                location.coords.latitude + "</p>";
            message.innerHTML += "<p>Longitude: " +
                location.coords.longitude + "</p>";
        }
        function errorCallback() {
            messageDiv.innerHTML = 'There was an error looking up your position';
        }	
}

function submitcontact() {
    // do something.
    var name = document.getElementById('contactname').value;
    var email = document.getElementById('contactemail').value;
    var subject = document.getElementById('contactsubject').value;
    var msg = document.getElementById('contactmsg').value;

    var body = name + "\n\n" + email + "\n\n" + msg;

    var request = 'mailto:brad.bass@hotmail.ca?subject=' + subject + '&body=' + body;

    window.open(request);
}