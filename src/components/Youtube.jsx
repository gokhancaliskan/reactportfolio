import React, { useState, useEffect } from "react";
import axios from "axios";

const Youtube = () => {
	const [latestVideo, setLatestVideo] = useState(null);

	useEffect(() => {
		const stored = localStorage.getItem("latestVideo");

		if (stored) {
			setLatestVideo(JSON.parse(stored));
			console.log("data: ", JSON.parse(stored));
		} else {
			const API_KEY = "AIzaSyBX5gAFWTdGlpP6ybkjB9YigiUEUVgEVKg";
			const CHANNEL_ID = "UC0iAnt_XYKTu75F7qvNjBzQ";
			axios
				.get(
					`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
				)
				.then((response) => {
					setLatestVideo(response.data.items[0]);
					localStorage.setItem(
						"latestVideo",
						JSON.stringify(response.data.items[0])
					);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	return (
		<div>
			{" "}
			{!latestVideo ? (
				<div>
					{" "}
					<p>Loading...</p>
				</div>
			) : (
				<div>
					<iframe
						src={`https://www.youtube.com/embed/${latestVideo.id.videoId}`}
					></iframe>
				</div>
			)}
		</div>
	);
};

export default Youtube;
