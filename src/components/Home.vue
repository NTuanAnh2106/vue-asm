<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary mt-3"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      ref="openModal"
    >
      Đăng bài
    </button>
    <section class="mt-4">
      <div class="d-flex justify-content-center">
        <article class="col-sm-8">
          <div style="justify-items: center">
            <div
              v-for="post in posts"
              :key="post.id"
              class="card p-3 shadow-sm mb-3"
              style="border-radius: 1rem; background-color: white; width: 400px"
            >
              <img
                :src="post.image"
                style="width: 100%; height: 200px; object-fit: cover"
                alt="image"
              />
              <div class="d-flex justify-content-between mt-2">
                <p class="card-text text-muted" style="font-size: 0.9rem">
                  Người đăng: {{ post.user }}
                </p>
                <p class="card-text text-muted" style="font-size: 0.9rem">
                  {{ post.date }}
                </p>
              </div>
              <p class="card-text">{{ post.content }}</p>
              <div class="card-footer border-0">
                <div
                  v-for="comment in comments[post.id] || []"
                  :key="comment.date"
                >
                  <div class="d-flex justify-content-between">
                    <p>{{ comment.user }}</p>
                    <p>{{ comment.date }}</p>
                  </div>
                  <p>{{ comment.content }}</p>
                  <hr />
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Comment here"
                  v-model="postComment"
                  @keydown.enter="addComment(post.id)"
                />
              </div>
            </div>
          </div>
        </article>
        <aside class="col-sm-4">
          <div style="height: 100%">
            <h2 class="text-center fs-1">Mục lục</h2>
            <ul>
              <li class="fs-4">Tiêu đề 1</li>
              <li class="fs-4">Tiêu đề 2</li>
              <li class="fs-4">Tiêu đề 3</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tạo</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 d-none">
            <label for="user" class="form-label">User</label>
            <input
              type="text"
              class="form-control"
              id="user"
              placeholder="Enter first input"
              v-model="postInfo.user"
            />
          </div>
          <div class="mb-3 d-none">
            <label for="date" class="form-label">Date</label>
            <input
              type="text"
              class="form-control"
              id="date"
              placeholder="Enter first input"
              v-model="postInfo.date"
            />
          </div>
          <div class="mb-3">
            <label for="input1" class="form-label">Image Url</label>
            <input
              type="text"
              class="form-control"
              id="input1"
              placeholder="Enter first input"
              v-model="postInfo.image"
            />
          </div>
          <div class="mb-3">
            <label for="input2" class="form-label">Content</label>
            <input
              type="text"
              class="form-control"
              id="input2"
              placeholder="Enter second input"
              v-model="postInfo.content"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="savePost">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToastSuccess } from "@/utils/toastHandle";
import { onMounted, ref, reactive } from "vue";

const users = ref([]);
const posts = ref([]);
const postComment = ref("");
const comments = ref({});
const openModal = ref(null);
const getUserFromLocalStorage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  users.value = currentUser;
};

onMounted(() => {
  getUserFromLocalStorage();
  getAllPosts();
  getComments();
});

const getAllPosts = async () => {
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.value = storedPosts;
};

const getComments = async () => {
  const commentData = JSON.parse(localStorage.getItem("comments")) || {};
  comments.value = commentData;
};

const postInfo = reactive({
  id: Math.floor(Math.random() * 100000000) + 1,
  user: JSON.parse(localStorage.getItem("currentUser")).fullName,
  date: new Date().toLocaleDateString(),
  image: "",
  content: "",
});

const savePost = async () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(postInfo);
  localStorage.setItem("posts", JSON.stringify(posts));

  postInfo.image = "";
  postInfo.content = "";
  showToastSuccess("Upload bài viết thành công");
  getAllPosts();
  openModal.value.click();
};

const addComment = async (id) => {
  const postId = id;
  const comment = postComment.value;
  const comments = JSON.parse(localStorage.getItem("comments")) || {};

  if (!comments[postId]) {
    comments[postId] = [];
  }

  comments[postId].push({
    user: JSON.parse(localStorage.getItem("currentUser")).fullName,
    content: comment,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem("comments", JSON.stringify(comments));
  postComment.value = "";
  showToastSuccess("Bình luận thành công");
  getComments();
};
</script>

<style scoped>
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
