/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { toggleMenuClick } from "../menuClickSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const breakpoints = [500, 768, 890];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const header = css`
  transition: 0.3s;
  display: flex;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  p {
    margin: 0;
  }
  gap: 1rem;
`;

const searchCont = css`
  display: flex;
  align-items: center;
  max-width: 390px;
  width: 100%;
  flex: 1;
  border-radius: 7px;
  border: 1px solid #484848a3;
  padding: revert-layer;
  padding-left: 10px;
  gap: 10px;
  ${mq[1]} {
    display: none;
  }
`;

const uploadCont = css`
  text-decoration: none;
  color: #303538;
  display: flex;
  border-radius: 7px;
  align-items: center;
  max-width: 390px;
  width: 100%;
  border: 1px solid #484848a3;
  padding: 0 10px;
  gap: 10px;
  max-width: max-content;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #4d85fe;
    color: white;
  }
  ${mq[0]} {
    display: none;
  }
`;

const accountCont = css`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const userPic = css`
  padding: 10px;
  border-radius: 50%;
  border: 1px solid;
`;

const userNameCont = css`
  margin: 0 1rem 0 1rem;
  P:nth-of-type(1) {
    font-size: 1.1rem;
    font-weight: 600;
  }
  P:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 4px;
  }
`;

const arrowIcon = css`
  font-size: 1.1rem;
`;

const menu = css`
  display: none;
  ${mq[1]} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  i {
    font-size: 1.8rem;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const isMenuClicked = useSelector(
    (state) => state.menuClickedStatus.isMenuClicked
  );

  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${isSticky && windowWidth < 890 ? "sticky" : ""}`}
      css={header}
    >
      <div onClick={() => dispatch(toggleMenuClick())} css={menu}>
        {isMenuClicked ? (
          <i class="fa-solid fa-x"></i>
        ) : (
          <i class="fa-solid fa-bars"></i>
        )}
      </div>

      <div css={searchCont}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>Search Songs, Artists, Albums ...</p>
      </div>
      <Link to={"/upload"} css={uploadCont}>
        <i className="fa-solid fa-cloud-arrow-up"></i>
        <p>Upload Your Song</p>
      </Link>
      <div css={accountCont}>
        <i css={userPic} className="fa-solid fa-user"></i>
        <div css={userNameCont}>
          <p>Dagmfre</p>
          <p>Premium</p>
        </div>
        <i css={arrowIcon} className="fa-solid fa-circle-chevron-down"></i>
      </div>
    </div>
  );
}
