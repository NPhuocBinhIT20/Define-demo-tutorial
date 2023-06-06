import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    ErrorComponent,
    ThemedLayout,
} from "@refinedev/antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AntdInferencer } from "@refinedev/inferencer/antd";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                resources={[
                    {
                        name: "blog_posts",
                        list: "/blog-posts",
                        show: "/blog-posts/show/:id",
                        create: "/blog-posts/create",
                        edit: "/blog-posts/edit/:id",
                        meta: { canDelete: true },
                    },
                    {
                        name: "categories",
                        list: "/categories",
                        show: "/categories/show/:id",
                    },
                ]}
            >
                <Routes>
                    <Route
                        element={
                            <ThemedLayout>
                                <Outlet />
                            </ThemedLayout>
                        }
                    >
                        <Route index element={<NavigateToResource />} />
                        <Route path="blog-posts">
                            <Route index element={<AntdInferencer />} />
                            <Route
                                path="show/:id"
                                element={<AntdInferencer />}
                            />
                            <Route path="create" element={<AntdInferencer />} />
                            <Route
                                path="edit/:id"
                                element={<AntdInferencer />}
                            />
                        </Route>
                        <Route path="categories">
                            <Route index element={<AntdInferencer />} />
                            <Route
                                path="show/:id"
                                element={<AntdInferencer />}
                            />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;