// import { Component } from "react";
import { useState } from "react";
import Task from "../components/Task";
import AddTask from "../components/AddTask";

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

	const [taskList, setTaskList] = useState([]);

	let addNewTask = (task) => {
		setTaskList([...taskList, { ...task, createdDate: new Date( )}]);
	};

	return (
		<>
			<div className="screen">
				<h1 className="ui heading center">To Do List</h1>
			<div>

			<button onClick={(e) => {
				setTaskList([...taskList, {
						title: "Go to gym",
						description: "Going to gym is good for muscle growth.",
						createdDate: new Date(),
					},
				]);
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