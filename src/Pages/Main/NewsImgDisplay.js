import { useEffect } from 'react';
import rightChevron from '../../images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg';
import leftChevron from '../../images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg';

function NewsImgDisplay({ img, displayImage, setDisplayImage, numOfImgs }) {
	useEffect(() => {
		function forwardImg() {
			if (displayImage === numOfImgs - 1) {
				setDisplayImage(0);
			} else {
				setDisplayImage(displayImage + 1);
			}
		}
		const autoNextImg = setTimeout(forwardImg, 10000);
		return () => {
			clearTimeout(autoNextImg);
		};
	}, [displayImage]);

	function createImgIndicators() {
		let imgIndicators = [];
		for (let i = 0; i < numOfImgs; i++) {
			imgIndicators.push(
				<div className={`img-indicator-${displayImage === i ? 'active' : 'inactive'}`}></div>
			);
		}
		return imgIndicators;
	}

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
								setDisplayImage(numOfImgs - 1);
							} else {
								setDisplayImage(displayImage - 1);
							}
						}}
					>
						<img src={leftChevron} alt="" />
					</button>
					<button
						onClick={() => {
							if (displayImage === numOfImgs - 1) {
								setDisplayImage(0);
							} else {
								setDisplayImage(displayImage + 1);
							}
						}}
					>
						<img src={rightChevron} alt="" />
					</button>
				</div>
				<div className="img-indicators">{createImgIndicators()}</div>
			</div>
		</div>
	);
}

export default NewsImgDisplay;
