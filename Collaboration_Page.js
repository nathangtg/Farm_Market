//ACCORDION VARIABLE
const faq_accordion = document.getElementsByClassName('content-container');
//ACCORDION FUNCTION //ACCORDION FUNCTION
//ACCORDION FUNCTION //ACCORDION FUNCTION
//ACCORDION FUNCTION //ACCORDION FUNCTION
for (let i = 0; i<faq_accordion.length; i++) {
    faq_accordion[i].addEventListener('click', function () {
        this.classList.toggle('active');
        console.log('Click' + [i])
    })
}