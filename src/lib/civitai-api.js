// Civitai API client

const CIVITAI_API_BASE_URL = 'https://civitai.com/api/v1';

class CivitaiAPI {
  constructor(apiKey = '') {
    this.apiKey = apiKey;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  async fetchWithAuth(endpoint, options = {}) {
    const url = `${CIVITAI_API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Creators endpoints
  async getCreators({ limit = 20, page = 1, query = '' } = {}) {
    const params = new URLSearchParams({ limit, page, query }.toString());
    return this.fetchWithAuth(`/creators?${params}`);
  }

  // Images endpoints
  async getImages({
    limit = 100,
    postId,
    modelId,
    modelVersionId,
    username,
    nsfw,
    sort,
    period,
    page = 1,
  } = {}) {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (postId) params.append('postId', postId);
    if (modelId) params.append('modelId', modelId);
    if (modelVersionId) params.append('modelVersionId', modelVersionId);
    if (username) params.append('username', username);
    if (nsfw !== undefined) params.append('nsfw', nsfw);
    if (sort) params.append('sort', sort);
    if (period) params.append('period', period);
    if (page) params.append('page', page);

    return this.fetchWithAuth(`/images?${params}`);
  }

  // Models endpoints
  async getModels(params = {}) {
    const queryParams = new URLSearchParams(params);
    return this.fetchWithAuth(`/models?${queryParams}`);
  }

  async getModel(modelId) {
    return this.fetchWithAuth(`/models/${modelId}`);
  }

  // Model versions endpoints
  async getModelVersion(versionId) {
    return this.fetchWithAuth(`/model-versions/${versionId}`);
  }

  async getModelVersionByHash(hash) {
    return this.fetchWithAuth(`/model-versions/by-hash/${hash}`);
  }

  // Tags endpoints
  async getTags() {
    return this.fetchWithAuth('/tags');
  }
}

// Create a singleton instance
const civitaiApi = new CivitaiAPI();

export default civitaiApi;