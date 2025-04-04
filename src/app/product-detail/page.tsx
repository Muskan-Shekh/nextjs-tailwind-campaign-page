"use client";

import { useState, useRef } from "react";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import OtherBookOffers from "../../components/other-book-offers";
import { CartPopup } from "@/components/cart-popup";

export default function ProductDetail() {
  const [mainImage, setMainImage] = useState(
    // "https://m.media-amazon.com/images/I/51pJh3VkldL._SY445_SX342_.jpg"
    "https://i.ytimg.com/vi/SBeaVx1hJwM/maxresdefault.jpg"
    // "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
  );
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null as any);

  const handleImageChange = (src: string) => {
    setMainImage(src);
  };
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <Navbar />
      <MainNavbar />
      {/* <div className="bg-gray-100"> */}
      <div className="container px-4 py-8 md:flex md:col-12">
        <div className="flex flex-wrap">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-10 mb-8">
            <img
              src={mainImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <img
                src="https://i.ytimg.com/vi/vnMqJgonYWA/maxresdefault.jpg"
                // src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Thumbnail 1"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleImageChange(
                    "https://i.ytimg.com/vi/vnMqJgonYWA/maxresdefault.jpg"
                  )
                }
              />
              <img
                src="https://m.media-amazon.com/images/I/61uw7X5cBUL._BO30,255,255,255_UF900,850_SR1910,1000,0,C_ZA59,500,900,420,420,AmazonEmber,50,4,0,0_PIRIOFOUR-medium,BottomLeft,30,-20_QL100_.jpg"
                // src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Thumbnail 2"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleImageChange(
                    "https://m.media-amazon.com/images/I/61uw7X5cBUL._BO30,255,255,255_UF900,850_SR1910,1000,0,C_ZA59,500,900,420,420,AmazonEmber,50,4,0,0_PIRIOFOUR-medium,BottomLeft,30,-20_QL100_.jpg"
                  )
                }
              />
              <img
                src="https://i.ytimg.com/vi/yAn9dHJ3joc/sddefault.jpg"
                // src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Thumbnail 3"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleImageChange(
                    "https://i.ytimg.com/vi/yAn9dHJ3joc/sddefault.jpg"
                  )
                }
              />
              <img
                src="https://m.media-amazon.com/images/I/51pJh3VkldL._BO30,255,255,255_UF900,850_SR1910,1000,0,C_ZA43,500,900,420,420,AmazonEmber,50,4,0,0_PIRIOTHREEANDHALF-medium,BottomLeft,30,-20_QL100_.jpg"
                // src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Thumbnail 4"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleImageChange(
                    "https://m.media-amazon.com/images/I/51pJh3VkldL._BO30,255,255,255_UF900,850_SR1910,1000,0,C_ZA43,500,900,420,420,AmazonEmber,50,4,0,0_PIRIOTHREEANDHALF-medium,BottomLeft,30,-20_QL100_.jpg"
                  )
                }
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">
              Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication
            </h2>
            <p className="text-gray-600">Model: KDP0010</p>
            <p className="text-gray-600">Author: Dr. L.R Bhalla</p>
            <p className="text-gray-600 mb-4">
              Publication: Kuldeep Publications
            </p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">₹465 </span>
              <span className="text-sm font-small mr-2">33% off</span>
              <span className="text-gray-500 line-through">₹696</span>
            </div>

            <div className="flex items-center mb-4">
              {/* Star Rating */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrease}
                  className="w-8 h-8 bg-gray-300 rounded-full text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-8 h-8 bg-gray-300 rounded-full text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6 relative">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
              {/* Popup */}
              {showPopup && (
                <CartPopup
                  popupRef={popupRef}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                ></CartPopup>
              )}

              <button className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                By Now
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Stock Quantity: 5</li>
                <li>Discount: 33%</li>
                <li>Book Language: Hindi</li>
                <li>Number of Pages: 0</li>
                <li>Publication Year: 0</li>
                <li>ISBN: 0</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="col-4">
            <Card>
              <List>
                <ListItem>
                  <ListItemPrefix>
                    <Avatar
                      variant="rectangle"
                      alt="candice"
                      src="https://m.media-amazon.com/images/I/51pJh3VkldL._SY445_SX342_.jpg"
                      className="w-[200px] h-[100px]"
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      DR. LR Bhalla
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Kuldeep Publications
                    </Typography>
                    <Typography variant="h6" color="blue-gray">
                      ₹465
                    </Typography>
                  </div>
                </ListItem>
                <hr></hr>
                <ListItem>
                  <ListItemPrefix>
                    <Avatar
                      variant="rectangle"
                      alt="alexander"
                      src="https://m.media-amazon.com/images/I/51pJh3VkldL._SY445_SX342_.jpg"
                      className="w-[200px] h-[100px]"
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      RAJASTHAN - <br />
                      GENERAL KNOWLEDGE OBEJCTIVE TYPE QUESTION BOOK
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      DR. LR Bhalla
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Kuldeep Publications
                    </Typography>
                    <Typography variant="h6" color="blue-gray">
                      ₹370
                    </Typography>
                  </div>
                </ListItem>
                <hr></hr>
                <ListItem>
                  <ListItemPrefix>
                    <Avatar
                      variant="rectangle"
                      alt="emma"
                      src="https://m.media-amazon.com/images/I/51pJh3VkldL._SY445_SX342_.jpg"
                      className="w-[200px] h-[100px]"
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Geography Of Rajasthan in english By Dr. L.R. Bhalla
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      DR. LR Bhalla
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Kuldeep Publications
                    </Typography>
                    <Typography variant="h6" color="blue-gray">
                      ₹299
                    </Typography>
                  </div>
                </ListItem>
              </List>
            </Card>
          </div> */}
      </div>
      {/* </div> */}
      <OtherBookOffers />
      <Footer />
    </>
  );
}
