import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { Button } from '../Button/Button';
import type { TimeSegment } from '../../types/types';
import gsap from 'gsap';
import * as styles from './MySwipe.module.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

type MySwiperProps = {
	segments: TimeSegment[];
	activeSegment: number;
};

export const MySwiper = ({ segments, activeSegment }: MySwiperProps) => {
	const swiperRef = useRef<SwiperType>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		checkIsMobile();

		window.addEventListener('resize', checkIsMobile);
		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			gsap.fromTo(
				containerRef.current,
				{ autoAlpha: 0 },
				{ autoAlpha: 1, duration: 0.8, ease: 'power2.out' }
			);
		}
	}, [activeSegment]);

	return (
		<>
			<div className={styles.swiper} ref={containerRef}>
				<Button
					onClick={() => swiperRef.current?.slidePrev()}
					className={styles.swiper__button}
					disabled={isBeginning}
				/>
				<Swiper
					className={styles.swiper}
					modules={[Navigation, Pagination]}
					onBeforeInit={swiper => {
						swiperRef.current = swiper;
					}}
					onSlideChange={swiper => {
						setIsBeginning(swiper.isBeginning);
						setIsEnd(swiper.isEnd);
					}}
					onReachBeginning={() => setIsBeginning(true)}
					onReachEnd={() => setIsEnd(true)}
					spaceBetween={isMobile ? 25 : 80}
					slidesPerView={isMobile ? 1.5 : 3}
					pagination={{
						el: '.custom-pagination',
						clickable: true,
						renderBullet: (_, className) =>
							`<span class="${className}"></span>`,
					}}
				>
					{segments[activeSegment].events.map(event => (
						<SwiperSlide key={event.id} className={styles.swiper__slide}>
							<span className={styles.swiper__slideDate}>{event.date}</span>
							<span className={styles.swiper__slideDescription}>
								{event.description}
							</span>
						</SwiperSlide>
					))}
				</Swiper>
				<Button
					onClick={() => swiperRef.current?.slideNext()}
					className={styles.swiper__button}
					disabled={isEnd}
				/>
			</div>
			<div className='custom-pagination' />
		</>
	);
};
