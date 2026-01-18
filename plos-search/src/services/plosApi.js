import axios from 'axios';

const PLOS_API_BASE_URL = 'https://api.plos.org/search';

/**
 * Search for articles in PLOS database
 * @param {string} query - Search query
 * @param {number} rows - Number of results to return
 * @returns {Promise} API response
 */
export const searchArticles = async (query, rows = 100) => {
  try {
    const response = await axios.get(PLOS_API_BASE_URL, {
      params: {
        q: `title:${query}`,
        wt: 'json',
        rows: rows
      }
    });
    return {
      success: true,
      data: response.data.response.docs,
      total: response.data.response.numFound
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      success: false,
      error: 'Failed to fetch articles. Please try again.',
      data: [],
      total: 0
    };
  }
};

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format authors list
 * @param {Array} authors - Array of author names
 * @returns {string} Formatted authors string
 */
export const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return 'N/A';
  
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return authors.join(' and ');
  if (authors.length > 3) return `${authors[0]} et al.`;
  
  return `${authors.slice(0, -1).join(', ')}, and ${authors[authors.length - 1]}`;
};

/**
 * Get DOI link
 * @param {string} doi - DOI identifier
 * @returns {string} Full DOI URL
 */
export const getDOILink = (doi) => {
  return `https://doi.org/${doi}`;
};