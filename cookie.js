function setCookie(cname, cvalue, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*3600*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function makeForm(form) {
    setCookie("sleep", form[0].sleep.value, 30)
    setCookie("temp", form[0].temp.value, 30)
}

checkCookie = ()=> {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const sleepStart = getCookie("sleep");
    const temp = getCookie("temp");
    var sleepEnd = (Number(sleepStart.substring(0, 2)) + 8)%24 + sleepStart.substring(2, 5)
    if (temp) {
        document.getElementById("temp-box").value = temp;
    }
    if (sleepStart) {
        document.getElementById("sleep-box").value = sleepStart;
    }
    if (sleepEnd.length == 4){
        sleepEnd = "0" + sleepEnd;
    }
    var hoursToSleep = 0;
    sleepStartInt = Number(sleepStart.substring(0, 2));
    timeInt = Number(time.substring(0,2))
    if (sleepStartInt > timeInt){
        if (sleepStartInt - timeInt == 0){
            hoursToSleep = "<1"
        } else {
            hoursToSleep = sleepStartInt-timeInt;
        }
    } else if (sleepStartInt < timeInt && timeInt - sleepStartInt < 12){
        hoursToSleep = (timeInt - sleepStartInt);
    } else if (sleepStartInt < timeInt && timeInt >= 12 && sleepStartInt < 12){
        hoursToSleep = (24 - timeInt) + sleepStartInt;
    } else {
        hoursToSleep = "uh oh we screwed up";
    }

    if (time > sleepStart && time < sleepEnd){
        document.getElementById("message").innerHTML = "<h3>GO TO SLEEP!</h3>";
    } else {
        document.getElementById("message").innerHTML = "<h3> ~" + hoursToSleep + " hour(s) until bedtime </h3>";
    }
}
setInterval(checkCookie(),6000);

/*
    if bedtime > current time
        bedtime - current time
    if bedtime < current time and current time - bed time < 12
        (current time - bed time) %12
    if bedtime < current time and current time >= 12 and bedtime < 12
        (24-current time) + bedtime
*/
 