const TODOLIST_ADDTODO = "TODOLIST/ADDTODO";
const TODOLIST_UPDATETODO = "TODOLIST/UPDATETODO";
const TODOLIST_DELETETODO = "TODOLIST/DELETETODO";
const TODOLIST_CHANGETEXT = "TODOLIST/CHANGETEXT";

// Todo, 상태 인터페이스
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  todoList: Todo[];
  text: string;
}

// 액션 인터페이스 모음
export interface UpdateTodoAction {
  type: typeof TODOLIST_UPDATETODO;
  payload: number;
}

export interface DeleteTodoAction {
  type: typeof TODOLIST_DELETETODO;
  payload: number;
}

export interface ChangeTextAction {
  type: typeof TODOLIST_CHANGETEXT;
  payload: string;
}

export interface AddTodoAction {
  type: typeof TODOLIST_ADDTODO;
  payload: Todo;
}

// 액션 타입 유니온
type TodoActionTypes =
  | UpdateTodoAction
  | DeleteTodoAction
  | ChangeTextAction
  | AddTodoAction;

// action
let count = 1;

// state에 적용하기 전까지 작업을 여기서 처리
export const updateTodo = (id: number) => {
  return { type: TODOLIST_UPDATETODO, payload: id };
};
export const deleteTodo = (id: number) => {
  return { type: TODOLIST_DELETETODO, payload: id };
};
export const changeText = (text: string) => {
  return { type: TODOLIST_CHANGETEXT, payload: text };
};
export const addTodo = (txt: string) => {
  const todo = { id: count++, text: txt, done: false };
  return { type: TODOLIST_ADDTODO, payload: todo };
};

// store는 메모리에 등록되어 있는 상태. 따라서 변수는 메모리상에서 계속 유지되고 있는 상태

const init: TodoState = {
  todoList: [],
  text: "",
};
const todoStore = (
  state: TodoState = init,
  action: TodoActionTypes
): TodoState => {
  switch (action.type) {
    case TODOLIST_UPDATETODO:
      const updateTodos = state.todoList.map((todo) => {
        if (todo.id === action.payload) return { ...todo, done: !todo.done };
        else return todo;
      });
      return { ...state, todoList: updateTodos };
    case TODOLIST_DELETETODO:
      const deleteTodos = state.todoList.filter((todo) => {
        if (todo.id === action.payload) return false;
        else return true;
      });
      return { ...state, todoList: deleteTodos };
    case TODOLIST_ADDTODO:
      return { ...state, todoList: state.todoList.concat(action.payload) };
    case TODOLIST_CHANGETEXT:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
export default todoStore;
