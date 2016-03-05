REQUEST_SLEEP_TIME = 2000; //ms
COUNT = 0;
$(document).ready(function () {
    // main page
    $("#username-input").keypress(function (eventData) {
            if (eventData.keyCode === 13) {
                mainSubmit();
            }
        }
    );
    $("#region-input").keypress(function (eventData) {
            if (eventData.keyCode === 13) {
                mainSubmit();
            }
            eventData.preventDefault();
        }
    );
    $("#enter-button").click(mainSubmit);

    if (gon.individualPage) {
        //indiviual page
        setTimeout(requestLoop, 0);
    }
});

function mainSubmit() {
    linkPath = gon.basePath;
    linkPath += $("#region-input").val();
    linkPath += "/";
    linkPath += $("#username-input").val();
    window.location.href = linkPath;
}

function requestLoop() {
    //while (true) {
    //    response = $.ajax({
    //        url: gon.currentPath, // Route to the Script Controller method
    //        type: "GET",
    //        async: false,
    //        dataType: "json"
    //        //error: function () {
    //        //    alert("Ajax error!");
    //        //    break;
    //        //}
    //    });
    //    data = response.responseJSON;
    //    console.log(data);
    //    if (data.valid) {
    //        if (data.in_game) {
    //            stillInGame();
    //        } else {
    //            outOfGame();
    //            break;
    //        }
    //    }
    //}


    //}

    return $.ajax({
        url: gon.currentPath, // Route to the Script Controller method
        type: "GET",
        dataType: "json",
        complete: function () {
        },
        success: function (data, textStatus, xhr) {
            // Do something with the response here
            console.log(new Date().getTime());
            console.log(data);
            if (data.valid) {
                if (data.in_game) {
                    return stillInGame();
                } else {
                    outOfGame();
                }
            }
        },
        error: function () {
            alert("Ajax error!")
        }
    });
}
function stillInGame() {
    return setTimeout(function () {
        return requestLoop();
    }, REQUEST_SLEEP_TIME)

}

function outOfGame() {
    alert("out of game");
}