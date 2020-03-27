<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn small @click="logout" v-if="loggedIn">
         Logout
      </v-btn>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-snackbar
        v-for="(snackbar,index) in allNotifications"
        :key="index"
        v-model="snackbar.show"
        @input="updateNotification($event, index)"
        >
        {{ snackbar.text }}
        <v-btn
            color="pink"
            text
            @click="removeNotification(index)"
        >
            Close
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'App',

  data: () => ({
    
  }),
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      allNotifications: 'applications/notifications'
    }),
     /* loggedIn() {
       return this.$store.getters['user/loggedIn']
     } */
  },
  created() {
   this.checkUserState()
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      checkUserState: 'user/setLoggedInState',
      removeNotification: 'applications/removeNotification',
       addNotification: 'applications/addNotification'
    }),
    logout() {
      this.logoutUser()
      .then(() => {
        this.addNotification({
            show: true,
            text: 'Logged out'
        }).then(()=> {
           this.$router.push({
              name: 'login'
          }) 
        })
          /* this.$router.push({
              name: 'login'
          }) */
      })
     
    },
    updateNotification(show, index) {
      if(!show) {
        this.removeNotification(index)
      }
        console.log(show);
    }
  }
};
</script>
