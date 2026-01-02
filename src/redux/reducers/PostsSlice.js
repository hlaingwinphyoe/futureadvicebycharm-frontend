import { publicHttp } from "@/utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,

  recommendedPosts: [],
  searchResults: [],
  searchStatus: "idle",
  searchError: null,

  specialPost: null,
  specialPostStatus: "idle",
  specialPostError: null,

  popularPosts: null,
  popularPostsStatus: "idle",
  popularPostsError: null,

  currentPage: 1,
  lastPage: 1,
  hasMore: false,
  loadingMore: false,
  total: 0,
  sortBy: "latest",
  selectedCategory: "all",
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ pageSize = 12 }, { getState }) => {
    const { selectedCategory, sortBy, currentPage } = getState().posts;
    try {
      const response = await publicHttp.get(`/api/posts-list`, {
        params: {
          page: currentPage,
          sort: sortBy,
          category: selectedCategory,
          page_size: pageSize,
        },
      });

      return {
        posts: response.data.data.data,
        meta: {
          current_page: response.data.data.meta.current_page,
          last_page: response.data.data.meta.last_page,
          per_page: response.data.data.meta.per_page,
          total: response.data.data.meta.total,
        },
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts");
    }
  }
);

export const fetchTodaySpecialPost = createAsyncThunk(
  "posts/fetchTodaySpecialPost",
  async () => {
    try {
      const response = await publicHttp.get(`api/today-special-post`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch post details"
      );
    }
  }
);

export const fetchRecommendedPosts = createAsyncThunk(
  "posts/fetchRecommendedPosts",
  async (params) => {
    try {
      const response = await publicHttp.get(
        `/api/posts-list/${params.postId}/recommended?category=${params.category}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch recommended posts"
      );
    }
  }
);

export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    try {
      const response = await publicHttp.get(`/api/popular-posts`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch recommended posts"
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
      state.posts = [];
      state.status = "idle";
      state.hasMore = false;
    },
    setCategory: (state, action) => {
      // New reducer
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      state.posts = [];
      state.status = "idle";
    },
    resetPosts: (state) => {
      state.posts = [];
      state.currentPage = 1;
      state.status = "idle";
      state.hasMore = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        if (state.currentPage === 1) {
          state.status = "loading";
        } else {
          state.loadingMore = true;
        }
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loadingMore = false;

        if (state.currentPage === 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [...state.posts, ...action.payload.posts];
        }

        // Update pagination metadata from Laravel response
        state.lastPage = action.payload.meta.last_page;
        state.total = action.payload.meta.total;
        state.hasMore = state.currentPage < action.payload.meta.last_page;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.loadingMore = false;
        state.error = action.error.message;
      })
      // today special post
      .addCase(fetchTodaySpecialPost.pending, (state) => {
        state.specialPostStatus = "loading";
        state.specialPost = null;
      })
      .addCase(fetchTodaySpecialPost.fulfilled, (state, action) => {
        state.specialPostStatus = "succeeded";
        state.specialPost = action.payload;
      })
      .addCase(fetchTodaySpecialPost.rejected, (state, action) => {
        state.specialPostStatus = "failed";
        state.specialPostError = action.error.message;
      })
      // popular
      .addCase(fetchPopularPosts.pending, (state) => {
        state.popularPostsStatus = "loading";
        state.popularPosts = null;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.popularPostsStatus = "succeeded";
        state.popularPosts = action.payload;
      })
      .addCase(fetchPopularPosts.rejected, (state, action) => {
        state.popularPostsStatus = "failed";
        state.popularPostsError = action.error.message;
      })
      // Recommended posts
      .addCase(fetchRecommendedPosts.fulfilled, (state, action) => {
        state.recommendedPosts = action.payload;
      });
  },
});

export const { incrementPage, setSort, setCategory, resetPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
