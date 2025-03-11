# Blog Posts

<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
</script>

<ul>
  <li v-for="post in theme.posts" :key="post.link" class="post-item">
    <div class="post-date">{{ new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') }}</div>
    <a :href="post.link">{{ post.title }}</a>
  </li>
</ul>

<style>
.post-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
.post-date {
  color: #8e8e8e;
  font-size: 0.9em;
  margin-right: 1rem;
  min-width: 100px;
}
</style>