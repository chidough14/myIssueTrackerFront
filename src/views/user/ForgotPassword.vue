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
                    <v-toolbar-title>Forgot Password</v-toolbar-title>
                    <v-spacer />

                </v-toolbar>
                <v-card-text>
                    <v-form ref="forgotPasswordForm">
                    <v-text-field
                        label="Email"
                        name="email"
                        type="text"
                        v-model="email"
                    />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="sendForgotPassword">Send Email</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
        
         <router-link :to='{name: "login"}'>Login</router-link>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'forgotPassword',
    data() {
        return {
            email: '',
           
        }
    },
    methods: {
        ...mapActions({
            forgotPassword: 'user/forgotPassword',
            addNotification: 'applications/addNotification'
        }),
        sendForgotPassword() {
            if(this.$refs.forgotPasswordForm.validate()) {
               this.forgotPassword({email: this.email})
               .then(()=> {
                   this.addNotification({
                       text: 'Email Sent',
                       show: true
                   })
                   /* this.snackbar = {
                       text: 'Email Sent',
                       show: true
                   }
                   console.log(response.data); */
               })
               .catch(()=> {
                   this.addNotification({
                       text: 'Failed to send Email',
                       show: true
                   })
                  /* this.snackbar = {
                       text: 'Failed to send Email',
                       show: true
                   }  */
               })
            }
        }
    }
}
</script>

<style>

</style>
