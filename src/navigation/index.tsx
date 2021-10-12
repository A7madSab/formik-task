import { Suspense, Fragment, lazy, FC } from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import LoadingScreen from "screens/LoadingScreen"
import Layout from "layout"

interface Routes {
    exact: boolean
    layout: FC
    path: string
    component: any
}

const routes = [
    {
        exact: true,
        layout: Layout,
        path: "/",
        component: lazy(() => import("views/Home")),
    },
    {
        exact: true,
        layout: Layout,
        path: "/404",
        component: lazy(() => import("views/NotFound")),
    },
]

export const renderRoutes = ({ routes: r }: { routes: Routes[] }) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                {r.map((route) => {
                    const Component = route.component
                    const ComponentLayout = route.layout || Fragment

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => (
                                <ComponentLayout>
                                    <Component {...props} />
                                </ComponentLayout>
                            )}
                        />
                    )
                })}
                <Redirect to="/404" />
            </Switch>
        </Suspense>
    )
}

export default routes
