function NewsImgDisplay({ img, displayImage, setDisplayImage }) {
	return (
		<div key={displayImage} className="article-images">
			<a href={img.link} target="_blank" rel="noopener noreferrer">
				<div className="img-container">
					<img src={img.original} alt="" />
				</div>
				<p>{img.title}</p>
			</a>
			<div className="buttons">
				<button
					onClick={() => {
						if (displayImage === 0) {
							setDisplayImage(4);
						} else {
							setDisplayImage(displayImage - 1);
						}
					}}
				>
					Back
				</button>
				<button
					onClick={() => {
						if (displayImage === 4) {
							setDisplayImage(0);
						} else {
							setDisplayImage(displayImage + 1);
						}
					}}
				>
					Forward
				</button>
			</div>
		</div>
	);
}

export default NewsImgDisplay;
