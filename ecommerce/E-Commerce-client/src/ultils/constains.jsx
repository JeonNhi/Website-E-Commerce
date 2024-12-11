/** @format */

import path from "./path";
import icons from "./icons";
import cart from "../assets/images/Buy.svg";
import wishlist from "../assets/images/Heart.svg";
import history from "../assets/images/Download.svg";
import personal from "../assets/images/Profile.svg";
import address from "../assets/images/Location.svg";
const {
  FaGift,
  FaShieldAlt,
  FaTruck,
  GiReturnArrow,
  MdOutlinePermPhoneMsg,
  MdGroup,
  LuLayoutDashboard,
  RiBillLine,
  RiProductHuntFill,
} = icons;

export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCT_ALL}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQS",
    path: `/${path.FAQS}`,
  },
];

export const productExtra = [
  {
    id: 1,
    title: "Guarantee",
    subtitle: "Quality Checked",
    icon: <FaShieldAlt />,
  },
  {
    id: 2,
    title: "Free Shipping",
    subtitle: "Free On All Products",
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: "Special Gift Cards",
    subtitle: "Special Gift CardsFree Return",
    icon: <FaGift />,
  },
  {
    id: 4,
    title: "Free Return",
    subtitle: "Within 7 Days",
    icon: <GiReturnArrow />,
  },
  {
    id: 5,
    title: "Consultancy",
    subtitle: "Lifetime 24/7/356",
    icon: <MdOutlinePermPhoneMsg />,
  },
];

export const colors = [
  "white",
  "black",
  "red",
  "green",
  "yellow",
  "gray",
  "gold",
  "titanium bronze",
];

export const sorts = [
  { id: 1, value: "-sold", title: "Best Selling" },
  { id: 2, value: "-title", title: "Alphabetically,A-Z" },
  { id: 3, value: "title", title: "Alphabetically,Z-A" },
  { id: 4, value: "price", title: "Price, low to high" },
  { id: 5, value: "-price", title: "Price, high to low" },
  { id: 6, value: "createdAt", title: "Date, old to new" },
  { id: 7, value: "-createdAt", title: "Date, new to old" },
];

export const tabs = [
  {
    id: 0,
    title: "descption",
    content: `
    Technology: GSM / HSPA / LTE
Dimensions: 146 x 72 x 8.1 mm
Weight: 161 g
Display: IPS LCD 5.2 inches
Resolution: 1080 x 1920
OS: Android OS, v6.0.1 (Marshmallow)
Chipset: Snapdragon 820
CPU: Quad-core
Internal: 32/64 GB
Camera: 23 MP, f/2.0 - 13 MP, f/2.0
Sony's latest flagship, the Xperia Z6 comes with refined design, improved camera, and a due update in specs. Wait, back up a little there - it's actually called the Xperia XZ this time around but, yeah, the rest of that is true.

When Sony announced the new X-series, some suggested that the Xperia X Performance was meant to take on the likes of the Galaxy S7's and HTC 10's, but we knew that couldn't be the case. Okay, 'suspected' might be more accurate there. Obviously, now we all know that the Xperia XZ is Sony's top-dog for this season, and the Z in its name quickly reveals its ancestry.

Indeed, the XZ has a lot in common with the Z5. The display, for one, is the same size and resolution as the last generation - not necessarily a bad thing, but the XZ also comes with 3GB of RAM - modern-day flagships will crack a condescending smile seeing that in the spec sheet.

No one will laugh at the rest of it, though - top-of-the-line Snapdragon 820 chipset, 23MP camera with a trio of focusing technologies and 4K video recording (one could think the Z is required for that, had it not been for the M5), high-res 13MP front camera, Type-C connectivity, fingerprint reader, IP68 rating, stereo speakers - name one thing missing.
    `,
  },
  {
    id: 1,
    title: "warranty",
    content: `
    WARRANTY INFORMATION
LIMITED WARRANTIES
Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:

Frames Used In Upholstered and Leather Products
Limited Lifetime Warranty
A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.
    `,
  },
  {
    id: 2,
    title: "delivery",
    content: `
    PURCHASING & DELIVERY
Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
    `,
  },
  {
    id: 3,
    title: "payment",
    content: `
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
    `,
  },
];

export const voteOptions = [
  { id: 1, title: "Terribe" },
  { id: 2, title: "Bad" },
  { id: 3, title: "Neutral" },
  { id: 4, title: "Good" },
  { id: 5, title: "Perfect" },
];

export const adminSideBar = [
  {
    id: 1,
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    type: "SINGLE",
    text: "DashBoard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    type: "SINGLE",
    text: "Manage User",
    icon: <MdGroup />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Products",
    icon: <RiProductHuntFill />,
    submenu: [
      {
        id: 3.1,
        text: "Create Product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        id: 3.2,

        text: "Manage Product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
      },
    ],
  },
  {
    id: 4,
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    type: "SINGLE",
    text: "Manage Order",
    icon: <RiBillLine />,
  },
];
export const memberSideBar = [
  {
    id: 1,
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    type: "SINGLE",
    text: "Personal info",
    icon: personal,
  },
  {
    id: 2,
    path: `/${path.MEMBER}/${path.ADDRESSES}`,
    type: "SINGLE",
    text: "Addresses",
    icon: address,
  },

  {
    id: 3,
    path: `/${path.MEMBER}/${path.HISTORY}`,
    type: "SINGLE",
    text: "History",
    icon: history,
  },

  {
    id: 4,
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    type: "SINGLE",
    text: "WishList",
    icon: wishlist,
  },
];

export const roles = [
  {
    id: 1,
    title: "admin",
    value: "admin",
  },
  {
    id: 2,
    title: "user",
    value: "user",
  },
];

