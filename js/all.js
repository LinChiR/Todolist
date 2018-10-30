var app = new Vue({
  el: '#app',
  data: {
    newTodo:'',
    todos:[],
    visibility: 'all',
    cacheTodo: {},
    cacheTitle: '',
  },
  methods: {
    addTodo: function (){
      var value = this.newTodo.trim();
      var timestamp = Math.floor(Date.now());
      if (!value){
        return;
      }
      this.todos.push({
        id: timestamp,
        title: value,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo: function(todo) {
      var newIndex = '';
      var vm = this;
      vm.todos.forEach(function(item, key) {
        if(todo.id === item.id){
          newIndex = key;
        }
      })
      this.todos.splice(newIndex, 1);
    },
    editTodo: function(item){
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancleEdit: function(){
      this.cacheTodo = {};
    },
    doneEdit: function(item){
      console.log(item);
      item.title = this.cacheTitle;
      this.cacheTitle = '';
      this.cacheTodo = {};
    },
    delAll: function(){
      this.todos = [];
    }
  },

  computed: {
    filteredTodo: function () {
      if(this.visibility == 'all')
      {
        return this.todos;
      }
      else if(this.visibility == 'active')
      {
        var newTodos = [];
        this.todos.forEach(function (item){
          if(!item.completed){
            newTodos.push(item);
          }
        })
        return newTodos;
      }
      else if(this.visibility = 'completed')
      {
        var newTodos = [];
        this.todos.forEach(function(item){
          if(item.completed){
            newTodos.push(item);
          }
        })
        return newTodos;
      }
    },
    countIncomplete: function(){
      var incompleteNum = 0;
      this.todos.forEach(function(item){
        if(item.completed == false){
          incompleteNum ++;
        }
      })
      return incompleteNum;
    }
  }

});