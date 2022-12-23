import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
  li: `border border-gray-300 flex justify-between gap-2 rounded-md p-4 mb-4 capitalize dark:bg-[#2E323C] dark:border-[#2E323C] dark:text-white`,
  liComplete: `border text-white flex justify-between gap-2 rounded-md bg-[#0D8A7C] p-4 mb-4 capitalize dark:border-[#0D8A7C]`,
  row: `flex items-center overflow-hidden text-ellipsis`,
  text: `whitespace-nowrap overflow-hidden text-ellipsis ml-2 cursor-pointer`,
  checkbox: `accent-white cursor-pointer dark:accent-[#2E323C]`,
}


function Todo({todo, toggleComplete, deleteTodo}) {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
        <div className={style.row}>
            <input onChange={() => toggleComplete(todo)} className={style.checkbox} type="checkbox" checked={todo.completed ? 'checked' : ''}/>
            <p onClick={() => toggleComplete(todo)} className={style.text}>{todo.text}</p>
        </div>
        <button className={style.buttonDel} onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /></button>
    </li>
  )
}

export default Todo