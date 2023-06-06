import {
  ErrorComponent,
  ThemedLayoutV2,
  RefineThemes,
  notificationProvider,
} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostCreate } from "pages/blog-posts/create";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <ConfigProvider theme={RefineThemes.Blue}>
              <Refine
                  routerProvider={routerBindings}
                  dataProvider={dataProvider(
                      "https://api.fake-rest.refine.dev",
                  )}
                  notificationProvider={notificationProvider}
                  resources={[
                      {
                          name: "blog_posts",
                          list: "/blog-posts",
                          show: "/blog-posts/show/:id",
                          create: "/blog-posts/create",
                          edit: "/blog-posts/edit/:id",
                      },
                  ]}
                  options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                  }}
              >
                  <Routes>
                      <Route
                          element={
                              <ThemedLayoutV2>
                                  <Outlet />
                              </ThemedLayoutV2>
                          }
                      >
                          <Route
                              index
                              element={
                                  <NavigateToResource resource="blog_posts" />
                              }
                          />
                          <Route path="blog-posts">
                              <Route index element={<BlogPostList />} />
                              <Route
                                  path="show/:id"
                                  element={<BlogPostShow />}
                              />
                              <Route
                                  path="create"
                                  element={<BlogPostCreate />}
                              />
                              <Route
                                  path="edit/:id"
                                  element={<BlogPostEdit />}
                              />
                          </Route>

                          <Route path="*" element={<ErrorComponent />} />
                      </Route>
                  </Routes>
                  <UnsavedChangesNotifier />
              </Refine>
          </ConfigProvider>
      </BrowserRouter>
  );
};
export default App;