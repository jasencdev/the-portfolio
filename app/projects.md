# Projects

<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
</script>

<ul>
  <li v-for="project in theme.projects" :key="project.link" class="project-item">
    <div class="project-date">{{ new Date(project.date).toLocaleDateString() }}</div>
    <a :href="project.link">{{ project.title }}</a>
  </li>
</ul>

<style>
.project-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
.project-date {
  color: #8e8e8e;
  font-size: 0.9em;
  margin-right: 1rem;
  min-width: 100px;
}
</style>