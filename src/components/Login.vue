<template>
  <body class="container">
    <headers class="text-center">
      <h1 class="fs-1" style="color: #205068">Welcome to MyBlog</h1>
    </headers>
    <section class="m-4">
      <div class="row">
        <div class="container d-flex justify-content-center align-items-center">
          <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
            <h2 class="text-center mb-4">Đăng Nhập</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Nhập email"
                />
                <p v-if="emailError" style="color: red">{{ emailError }}</p>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Nhập mật khẩu"
                />
                <p v-if="passwordError" style="color: red">
                  {{ passwordError }}
                </p>
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
              <div>
                <RouterLink class="" to="/register">Register</RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";
import { showToastSuccess } from "@/utils/toastHandle";
const email = ref("");
const password = ref("");
const passwordError = ref("");
const emailError = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router = useRouter();

const login = () => {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) {
    emailError.value = "Vui lòng nhập email";
  } else if (!emailRegex.test(email.value))
    emailError.value = "Vui lòng nhập email hợp lệ";

  if (!password.value) {
    passwordError.value = "Vui lòng nhập password";
  }

  if (!emailError.value && !passwordError.value) {
    const storedUser = JSON.parse(localStorage.getItem("users"));

    const user = storedUser.find(
      (user) => user.email === email.value && user.password === password.value
    );
    if (user) {
      showToastSuccess("Đăng nhập thành công");

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      router.push("/home");
    } else {
      alert("Email hoặc mật khẩu không đúng");
    }
  }
};
</script>

<style>
nav {
  background-color: #6ba3be;
}
article {
  background-color: #bac6ce;
  padding: 20px;
  border-radius: 8px;
  color: black;
}

aside {
  background-color: #0c969c;
  padding: 20px;
  border-radius: 8px;
  color: white;
}
footer {
  background-color: #032f30;
  color: white;
}
</style>
