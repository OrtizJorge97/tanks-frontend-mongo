import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import TextField from "@mui/material/TextField";

export default function ChartComponent(props) {
	const { scaleRanges, setScaleRanges, tanksSelected, tanksData, category } =
		props;
	const [maxScaleField, setMaxScaleField] = useState(scaleRanges.max);
	const [graph, setGraph] = useState({
		data: {
			labels: ["MT001"],
			datasets: [
				{
					label: "",
					backgroundColor: [
						"rgb(255, 99, 132)",
						"rgb(54, 99, 132)",
						"rgb(54, 99, 43)",
						"rgb(54, 99, 43)",
						"rgb(54, 99, 43)",
					],
					borderColor: "rgb(255, 99, 132)",
					data: [8],
				},
			],
		},
		options: {
			indexAxis: "x",
			scales: {
				y: {
					min: 0,
					max: maxScaleField,
				},
			},
		},
	});
	useEffect(() => {
		console.log(graph.options);
		let waterLevel = [];
		let oxygenPercentage = [];
		let ph = [];
		let dataToDisplay = null;
		console.log("PRINTING SELECTED TANKS DATA IN CHART COMPONENT");
		console.log(tanksSelected);
		console.log("PRINTING TANKS DATA");
		console.log(tanksData);
		if(tanksSelected.length && tanksData.length) {
			tanksSelected.forEach((item, index) => { //["E1000", "E1001"]
				console.log("TANK SELECTED IS " + item)
				let tankDataObject = tanksData.filter(tankData => tankData.id == item);//get the objects here
				console.log("PRINTING TANK DATA OBJECT")
				console.log(tankDataObject)
				tankDataObject = tankDataObject[0];
				if(tankDataObject !== undefined && tankDataObject !== null) {
					waterLevel.push(tankDataObject.wtrLvlValue);
					oxygenPercentage.push(tankDataObject.oxygenPercentageValue);
					ph.push(tankDataObject.phValue);
				}
				
			});
			console.log(waterLevel);

			if (category === "Water Level") {
				dataToDisplay = waterLevel;
			} else if (category === "%Oxygen") {
				dataToDisplay = oxygenPercentage;
			} else if (category === "Ph") {
				dataToDisplay = ph;
			}
		}
		setGraph({
			data: {
				labels: tanksSelected,
				datasets: [
					{
						label: "",
						backgroundColor: [
							"rgb(255, 99, 132)",
							"rgb(54, 99, 132)",
							"rgb(54, 99, 43)",
							"rgb(54, 99, 43)",
							"rgb(54, 99, 43)",
						],
						borderColor: "rgb(255, 99, 132)",
						data: dataToDisplay,
					},
				],
			},
			options: {
				...graph.options,
				scales: {
					y: scaleRanges,
				},
			},
		});
	}, [scaleRanges, tanksSelected, tanksData, category]);

	return (
		<div>
			<TextField
				id='outlined-basic'
				sx={{
					minWidth: "50px"
				}}
				label='Max Value'
				type='number'
				variant='outlined'
				value={maxScaleField}
				onChange={(e) => {
					setMaxScaleField(e.target.value);
				}}
				onKeyUp={(e) => {
					if (e.code === "Enter") {
						if(e.target.value > 0) {
							setScaleRanges({
								...scaleRanges,
								max: parseInt(e.target.value)
							});
						}
						console.log("Enter pressed!");
					}
				}}
			/>
			<Bar data={graph.data} options={graph.options} />
		</div>
	);
}
