<template lang="">
    <div>
        <div class="login-card">
            <h3 class="text-center mb-4">Login</h3>

            <form @submit.prevent>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Enter email" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" v-model="password" class="form-control" placeholder="Enter password" required>
                </div>

                <button @click="login()" class="btn btn-primary w-100">Login</button>

                <p class="text-center mt-3">
                    <a href="#">Forgot Password?</a>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router';

export default {
    data() {
        return {
            email: "",
            password: "",
            device_name: "browser",
        }
    },
    methods: {
        login() {
            axios.post('http://restoran.test/api/auth/login', {
                email: this.email,
                password: this.password,
                device_name: this.device_name
            })
                .then(function (response) {
                    console.log(response);
                    localStorage.setItem('email', response.data.data.email)
                    localStorage.setItem('name', response.data.data.name)
                    localStorage.setItem('role_id', response.data.data.role_id)
                    localStorage.setItem('token', response.data.data.token)
                    router.push({ name: 'home' })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        if (localStorage.getItem('name')) {
            router.push({ name: 'home' })
        }
    }
}
</script>

<style>
body {
    background: #f5f5f5;
    height: 100vh;
}

.login-card {
    max-width: 380px;
    margin: auto;
    margin-top: 10%;
    padding: 30px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
<style lang="">

</style>