import React, { useState } from "react";
import axios from "axios";

export default function Signin() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { username, value } = e.target;
    setUser({
      ...user, //spread operator
      [username]: value,
    });
  };
  const register = () => {
    const { username, email, password } = user;
    if (username && email && password) {
      axios.post("api", user).then((res) => console.log(res));
    } else {
      alert("invalid input");
    }
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mx-auto">
          <svg
            className="mx-auto"
            width="120"
            viewBox="0 0 416 155"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.5906 81.853C10.5619 65.4657 13.2845 41.6194 29.6717 28.5906C46.0589 15.5619 69.9053 18.2845 82.934 34.6717L115.995 76.2554C129.024 92.6426 126.301 116.489 109.914 129.518C93.527 142.546 69.6807 139.824 56.6519 123.437L23.5906 81.853Z"
              fill="#6CFFC1"
            />
            <path
              d="M87.6 37.0916C99.06 19.5713 122.553 14.6586 140.073 26.1186C157.594 37.5786 162.506 61.0716 151.046 78.5919L121.966 123.051C110.506 140.571 87.0127 145.484 69.4925 134.024C51.9723 122.564 47.0595 99.0705 58.5195 81.5502L87.6 37.0916Z"
              fill="#36B697"
            />
            <path
              d="M186.392 59.52C188.013 59.52 189.507 59.9467 190.872 60.8C192.237 61.568 193.261 62.7627 193.944 64.384L212.76 107.392L209.944 108.672L229.144 64.512C230.595 61.0987 232.856 59.4773 235.928 59.648C238.061 59.648 239.768 60.3307 241.048 61.696C242.413 62.976 243.096 64.5973 243.096 66.56C243.096 67.1573 242.968 67.7973 242.712 68.48C242.541 69.1627 242.328 69.8027 242.072 70.4L218.136 123.136C216.771 126.208 214.595 127.829 211.608 128C209.987 128.256 208.408 127.957 206.872 127.104C205.421 126.251 204.312 124.928 203.544 123.136L179.736 70.4C179.565 69.9733 179.352 69.4187 179.096 68.736C178.925 68.0533 178.84 67.2427 178.84 66.304C178.84 64.768 179.523 63.2747 180.888 61.824C182.253 60.288 184.088 59.52 186.392 59.52ZM268.379 120.192C268.379 122.411 267.654 124.288 266.203 125.824C264.752 127.275 262.918 128 260.699 128C258.48 128 256.646 127.275 255.195 125.824C253.744 124.288 253.019 122.411 253.019 120.192V67.328C253.019 65.1093 253.744 63.2747 255.195 61.824C256.646 60.288 258.48 59.52 260.699 59.52C262.918 59.52 264.752 60.288 266.203 61.824C267.654 63.2747 268.379 65.1093 268.379 67.328V120.192ZM260.571 51.2C257.67 51.2 255.622 50.7307 254.427 49.792C253.232 48.8533 252.635 47.1893 252.635 44.8V42.368C252.635 39.8933 253.275 38.2293 254.555 37.376C255.92 36.4373 257.968 35.968 260.699 35.968C263.686 35.968 265.776 36.4373 266.971 37.376C268.166 38.3147 268.763 39.9787 268.763 42.368V44.8C268.763 47.2747 268.123 48.9813 266.843 49.92C265.563 50.7733 263.472 51.2 260.571 51.2ZM283.653 60.8H313.989C316.037 60.8 317.744 61.4827 319.109 62.848C320.474 64.2133 321.157 65.92 321.157 67.968C321.157 69.9307 320.474 71.5947 319.109 72.96C317.744 74.24 316.037 74.88 313.989 74.88H283.653C281.605 74.88 279.898 74.1973 278.533 72.832C277.168 71.4667 276.485 69.76 276.485 67.712C276.485 65.7493 277.168 64.128 278.533 62.848C279.898 61.4827 281.605 60.8 283.653 60.8ZM297.349 44.8C299.568 44.8 301.36 45.568 302.725 47.104C304.176 48.5547 304.901 50.3893 304.901 52.608V109.568C304.901 110.763 305.114 111.744 305.541 112.512C306.053 113.28 306.693 113.835 307.461 114.176C308.314 114.517 309.21 114.688 310.149 114.688C311.173 114.688 312.112 114.517 312.965 114.176C313.818 113.749 314.8 113.536 315.909 113.536C317.104 113.536 318.17 114.091 319.109 115.2C320.133 116.309 320.645 117.845 320.645 119.808C320.645 122.197 319.322 124.16 316.677 125.696C314.117 127.232 311.344 128 308.357 128C306.565 128 304.56 127.872 302.341 127.616C300.208 127.275 298.16 126.549 296.197 125.44C294.32 124.245 292.741 122.453 291.461 120.064C290.181 117.675 289.541 114.389 289.541 110.208V52.608C289.541 50.3893 290.266 48.5547 291.717 47.104C293.253 45.568 295.13 44.8 297.349 44.8ZM390.044 58.24C392.263 58.24 394.097 58.9653 395.548 60.416C396.999 61.8667 397.724 63.744 397.724 66.048V120.192C397.724 122.411 396.999 124.288 395.548 125.824C394.097 127.275 392.263 128 390.044 128C387.825 128 385.991 127.275 384.54 125.824C383.089 124.288 382.364 122.411 382.364 120.192V113.92L385.18 115.072C385.18 116.181 384.583 117.547 383.388 119.168C382.193 120.704 380.572 122.24 378.524 123.776C376.476 125.312 374.044 126.635 371.228 127.744C368.497 128.768 365.511 129.28 362.268 129.28C356.38 129.28 351.047 127.787 346.268 124.8C341.489 121.728 337.692 117.547 334.876 112.256C332.145 106.88 330.78 100.736 330.78 93.824C330.78 86.8267 332.145 80.6827 334.876 75.392C337.692 70.016 341.447 65.8347 346.14 62.848C350.833 59.776 356.039 58.24 361.756 58.24C365.425 58.24 368.796 58.7947 371.868 59.904C374.94 61.0133 377.585 62.4213 379.804 64.128C382.108 65.8347 383.857 67.584 385.052 69.376C386.332 71.0827 386.972 72.5333 386.972 73.728L382.364 75.392V66.048C382.364 63.8293 383.089 61.9947 384.54 60.544C385.991 59.008 387.825 58.24 390.044 58.24ZM364.188 115.2C367.943 115.2 371.228 114.261 374.044 112.384C376.86 110.507 379.036 107.947 380.572 104.704C382.193 101.461 383.004 97.8347 383.004 93.824C383.004 89.728 382.193 86.0587 380.572 82.816C379.036 79.5733 376.86 77.0133 374.044 75.136C371.228 73.2587 367.943 72.32 364.188 72.32C360.519 72.32 357.276 73.2587 354.46 75.136C351.644 77.0133 349.425 79.5733 347.804 82.816C346.268 86.0587 345.5 89.728 345.5 93.824C345.5 97.8347 346.268 101.461 347.804 104.704C349.425 107.947 351.644 110.507 354.46 112.384C357.276 114.261 360.519 115.2 364.188 115.2Z"
              fill="#6CFFC1"
            />
          </svg>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={register}
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You have account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-emerald-400 hover:text-emerald-600"
            >
              Login To Your Account
            </a>
          </p>
        </div>
      </div>
    );
  };
}
