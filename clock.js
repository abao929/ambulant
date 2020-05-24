const today = new Date();
showTime = ()=> {
    const today = new Date();
    let AMorPM = ""
    let hours = ""
    let minutes = ""
    let seconds = ""
    
    if (today.getHours() < 12){
        AMorPM = "AM";
    } else {
        AMorPM = "PM";
    }
    
    if (today.getHours() == 0 || today.getHours()==12) {
        hours = 12;
    } else {
        hours = today.getHours()%12;
    }
    
    if (today.getMinutes() < 10) {
        minutes = "0" + today.getMinutes();
    } else {
        minutes = today.getMinutes();
    }
    
    if (today.getSeconds() < 10 ){
        seconds = "0" + today.getSeconds();
    } else {
        seconds = today.getSeconds();
    }
    const time = hours + ":" + minutes + ":" + seconds + " " + AMorPM;
    const clock = document.getElementById("clock");
    clock.innerHTML = "<i class='far fa-clock'></i>	&nbsp;&nbsp;&nbsp;" + time;
}

setInterval(showTime, 1000);
    

// if (today.getHours() < 13) {
//     document.getElementById("message").innerHTML = "<h1>time to LUNCH</h1>";
// } else {
//     document.getElementById("message").innerHTML = "<h1>time to whatever</h1>";
// }