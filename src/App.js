import "./styles.css";
import List from "./components/List";
import { useState, useEffect } from "react";

const getDate = () => {
  let data = localStorage.getItem("WorkList");
  console.log(data);
  return data ? JSON.parse(data) : [];
};
export default function App() {
  const [arr, setarr] = useState(getDate());
  const [item, seti] = useState("");

  const changeHandle = (e) => {
    seti(e.target.value);
  };
  const addItem = (e) => {
    if (item === "") return;
    setarr([...arr, item]);
    seti("");
  };
  const del = (i) => {
    console.log(arr);

    const filArr = arr.filter((item, index) => index !== i);
    setarr([...filArr]);
  };
  const edit = (text, i) => {
    console.log(text, i);

    const newArr = arr.map((item, index) => {
      return index === i ? text : item;
    });
    console.log("newArr", newArr);

    setarr([...newArr]);
  };

  useEffect(() => {
    localStorage.setItem("WorkList", JSON.stringify(arr));
  }, [arr]);

  return (
    <div className="App">
      <h1 style={{ marginTop: "15px" }}>My Todo List</h1>
      <input
        className="input"
        placeholder="Add your task here"
        value={item}
        onChange={(e) => changeHandle(e)}
        onKeyDown={(e) => {
          e.keyCode === 13 ? addItem() : null;
        }}
      />
      <button onClick={addItem}>
        <i className="fa-solid fa-plus"></i>
      </button>
      <List arr={arr} del={del} edit={edit} />
    </div>
  );
}
