<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { usetodosStore } from './stores/todos'
import { nextTick, onMounted, computed, watch, ref } from 'vue'


const todosStore = usetodosStore();
const todoList = computed(() => {
  return usetodosStore().getTodoList
})

const deleteTodo = (id) => {
  todosStore.deleteTodo(id)
}

//data
const nameTodo = ref('')
const readonly = ref(true)

const updateNameTodo = async (event, name = '', id = null) => {
  if (event == 1) {
    readonly.value = false
  }
  else {
    // console.log(name);
    readonly.value = true
    await todosStore.updateTodo(name, id)
    todosStore.fetchAPI()

  }
}
const updateStatus = async (name, id, status) => {

  await todosStore.updateTodo(name, id, status)
  todosStore.fetchAPI()
}

const addTodo = (name) => {
  const todo = nameTodo.value.replace(/\s+/g, ' ').trim();
  // console.log(todo);
  if (name.length > 0) {
    todosStore.addTodo(name)
    todosStore.fetchAPI()
    return 0
  }
  alert('Vui lòng điền name Todo')
}

watch(readonly, async (newValue, oldValue) => {
  // console.log(newValue);
})

onMounted(async () => {

  await todosStore.fetchAPI();

  // Đợi cập nhật xong trước khi truy cập state và getter
  await nextTick();

  // // Truy cập vào state từ store
  // console.log('isDz:', todosStore.isDz);

  // // Truy cập vào getter từ store
  // console.log('Todo List:', todosStore.getTodoList);


});

</script>
<template>
  <div class="container">
    <h1 class="">My Todo List</h1>
    <div class="card">
      <div class="flex">
        <input class="" placeholder="Add new todo" v-model="nameTodo" />
        <button @click="addTodo(nameTodo)">Add</button>
      </div>
    </div>
    <div class="card">
      <div class="card-inner">
        <h2>Todo</h2>
        <ul class="list">
          <li class="list-item" v-for="(item, index) in todoList " :key="index"
            :class="{ completed: item.status == true }">
            <div class="list-item-toggle " @click="updateStatus(item.name, item.id, !item.status)">
              <i class="fa-solid fa-check" style="color: white ; font-size: 12px;"></i>
            </div>
            <input type="text" v-model=item.name :readonly="readonly" style="cursor: pointer;"
              @dblclick="updateNameTodo(1)" @blur="updateNameTodo(0, item.name, item.id)">
            <div class="list-item-delete" @click="deleteTodo(item.id)">X</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #faffff;
  font-size: 16px;
}

* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #3d4855;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
}

.container {
  padding: 24px 0;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.card {
  border-radius: 4px;
  box-shadow: 1px 1px 40px -10px #31505f30, 0px 1px 2px 0px #31505f30;
  background: white;
  margin-bottom: 24px;
}

.card-inner {
  padding: 16px 24px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  border-radius: 4px;
  background: transparent;
  border: none;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid transparent;
  height: 100%;
  display: block;
  outline: none;
}

button {
  background: #4fc08d;
  padding: 10px 22px;
  border: none;
  color: white;
  border-radius: 4px;
  margin: 8px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 1px 1px 15px -2px #212c4430;
  transition: 0.15s;
}

button:hover {
  background: #42aa7b;
}

button:disabled {
  background: #e8e8e8;
  color: #555;
  box-shadow: none;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  padding: 12px 16px 12px 16px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 6px;
  border-radius: 4px;
}

.list-item:first-child {
  border-top: 1px solid #e8e8e8;
}

.list-item-toggle {
  border: 1px solid #e8e8e8;
  border-radius: 999px;
  height: 21px;
  width: 21px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-item-delete {
  margin-left: auto;
  color: tomato;
  margin-top: -2px;
  font-weight: bold;
  text-decoration: none !important;
}

.list-item.completed {
  border: 1px solid #4fc08d;
}

.list-item.completed input {
  text-decoration: line-through;
}

.list-item.completed .list-item-toggle {
  background: #4fc08d;
  border: #4fc08d;
}

.no-select {
  user-select: none;
  /* Ngăn chọn văn bản */
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
