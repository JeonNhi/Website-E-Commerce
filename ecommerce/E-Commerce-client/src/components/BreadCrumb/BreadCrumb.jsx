/** @format */
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from "../../ultils/icons";
const { MdOutlineNavigateNext } = icons;
const BreadCrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    {
      path: "/:category/:pit/:title",
      breadcrumb: title?.toLowerCase(),
    },
    {
      path: "/my-cart/shipping",
    },
    {
      path: "/my-cart/shipping/payment",
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="mt-[10px] flex items-center text-[#1c1d1d]">
      {breadcrumbs
        .filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex items-center  text-[14px] "
          >
            <span
              className={`${
                index === self.length - 1 && "text-[#505050]"
              } capitalize leading-5`}
            >
              {breadcrumb}
            </span>

            {index !== self.length - 1 && (
              <span>
                <MdOutlineNavigateNext />
              </span>
            )}
          </Link>
        ))}
    </div>
  );
};

export default BreadCrumb;
