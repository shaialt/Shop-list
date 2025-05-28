let localStorage = [];

let addItem = document.querySelector('.add_item_button');
let parent = document.querySelector('.choose_item');

addItem.addEventListener('click', onButtonClick);

//פונקציה מרכזית - מפעילה פונקציה של הוספה והסרה של פריטים + דוחפת למערך
function onButtonClick(){
    let id = Math.round(Math.random() * 1000000000);

    //אחראי סינון רק מהדטא ליסט
    let input = parent.querySelector('#choose_item').value;
    let inputValue = input.trim(); //מקצץ רווחים מיותרים לפני ואחרי הגרשיים
    let datalistOptions = Array.from(document.querySelectorAll('#items option')).map(opt => opt.value); // יוצר מערך מכל האפשרויות
    if (inputValue === '' || !datalistOptions.includes(inputValue))
    {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.choose_item').style.marginBottom = '5px';
    }
    else
    {
        localStorage.push({value: input, status: 'false', id: id})
        addNewItem(input, id);
        console.log(localStorage);
        parent.querySelector('#choose_item').value = '';
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.choose_item').style.marginBottom = '20px';
    }
}

//הפונקציה המשנית - מוסיפה ומורידה פריטים
function addNewItem(input, id){
    // item.innerHTML = '<div class="item_div"><p></p><div class="button_div"><button class="done_button" type="button">Done</button><button class="delete_button" type="button">Delete</button></div></div>';
    // יצירת תבנית הפריט
    let item = document.createElement('div');
    item.classList.add('item_div');
    item.id = id;
    let pElement = document.createElement('p');
    item.append(pElement);   
    pElement.innerText = input;
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button_div');
    item.append(buttonDiv);
    let greenButton = document.createElement('button');
    greenButton.classList.add('done_button');
    greenButton.type = 'button';
    greenButton.innerText = 'Done';
    buttonDiv.append(greenButton);
    let redButton = document.createElement('button');
    redButton.classList.add('delete_button');
    redButton.type = 'button';
    redButton.innerText = 'Delete';
    buttonDiv.append(redButton);
    document.querySelector('.main_div').append(item);

        //אחראי על לחיצת כפתור אישור
        let doneButtons = item.querySelector('.done_button');
        doneButtons.addEventListener('click', doneChange);

        function doneChange(event){
            event.target.style.display = 'none';

            let parent = event.target.closest('.item_div');
            let deleteButton = parent.querySelector('.delete_button');

            deleteButton.style.display = 'block';

            //שינוי סטטוס פריט במערך
            let itemId = Number(parent.getAttribute('id'));
            let localStorageIndexId = localStorage.find(item => item.id === itemId);
            if(localStorageIndexId)
            {
                localStorageIndexId.status = 'true';
            }
            console.log(localStorage);
        }

        //אחראי על מחיקת פריט
        let deleteButton = item.querySelector('.delete_button');

        deleteButton.addEventListener('click', deleteItem);
        

        function deleteItem(event){
            let parent = event.target.closest('.item_div');
            parent.remove();

            //הסרה מהמערך
            let itemText = parent.querySelector('p').innerText.trim();
            let index = localStorage.findIndex(item => item.value === itemText);
            if (index !== -1)
            {
                localStorage.splice(index, 1); // הסרת הפריט
            }
            console.log(localStorage);
        }
}
