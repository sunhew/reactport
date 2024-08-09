import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';
import coffeeImage from '../assets/img/coffee.png';
import musicImage from '../assets/img/music.png';
import fontImage from '../assets/img/font.png';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const followCircleRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 텍스트를 개별 문자로 분리
        const targets = gsap.utils.toArray(".split");
        let SplitClient = new SplitType(targets, { type: "lines, words, chars" });
        let lines = SplitClient.lines;
        let words = SplitClient.words;
        let chars = SplitClient.chars;

        // 초기 애니메이션 설정
        gsap.set("#particles", { opacity: 0 });
        gsap.set(".text .t1 .char", { opacity: 0, x: -100 });
        gsap.set(".text .t2 .char", { opacity: 0, x: -10, scale: 0.8 });
        gsap.set(".text .t3 .char", { opacity: 0, y: 20 });
        gsap.set("#header", { top: -150 });

        const tl = gsap.timeline();
        setTimeout(() => {
            tl.to(".text .t1 .char", { opacity: 1, x: 0 });
            tl.to(".text .t2 .char", { opacity: 1, x: 0, stagger: 0.06, scale: 1, ease: "back.out(1.7)" });
            tl.to(".text .t3 .char", { opacity: 1, y: 0, duration: 0.4 });
            tl.to("#header", { top: 0, ease: "back.out(1.7)" });
            tl.to("#particles", { opacity: 1, duration: 1 });
        }, 3000);

        // #section2 애니메이션 설정
        gsap.set("#section2 .c5", { opacity: 0 });
        gsap.set("#section2 .desc .char", { opacity: 0 });

        const ani2 = gsap.timeline();

        ani2.to("#section2 .c1", { x: 0, y: 0 }, "a");
        ani2.to("#section2 .c2", { x: 0, y: 0 }, "a");
        ani2.to("#section2 .c3", { x: 0, y: 0 }, "a");
        ani2.to("#section2 .c4", { x: 0, y: 0 }, "a");
        ani2.to("#section2 .c5", { opacity: 1 });

        ani2.to("#section2 .desc .char", {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "back.out(1.7)"
        });

        ScrollTrigger.create({
            animation: ani2,
            trigger: "#section2",
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            markers: false,
        });

        // #section3 텍스트 애니메이션 설정
        gsap.set(".coding .char, .project .char, .blog .char", { opacity: 0, y: 50 });
        gsap.set(".coding .circle, .project .circle, .blog .circle", { y: -200, opacity: 0 });

        // .coding 애니메이션 설정
        const codingTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".coding",
                start: "top 80%",
                end: "bottom top",
                toggleActions: "play none none none",
                markers: false,
            },
        });

        codingTl.to(".coding .circle", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
        })
            .to(".coding .char", {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }, "<");

        // .project 애니메이션 설정
        const projectTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".project",
                start: "top 80%",
                end: "bottom top",
                toggleActions: "play none none none",
                markers: false,
            },
        });

        projectTl.to(".project .circle", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
        })
            .to(".project .char", {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }, "<");

        // .blog 애니메이션 설정
        const blogTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".blog",
                start: "top 80%",
                end: "bottom top",
                toggleActions: "play none none none",
                markers: false,
            },
        });

        blogTl.to(".blog .circle", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
        })
            .to(".blog .char", {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }, "<");

        // 마우스 따라다니는 원 애니메이션
        const followCircle = followCircleRef.current;
        let mouseX = 0, mouseY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.to({}, {
            duration: 0.01,
            repeat: -1,
            onRepeat: () => {
                gsap.set(followCircle, {
                    x: mouseX - followCircle.offsetWidth / 2,
                    y: mouseY - followCircle.offsetHeight / 2
                });
            }
        });

        ScrollTrigger.create({
            trigger: "#section3",
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                gsap.to(followCircle, { opacity: 1, duration: 0.3 });
            },
            onLeave: () => {
                gsap.to(followCircle, { opacity: 0, duration: 0.3 });
            },
            onEnterBack: () => {
                gsap.to(followCircle, { opacity: 1, duration: 0.3 });
            },
            onLeaveBack: () => {
                gsap.to(followCircle, { opacity: 0, duration: 0.3 });
            },
        });

        // #section4 애니메이션 설정
        const mediaQuery = window.matchMedia("(min-width: 960px)");

        function applyParallaxEffect() {
            // 애니메이션 적용
            gsap.utils.toArray(".parallax__item__img").forEach((item) => {
                if (item.scrollTrigger) {
                    item.scrollTrigger.kill();
                }

                gsap.to(item, {
                    yPercent: mediaQuery.matches ? -40 : 0,
                    ease: "none",
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        markers: false,
                        scrub: 0.5,
                    },
                });
            });
            gsap.utils.toArray(".parallax__item__desc").forEach((item) => {
                if (item.scrollTrigger) {
                    item.scrollTrigger.kill();
                }

                gsap.to(item, {
                    yPercent: mediaQuery.matches ? -80 : 0,
                    ease: "none",
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        markers: false,
                        scrub: 0.5,
                    },
                });
            });

            ScrollTrigger.refresh();
        }

        // 처음 로드 시 실행
        applyParallaxEffect();

        // 화면 크기가 변경될 때마다 실행
        mediaQuery.addEventListener("change", applyParallaxEffect);

        // section5 애니메이션
        gsap.set("#section5 .line_own, #section5 .line_to, #section5 .line_tree, #section5 .description", {
            opacity: 0,
            y: -100,
        });

        const section5Tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section5",
                start: "top 50%",
                end: "bottom top",
                toggleActions: "play reset play reset",
                markers: false,
            },
        });

        section5Tl
            .to("#section5 .line_own", { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" })
            .to("#section5 .line_to", { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3")
            .to("#section5 .line_tree", { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3")
            .to("#section5 .description", { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3");

        // #section6 애니메이션 설정
        gsap.set(".circle_card1", { x: '-100%', opacity: 0, rotation: -360 });
        gsap.set(".circle_card2", { x: '100%', opacity: 0, rotation: 360 });
        gsap.set(".circle_card3", { x: '-100%', opacity: 0, rotation: -360 });

        const circleCardTl1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".circle_card1",
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none reverse",
                markers: false,
            },
        });

        circleCardTl1.to(".circle_card1", {
            x: '0%',
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
        });

        const circleCardTl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".circle_card2",
                start: "top 87%",
                end: "bottom top",
                toggleActions: "play none none reverse",
                markers: false,
            },
        });

        circleCardTl2.to(".circle_card2", {
            x: '0%',
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
        });

        const circleCardTl3 = gsap.timeline({
            scrollTrigger: {
                trigger: ".circle_card3",
                start: "top 87%",
                end: "bottom top",
                toggleActions: "play none none reverse",
                markers: false,
            },
        });

        circleCardTl3.to(".circle_card3", {
            x: '0%',
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
        });

        // Particles 애니메이션
        const circle = '<svg viewBox="0 0 67.4 67.4"><circle class="circle" cx="33.7" cy="33.7" r="33.7"/></svg>';

        class Particle {
            constructor(svg, coordinates, friction) {
                this.svg = svg;
                this.steps = window.innerHeight / 2;
                this.item = null;
                this.friction = friction;
                this.coordinates = coordinates;
                this.position = this.coordinates.y;
                this.dimensions = this.render();
                this.move();
                this.rotation = Math.random() > 0.5 ? "-" : "+";
                this.scale = 0.4 + Math.random() * 2;
                this.siner = (window.innerWidth / 2.5) * Math.random();
            }
            destroy() {
                this.item.remove();
            }

            move() {
                this.position = this.position - this.friction;
                let top = this.position;
                let left = this.coordinates.x + Math.sin((this.position * Math.PI) / this.steps) * this.siner;
                this.item.style.transform = `translateX(${left}px) translateY(${top}px) scale(${this.scale}) rotate(${this.rotation}${this.position + this.dimensions.height}deg)`;

                if (this.position < -this.dimensions.height) {
                    this.destroy();
                    return false;
                } else {
                    return true;
                }
            }

            render() {
                this.item = document.createElement('div');
                this.item.innerHTML = this.svg;
                this.item = this.item.firstChild;
                this.item.style.transform = `translateX(${this.coordinates.x}px) translateY(${this.coordinates.y}px)`;
                document.getElementById('particles').appendChild(this.item);
                return {
                    width: this.item.offsetWidth,
                    height: this.item.offsetHeight,
                };
            }
        }

        let isPaused = false;
        window.onblur = () => { isPaused = true; };
        window.onfocus = () => { isPaused = false; };

        let particles = [];

        setInterval(() => {
            if (!isPaused) {
                particles.push(
                    new Particle(
                        circle,
                        {
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                        },
                        1 + Math.random()
                    )
                );
            }
        }, 880);

        function update() {
            particles = particles.filter((p) => p.move());
            requestAnimationFrame(update);
        }
        update();

        ScrollTrigger.refresh();
    }, []);

    return (
        <>
            <section id="section1">
                <div className="text">
                    <div className="t1 split">the</div>
                    <div className="t2 split">Creative</div>
                    <div className="t3 split">portfolio</div>
                </div>
                <div id="particles"></div>
                <svg>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" />
                            <feColorMatrix in="blur" result="colormatrix" type="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" />
                            <feBlend in="SourceGraphic" in2="colormatrix" />
                        </filter>
                    </defs>
                </svg>
            </section>
            {/* 섹션 1 */}

            <section id="section2">
                <div className="circle c1"></div>
                <div className="circle c2"></div>
                <div className="circle c3"></div>
                <div className="circle c4"></div>
                <div className="circle c5"></div>
                <p className="desc split">
                    안녕하세요!<br />어떤 일이라도 노력하고 즐기면 그 결과는 빛을 바란다고 생각합니다. <br />신입의 열정과
                    도전정신을 깊숙히 새기며 배움에 있어 겸손함을 유지하며 <br />세부적인 곳까지 파고드는 개발자가
                    되겠습니다.
                </p>
            </section>
            {/* 섹션2 */}

            <section id="section3">
                <div className="follow-circle" ref={followCircleRef}></div>
                <div className="coding">
                    <div className="circle"></div>
                    <p className="split">Frontend</p>
                    <h2 className="split">Coding</h2>
                </div>
                <div className="project">
                    <div className="circle"></div>
                    <h2 className="split">Project</h2>
                    <p className="split">Full - stack</p>
                </div>
                <div className="blog">
                    <div className="circle"></div>
                    <h2 className="split">Blog</h2>
                    <p className="split">Revise</p>
                    <div className="image-placeholder"></div>
                </div>
                <div className="section3_div"></div>
            </section>
            {/* 섹션3 */}

            <section id="section4">
                <div className="container">
                    <div className="sec5__inner">
                        <p className="sub"><span className="dot"></span>6개월 동안 작업한 작업물입니다.</p>
                        <div className="article a1">
                            <div className="imgWrap">
                                <div className="img parallax__item__img"></div>
                                <div className="link">
                                    <a href="https://github.com/sunhew?tab=repositories" target="blank">사이트 보기</a>
                                    <a href="https://github.com/sunhew/class2024" target="blank">소스 보기</a>
                                </div>
                            </div>
                            <h3 className="title dotWrap"><span className="dot w15"></span>지난 6개월간의 기록.</h3>
                            <p>
                                이 사이트는 HTML5, CSS3, 그리고 JAVASCRIPT를 사용하여 개발했습니다.<br />
                                6개월 동안 공부한 여러 지식들을 정리한 사이트들과 제작한 사이트들이 아이콘의 형태로 모여있습니다!
                            </p>
                            <pre className="target">
                                이 사이트는 제가 코딩을 처음 시작할 때 공부하면서 제작한 것입니다. <br />
                                GitHub의 사용 방법조차 몰랐던 시점에서 시작해, 점차 성장해가는 과정을 고스란히 담고 있어, <br />
                                저에게는 매우 의미 있는 발자취가 된 사이트입니다. <br />

                                처음에는 HTML과 CSS에 익숙해지기 위해 웹 디자인 실기 레이아웃부터 시작해, <br />
                                점차 JavaScript와 같은 복잡한 언어를 배우면서 어려움을 겪기도 했습니다. <br />
                                그러나 그런 과정에서 얻은 경험과 지식 덕분에 문제를 해결하는 능력과 자신감을 얻게 되었습니다. <br />
                                이 사이트는 단순한 프로젝트 이상의 의미를 가지고 있으며, 저의 성장과 발전을 보여주는 중요한 증거입니다. <br />
                            </pre>
                        </div>
                    </div>
                    {/* //article1 */}
                    <div className="article2 parallax__item__desc">
                        <div className="imgWrap">
                            <div className="img parallax__item__img"></div>
                            <div className="link">
                                <a href="https://sunhew.github.io/class2024/javascript/index.html" target="blank">사이트 보기</a>
                                <a href="https://github.com/sunhew/class2024/tree/main/javascript" target="blank">소스 보기</a>
                            </div>
                        </div>
                        <h3 className="title dotWrap"><span className="dot right w15"></span>정보처리 기능사 시험을 즐겁게!</h3>
                        <p>
                            이 사이트를 제작했을때 SCRIPT와 JSON의 활용을 신경쓰며 개발했습니다. <br />
                            정보처리 기능사 필기를 준비하는 과정에서 ‘ 조금 더 재밌게 배울 방법 없을까? ‘ <br />
                            라는 생각에 퀴즈 게임 형식으로 제작하게 되었습니다.
                        </p>
                        <pre className="target">
                            처음에는 JSON 파일에 있는 객체나 배열을 불러오는 것조차 어려웠고, <br />
                            간단한 SCRIPT 한 줄 작성하는 데도 많은 어려움을 겪었습니다. <br />
                            '이 함수는 뭐지?', '이 정보를 어떻게 나타내야 할까?', '왜 정보가 안 나올까?'와 같은 <br />
                            수많은 오류와 시행착오를 겪으면서도, 답답한 마음을 안고 인터넷 검색을 통해 해결 방법을 찾아 나갔습니다. <br />
                            사이트가 완성되었을 때, 처음부터 끝까지 혼자 힘으로 만들었다는 성취감에 무척 기뻤습니다. <br />
                            지금 다시 본다면 부족한 부분이 많은 사이트이 지만, <br />
                            이 경험은 제가 아무리 어려운 상황에 처하더라도 포기하지 않는 개발자가 될 수 있는 첫걸음이었습니다. <br />
                        </pre>
                    </div>
                    {/* //article2 */}
                    <div className="article3 parallax__item__desc">
                        <div className="imgWrap">
                            <div className="img parallax__item__img"></div>
                            <div className="link">
                                <a href="https://sunhew.github.io/class2024/css/index.html" target="blank">사이트 보기</a>
                                <a href="https://github.com/sunhew/class2024/blob/main/css/index.html" target="blank">소스 보기</a>
                            </div>
                        </div>
                        <h3 className="title dotWrap"><span className="dot w15"></span>CSS3만 사용해 애니메이션을 만들어볼까?</h3>
                        <p>
                            이 사이트는 JAVASCRIPT를 사용하지 않고 HTML5, CSS3만을 사용하여 개발했습니다.<br />
                            ‘ SCRIPT없이 css3와 html5만 사용해서 애니메이션을 만들어보면 어떨까? ‘ <br />
                            라는 호기심에 순수하게 HTML5와 CSS3만을 활용해 제작했습니다.
                        </p>
                        <pre className="target">
                            코딩을 배우는 과정에서 동적인 웹페이지를 제작하기 위해 SCRIPT의 중요성을 깨달았지만, <br />
                            '혹시 SCRIPT 없이 CSS의 keyframes와 animation 효과만으로 동적인 사이트를 만들면 재미있지 않을까?'라는 <br />
                            호기심에 이 사이트를 시작하게 되었습니다. <br />
                            처음에는 즐거웠지만, 요소 하나하나에 keyframes을 사용해 초 단위로 지정할 때는 괜히 시작했나 후회하기도 했습니다. <br />
                            그러나 이 과정을 통해 SCRIPT의 중요성을 몸소 체험하며, <br />
                            화면을 이리저리 움직이는 유령을 만들었을 때 무척 뿌듯했습니다. <br />
                            수많은 반복 작업에도 끈기 있게 이어간다면 뭐든지 할 수 있다는 경험을 준 사이트입니다. <br />
                        </pre>
                    </div>
                    {/* //article3 */}
                    <div className="article4 parallax__item__desc">
                        <div className="imgWrap">
                            <div className="img parallax__item__img"></div>
                            <div className="link">
                                <a href="https://sunhew.github.io/class2024/effect/index.html" target="blank">사이트 보기</a>
                                <a href="https://github.com/sunhew/class2024/tree/main/effect" target="blank">소스 보기</a>
                            </div>
                        </div>
                        <h3 className="title dotWrap"><span className="dot right w15"></span>마우스 커서를 커스텀 할 수있나?</h3>
                        <p>
                            이 사이트는 HTML5, CSS3, 그리고 JAVASCRIPT를 사용하여 개발했습니다.<br />
                            '코딩으로 나만의 Mouse cursor와 특정 조건에서 변하는 cursor를 만들 수 없을까?' <br />
                            라는 호기심에 제작했습니다.
                        </p>
                        <pre className="target">
                            다양한 사이트들을 방문하다보면 각 사이트의 특징이 무척이나 잘 보이는 커서들을 보며 <br />
                            '혹시 나도 만들 수 있지 않을까? 특정 조건에서만 반응하거나 <br />
                            기존 cursor 대신 다른 형태의 cursor들이 있는걸 만들어볼까?' <br />
                            라는 지극히 흥미 위주로 시작했습니다. <br />
                            그러나 좌표값을 지정하고 여러 함수를 구성하는 단계에서 생각했던것보다 난이도는 더 높았고 그에 맞춰 <br />
                            다양한 오류들이 발생했지만 선생님의 도움과 웹 검색등을 활용해 하나씩 오류들을 해결해나갔습니다. <br />
                        </pre>
                    </div>
                    {/* //article4 */}
                    <div className="article5 parallax__item__desc">
                        <div className="imgWrap">
                            <div className="img parallax__item__img"></div>
                            <div className="link">
                                <a href="https://sunhew.github.io/" target="blank">사이트 보기</a>
                                <a href="https://github.com/sunhew/sunhew.github.io" target="blank">소스 보기</a>
                            </div>
                        </div>
                        <h3 className="title dotWrap"><span className="dot w15"></span>배웠던것들을 정리하기위해</h3>
                        <p>
                            이 사이트는 제가 직접 개발하지는 않았지만 지금까지 배웠던 지식들을<br />
                            정리하기 위해 매일같이 글을 썼던 블로그입니다. <br />
                            마크다운 언어를 사용해 글을 작성한뒤 깃헙에 커밋하는 과정을 거쳐 블로그를 운영했습니다.
                        </p>
                        <pre className="target">
                            긴 시간 동안 공부를 하며 배웠던 지식들을 모두 기억하기에는 어려움이 있다 판단하여 시작한 이 블로그는 <br />
                            매일마다 배웠던 지식들을 정리하는 저만의 인터넷 도서관이 되었습니다. <br />
                            하지만 처음 코드를 통해 글을 작성했을때에는 의도했던 형식으로 작성되지않아 이유를 찾던중 <br />
                            pre 태그로 감싸져있거나 br 태그를 사용하는게 아닌 이상 띄어쓰기등을 인식하지 못한다는 문제를 알게되었습니다. <br />
                            그 과정에서 Markdown이라는 새로운 언어를 알게되었고, <br />
                            여러가지의 형식을 작성해보며 새로운 언어를 익히게 되었습니다. <br />
                        </pre>
                    </div>
                    {/* //article5 */}
                    <div className="article6 parallax__item__desc">
                        <div className="imgWrap">
                            <div className="img parallax__item__img"></div>
                            <div className="link">
                                <a href="http://gsim12.dothome.co.kr/comment/commentRead.php" target="blank">사이트 보기</a>
                                <a href="http://gsim12.dothome.co.kr/" target="blank">전체 구조 보기</a>
                            </div>
                        </div>
                        <h3 className="title dotWrap"><span className="dot right w15"></span>나만의 블로그를 직접 만들다.</h3>
                        <p>
                            이 사이트는 JAVASCRIPT와 HTML5, CSS3, PHP, MySQL을 사용해 제작했습니다.<br />
                            닷홈이라는 호스팅 서버를 활용한 첫번째 사이트로 내가 작성한 코드들이 실시간으로 서버에 적용이 되는것을 보며<br />
                            데이터 베이스를 확인해가며 두달 정도를 개발에 매진했습니다.
                        </p>
                        <pre className="target">
                            처음으로 PHP와 MySQL, DataBase를 다룰때에는 이게 어떠한 코드인지 익숙하지 않은 상태에서 <br />
                            SCRIPT와는 다르게 자동완성 기능 없이 PHP의 코드를 작성할때에는 수많은 함수들을 한자씩 직접 입력해가야 했기에 <br />
                            오타로인한 많은 오류를 겪었던 기억이 있습니다. <br />
                            처음에는 마냥 낯설기만했던 언어들이 점차 익숙해져갔고 규칙이 눈에 보이기 시작한 순간부터 백앤드의 매력에 빠져버렸습니다. <br />
                            그 이후 진행했던 프로젝트에서도 게시판이나 로그인등의 서버 설정을 포함한 프론트 역을 맡았고, <br />
                            중간에 남은 시간에는 블로그의 유지보수를 하거나 새로운 기능을 만들어 적용한뒤 다른 프로젝트에 집중하기위해 잠시 잊었다가 <br />
                            포트폴리오를 위해 제작했던 사이트들을 둘러보던중 누군지 알 수 없는 수많은 사람들이 제 블로그에 방문해 작성했던 글을 읽거나, <br />
                            좋아요를 누르는등의 상호작용 결과를 확인했을때는 정말 너무나도 기뻤습니다. <br />
                            블로그를 제작하고, 유지하던 과정에서 얻었던 경험은 <br />
                            처음엔 어느것이나 어려울 수 있지만 그럴수록 더 배우다보면 어느새 규칙들이 보이고 <br />
                            실력이 늘어날 수 있다는 중요한 경험을 준 정말 고마운 사이트입니다. <br />
                        </pre>
                    </div>
                    {/* //article6 */}
                </div>
            </section>
            {/* 섹션4 */}

            <section id="section5">
                <div className="content">
                    <div className="line-container">
                        <p className="line_own">the</p>
                        <p className="line_to">Creative</p>
                        <p className="line_tree">portfolio</p>
                    </div>
                    <p className="description">
                        어떤 일이든 노력하고 즐기면 그 결과는 빛을 바란다고 생각 <br />
                        합니다. 신입의 열정과 도전정신을 접목해 세계에 배움에 있어 <br />
                        겸손함을 유지하며 세계적인 곳까지 파고드는 <br />
                        개발자가 되겠습니다.
                    </p>
                </div>
                <div className="background-circle"></div>
            </section>
            {/* 섹션5 */}

            <section id="section6">
                <div className="container">
                    <div className="circle_card circle_card1">
                        <img src={coffeeImage} alt="coffee" />
                    </div>
                    <div className="circle_card-content card-content1">
                        <div className="circle_h3-container">
                            <span className="circle_blue-circle"></span>
                            <h3>“어느 카페에 어떤 커피가 있지?”</h3>
                        </div>
                        <p>
                            많은 프랜차이즈 카페가 있어서 어느 카페에 <br />
                            어떤 음료가 있었는지 혼동이 올 때가 있었습니다.<br />
                            각각의 사이트에서 메뉴의 세부 정보를 Python으로 자동 수집한 뒤,<br />
                            React를 사용해 사이트를 만들었고 그 안에 수집한 정보를 넣었습니다.
                        </p>
                        <a href="https://coffeemenu-eight.vercel.app/" target="_blank" rel="noopener noreferrer">사이트 방문</a>
                        <a href="https://github.com/sunhew/coffeemenu" target="_blank" rel="noopener noreferrer">소스보기</a>
                    </div>

                    <div className="circle_card circle_card2">
                        <img src={musicImage} alt="music" />
                    </div>
                    <div className="circle_card-content card-content2">
                        <div className="circle_h3-container">
                            <span className="circle_blue-circle"></span>
                            <h3>“나만의 플레이리스트를 구현하다.”</h3>
                        </div>
                        <p>
                            뮤직 플레이어를 구현하면서 나만의 플레이리스트를 추가하고<br />
                            자유롭게 디자인하며 즐겁게 작업했던 사이트입니다.<br />
                            음악 사이트들의 랭킹 정보를 자동으로 수집해 매일 갱신하며,<br />
                            음악 플레이어 아래에 셔플 재생, 반복 재생 등의 기능성 아이콘을 <br />
                            배치했습니다.
                        </p>
                        <a href="https://youtubmusic.vercel.app/" target="_blank" rel="noopener noreferrer">사이트 방문</a>
                        <a href="https://github.com/sunhew/youtubmusic" target="_blank" rel="noopener noreferrer">소스보기</a>
                    </div>

                    <div className="circle_card circle_card3">
                        <img src={fontImage} alt="font" />
                    </div>
                    <div className="circle_card-content card-content3">
                        <div className="circle_h3-container">
                            <span className="circle_blue-circle"></span>
                            <h3>“내 사이트에 어울리는 폰트가 뭐지?”</h3>
                        </div>
                        <p>
                            이곳 저곳에 흩어져있는 폰트들을 찾기에는 번거로움이 있어<br />
                            모든 폰트들이 모여있는 사이트를 제작했습니다.<br />
                            그리고 나만의 폰트 제작 기능까지 구현해가며 알지 못했던 많은<br />
                            코드들을 배우고 알게 되었습니다.
                        </p>
                        <a href="#" target="_blank" rel="noopener noreferrer">사이트 방문</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">소스보기</a>
                    </div>
                </div>
            </section>
            {/* 섹션 6 */}

            <footer id="footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <h1>Please</h1>
                        <h2>Join us!</h2>
                    </div>
                    <div className="footer-right">
                        <div className="developer-site">
                            <p>developer site</p>
                            <ul>
                                <li><a href="https://github.com/sunhew">Git Hub</a></li>
                                <li><a href="https://sunhew.github.io/">Blog</a></li>
                                <li><a href="https://codepen.io/your-work">Code Pen</a></li>
                            </ul>
                        </div>
                        <div className="social-media">
                            <p>Social media contact</p>
                            <ul>
                                <li><a href="https://www.instagram.com/liamu23/">Instagram</a></li>
                                <li><a href="https://open.kakao.com/o/s1M4iUEg">Kakao Talk</a></li>
                                <li><a href="https://x.com/choeseo85213034">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="scroll-top">
                    <span>&#x25B2;</span>
                </div>
            </footer>
            {/* 푸터 */}
        </>
    );
}

export default Home;
