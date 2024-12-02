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
            <form action="">
              <div class="row d-flex">
                <label for="" class="col-2">Họ và tên :</label>
                <p class="col-sm-6">Nguyễn Tuấn Anh</p>
              </div>
              <div class="row d-flex">
                <label for="" class="col-2">Email :</label>
                <p class="col-sm-6">@gmail.com</p>
              </div>
              <div class="row d-flex">
                <label for="" class="col-2">Số đt :</label>
                <p class="col-sm-6">0898235534</p>
              </div>
              <div class="row d-flex">
                <label for="" class="col-2">Địa chỉ :</label>
                <p class="col-sm-6">Thành phố Hồ Chí Minh</p>
              </div>
            </form>
            <button type="button" class="fs-6 btn btn-primary">Change</button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const users = ref([]);
const getUserFromLocalStorage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  users.value = currentUser;
  console.log(users.value);
};
onMounted(() => {
  getUserFromLocalStorage();
});
const router = useRouter();
const logout = () => {
  const confirmLogout = confirm("Bạn có muốn đăng xuất không ?");
  if (confirmLogout) {
    localStorage.removeItem("fullName");
    router.push("/");
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
