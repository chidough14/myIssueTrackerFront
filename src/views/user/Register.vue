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
                    <v-toolbar-title>Register form</v-toolbar-title>
                    <v-spacer />

                </v-toolbar>
                <v-card-text>
                    <v-form ref="registerForm" :value="formValid">
                    <v-text-field
                        label="Name"
                        name="name"
                        type="text"
                        v-model="newUser.name"
                    />

                    <v-text-field
                        label="Email"
                        name="email"
                        type="text"
                        v-model="newUser.email"
                    />

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="newUser.password"
                    />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" type="submit" @click="registerUser">Registers</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>

         
        <router-link :to='{name: "login"}'>Login</router-link>
    </div>
</template>

<script>
//import axios from 'axios'
import {mapActions} from 'vuex'
export default {
    name: 'register',
    methods: {
         ...mapActions({
            addNotification: 'applications/addNotification',
            register: 'user/registerUser'
        }),
        registerUser() {
           if(this.$refs.registerForm.validate()) {
               this.register(this.newUser)
               .then(res=> {
                   if(res.data && res.data.success) {
                       this.addNotification({
                            show : true,
                            text : 'Success'   
                        })
                        .then(()=> {
                            this.$router.push({
                                    name: 'login'
                                }) 
                        })
                   }
                   }
               )
               .catch(()=> {
                   this.addNotification({
                       show : true,
                       text : 'Failed'
                   })
               })
           }
           
        }
    },
    data() {
        return {
            formValid: false,
            newUser: {
                name: '',
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style>

</style>
