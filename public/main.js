let todos = []

const $todos = document.querySelector(".todos")
const $inputTodo = document.querySelector("#inputTodo")
const $submit = document.querySelector("#submit")


const render = () => {
    let component = ""
    console.log(todos)
    todos.data.forEach(el => {
     component += `
        <li class="todo">
            <p class="par">${el.title}</p>
            <div class="buttonGroup">
                <button class="edit_todo" data-id=${el._id}>edit</button>
                <button class="remove_todo" data-id=${el._id}>X</button>
            </div>
        </li>
        `
    })

    $todos.innerHTML = component
}

const getTodos = () => {
    fetch("/api/todos")
    .then(res => res.json())
    .then(_todos =>  todos = _todos)
    .then(render)
}

const addTodos = () => {
    fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({title: $inputTodo.value})
    })
    .then(res => res.json())        
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => new Error(err))

    $inputTodo.value = ""
}

const removeTodo = (id) => {
    fetch(`/api/todos/${id}`, {
        method: "DELETE",
    })
    .then(res => res.json())        
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => new Error(err))
}
const saveTodo = (id, value) => {
    fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title:value})
    })
    .then(res => res.json())        
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => new Error(err))
}
const editTodo = (parentNode, node) => {
    let par = parentNode.querySelector(".par")
    let id = parentNode.querySelector(".remove_todo").dataset.id
    par.outerHTML =  `<form action=""> <input class="newInputTodo" type="text" value=${par.textContent}></form>`
    node.outerHTML = `<button class="save">save</button>`
    let saveBtn = parentNode.querySelector(".save")
    let newInputTodo = parentNode.querySelector(".newInputTodo")
    
    saveBtn.addEventListener("click", () => {
        if(!newInputTodo.value.trim()) {
            alert("invalid input")
        }else {
            saveTodo(id,newInputTodo.value)
        }
    })
}
window.onload = () => {
    getTodos()
    console.log("fetch")
}

$submit.addEventListener("click", (e) => {
    e.preventDefault()
    if(!$inputTodo.value.trim()) {
        alert("invalid input")
    }else {
        addTodos()
    }
})


$todos.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove_todo")) {
        removeTodo(e.target.dataset.id)
    } 
    else if (e.target.classList.contains("edit_todo")) {
        editTodo(e.target.parentNode.parentNode, e.target)
    }
})
