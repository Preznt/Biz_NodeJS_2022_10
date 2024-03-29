import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import BBsDetail from "../comps/BBsDetail";
import BBsList, { loader as BBsListLoader } from "../comps/BBsList";
import BBsLoading from "../comps/BBsLoading";
import BBsMain from "../comps/BBsMain";
import { useBBSContext } from "../context/BBsContext";

const MainRouterProvider = () => {
  const { orderValue, filterValue, searchInput } = useBBSContext();

  const mainRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <h1>여기는 Home 입니다</h1> },
        {
          path: "bbs",
          element: <BBsMain />,
          children: [
            {
              path: ":pageNum",
              loader: ({ params }) =>
                BBsListLoader({
                  params,
                  values: { orderValue, filterValue, searchInput },
                }),
              element: <BBsList />,
            },
            { path: "detail/:id", element: <BBsDetail /> },
          ],
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={mainRouter} fallbackElement={<BBsLoading />} />
  );
};

export default MainRouterProvider;
