import { useState } from "react";
import "./App.css";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const toggleTheme = () => {
    {theme === 'light' ? setTheme('dark') : setTheme('light')}
  };
  return (
    <div className={`py-8 ${theme === "light" ? "bg-white" : "bg-slate-900"}`}>
      <div className="w-[85%] mx-auto relative h-screen">
        <h1
          className={`uppercase text-center text-black text-3xl font-semibold ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          todo list
        </h1>

        {/* Upper portion */}
        <div className="flex justify-center items-center mt-8 mb-5">
          <input
            type="text"
            placeholder="Type here"
            className={`input  text-black w-[40%] ${
              theme === "light"
                ? "bg-white text-black input-primary input-bordered"
                : "text-white bg-slate-900 border-white input-bordered"
            }`}
          />
          <button
            className={`btn btn-outline mx-3 ${
              theme === "light"
                ? "btn-primary"
                : "border-primary text-white hover:bg-primary"
            }`}
          >
            Search
          </button>

          {/* Filter Button */}
          <select
            className={`select select-primary mx-10 ${
              theme === "light" ? "bg-white text-black" : "text-white"
            }`}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>

          {/* Theme Controller */}
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
              onClick={toggleTheme}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>

        {/* Task Portion */}
        <ul>
          <li>
            <div className="flex justify-center items-center form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span
                  className={`text-black mx-2 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Remember me
                </span>
              </label>
            </div>
          </li>
        </ul>

        {/* Add Button */}
        <div className="absolute bottom-20 right-80">
          <button onClick={toggleModal} className="btn btn-primary">
            Add
          </button>

          {/* Modal */}
          <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
              openModal ? "block" : "hidden"
            }`}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-xl font-semibold text-black">
                  Enter Details
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700"
                  id="closeModal"
                >
                  &#10005;
                </button>
              </div>

              <div className="my-4">
                <input
                  type="text"
                  placeholder="Type something..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  id="closeModal"
                >
                  Close
                </button>
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
