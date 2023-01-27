import styled from "styled-components";
import boardIcon from "../../icons/intro-bubble.svg";
import writeIcon from "../../icons/intro-write.svg";
import tagIcon from "../../icons/intro-tag.svg";
import useScrollFadeIn from "./useScrollFadeIn";
import boardImg from "../../icons/intro-board-img.png";

const IntroBoard = () => {
    const introArray = [
        { key: 1, iconURL: boardIcon, text: "다양한 주제의 고민글 게시판" },
        { key: 2, iconURL: writeIcon, text: "고민글 & 답변 작성 기능" },
        { key: 3, iconURL: tagIcon, text: "고민글 주제 태그 기능" },
    ];

    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 1, 0.5),
        2: useScrollFadeIn("down", 2, 1),
    };

    return (
        <>
            <IntroBoardContainer>
                <LeftContent>
                    <img src={`${boardImg}`} />
                </LeftContent>
                <RightContent>
                    <div className="title" {...animatedItem[0]}>
                        <p className="logo">MENTALTAL&nbsp;</p>
                        <p className="logoDescription">커뮤니티</p>
                    </div>
                    <div className="description" {...animatedItem[1]}>
                        나와 비슷한 고민을 가진 사람들과
                        <br />
                        이야기를 나누어 보세요.
                    </div>
                    <div className="board" {...animatedItem[2]}>
                        {introArray.map((element) => (
                            <BoardIconContainer key={element.key} icon={element.iconURL}>
                                <p>{element.text}</p>
                            </BoardIconContainer>
                        ))}
                    </div>
                </RightContent>
            </IntroBoardContainer>
        </>
    );
};

export default IntroBoard;

const IntroBoardContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 2%;
`;

const LeftContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 55%;
        height: auto;

        @media screen and (max-width: 1420px) {
            width: 65%;
        }
        @media screen and (max-width: 1235px) {
            width: 75%;
        }
        @media screen and (max-width: 1080px) {
            width: 85%;
        }
    }
`;

const RightContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    color: var(--green);
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* padding-left: 13%; */

    .title {
        font-size: 45px;
        display: flex;
        .logoDescription {
            font-weight: var(--font-bold);
            font-size: 41px;
        }
        @media screen and (max-width: 1201px) {
            font-size: 43px;
            .logoDescription {
                font-size: 38px;
            }
        }
        @media screen and (max-width: 1187px) {
            font-size: 42px;
            .logoDescription {
                font-size: 37px;
            }
        }
        @media screen and (max-width: 1133px) {
            font-size: 40px;
            .logoDescription {
                font-size: 35px;
            }
        }
        @media screen and (max-width: 1095px) {
            font-size: 39px;
            .logoDescription {
                font-size: 34px;
            }
        }
        @media screen and (max-width: 1065px) {
            font-size: 37px;
            .logoDescription {
                font-size: 32px;
            }
        }
        @media screen and (max-width: 1019px) {
            flex-direction: column;
            .logoDescription {
                padding-top: 1.4%;
            }
        }
        @media screen and (max-height: 602px) {
            font-size: 32px;
            margin-top: 80px;
        }
    }

    .description {
        font-size: 22px;
        line-height: 35px;
        padding-top: 17px;
        @media screen and (max-width: 1187px) {
            font-size: 21px;
        }
        @media screen and (max-width: 1095px) {
            font-size: 20px;
        }

        @media screen and (max-height: 602px) {
            font-size: 18px;
            line-height: 30px;
        }
    }

    .board {
        margin-top: 50px;
        @media screen and (max-height: 602px) {
            margin-top: 0;
        }
    }
`;

const BoardIconContainer = styled.div`
    height: 100px;
    background-image: url(${(props) => props.icon});
    background-repeat: no-repeat;
    background-position: left;
    background-size: 70px 70px;

    display: flex;
    align-items: center;
    padding-left: 90px;
    font-size: 22px;
    font-weight: var(--font-bold);

    margin-bottom: 10px;

    @media screen and (max-width: 1030px) {
        font-size: 20px;
    }
    @media screen and (max-width: 981px) {
        font-size: 18px;
    }

    @media screen and (max-height: 602px) {
        background-size: 60px 60px;
        font-size: 18px;
        padding-left: 80px;
        margin-bottom: 0;
        height: 80px;
    }
`;
