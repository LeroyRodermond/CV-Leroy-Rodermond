class GDPR {

    constructor() {
        this.bindEvents();
        console.log("Huidige coockiestatus: " + this.cookieStatus());
        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }
  
    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept', this.currentDate());
            this.hideGDPR();
        });
  
        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject', this.currentDate());
            this.hideGDPR();
        });
    }
  
  
  
    resetContent(){
        const classes = [
            '.content-gdpr-accept',
  
            '.content-gdpr-reject',
  
            '.content-gdpr-not-chosen'];
  
        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }
  
   
  
    cookieStatus(status, Date) {
  
        if (status) localStorage.setItem('gdpr-consent-choice', status);
  
        if (Date) localStorage.setItem('gdpr-conset-metaData', Date);
  
        return localStorage.getItem('gdpr-consent-choice');
    }
  
   currentDate(){
      var dateNow = new Date();
      const day = dateNow.getDate();
      const month = dateNow.getMonth();
      const year = dateNow.getFullYear();
      const hour = dateNow.getHours();
      const minutes = dateNow.getMinutes();
      return day + "-" + (month + 1) + "-" + year + " " + hour + ":" + minutes;
   }
  
  
    hideGDPR(){
        document.querySelector(".gdpr-consent").classList.add('hide');
        document.querySelector(".gdpr-consent").classList.remove('show');
    }
  
    showGDPR(){
        document.querySelector(".gdpr-consent").classList.add('show');
    }
  
  }
  
  const gdpr = new GDPR();