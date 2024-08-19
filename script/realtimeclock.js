const timediv = document.getElementsByClassName('time');
const datediv = document.getElementsByClassName('time');

for (i = 0; i < timediv.length; i++) {
    timediv[i].innerHTML = "Zeit wird ermittelt...";
}

setInterval(clock, 1000);


    function clock() {
        const now = Date.now();

        const date = Intl.DateTimeFormat('de', {weekday : 'long'}).format(now) +  " der " +
            Intl.DateTimeFormat( 'de',{day : '2-digit', month : 'short',  year : 'numeric'}).format(now);

        const time = Intl.DateTimeFormat('de', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(now);

        for (let i = 0; i < datediv.length; i++) {
            datediv[i].innerHTML = date;
        }

        for (let i = 0; i < timediv.length; i++) {
            timediv[i].innerHTML = "<i class='material-symbols-outlined'>schedule</i><p>" + time + "</p>";
        }
    }
