<template>
  <body class="container">
    <headers class="text-center">
      <h1 class="fs-1" style="color: #205068">Welcome to My Blog</h1>
    </headers>
    <section class="m-4">
      <div class="row">
        <div class="container d-flex justify-content-center align-items-center">
          <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
            <h2 class="text-center mb-4">Đăng Ký</h2>
            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Nhập email"
                />
                <p v-if="emailError" style="color: red">{{ emailError }}</p>
              </div>
              <div class="mb-3">
                <label for="fullName" class="form-label">Full name</label>
                <input
                  type="fullName"
                  class="form-control"
                  v-model="fullName"
                  placeholder="Nhập họ tên"
                />
                <p v-if="fullNameError" style="color: red">
                  {{ fullNameError }}
                </p>
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
              <button type="submit" class="btn btn-primary w-100">
                Register
              </button>
              <div>
                <RouterLink class="" to="/">Login</RouterLink>
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
import { showToastSuccess } from "@/utils/toastHandle";
const email = ref("");
const fullName = ref("");
const password = ref("");
const passwordError = ref("");
const fullNameError = ref("");
const emailError = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const router = useRouter();

const registerUser = () => {
  emailError.value = "";
  passwordError.value = "";
  fullNameError.value = "";

  if (!email.value) {
    emailError.value = "Vui lòng nhập email";
  } else if (!emailRegex.test(email.value))
    emailError.value = "Vui lòng nhập email hợp lệ";

  if (!fullName.value) {
    fullNameError.value = "Vui lòng nhập họ tên";
  }

  if (!password.value) {
    passwordError.value = "Vui lòng nhập password";
  }

  if (!emailError.value && !fullNameError.value && !passwordError.value) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = storedUsers.find((user) => user.email === email.value);
    if (existingUser) {
      emailError.value = "Email đã tồn tại, vui lòng chọn email khác.";
      return;
    }

    const user = {
      email: email.value,
      fullName: fullName.value,
      password: password.value,
    };

    storedUsers.push(user);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    showToastSuccess("Bạn đã đăng ký thành công");
    router.push("/");
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
