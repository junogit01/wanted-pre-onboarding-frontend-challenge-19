import React, { useCallback, useRef, MouseEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeText, addTodo } from "../../stores/todoStore";
import { RootState } from "@stores/index";

function TodoForm(): JSX.Element {
  // useRef에 타입을 HTMLInputElement로 명시하고, 초기값으로 null을 제공합니다.
  const inputFiled = useRef<HTMLInputElement>(null);

  const { text } = useSelector((state: RootState) => state.todoStore);
  const dispatch = useDispatch();

  const dispatchText = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    dispatch(changeText(target.value));
  };

  const sendData = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      dispatch(addTodo(text));
      dispatch(changeText(""));
      // inputFiled.current.force()
    },
    [dispatch, text]
  );

  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          ref={inputFiled}
          value={text}
          onChange={(evt) => dispatchText(evt)}
        />
        <div className="input-group-append">
          <button
            type="submit"
            className="btn btn-primary mr-1"
            onClick={sendData}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
export default TodoForm;
