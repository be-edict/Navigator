document.getElementById('time').innerHTML = "Zeit wird ermittelt...";

setInterval(clock, 1000);


    function clock() {
        const now = Date.now();

        const date = Intl.DateTimeFormat('de', {weekday : 'long'}).format(now) +  " der " +
            Intl.DateTimeFormat( 'de',{day : '2-digit', month : 'short',  year : 'numeric'}).format(now);

        const time = Intl.DateTimeFormat('de', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(now)

        document.getElementById('date').innerHTML = date;
        document.getElementById('time').innerHTML = "<i class='material-symbols-outlined'>schedule</i><p>" + time + "</p>";
    }
