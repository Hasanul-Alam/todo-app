import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasks = localStorage.getItem("todos");
    setTasks(JSON.parse(tasks));
  }, []);

  // Toggle Add Task Modal
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  // Handle Theme Toggling
  const toggleTheme = () => {
    {
      theme === "light" ? setTheme("dark") : setTheme("light");
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Set Data To Local Storage
  const setToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Make a New Task & Set It To Local Storage
  const makeNewTask = (e) => {
    e.preventDefault();

    // Generate an id
    const id = Math.floor(Math.random() * 100000000000);

    if(inputValue){
      const newItem = {
        id: id,
        task: inputValue,
        completed: false,
      };
      const newData = [...tasks, newItem];
      setToLocalStorage(newData);
      setTasks(newData);
    }
    else{
      alert('Write a task to add.');
    }
    setInputValue("");
  };

  // Handle Submit Button on Enter Press
  const handleSubmitOnEnter = (event, buttonType) => {
    if (event.key === "Enter" && buttonType === "add") {
      makeNewTask();
    } else if (event.key === "Enter" && buttonType === "search") {
      console.log("Search is clicked.");
      
    }
  };

  // Handle Completed Task
  const handleCompleted = (id) => {
    const allTodos = JSON.parse(localStorage.getItem('todos'));
    allTodos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
        setToLocalStorage(allTodos);
        setTasks(allTodos)
      }
    })
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
        <div className="flex justify-center items-center mt-8 mb-5 max-md:block">
          {/* Search Functionality */}
          <div className="flex w-[40%] max-md:w-full justify-center">
            <input
              type="text"
              placeholder="Type here"
              className={`input  text-black w-full ${
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
          </div>

          <div className="flex items-center justify-center max-md:mt-5">
            {/* Filter Button */}
            <select
              className={`select select-primary mx-10 max-md:me-10 max-md:ml-0 ${
                theme === "light" ? "bg-white text-black" : "text-white"
              }`}
            >
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
            </select>

            {/* Theme Controller */}
            <label
              className={`flex cursor-pointer gap-2 ${
                theme === "light" ? "text-slate-700" : "text-gray-200"
              }`}
            >
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
        </div>

        {/* Task Portion */}
        <ul>
          {tasks === null
            ? setTasks([])
            : tasks.map((task) => (
                <li key={task.id}>
                  <div className="flex justify-center form-control">
                    <label className="label cursor-pointer block">
                      <input
                        onChange={() => handleCompleted(task.id)}
                        type="checkbox"
                        checked= {task.completed}
                        className="checkbox checkbox-primary"
                      />
                      <span
                        className={`text-black mx-2 text-left ${
                          theme === "light" ? "text-black" : "text-white"
                        } ${task.completed ? 'line-through' : ''}`}
                      >
                        {task.task}
                      </span>
                    </label>
                  </div>
                </li>
              ))}
        </ul>

        {/* Add Button & Modal*/}
        <div className="absolute bottom-20 right-80 max-md:bottom-10 max-md:right-5">
          <button onClick={toggleModal} className="btn btn-primary">
            Add
          </button>

          {/* Modal */}
          <div
            className={`fixed inset-0 flex items-center justify-center bg-opacity-50 ${
              openModal ? "block" : "hidden"
            }`}
          >
            <div
              className={`rounded-lg shadow-lg p-6 w-full max-w-md m-5 ${
                theme === "light" ? "bg-gray-200" : "bg-slate-700"
              }`}
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h3
                  className={`text-xl font-semibold text-black ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Enter Task
                </h3>
                <button
                  onClick={toggleModal}
                  className={`text-gray-500 ${
                    theme === "light"
                      ? "text-black hover:text-gray-700"
                      : "text-white hover:text-slate-300"
                  }`}
                  id="closeModal"
                >
                  &#10005;
                </button>
              </div>

              <form action="" onSubmit={makeNewTask}>
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Eg: Get up at 7:00 am"
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleSubmitOnEnter(e, "add")}
                    value={inputValue}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "light"
                        ? "bg-white text-black border-primary placeholder:text-slate-500"
                        : "border-white bg-slate-900 text-white placeholder:text-slate-400"
                    }`}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="reset"
                    onClick={toggleModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                    id="closeModal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      toggleModal();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
