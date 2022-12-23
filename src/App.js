import { useEffect, useState } from "react";
import { AiOutlinePlus, AiFillGithub } from "react-icons/ai";
import Todo from "./components/Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { BiSun, BiMoon } from "react-icons/bi";

const style = {
  loader: `animate-spin mr-3 h-20 w-20 text-[#066258] dark:text-white`,
  bg: `font-inter min-h-screen min-w-screen p-4 bg-[#C9C9C9] dark:bg-[#15171d] transition duration-500`,
  container: `relative bg-[#fff] max-w-[1000px] w-full m-auto rounded-md shadow-xl p-4 dark:bg-[#22262F]`,
  heading: `text-3xl font-bold text-center p-2 dark:text-white`,
  form: `flex justify-between mb-8 transition duration-300`,
  input: `p-4 border border-gray-300 placeholder-gray-500 rounded-xl w-full text-xl focus:outline-teal-600 dark:text-white dark:bg-[#2E323C] dark:focus:outline-none dark:border-[#2E323C]`,
  button: `rounded-md p-4 ml-2 bg-[#0D8A7C] text-slate-100 hover:bg-[#066258] duration-150`,
  count: `text-center p-2 text-md font-medium dark:text-white`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  
  useEffect(() => {
    if(theme === "light") {
       document.documentElement.classList.remove("dark")
       localStorage.setItem("theme", "light")
    }
    if(theme === "dark") { 
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }, [theme])

  //take todos
  useEffect(() => {
    setLoad(true);
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
      setLoad(false);
    });
    return () => unsubscribe();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Введите корректно задачу");
      return;
    }
    if (todos.find((todo) => todo.text === input)) {
      setInput("");
      alert("Задача есть в списке задач");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <div className="absolute flex gap-3 top-8 right-4">
          {theme === "light" ? (
            <BiSun onClick={() => setTheme("dark")} className="cursor-pointer text-slate-400" size={24} />
          ) : (
            <BiMoon onClick={() => setTheme("light")} className="cursor-pointer text-slate-400" size={24} />
          )}
          <a href="https://github.com/glebkk" target="_blank">
            <AiFillGithub
              className="relative cursor-pointer text-slate-400"
              size={24}
            />
          </a>
        </div>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        {load ? (
          <div className="flex justify-center m-[40px]">
            <svg
              className={style.loader}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <ul className={style.list}>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}
        {todos.length > 0 && (
          <p className={style.count}>You have {todos.length} todos</p>
        )}
      </div>
    </div>
  );
}

export default App;
