import { useEffect } from 'react';
import rightChevron from '../../images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg';
import leftChevron from '../../images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg';
import TouchSweep from 'touchsweep';
import backupImage from '../../images/Premier_league_text_logo.png';

function NewsImgDisplay({ img, displayImage, setDisplayImage, numOfImgs }) {
	useEffect(() => {
		function forwardImg() {
			if (displayImage === numOfImgs - 1) {
				setDisplayImage(0);
			} else {
				setDisplayImage(displayImage + 1);
			}
		}
		const autoNextImg = setTimeout(forwardImg, 10000999999);
		return () => {
			clearTimeout(autoNextImg);
		};
	}, [displayImage]);

	useEffect(() => {
		const area = document.getElementsByClassName('img-container')[0];
		const data = {
			value: 1,
		};
		const touchThreshold = 20;

		const touchSweepInstance = new TouchSweep(area, data, touchThreshold);

		// Then listen for custom swipe events and do your magic:

		if (area) {
			area.addEventListener('swiperight', (event) => {
				if (displayImage === 0) {
					setDisplayImage(numOfImgs - 1);
				} else {
					setDisplayImage(displayImage - 1);
				}
			});
			area.addEventListener('swipeleft', (event) => {
				if (displayImage === numOfImgs - 1) {
					setDisplayImage(0);
				} else {
					setDisplayImage(displayImage + 1);
				}
			});
		}
	}, [displayImage]);

	function createImgIndicators() {
		let imgIndicators = [];
		for (let i = 0; i < numOfImgs; i++) {
			imgIndicators.push(
				<div
					onClick={() => {
						setDisplayImage(i);
					}}
					className={`img-indicator-${displayImage === i ? 'active' : 'inactive'}`}
				></div>
			);
		}
		return imgIndicators;
	}

	if (!img) {
		return <div></div>;
	}

	return (
		<div key={displayImage} className="article-images">
			<div className="image-info-container">
				<a href={img.link} target="_blank" rel="noreferrer">
					<div className="img-container">
						<img
							src={img.original}
							alt="" // if image is not found (Ex. deleted)
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = backupImage;
							}}
						/>
					</div>
					<div className="title-container">
						<h2>
							{img.source}: {img.title}
						</h2>
					</div>
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
