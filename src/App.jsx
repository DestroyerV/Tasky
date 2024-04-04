import { useState, useEffect } from "react";
import { LuListTodo } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDropright } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineEdit } from "react-icons/md";

function App() {
  const [completed, setCompleted] = useState(false);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!todo) return;
    setTodos([...todos, { todo: todo, done: false, id: uuidv4() }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheck = (id) => {
    let i = todos.findIndex((item) => item.id === id);
    let copyTodos = [...todos];
    copyTodos[i].done = !copyTodos[i].done;
    setTodos(copyTodos);
  };

  const handleEdit = (id) => {
    let i = todos.findIndex((item) => item.id === id);
    setTodo(todos[i].todo);
    handleDelete(id);
  };

  const completeToggle = () => {
    setCompleted(!completed);
    setIsTransformed(!isTransformed);
  };

  return (
    <>
      <div className="app h-[100vh] w-[100vw] bg-hero-pattern bg-cover">
        <div className="container mx-auto py-4">
          <nav className=" nav mx-auto mb-6 flex h-12 w-[90%] items-center justify-between rounded-lg border-[1.5px] border-black bg-[#60c0bf]">
            <div className="branding flex cursor-pointer items-center justify-center gap-2">
              <div className="logo mx-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[1.5px] border-black bg-[#517eed] hover:bg-[#4971d5]">
                <LuListTodo size={32} />
              </div>
              <h1 className="pb-1 text-3xl font-extrabold">Tasky</h1>
            </div>
            <div className="link mx-2 h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[1.5px] border-black bg-[#d166f7] hover:bg-[#c14cd0]">
              <a
                href="https://github.com/DestroyerV/Tasky.git"
                target="_blank"
                className="flex h-full items-center justify-center"
              >
                <FaGithub size={32} />
              </a>
            </div>
          </nav>
          <div className="todo-container mx-auto h-[85vh] w-[90%] overflow-hidden rounded-lg border-[1.5px] border-black bg-[#60c0bf] p-8">
            <h1 className="todoHeading text-5xl font-bold">Things to do:</h1>
            <div className="add-todo my-6 flex gap-8 sm:gap-10">
              <input
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                onChange={(e) => handleChange(e)}
                value={todo}
                className="h-12 w-[75%] rounded-lg border-[1.5px] border-black bg-[#f7cb66] px-4 text-xl font-bold placeholder-slate-600 hover:bg-[#deb75c]"
                type="text"
                name=""
                id=""
                placeholder="Add a new task"
              />
              <button
                onClick={handleAdd}
                className="h-12 w-32 rounded-lg border-[1.5px] border-black bg-[#7fbc95] text-xl font-bold hover:bg-[#72a986] md:w-[25%]"
              >
                Add task
              </button>
            </div>
            <div className="line w-full border-b-[1px] border-black"></div>
            <div
              onClick={completeToggle}
              className="completed my-2 flex cursor-pointer items-center gap-2"
            >
              <div className="logo flex h-8 w-8 items-center justify-center rounded-xl border-[1.5px] border-black bg-[#ed6651] hover:bg-[#d55c49]">
                <IoIosArrowDropright
                  size={20}
                  className={
                    isTransformed
                      ? "rotate-90 transition-all ease-in-out"
                      : "transition-all ease-in-out"
                  }
                />
              </div>
              <h1 className="completeHeading font-semibold">Completed</h1>
            </div>
            <div className="todo's h-[60vh] overflow-auto">
              {todos.map((item) => {
                return (
                  (completed || !item.done) && (
                    <div
                      key={item.id}
                      className="todo my-4 box-border flex min-h-10 w-full items-center justify-between rounded-lg border-[1.5px] border-black bg-[#ffffff40] px-2 py-1 hover:bg-[#82c9c9]"
                    >
                      <h2
                        className={
                          item.done
                            ? "font-semibold line-through"
                            : "font-semibold"
                        }
                      >
                        {item.todo}
                      </h2>
                      <div className="buttons flex gap-2">
                        <button
                          onClick={() => handleCheck(item.id)}
                          className="check flex h-9 w-9 items-center justify-center rounded-xl border-[1.5px] border-black bg-[#a2e0a0] hover:bg-[#83b682]"
                        >
                          <FaCheck size={20} />
                        </button>

                        <button
                          onClick={() => handleEdit(item.id)}
                          className="edit flex h-9 w-9 items-center justify-center rounded-xl border-[1.5px] border-black bg-[#d166f7] hover:bg-[#af55cf]"
                        >
                          <MdOutlineEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="delete flex h-9 w-9 items-center justify-center rounded-xl border-[1.5px] border-black bg-[#e0a0a0] hover:bg-[#b68282]"
                        >
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
