function NewsImgDisplay({ img, displayImage, setDisplayImage }) {
	return (
		<div key={displayImage} className="article-images">
			<div className="image-info-container">
				<a href={img.link} target="_blank" rel="noreferrer">
					<div className="img-container">
						<img src={img.original} alt="" />
					</div>
					<h2>{img.title}</h2>
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
		</div>
	);
}

export default NewsImgDisplay;
