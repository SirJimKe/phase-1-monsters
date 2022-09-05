document.addEventListener("DOMContentLoaded", ()=>{
    createForm();
    renderMonsters();
    createMonster();
    nextPage();
    prevPage();
})

const monstersContainer = document.querySelector('#monster-container');

let pageNumber = 1;

function createForm(){

    let form = document.createElement('form');
    form.innerHTML = `
        <form>
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button id="create" type="submit">Create</button>
        </form>
    `
    document.querySelector('#create-monster').appendChild(form);
}

function renderMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        data.forEach(monsters => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');

            h2.innerText = monsters.name;
            h4.innerText = monsters.age;
            p.textContent = monsters.description;

            div.append(h2, h4, p);

            document.querySelector('#monster-container').appendChild(div);
        });
    })
}

function createMonster(){

    const form = document.querySelector('form')
    const nameInput = document.querySelector('#name');
    const ageInput = document.querySelector('#age');
    const descrptn = document.querySelector('#description');
    
    document.querySelector('#create').addEventListener("click", ()=>{
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
    
    
            const monsterObj = {
                name: nameInput.value,
                age: ageInput.value,
                description: descrptn.value
            }
    
            fetch("http://localhost:3000/monsters", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'ACCEPT': 'application/json'
                },
                body: JSON.stringify(monsterObj)
                })
            .then(res => res.json())
            .then(data => console.log(data));
    
            form.reset();
        })
    })
}

function nextPage(){
    document.querySelector('#forward').addEventListener('click', ()=>{
        pageNumber ++;
        console.log(pageNumber);
        document.querySelector('#monster-container').innerHTML = '';
        renderMonsters();
        
    })
}

function prevPage(){
    document.querySelector('#back').addEventListener('click', ()=>{
        if (pageNumber > 1){
            pageNumber --;
            console.log(pageNumber);
        } else{
            window.alert("This is the first page!")
        }
        document.querySelector('#monster-container').innerHTML = '';
        renderMonsters();
        
    })
}