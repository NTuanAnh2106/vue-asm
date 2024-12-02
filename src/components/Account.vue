<template>
  <div class="container">
    <section class="mt-4">
      <div class="row">
        <aside class="col-sm-4">
          <img
            src="https://i.pravatar.cc/150"
            class="rounded-3"
            style="height: 350px"
            alt=""
          />
        </aside>
        <article class="col-sm-8 text-white fs-4">
          <div>
            <form action="" @submit.prevent="updateUser">
              <div class="row d-flex">
                <label for="" class="col-3">Họ và tên :</label>
                <input
                  type="text"
                  class="col-sm-6 form-control"
                  v-model="users.fullName"
                />
              </div>
              <div class="row d-flex">
                <label for="" class="col-3">Email :</label>
                <input
                  type="email"
                  class="col-sm-6 form-control"
                  v-model="users.email"
                />
              </div>
              <div class="row d-flex">
                <label for="" class="col-3">Số đt :</label>
                <input
                  type="text"
                  class="col-sm-6 form-control"
                  v-model="users.phone"
                />
              </div>
              <div class="row mt-3">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button
                  type="button"
                  class="btn btn-secondary ms-2"
                  @click="logout"
                >
                  Đăng xuất
                </button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { showToastSuccess } from "@/utils/toastHandle";

const users = ref({});
const getUserFromLocalStorage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  users.value = currentUser;
};

onMounted(() => {
  getUserFromLocalStorage();
});

const router = useRouter();
const logout = () => {
  const confirmLogout = confirm("Bạn có muốn đăng xuất không ?");
  if (confirmLogout) {
    localStorage.removeItem("currentUser");
    router.push("/");
  }
};

const updateUser = (email, newData) => {
  const index = users.findIndex((user) => user.email === email);
  if (index !== -1) {
    users[index] = { ...users[index], ...newData };
    localStorage.setItem("users", JSON.stringify(users));
  }
};
</script>

<style>
nav {
  background-color: #6ba3be;
}
article {
  background-color: #14a6ad;
  padding: 20px;
  border-radius: 8px;
  color: black;
}

aside {
  background-color: #bac6ce;
  padding: 20px;
  border-radius: 8px;
  color: white;
}
footer {
  background-color: #032f30;
  color: white;
}
</style>
