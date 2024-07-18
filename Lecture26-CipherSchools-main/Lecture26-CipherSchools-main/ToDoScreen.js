// import { Component } from "react";
import { useContext, useState } from "react";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import TaskContext from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

// class ToDoScreen extends Component {
//     state = {
//         taskCount: 0,
//     };
//     render() {
//         return (
//             <div className="screen">
//                 <h1 className="ui heading center">To Do List</h1>
//                 <div>
//                     <button onClick={(e) => {
//                         this.setState({
//                             ...this.state, taskCount: this.state.taskCount + 1,
//                         });
//                         console.log(this.state.taskCount);
//                     }}
//                     className="ui secondary button">Add Task</button>
//                     <p>The number of tasks are: {this.state.taskCount}</p>
//                 </div>
//             </div>
//         )
//     }
// }

	// const ToDoScreen = () => {

	// 	const [taskCount, setTaskCount] = useState(0);

	// 	return (
	// 		<div className="screen">
	// 			<h1 className="ui heading center">To Do List</h1>
	// 											<div>
	// 											<button onClick={(e) => {
	// 												setTaskCount(taskCount + 1);
	// 											}}
	// 										className="ui secondary button">Add Task</button>
	// 										<p>The number of tasks are: {taskCount}</p>
	// 								</div>
	// 						</div>
	// 	)
	// }

	// export default ToDoScreen;

const ToDoScreen = () => {

	const {taskList} = useContext(TaskContext);
	const navigate = useNavigate();

	// let addNewTask = (task) => {
	// 	setTaskList([...taskList, { ...task, createdDate: new Date( )}]);
	// };

	return (
		<>
			<div className="screen">
				<h1 className="ui heading center">To Do List</h1>
			<div>

			<button onClick={(e) => {
				navigate("/add-task")
			}} className="ui secondary button">
				Add Task
			</button>

			<section>
				<div className="ui cards">
					{taskList.map((task, index) => (
					<Task task={task} key={index}/>
					))}
				</div>
			</section>
		</div>

		{/* <AddTask onSubmit={addNewTask}/> */}

		</div>
		
	</>
	);
};

export default ToDoScreen;