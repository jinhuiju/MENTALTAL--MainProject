import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardState } from "../../states";
import { useEffect } from "react";

// component
const EditBoardMain = () => {
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const navigate = useNavigate();

    const [board, setBoard] = useRecoilState(boardState);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ! 백에서 태그 기능이 구현되면 살려놓을 것
    // // 태그
    // const initialTag = board.tag;
    // const tagData = ["일반", "학업", "진로", "취업", "커리어", "가족", "대인관계", "금전", "기타"];
    // const [tags, setTags] = useState([...initialTag]);

    // // 태그 버튼 이벤트 핸들러
    // const handleTags = (e) => {
    //     const str = e.target.value;

    //     if (tags.includes(str)) {
    //         const result = tags.filter((el) => el !== `${str}`);
    //         console.log(tags);
    //         return setTags(result);
    //     }

    //     if (!tags.includes(str)) {
    //         return setTags([...tags, str]);
    //     }
    // };

    // 게시글 수정 요청 함수
    const patchBoard = (data) => {
        axios
            .patch(`${url}/boards/${board.id}`, data)
            .then((res) => {
                navigate("/community");
                setBoard(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <CreateBoardMainWrapper>
            <form
                onSubmit={handleSubmit((data) => {
                    // ! 백에서 태그 기능이 구현되면 살려놓을 것
                    // data.tag = [...tags];
                    data.BoardWriterId = "작성자";
                    data.createdAt = "2023 / 01 / 06";
                    patchBoard(data);
                })}
            >
                <CreateBoardMainContainer>
                    <label htmlFor="createBoardInputTile">고민을 한줄로 요약해 알려주세요.</label>
                    <input
                        id="createBoardInputTile"
                        placeholder="최소 10자 이상 작성해주세요."
                        className={errors.title && "createBoardErrorInput"}
                        defaultValue={board.title}
                        {...register("title", {
                            required: "Required",
                            minLength: {
                                value: 10,
                                message: "최소 10자 이상 작성해주세요.",
                            },
                        })}
                    />
                    {errors.title && <div className="createBoardErrorMessage">최소 10자 이상 작성해주세요!</div>}
                </CreateBoardMainContainer>

                <CreateBoardMainContainer>
                    <label htmlFor="createBoardInputContent">고민 내용을 편하게 털어놓으세요.</label>
                    <textarea
                        id="createBoardInputContent"
                        placeholder="고민을 적어주세요."
                        className={errors.content && "createBoardErrorTextarea"}
                        defaultValue={board.content}
                        {...register("content", { required: true })}
                    />
                    {errors.content && <div className="createBoardErrorMessage">고민을 적어주세요!</div>}
                </CreateBoardMainContainer>

                {/* <CreateBoardTagsWrapper>
                    <label htmlFor="createBoardTagsInput">아래의 태그 중 하나를 선택해주세요.</label>
                    <ul>
                        {tagData.map((tag, idx) => (
                            <li key={idx}>
                                <button type="button" value={tag} onClick={handleTags} className={tags.includes(tag) ? "tagBtnActive" : null}>
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </CreateBoardTagsWrapper> */}

                <CreateBoardSubmitBtnWrapper>
                    <button type="submit">
                        고민 수정하기 <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </CreateBoardSubmitBtnWrapper>
            </form>
        </CreateBoardMainWrapper>
    );
};

// styled components
const CreateBoardMainWrapper = styled.div`
    padding: 60px 100px;

    label {
        color: var(--darkgreen);
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 5px;
    }

    input {
        padding: 10px;
        font-size: 16px;
        border-bottom: 2px solid var(--green);
        cursor: text;
    }

    input:focus {
        border-bottom: 2px solid var(--lightgreen);
    }

    .createBoardErrorInput,
    .createBoardErrorInput:focus {
        border-bottom: 2px solid red;
    }

    .createBoardErrorMessage {
        color: red;
        font-size: 14px;
        margin-left: 4px;
    }

    @media screen and (max-width: 630px) {
        padding: 40px;
    }
`;

const CreateBoardMainContainer = styled.div`
    margin: 0 auto 60px;
    max-width: 1500px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    textarea {
        resize: none;
        height: 300px;
        padding: 20px;

        border: none;
        border-radius: 20px;
        outline: 2px solid var(--green);

        font-size: 16px;
    }

    textarea:focus {
        outline: 2px solid var(--lightgreen);
    }

    .createBoardErrorTextarea,
    .createBoardErrorTextarea:focus {
        outline: 2px solid red;
    }

    @media screen and (max-width: 630px) {
        label {
            font-size: 20px;
        }
    }
`;

const CreateBoardTagsWrapper = styled.div`
    margin: 0 auto 60px;
    max-width: 1500px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        padding: 15px;
        border: none;
        border-radius: 20px;
        outline: 2px solid var(--green);
    }

    button {
        width: fit-content;
        padding: 8px 15px;
        border-radius: 20px;
        background-color: var(--lightgreen2);
        color: var(--darkgreen);

        font-size: 14px;
        font-weight: 500;
    }

    .tagBtnActive {
        background-color: var(--green);
        color: white;
    }

    @media screen and (max-width: 630px) {
        button {
            padding: 5px 10px;
            font-size: 12px;
        }
    }
`;

const CreateBoardSubmitBtnWrapper = styled.div`
    margin: 0 auto;
    max-width: 1500px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    button {
        border-radius: 30px;
        width: 300px;
        font-size: 16px;
    }

    i {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 2px 3px;
        margin-left: 5px;
    }

    @media screen and (max-width: 630px) {
        button {
            width: 100%;
            font-size: 14px;
        }

        i {
            margin-left: 2px;
        }
    }
`;

export default EditBoardMain;
