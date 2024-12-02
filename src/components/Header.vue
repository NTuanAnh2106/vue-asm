<template>
  <headers class="text-center">
    <h1 class="fs-1" style="color: #205068">Welcome to My Blog</h1>
  </headers>
  <nav class="navbar navbar-expand-lg rounded-4" style="font-size: 20px">
    <div class="container-fluid ms-5">
      <a class="navbar-brand text-white" href="#">Blog</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li>
            <RouterLink class="nav-link active text-white" to="/home"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink class="nav-link active text-white" to="/account"
              >Account</RouterLink
            >
          </li>
          <li style="margin-left: 140px" class="nav-item">
            <button class="nav-link active text-white" @click.prevent="logout">
              Đăng xuất
            </button>
          </li>
          <li class="nav-item">
            <span class="nav-link text-white"
              ><u>{{ users.fullName }}</u></span
            >
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-light me-5" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2";

const users = ref([]);
const getUserFromLocalStorage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  users.value = currentUser;
};

onMounted(() => {
  getUserFromLocalStorage();
});

const router = useRouter();
const logout = () => {
  Swal.fire({
    title: "Bạn có muốn đăng xuất không ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Đăng xuất",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("fullName");
      localStorage.setItem("isAuthenticated", "false");
      router.push("/");
    }
  });
};
</script>

<style scoped>
nav {
  background-color: #6ba3be;
}
</style>
