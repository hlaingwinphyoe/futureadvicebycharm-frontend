import { publicHttp } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [],
  status: "idle",
  error: null,

  packagesAll: [],
  packagesAllStatus: "idle",
  packagesAllError: null,

  singlePackage: null,
  packageStatus: "idle",
  packageError: null,

  currentPage: 1,
  lastPage: 1,
  hasMore: false,
  loadingMore: false,
  total: 0,
};

export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async (pageSize = 12, { getState }) => {
    const { currentPage } = getState().packages;
    try {
      const response = await publicHttp.get(`/api/packages-list`, {
        params: { page: currentPage, page_size: pageSize },
      });

      return {
        packages: response.data.data.data,
        meta: {
          current_page: response.data.data.meta.current_page,
          last_page: response.data.data.meta.last_page,
          per_page: response.data.data.meta.per_page,
          total: response.data.data.meta.total,
        },
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch packages"
      );
    }
  }
);

export const fetchPackagesAll = createAsyncThunk(
  "packages/fetchPackagesAll",
  async () => {
    try {
      const response = await publicHttp.get("/api/packages-all");
      return response.data.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch packages"
      );
    }
  }
);

export const fetchPackage = createAsyncThunk(
  "posts/fetchPackage",
  async (id) => {
    try {
      const response = await publicHttp.get(`api/packages-list/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch post details"
      );
    }
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        if (state.currentPage === 1) {
          state.status = "loading";
        } else {
          state.loadingMore = true;
        }
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loadingMore = false;

        if (state.currentPage === 1) {
          state.packages = action.payload.packages;
        } else {
          state.packages = [...state.packages, ...action.payload.packages];
        }

        state.lastPage = action.payload.meta.last_page;
        state.total = action.payload.meta.total;
        state.hasMore = state.currentPage < action.payload.meta.last_page;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = "failed";
        state.loadingMore = false;
        state.error = action.error.message;
      })
      .addCase(fetchPackagesAll.pending, (state) => {
        state.packagesAllStatus = "loading";
        state.packagesAll = [];
      })
      .addCase(fetchPackagesAll.fulfilled, (state, action) => {
        state.packagesAllStatus = "succeeded";
        state.packagesAll = action.payload;
      })
      .addCase(fetchPackagesAll.rejected, (state, action) => {
        state.packagesAllStatus = "failed";
        state.packagesAllError = action.error.message;
      })
      .addCase(fetchPackage.pending, (state) => {
        state.packageStatus = "loading";
        state.singlePackage = null;
      })
      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.packageStatus = "succeeded";
        state.singlePackage = action.payload;
      })
      .addCase(fetchPackage.rejected, (state, action) => {
        state.packageStatus = "failed";
        state.packageError = action.error.message;
      });
  },
});

export const { incrementPage } = packagesSlice.actions;
export default packagesSlice.reducer;