export const statusBlocks = [
  {
    id: 1,
    title: "blocked",
    value: "blocked",
  },
  {
    id: 2,
    title: "active",
    value: "active",
  },
];

export const apiAddresses =
  "https://vietnam-administrative-division-json-server-swart.vercel.app";

export const cities = [
  {
    id: "01",
    city: "Thành phố Hà Nội",
  },

  {
    id: "79",
    city: "Thành phố Hồ Chí Minh",
  },
  {
    id: "31",
    city: "Thành phố Hải Phòng",
  },
  {
    id: "48",
    city: "Thành phố Đà Nẵng",
  },
  {
    id: "92",
    city: "Thành phố Cần Thơ",
  },
  {
    id: "02",
    city: "Tỉnh Hà Giang",
  },
  {
    id: "04",
    city: "Tỉnh Cao Bằng",
  },
  {
    id: "06",
    city: "Tỉnh Bắc Kạn",
  },
  {
    id: "08",
    city: "Tỉnh Tuyên Quang",
  },
  {
    id: "10",
    city: "Tỉnh Lào Cai",
  },
  {
    id: "11",
    city: "Tỉnh Điện Biên",
  },
  {
    id: "12",
    city: "Tỉnh Lai Châu",
  },
  {
    id: "14",
    city: "Tỉnh Sơn La",
  },
  {
    id: "15",
    city: "Tỉnh Yên Bái",
  },
  {
    id: "17",
    city: "Tỉnh Hoà Bình",
  },
  {
    id: "19",
    city: "Tỉnh Thái Nguyên",
  },
  {
    id: "20",
    city: "Tỉnh Lạng Sơn",
  },
  {
    id: "22",
    city: "Tỉnh Quảng Ninh",
  },
  {
    id: "24",
    city: "Tỉnh Bắc Giang",
  },
  {
    id: "25",
    city: "Tỉnh Phú Thọ",
  },
  {
    id: "26",
    city: "Tỉnh Vĩnh Phúc",
  },
  {
    id: "27",
    city: "Tỉnh Bắc Ninh",
  },
  {
    id: "30",
    city: "Tỉnh Hải Dương",
  },
  {
    id: "33",
    city: "Tỉnh Hưng Yên",
  },
  {
    id: "34",
    city: "Tỉnh Thái Bình",
  },
  {
    id: "35",
    city: "Tỉnh Hà Nam",
  },
  {
    id: "36",
    city: "Tỉnh Nam Định",
  },
  {
    id: "37",
    city: "Tỉnh Ninh Bình",
  },
  {
    id: "38",
    city: "Tỉnh Thanh Hóa",
  },
  {
    id: "40",
    city: "Tỉnh Nghệ An",
  },
  {
    id: "42",
    city: "Tỉnh Hà Tĩnh",
  },
  {
    id: "44",
    city: "Tỉnh Quảng Bình",
  },
  {
    id: "45",
    city: "Tỉnh Quảng Trị",
  },
  {
    id: "46",
    city: "Tỉnh Thừa Thiên Huế",
  },
  {
    id: "49",
    city: "Tỉnh Quảng Nam",
  },
  {
    id: "51",
    city: "Tỉnh Quảng Ngãi",
  },
  {
    id: "52",
    city: "Tỉnh Bình Định",
  },
  {
    id: "54",
    city: "Tỉnh Phú Yên",
  },
  {
    id: "56",
    city: "Tỉnh Khánh Hòa",
  },
  {
    id: "58",
    city: "Tỉnh Ninh Thuận",
  },
  {
    id: "60",
    city: "Tỉnh Bình Thuận",
  },
  {
    id: "62",
    city: "Tỉnh Kon Tum",
  },
  {
    id: "64",
    city: "Tỉnh Gia Lai",
  },
  {
    id: "66",
    city: "Tỉnh Đắk Lắk",
  },
  {
    id: "67",
    city: "Tỉnh Đắk Nông",
  },
  {
    id: "68",
    city: "Tỉnh Lâm Đồng",
  },
  {
    id: "70",
    city: "Tỉnh Bình Phước",
  },
  {
    id: "72",
    city: "Tỉnh Tây Ninh",
  },
  {
    id: "74",
    city: "Tỉnh Bình Dương",
  },
  {
    id: "75",
    city: "Tỉnh Đồng Nai",
  },
  {
    id: "77",
    city: "Tỉnh Bà Rịa - Vũng Tàu",
  },
  {
    id: "80",
    city: "Tỉnh Long An",
  },
  {
    id: "82",
    city: "Tỉnh Tiền Giang",
  },
  {
    id: "83",
    city: "Tỉnh Bến Tre",
  },
  {
    id: "84",
    city: "Tỉnh Trà Vinh",
  },
  {
    id: "86",
    city: "Tỉnh Vĩnh Long",
  },
  {
    id: "87",
    city: "Tỉnh Đồng Tháp",
  },
  {
    id: "89",
    city: "Tỉnh An Giang",
  },
  {
    id: "91",
    city: "Tỉnh Kiên Giang",
  },
  {
    id: "93",
    city: "Tỉnh Hậu Giang",
  },
  {
    id: "94",
    city: "Tỉnh Sóc Trăng",
  },
  {
    id: "95",
    city: "Tỉnh Bạc Liêu",
  },
  {
    id: "96",
    city: "Tỉnh Cà Mau",
  },
];

export const statusOrder = [
  {
    id: 1,
    status: "All Orders",
    value: "",
  },
  {
    id: 2,
    status: "Cancelled",
    value: "Cancelled",
  },
  {
    id: 3,
    status: "To Ship",
    value: "Processing",
  },
  {
    id: 4,
    status: "Completed",
    value: "Successed",
  },
];
