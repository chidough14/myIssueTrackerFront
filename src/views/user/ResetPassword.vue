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
                    <v-toolbar-title>Reset Password</v-toolbar-title>
                    <v-spacer />

                </v-toolbar>
                <v-card-text>
                    <v-form ref="resetPasswordForm">
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

                     <v-text-field
                        id="password_confirmation"
                        label="Password Confirmation"
                        name="password_confirmation"
                        type="password"
                        v-model="user.password_confirmation"
                    />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="sendResetPassword">Reset Password</v-btn>
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
    name: 'resetPassword',
     data() {
        return {
            user: {
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods: {
       ...mapActions({
            resetPassword: 'user/resetPassword',
             addNotification: 'applications/addNotification'
        }),
         sendResetPassword(){
            if(this.$refs.resetPasswordForm.validate()) {
                
                const token = this.$route.query.token

                this.resetPassword({...this.user, token})
                .then(() => {
                    this.addNotification({
                        text: 'Password Changed',
                       show: true  
                    }).then(()=> {
                        this.$router.push({name: 'login'})
                    })
                   
                })
                .catch(()=> {
                    this.addNotification({
                        text: 'Failed to Change Password',
                        show: true
                    })
                })
            }
           
        }  
    }
}
</script>

<style>

</style>
