<template>
  <v-container class="container" fluid>
    <v-row class="d-flex flex-column justify-center align-center">
      <v-col cols="12" lg="6">
        <h1 class="white--text font-weight-bold">Vue ToDo List</h1>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title class="grey lighten-4 d-flex justify-end">
            <v-chip
              color="primary"
              class="mx-1"
            >
              Tasks
              <v-avatar
                right
                class="white text--primary"
              >
                {{ tasks.length }}
              </v-avatar>
            </v-chip>
            <v-chip 
              color="primary"
              class="mx-1"
            >
              Tasks Done
              <v-avatar
                right
                class="white text--primary"
              >
                {{ doneTasks }}
              </v-avatar>
            </v-chip>
            <v-chip 
              v-if="doneTasks"
              color="red"
              class="white--text mx-1"
              label
              @click="deleteDoneTasks"
            >
              <v-icon left>mdi-delete</v-icon>
              Tasks Done
            </v-chip>
            <v-chip 
              color="red"
              class="white--text mx-1"
              label
              @click="deleteAllTasks"
            >
              <v-icon left>mdi-delete</v-icon>
              Tasks
            </v-chip> 
          </v-card-title>
          <v-card-text class="scrollable-list">
            <v-list v-if="tasks.length > 0" class="list-wrapper">
              <v-list-item 
                class="item-list my-3" 
                v-for="(task, index) in tasks"
                :key="index"
                @mouseenter="showDeleteButton(index)"
                @mouseleave="hideDeleteButton(index)"
                style="transition: background-color 0.3s;"
              >
                <v-list-item-action>
                  <v-btn 
                    icon 
                    :color="task.completed ? 'grey' : 'success'"
                    @click="completeTask(index)"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title 
                    class="font-weight-medium"
                    :style="{ 'text-decoration': task.completed ? 'line-through' : 'none' }"
                  >
                    {{ task.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-show="task.showDeleteButton">
                  <v-btn 
                    icon 
                    color="red"
                    @click="deleteTask(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="grey lighten-4 px-5 pt-7">
            <v-text-field
              v-model="newTask"
              placeholder="New task"
              @keyup.enter="addTask"
              append-icon="mdi-plus"
              @click:append="addTask"
              outlined
              rounded
              filled
              color="#43A047"
            ></v-text-field>
            <!-- <v-btn
              @click="addTask"
              icon
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      tasks: [
        { id: 1, title: 'Learn Nuxt', completed: false, showDeleteButton: false },
      ],
      doneTasks: 0,
      newTask: "",
      taskId: 2
    };
  },
  methods: {
    ...mapActions('todolist', ['ADD_TASK']),
    async addTask() {
      if (this.newTask.trim() !== "") {
        let payload = {
          id: this.taskId,
          title: this.newTask,
          completed: false
        }
        this.tasks.push(payload);
        await this.ADD_TASK(this.tasks);
        this.taskId++;
        this.newTask = "";
        // console.log(this.tasks)
      }
    },
    completeTask(index) {
      const task = this.tasks[index];
      this.$set(this.tasks, index, { ...task, completed: !task.completed });
      this.doneTasks += task.completed ? -1 : 1;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
      // console.log(index)
    },
    deleteAllTasks() {
      this.tasks = [];
      this.doneTasks = 0;
    },
    deleteDoneTasks() {
      this.tasks = this.tasks.filter(task => !task.completed);
      this.doneTasks = 0;
    },
     showDeleteButton(index) {
      this.$set(this.tasks[index], 'showDeleteButton', true);
    },
    hideDeleteButton(index) {
      this.$set(this.tasks[index], 'showDeleteButton', false);
    },
  }
};
</script>

<style scoped>
.container {
  background: linear-gradient(135deg, #41b883, #35495e);
  height: 100vh;
  /* padding: 20px;
  border-radius: 10px; */
}

.scrollable-list {
  max-height: 300px;
  overflow-y: auto;
}

.list-wrapper {
  display: block;
}

.item-list {
  border: solid 1px #43A047;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.item-list:hover {
  background-color: lightgray;
}

</style>
