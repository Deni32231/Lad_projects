const formElement = document.forms['formElement'];

for (item of formElement){
    item.onfocus = (evt) => {
        const activeElement = formElement.querySelector('.focused');
        if (activeElement) {
            activeElement.classList.remove('focused');
        }
        evt.target.classList.add('focused');
    };
    item.onblur = () => {
        const activeElement = formElement.querySelector('.focused');
        if (activeElement) {
             activeElement.classList.remove('focused');   
        }
    };
}