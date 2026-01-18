<template>
  <div class="table-container">
    <table class="articles-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Journal</th>
          <th>Authors</th>
          <th>Publication Date</th>
          <th>DOI/Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td class="title-cell">{{ article.title_display }}</td>
          <td>{{ article.journal }}</td>
          <td class="authors-cell">
            {{ formatAuthors(article.author_display) }}
          </td>
          <td>{{ formatDate(article.publication_date) }}</td>
          <td class="link-cell">
            <a :href="getDOILink(article.id)" target="_blank" class="doi-link">
              {{ article.id }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { formatDate, formatAuthors, getDOILink } from '../services/plosApi';

export default {
  name: 'ArticlesTable',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate,
    formatAuthors,
    getDOILink
  }
};
</script>