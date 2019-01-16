function initializeClock(id, endDate) {
    let days, hours, minutes, seconds;
    console.log(endDate);
    endDate = new Date(endDate).getTime();
    
    if (isNaN(endDate)) {
      return;
    }

    
    
    setInterval(calculate, 1000);
    
    function calculate() {
      let startDate = new Date();
      startDate = startDate.getTime();
      
      let timeRemaining = parseInt((endDate - startDate) / 1000);
      
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400);
        timeRemaining = (timeRemaining % 86400);
        
        hours = parseInt(timeRemaining / 3600);
        timeRemaining = (timeRemaining % 3600);
        

        minutes = parseInt(timeRemaining / 60);
        timeRemaining = (timeRemaining % 60);

        
        
        seconds = parseInt(timeRemaining);
        
        let clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        minutesSpan.innerHTML = ("0" + minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + seconds).slice(-2);
      } else {
        return;
      }
    }
  }
  