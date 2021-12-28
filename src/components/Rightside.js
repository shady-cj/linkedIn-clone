import styled from "styled-components";

const Rightside = () => {
    return (
        <Container>
            <FollowCard>
                <Title>
                    <h2>Add to your feed</h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>

                <FeedList>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#LinkedIn</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Video</span>
                            <button>Follow</button>
                        </div>
                    </li>
                </FeedList>
                <Recommendation>
                    View all recommendations
                    <img src="images/right-icon.svg" alt="" />
                </Recommendation>
            </FollowCard>
            <BannerCard>
                <img
                    src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
                    alt=""
                />
            </BannerCard>
        </Container>
    );
};
const Container = styled.div`
    grid-area: rightside;
    position: sticky;
    height: 500px;
    position: -webkit-sticky;
    top: 8%;
    @media (max-width: 768px) {
        width: 100%;
        position: initial;
        height: auto;
    }
`;
const FollowCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: white;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 12px;
`;

const Title = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
`;
const FeedList = styled.ul`
    margin-top: 16px;
    list-style: none;
    li {
        display: flex;
        align-items: center;
        margin: 12px 0;
        position: relative;
        font-size: 14px;
        & > div {
            display: flex;
            flex-direction: column;
        }
        button {
            background: transparent;
            cursor: pointer;
            color: rgba(0, 0, 0, 0.6);
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
            padding: 16px;
            display: inline-flex;
            align-items: center;
            border-radius: 15px;
            font-weight: 600;
            justify-content: center;
            max-height: 32px;
            max-width: 480px;
            text-align: center;
            border: none;
            outline: none;
        }
    }
`;
const Avatar = styled.div`
    background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 48px;
    height: 48px;
    margin-right: 8px;
`;
const Recommendation = styled.a`
    color: #0a66c2;
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 14px;
    img {
        margin-left: 12px;
    }
`;
const BannerCard = styled(FollowCard)`
    padding: 0;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media (max-width: 768px) {
        margin-bottom: 50px;
    }
`;
export default Rightside;
