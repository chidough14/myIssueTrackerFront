<template>
    <div class="container">

         <v-container
            class="fill-height"
            fluid
        >
            <v-row
            align="center"
            justify="center"
            >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card class="elevation-12">
                <v-toolbar
                    color="primary"
                    dark
                    flat
                >
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer />

                </v-toolbar>
                <v-card-text>
                    <v-form ref="loginForm">
                    <v-text-field
                        label="Email"
                        name="email"
                        type="text"
                        v-model="user.email"
                    />

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="user.password"
                    />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="loginUser">Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
         <router-link :to='{name: "register"}'>Registers</router-link>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
//import axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'user/loginUser',
            addNotification: 'applications/addNotification'
        }),
        loginUser(){
            if(this.$refs.loginForm.validate()) {
                this.login(this.user)
               // this.$store.dispatch('user/loginUser', this.user)
                .then(() => {
                    this.addNotification({
                        show: true,
                        text: 'Welcome'
                    }).then(()=> {
                       this.$router.push({name: 'dashboard'})
                    })
                }).catch(()=> {
                     this.addNotification({
                        show: true,
                        text: 'Failed to login'
                    })
                })
            }
           
        }
    }
}
</script>

<style>

</style>
