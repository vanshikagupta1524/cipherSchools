// import { Component } from "react";
import { useState, useEffect } from "react";
import Task from "../components/Task";
// import AddTask from "../components/AddTask";
// import TaskContext from "../context/TaskContext";
// import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import { getTasksForCurrentUser } from "../apis/tas-api";

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

	// const { taskList } = useContext(TaskContext);
	// const navigate = useNavigate();

	const [taskList, setTaskList] = useState([]);

	const fetchTasks = async () => {
		const tasks = await getTasksForCurrentUser();
		setTaskList([ ...tasks]);
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	let addNewTask = (task) => {
		setTaskList([...taskList, { ...task, createdDate: new Date( )}]);
	};

	return (
		<>
			<div className="screen">
				<h1 className="ui heading center">To Do List</h1>
				<div>

					<button onClick={(e) => {
						setTaskList([...taskList,
							{
								title: "Go to gym",
								description: "hello",
								createdDate: new Date(),
							},
						]);
					}} className="ui secondary button">
						Add Task
					</button>

					<section>
						<div className="ui cards">
							{taskList.map((task, index) => (
								<Task task={task} key={index} />
							))}
						</div>
					</section>
				</div>

				<AddTask onSubmit={addNewTask} validator={({ title, description }) => {
					if (title?.length && !title.includes("\n") && description?.length) {
						console.log(`is valid`);
						return true;
					}
					console.log(`Invalid`);
					return false;
				}} />

			</div>

		</>
	);
};

export default ToDoScreen;